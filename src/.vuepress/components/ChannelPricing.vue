<template>
  <div class="channel-pricing">
    <div class="loading-state" v-if="loading">
      <div class="loading-spinner"></div>
      <span>正在从 rightapi.ai 拉取各渠道实时价格...</span>
    </div>

    <div class="error-state" v-else-if="error">
      <iconify-icon icon="mdi:alert-circle" width="24" height="24"></iconify-icon>
      <span>{{ error }}</span>
      <button class="retry-btn" @click="fetchPricing">重试</button>
    </div>

    <div v-else>
      <div class="payg-rate">
        <span class="rate-label">充值比例</span>
        <span class="rate-value">1 元 = 站内 1$</span>
      </div>
      <p class="formula-hint">
        实付价 = 官网价 × 渠道倍率。下面价格会随官网实时更新，打开本页即可看到当前每个渠道的实际花费。
      </p>

      <div class="channel-card" v-for="channel in channels" :key="channel.prefix">
        <div class="channel-header">
          <div class="channel-title">
            <h3>{{ channel.name }}</h3>
            <span class="channel-url">https://rightapi.ai{{ channel.prefix }}</span>
          </div>
          <div class="channel-rate">
            <span class="rate-kicker">渠道倍率</span>
            <strong>{{ formatMultiplier(channel.multiplier) }}</strong>
          </div>
        </div>

        <div class="model-table-wrap">
          <table class="model-table">
            <thead>
              <tr>
                <th>模型</th>
                <th>计费</th>
                <th>官网价</th>
                <th>实付价</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="model in channel.models" :key="model.name">
                <td class="model-name">{{ model.name }}</td>
                <td>{{ model.billingLabel }}</td>
                <td>{{ model.officialText }}</td>
                <td class="actual">{{ model.actualText }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const error = ref(null);
const channels = ref([]);

const BASE_URL = import.meta.env.DEV ? '/rc-api' : 'https://rightapi.ai';

const formatMoney = (value, currency) => {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  const unit = currency === 'CNY' ? '¥' : '$';
  return `${unit}${Number.isInteger(num) ? num : Number(num.toFixed(4))}`;
};

const formatMultiplier = (value) => {
  const num = Number(value);
  if (Number.isNaN(num) || value === null || value === undefined) return '官网同价';
  if (num === 1) return '官网同价 × 1';
  return `官网价 × ${num}`;
};

const pickEffective = (model, key) => {
  const effective = model.effective_price_config || {};
  if (effective[key] !== undefined && effective[key] !== null && effective[key] !== '') {
    return effective[key];
  }
  return model[key];
};

const formatTokenLine = (input, output, currency) => {
  const inText = formatMoney(input, currency);
  const outText = formatMoney(output, currency);
  if (!inText && !outText) return '—';
  return `输入 ${inText || '—'}/M · 输出 ${outText || '—'}/M`;
};

const formatRequestLine = (price, currency) => {
  const text = formatMoney(price, currency);
  return text ? `${text}/次` : '—';
};

const normalizeChannel = (upstream) => {
  const currency = upstream.official_currency || 'USD';
  const models = (upstream.models || []).map((model) => {
    const isRequest = model.billing_mode === 'request';
    const officialIn = model.input_price;
    const officialOut = model.output_price;
    const officialReq = model.request_price;
    const actualIn = pickEffective(model, 'input_price');
    const actualOut = pickEffective(model, 'output_price');
    const actualReq = pickEffective(model, 'request_price') ?? officialReq;

    return {
      name: model.name,
      billingLabel: isRequest ? '按次' : '按量',
      officialText: isRequest
        ? formatRequestLine(officialReq, currency)
        : formatTokenLine(officialIn, officialOut, currency),
      actualText: isRequest
        ? formatRequestLine(actualReq, currency)
        : formatTokenLine(actualIn, actualOut, currency),
    };
  });

  const multipliers = (upstream.models || [])
    .map((model) => model.effective_upstream_rate ?? model.effective_total_multiplier)
    .filter((value) => value !== null && value !== undefined && value !== '');

  return {
    name: upstream.name,
    prefix: upstream.prefix,
    multiplier: multipliers[0] ?? 1,
    models,
  };
};

const fetchPricing = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${BASE_URL}/models/public`);
    if (!response.ok) throw new Error('获取渠道价格失败');
    const data = await response.json();
    channels.value = (data.upstreams || []).map(normalizeChannel);
  } catch (err) {
    error.value = err.message || '网络错误，请稍后重试';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPricing();
});
</script>

<style scoped>
.channel-pricing {
  margin: 20px 0;
  --rc-accent: var(--theme-color, #e06b31);
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  gap: 12px;
}

.loading-state {
  color: #666;
}

.error-state {
  color: #e74c3c;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f0f0f0;
  border-top-color: var(--rc-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 4px;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  background: var(--rc-accent);
  color: #fff;
  cursor: pointer;
}

.payg-rate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.rate-label {
  font-size: 14px;
  color: #666;
}

.rate-value {
  font-size: 16px;
  font-weight: 600;
  color: #3498db;
}

.formula-hint {
  margin: 0 0 20px;
  color: #475569;
  font-size: 14px;
  line-height: 1.7;
}

.channel-card {
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.channel-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.6);
}

.channel-title h3 {
  margin: 0 0 4px;
  font-size: 17px;
}

.channel-url {
  font-size: 13px;
  color: var(--rc-accent);
}

.channel-rate {
  text-align: right;
}

.rate-kicker {
  display: block;
  font-size: 12px;
  color: #888;
}

.channel-rate strong {
  font-size: 16px;
  color: #b45309;
}

.model-table-wrap {
  overflow-x: auto;
}

.model-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.model-table th,
.model-table td {
  padding: 10px 14px;
  text-align: left;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  vertical-align: top;
}

.model-table th {
  font-size: 12px;
  color: #888;
  font-weight: 600;
}

.model-name {
  font-weight: 600;
  color: #333;
}

.actual {
  font-weight: 700;
  color: var(--rc-accent);
}
</style>

<style>
[data-theme="dark"] .payg-rate,
[data-theme="dark"] .channel-card {
  background: rgba(42, 42, 42, 0.86);
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .channel-header {
  background: rgba(255, 255, 255, 0.03);
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .channel-title h3,
[data-theme="dark"] .model-name,
[data-theme="dark"] .model-table td {
  color: #e8e8e8;
}

[data-theme="dark"] .formula-hint,
[data-theme="dark"] .rate-label,
[data-theme="dark"] .rate-kicker,
[data-theme="dark"] .model-table th {
  color: #aaa;
}

[data-theme="dark"] .model-table th,
[data-theme="dark"] .model-table td {
  border-top-color: rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .loading-state {
  color: #aaa;
}
</style>
