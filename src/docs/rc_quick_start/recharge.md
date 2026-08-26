---
title: 充值
icon: fluent-mdl2:money
order: 2
footer: false
---

## 如何进行充值？

在 Right Code 里，充值后通过余额按量付费。调用模型时，系统会根据模型价格从余额里扣费。

1. 进入后台页面，点击左侧面板的 `获取订阅` 一栏

2. 如图所示，最上方为额度充值，选择需要充值的金额并完成支付

3. 充值成功后，即可通过已配置的 ApiKey 按量调用可用模型

![](/assets/image/rc_quick_start/rc-1.webp)

## 额度定价

<div class="pricing-notice">
  <iconify-icon icon="mdi:information-outline" width="20" height="20"></iconify-icon>
  <span>本站各模型 input_tokens、output_tokens、cached_tokens 等价格均和官网同步。下表直接读取 https://rightapi.ai 的公开价格，按渠道倍率算出实付价。</span>
</div>

<ClientOnly>
  <ChannelPricing />
</ClientOnly>

## 并发规则

<div class="rollover-info">
  <div class="rollover-header">
    <iconify-icon icon="mdi:source-branch" width="24" height="24"></iconify-icon>
    <span>并发说明</span>
    <span class="rollover-tag">重点规则</span>
  </div>
  <p class="rollover-summary">
    按这 2 条规则理解即可：
  </p>
  <div class="rollover-content">
    <div class="rollover-example concurrency-rules">
      <div class="example-step">
        <span class="step-day">规则 1</span>
        <span class="step-desc">余额按量付费并发统一是 <strong>50</strong>（不分模型）。</span>
      </div>
      <div class="example-step">
        <span class="step-day">规则 2</span>
        <span class="step-desc">如果 Key 不允许使用余额，或者余额不足，会提示 <strong>429</strong>。</span>
      </div>
    </div>
  </div>
</div>

<script setup>
import ChannelPricing from '@source/.vuepress/components/ChannelPricing.vue';
</script>

<style>
.pricing-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  background: linear-gradient(135deg, #e8f4fd 0%, #d6eaf8 100%);
  border-radius: 8px;
  border-left: 4px solid #3498db;
  color: #2980b9;
  font-size: 14px;
}

.rollover-info {
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.rollover-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.rollover-tag {
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fff7ec 0%, #ffe2c4 100%);
  color: #b85b19;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(224, 107, 49, 0.28);
}

.rollover-summary {
  margin: 0;
  padding: 14px 20px 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
}

.rollover-content {
  padding: 20px;
}

.concurrency-rules {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.example-step {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.step-day {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.step-desc {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

[data-theme="dark"] .pricing-notice {
  background: linear-gradient(135deg, #1a3a4a 0%, #152d3a 100%);
  border-left-color: #3498db;
  color: #7ec8e3;
}

[data-theme="dark"] .rollover-info {
  background: rgba(45, 45, 45, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .rollover-header {
  background: rgba(255, 255, 255, 0.05);
  border-bottom-color: rgba(255, 255, 255, 0.08);
  color: #e8e8e8;
}

[data-theme="dark"] .rollover-tag {
  background: rgba(224, 107, 49, 0.18);
  border-color: rgba(224, 107, 49, 0.35);
  color: #ffbd8a;
}

[data-theme="dark"] .rollover-summary {
  color: #c2c8d0;
}

[data-theme="dark"] .example-step {
  background: rgba(50, 50, 50, 0.8);
  border-color: rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .step-desc {
  color: #e8e8e8;
}
</style>
