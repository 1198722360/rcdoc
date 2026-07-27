<template>
  <div class="models-plaza">
    <transition name="copy-toast-fade">
      <div v-if="toastVisible" class="copy-toast" :class="toastType">
        <iconify-icon :icon="toastType === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" width="18" height="18"></iconify-icon>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>

    <div class="loading-state" v-if="loading">
      <div class="loading-spinner"></div>
      <span>加载模型列表中...</span>
    </div>

    <div class="error-state" v-else-if="error">
      <iconify-icon icon="mdi:alert-circle" width="24" height="24"></iconify-icon>
      <span>{{ error }}</span>
      <button class="retry-btn" @click="fetchModels">重试</button>
    </div>

    <div class="models-content" v-else>
      <div class="upstream-group" v-for="upstream in upstreams" :key="upstream.prefix">
        <div class="group-header">
          <div class="group-info">
            <h3 class="group-name">{{ upstream.name }}</h3>
            <div class="group-remark" v-if="upstream.remark">
              <iconify-icon icon="mdi:information-outline" width="14" height="14"></iconify-icon>
              <span>{{ upstream.remark }}</span>
            </div>
          </div>
          <div class="group-actions">
            <div class="base-url" @click="copyBaseUrl(upstream.prefix, $event)">
              <iconify-icon icon="mdi:link-variant" width="16" height="16"></iconify-icon>
              <span class="url-text">{{ 'https://rightapi.ai' + upstream.prefix }}</span>
              <iconify-icon icon="solar:copy-linear" width="14" height="14" class="copy-icon"></iconify-icon>
            </div>
          </div>
        </div>

        <div class="models-grid">
          <div
            class="model-card"
            v-for="model in upstream.models"
            :key="model.name"
            :class="{ unavailable: !model.is_available }"
          >
            <!-- 右上角斜幅 -->
            <div class="model-ribbon" :class="model.is_available ? 'available' : 'unavailable'">
              <span>{{ model.is_available ? '可用' : '不可用' }}</span>
            </div>
            <div class="model-header">
              <span class="model-name">{{ model.name }}</span>
            </div>
            <div class="model-pricing">
              <div class="price-item request" v-if="model.billing_mode === 'request'">
                <span class="price-label">按次计费</span>
                <span class="price-value">${{ model.request_price }}/次</span>
              </div>
              <div class="price-item input" v-if="model.billing_mode !== 'request'">
                <span class="price-label">输入</span>
                <span class="price-value">${{ model.input_price }}/M</span>
              </div>
              <div class="price-item output" v-if="model.billing_mode !== 'request'">
                <span class="price-label">输出</span>
                <span class="price-value">${{ model.output_price }}/M</span>
              </div>
            </div>
            <div class="model-footer">
              <span class="model-badge" :class="model.billing_mode">
                <iconify-icon :icon="model.billing_mode === 'request' ? 'mdi:cursor-default-click' : 'mdi:counter'" width="14" height="14"></iconify-icon>
                {{ model.billing_mode === 'request' ? '按次计费' : '按量计费' }}
              </span>
              <button class="copy-model-btn" @click="copyModelName(model.name, $event)" title="复制模型名称">
                <iconify-icon icon="solar:copy-linear" width="16" height="16"></iconify-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const loading = ref(true);
const error = ref(null);
const upstreams = ref([]);
const toastVisible = ref(false);
const toastMessage = ref('');
const toastType = ref('success');
let toastTimer = null;

// 开发环境使用代理，生产环境使用完整 URL
const BASE_URL = import.meta.env.DEV ? '/rc-api' : 'https://rightapi.ai';

const fetchModels = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${BASE_URL}/models/public`);
    if (!response.ok) throw new Error('获取模型列表失败');
    const data = await response.json();
    upstreams.value = data.upstreams || [];
  } catch (err) {
    error.value = err.message || '网络错误，请稍后重试';
  } finally {
    loading.value = false;
  }
};

const showCopyToast = (message, type = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  toastVisible.value = true;

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastVisible.value = false;
  }, 1600);
};

const copyBaseUrl = async (prefix, event) => {
  const url = 'https://rightapi.ai' + prefix;
  const triggerEl = event.currentTarget;
  try {
    await navigator.clipboard.writeText(url);
    showCopyToast('BaseUrl 已复制');
    if (triggerEl) {
      triggerEl.classList.add('copied');
      setTimeout(() => triggerEl.classList.remove('copied'), 1500);
    }
  } catch (err) {
    showCopyToast('复制失败，请手动复制', 'error');
    console.error('复制失败:', err);
  }
};

const copyModelName = async (name, event) => {
  const triggerEl = event.currentTarget;
  try {
    await navigator.clipboard.writeText(name);
    showCopyToast('模型名称已复制');
    if (triggerEl) {
      triggerEl.classList.add('copied');
      setTimeout(() => triggerEl.classList.remove('copied'), 1500);
    }
  } catch (err) {
    showCopyToast('复制失败，请手动复制', 'error');
    console.error('复制失败:', err);
  }
};

onMounted(() => {
  fetchModels();
});

onUnmounted(() => {
  if (toastTimer) clearTimeout(toastTimer);
});
</script>

<style scoped>
/* 模型广场容器 */
.models-plaza {
  margin: 20px 0;
  --rc-accent: var(--theme-color, #e06b31);
  --rc-accent-hover: var(--rc-brand-light, #f07a3f);
  --rc-accent-soft-bg: rgba(224, 107, 49, 0.08);
  --rc-accent-soft-bg-hover: rgba(224, 107, 49, 0.15);
  --rc-accent-border-soft: rgba(224, 107, 49, 0.18);
  --rc-accent-border: rgba(224, 107, 49, 0.25);
  --rc-accent-gradient: linear-gradient(135deg, rgba(224, 107, 49, 0.08) 0%, rgba(240, 122, 63, 0.05) 100%);
}

.copy-toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.copy-toast.success {
  background: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
  color: #fff;
}

.copy-toast.error {
  background: linear-gradient(135deg, #ef5350 0%, #e53935 100%);
  color: #fff;
}

.copy-toast-fade-enter-active,
.copy-toast-fade-leave-active {
  transition: all 0.2s ease;
}

.copy-toast-fade-enter-from,
.copy-toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: var(--rc-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误状态 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 12px;
  color: #e74c3c;
}

.retry-btn {
  margin-top: 8px;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  background: var(--rc-accent);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background: var(--rc-accent-hover);
}

/* 分组样式 */
.upstream-group {
  margin-bottom: 28px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.group-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.group-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.group-remark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #5a6d82;
  background: var(--rc-accent-gradient);
  padding: 6px 12px;
  border-radius: 6px;
  border-left: 3px solid var(--rc-accent);
  line-height: 1.4;
}

.base-url {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--rc-accent-soft-bg);
  border-radius: 8px;
  font-size: 13px;
  color: var(--rc-accent);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--rc-accent-border-soft);
}

.base-url:hover {
  background: var(--rc-accent-soft-bg-hover);
}

.base-url.copied {
  background: #07c160;
  color: #fff;
  border-color: #07c160;
}

.url-text {
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-icon {
  opacity: 0.7;
}

/* 模型网格 */
.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  padding: 16px;
}

/* 模型卡片 */
.model-card {
  position: relative;
  padding: 18px;
  padding-top: 22px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;
  overflow: hidden;
}

.model-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border-color: rgba(224, 107, 49, 0.25);
}

.model-card.unavailable {
  opacity: 0.6;
}

/* 右上角斜幅 */
.model-ribbon {
  position: absolute;
  top: 10px;
  right: -26px;
  width: 95px;
  padding: 4px 0;
  text-align: center;
  transform: rotate(45deg);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.model-ribbon.available {
  background: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
  color: #fff;
}

.model-ribbon.unavailable {
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  color: #fff;
}

.model-header {
  margin-bottom: 14px;
  padding-right: 35px;
}

.model-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  word-break: break-all;
  line-height: 1.5;
}

.model-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}

.copy-model-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: var(--rc-accent-soft-bg);
  color: var(--rc-accent);
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-model-btn:hover {
  background: var(--rc-accent-soft-bg-hover);
  transform: scale(1.05);
}

.copy-model-btn.copied {
  background: #07c160;
  color: #fff;
}

/* 价格信息 */
.model-pricing {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.price-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.price-label {
  font-size: 13px;
  color: #666;
}

.price-value {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.price-item.input .price-value {
  color: var(--rc-accent);
}

.price-item.output .price-value {
  color: #9b59b6;
}

.price-item.request .price-value {
  color: var(--rc-accent);
}

/* 计费模式标签 */
.model-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.model-badge.token {
  background: rgba(224, 107, 49, 0.12);
  color: var(--rc-accent);
}

.model-badge.request {
  background: rgba(224, 107, 49, 0.12);
  color: var(--rc-accent);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .group-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .base-url {
    width: 100%;
    justify-content: center;
  }

  .url-text {
    max-width: 200px;
  }

  .models-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
    padding: 12px;
  }

  .model-card {
    padding: 12px;
  }

  .model-name {
    font-size: 12px;
  }
}
</style>

<style>
/* 暗色模式适配 - 需要非 scoped 样式 */
[data-theme="dark"] .upstream-group {
  background: rgba(45, 45, 45, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .group-header {
  background: rgba(255, 255, 255, 0.03);
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .group-name {
  color: #e8e8e8;
}

[data-theme="dark"] .group-remark {
  color: #a8c5da;
  background: linear-gradient(135deg, rgba(224, 107, 49, 0.16) 0%, rgba(240, 122, 63, 0.1) 100%);
  border-left-color: var(--rc-accent);
}

[data-theme="dark"] .base-url {
  background: rgba(224, 107, 49, 0.16);
  border-color: rgba(224, 107, 49, 0.28);
  color: var(--rc-accent);
}

[data-theme="dark"] .base-url:hover {
  background: rgba(224, 107, 49, 0.26);
}

[data-theme="dark"] .model-card {
  background: rgba(50, 50, 50, 0.8);
  border-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] .model-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  border-color: rgba(224, 107, 49, 0.35);
}

[data-theme="dark"] .model-name {
  color: #e8e8e8;
}

[data-theme="dark"] .model-footer {
  border-top-color: rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .copy-model-btn {
  background: rgba(224, 107, 49, 0.16);
  color: var(--rc-accent);
}

[data-theme="dark"] .copy-model-btn:hover {
  background: rgba(224, 107, 49, 0.26);
}

[data-theme="dark"] .price-item {
  background: rgba(255, 255, 255, 0.04);
}

[data-theme="dark"] .price-label {
  color: #999;
}

[data-theme="dark"] .price-value {
  color: #e8e8e8;
}

[data-theme="dark"] .price-item.input .price-value {
  color: var(--rc-accent);
}

[data-theme="dark"] .price-item.output .price-value {
  color: #ba68c8;
}

[data-theme="dark"] .price-item.request .price-value {
  color: #ffb74d;
}

[data-theme="dark"] .model-badge.token {
  background: rgba(224, 107, 49, 0.22);
  color: var(--rc-accent);
}

[data-theme="dark"] .model-badge.request {
  background: rgba(224, 107, 49, 0.22);
  color: var(--rc-accent);
}

[data-theme="dark"] .loading-state {
  color: #aaa;
}

[data-theme="dark"] .loading-spinner {
  border-color: #3a3a3a;
  border-top-color: var(--rc-accent);
}

[data-theme="dark"] .error-state {
  color: #ef5350;
}

[data-theme="dark"] .retry-btn {
  background: var(--rc-accent);
}

[data-theme="dark"] .retry-btn:hover {
  background: var(--rc-accent-hover);
}
</style>
