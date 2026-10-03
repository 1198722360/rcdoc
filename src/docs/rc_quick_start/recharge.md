---
title: 充值
icon: fluent-mdl2:money
order: 2
footer: false
---

## 如何进行充值？

在 Right Code 里，充值后通过余额按量付费。调用模型时，系统会根据模型价格从余额里扣费。

1. 进入后台页面，点击左侧面板的 `在线充值` 一栏

2. 如图所示，输入充值额度，或选择合适的充值金额，进行充值

3. 充值成功后，即可通过已配置的 ApiKey 按量调用可用模型

![](/assets/image/rc_quick_start/rc-1.webp)

## 额度定价

<div class="pricing-notice">
  <iconify-icon icon="mdi:information-outline" width="20" height="20"></iconify-icon>
  <span>本站各模型 input_tokens、output_tokens、cached_tokens 等价格均和官网同步</span>
</div>

<div class="pricing-section">
  <h3 class="pricing-title">
    <iconify-icon icon="mdi:scale-balance" width="24" height="24"></iconify-icon>
    按量付费
    <span class="pricing-subtitle">Codex + Claude Code</span>
  </h3>
  <div class="payg-container">
    <div class="payg-rate">
      <span class="rate-label">充值比例</span>
      <span class="rate-value">1 元 = 站内 1$</span>
    </div>
    <div class="payg-cards">
      <div class="payg-card codex">
        <div class="payg-icon">
          <iconify-icon icon="hugeicons:chat-gpt" width="40" height="40"></iconify-icon>
        </div>
        <div class="payg-info">
          <span class="payg-name">Codex</span>
          <span class="payg-price">0.4 元/美金</span>
        </div>
      </div>
      <div class="payg-card claude">
        <div class="payg-icon">
          <iconify-icon icon="logos:claude-icon" width="36" height="36"></iconify-icon>
        </div>
        <div class="payg-info">
          <span class="payg-name">Claude Max 号池</span>
          <span class="payg-price">2 元/美金</span>
        </div>
      </div>
    </div>
  </div>
</div>

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
        <span class="step-desc">余额按量付费不限制并发。</span>
      </div>
      <div class="example-step">
        <span class="step-day">规则 2</span>
        <span class="step-desc">如果 Key 不允许使用余额，或者余额不足，会提示 <strong>429</strong>，或直接提示余额不足。</span>
      </div>
    </div>
  </div>
</div>

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

.pricing-section {
  margin: 24px 0;
}

.pricing-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.pricing-subtitle {
  font-size: 13px;
  font-weight: 600;
  color: #b45309;
  margin-left: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fff4e5 0%, #ffe1bd 100%);
  border: 1px solid rgba(180, 83, 9, 0.2);
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

.rollover-example {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
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

.payg-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #eef1f5 100%);
  border-radius: 12px;
  padding: 20px;
}

.payg-rate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 16px;
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

.payg-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.payg-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.payg-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.payg-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}

.payg-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.payg-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.payg-price {
  font-size: 18px;
  font-weight: 700;
  color: #3498db;
}

[data-theme="dark"] .pricing-notice {
  background: linear-gradient(135deg, #1a3a4a 0%, #152d3a 100%);
  border-left-color: #3498db;
  color: #7ec8e3;
}

[data-theme="dark"] .pricing-title {
  color: #e8e8e8;
}

[data-theme="dark"] .pricing-subtitle {
  color: #ffc68a;
  background: rgba(180, 83, 9, 0.24);
  border-color: rgba(255, 198, 138, 0.24);
}

[data-theme="dark"] .rollover-info {
  background: rgba(45, 45, 45, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .step-day {
  color: #888;
}

[data-theme="dark"] .step-desc {
  color: #e8e8e8;
}

[data-theme="dark"] .payg-container {
  background: linear-gradient(135deg, #252525 0%, #1a1a1a 100%);
}

[data-theme="dark"] .payg-rate {
  background: #2a2a2a;
}

[data-theme="dark"] .rate-label {
  color: #aaa;
}

[data-theme="dark"] .payg-card {
  background: #2a2a2a;
}

[data-theme="dark"] .payg-name {
  color: #e8e8e8;
}
</style>
