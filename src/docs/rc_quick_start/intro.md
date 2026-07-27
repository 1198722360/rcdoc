---
title: Right Code简介
icon: fluent-mdl2:web-environment
order: 1
footer: false
---

## 简介

<div class="intro-section">
  <div class="intro-card">
    <div class="intro-icon">
      <img src="/logo.webp" alt="Right Code" width="100" height="100" />
    </div>
    <div class="intro-content">
      <p><strong>Right Code</strong> 是一家兼具<span class="intro-highlight">极致稳定性</span>以及<span class="intro-highlight">极致性价比</span>的 Codex、Claude Code 大模型 API 分发平台。</p>
      <p>此前我们是做 ChatGPT 的 Web 端镜像的，运营两年，克服了降智、封号等一系列棘手的问题，积累了无数逆向相关的经验以及技术，并有一套稳定的 ChatGPT、Claude 网关。</p>
      <div class="intro-badge">
        <iconify-icon icon="mdi:shield-check" width="16" height="16"></iconify-icon>
        <span>Codex 和 CC 都走网关，非常稳定！</span>
      </div>
    </div>
  </div>
</div>

## 独家优势

<div class="advantage-grid">
  <div class="advantage-card">
    <div class="advantage-icon gateway">
      <iconify-icon icon="mdi:server-network" width="28" height="28"></iconify-icon>
    </div>
    <div class="advantage-content">
      <h4>独家网关</h4>
      <p>流量经网关发向官网，深度隐藏逆向痕迹，CC 可用率达 <strong>99.5%</strong></p>
    </div>
  </div>
  <div class="advantage-card">
    <div class="advantage-icon pool">
      <iconify-icon icon="mdi:account-group" width="28" height="28"></iconify-icon>
    </div>
    <div class="advantage-content">
      <h4>自营号池</h4>
      <p>自营 Team、Max 号池，<strong>绝不掺假</strong></p>
    </div>
  </div>
  <div class="advantage-card">
    <div class="advantage-icon billing">
      <iconify-icon icon="mdi:receipt-text-check" width="28" height="28"></iconify-icon>
    </div>
    <div class="advantage-content">
      <h4>透明计费</h4>
      <p>任何一次请求都有记录，tokens、扣费情况<strong>均可追溯</strong></p>
    </div>
  </div>
  <div class="advantage-card">
    <div class="advantage-icon cache">
      <iconify-icon icon="mdi:cached" width="28" height="28"></iconify-icon>
    </div>
    <div class="advantage-content">
      <h4>缓存优化</h4>
      <p>优化官网缓存，额外降低 <strong>80%</strong> 的使用成本</p>
    </div>
  </div>
  <div class="advantage-card">
    <div class="advantage-icon speed">
      <iconify-icon icon="mdi:lightning-bolt" width="28" height="28"></iconify-icon>
    </div>
    <div class="advantage-content">
      <h4>高速直连</h4>
      <p>使用优质 CNAME 加速，<strong>全球可高速直连</strong></p>
    </div>
  </div>
  <div class="advantage-card">
    <div class="advantage-icon service">
      <iconify-icon icon="mdi:medal" width="28" height="28"></iconify-icon>
    </div>
    <div class="advantage-content">
      <h4>金牌服务</h4>
      <p>专业技术支持，<strong>快速响应</strong>，全程贴心服务</p>
    </div>
  </div>
</div>

## QQ群

<div class="qq-group-grid">
  <div class="qq-group-card is-open">
    <div class="qq-group-icon-wrap">
      <iconify-icon icon="fa:group" width="22" height="22"></iconify-icon>
    </div>
    <div class="qq-group-content">
      <div class="qq-group-header">
        <span class="qq-group-name">七群</span>
        <span class="qq-group-status is-open">未满</span>
      </div>
      <div class="qq-group-number">849306691</div>
    </div>
    <button class="qq-group-copy" @click="copyText('849306691', $event)">
      <iconify-icon icon="solar:copy-linear" width="16" height="16"></iconify-icon>
    </button>
  </div>
</div>

## 联系我们

<div class="contact-list">
  <div class="contact-card qq">
    <div class="contact-icon">
      <iconify-icon icon="entypo-social:qq" width="32" height="32"></iconify-icon>
    </div>
    <div class="contact-info">
      <span class="contact-label">小客服QQ （优先找我）</span>
      <span class="contact-value">2328090254</span>
    </div>
    <button class="copy-btn" @click="copyText('2328090254', $event)">
      <iconify-icon icon="solar:copy-linear" width="18" height="18"></iconify-icon>
    </button>
  </div>
  <div class="contact-card qq">
    <div class="contact-icon">
      <iconify-icon icon="entypo-social:qq" width="32" height="32"></iconify-icon>
    </div>
    <div class="contact-info">
      <span class="contact-label">站长QQ </span>
      <span class="contact-value">1198722360</span>
    </div>
    <button class="copy-btn" @click="copyText('1198722360', $event)">
      <iconify-icon icon="solar:copy-linear" width="18" height="18"></iconify-icon>
    </button>
  </div>
  <div class="contact-card wechat">
    <div class="contact-icon">
      <iconify-icon icon="ion:logo-wechat" width="32" height="32"></iconify-icon>
    </div>
    <div class="contact-info">
      <span class="contact-label">站长微信</span>
      <span class="contact-value">diagpt</span>
    </div>
    <button class="copy-btn" @click="copyText('RightCode_Service', $event)">
      <iconify-icon icon="solar:copy-linear" width="18" height="18"></iconify-icon>
    </button>
  </div>
</div>

<script setup>
const copyText = async (text, event) => {
  try {
    await navigator.clipboard.writeText(text);
    const btn = event.currentTarget;
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1500);
  } catch (err) {
    console.error('复制失败:', err);
  }
};
</script>

<style>
/* 简介部分样式 */
.intro-section {
  margin: 16px 0;
}

.intro-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.intro-content {
  flex: 1;
}

.intro-content p {
  margin: 0 0 12px 0;
  font-size: 15px;
  line-height: 1.7;
  color: #4a5568;
}

.intro-highlight {
  color: #3498db;
  font-weight: 600;
}

.intro-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border-radius: 20px;
  color: #155724;
  font-size: 13px;
  font-weight: 500;
}

/* 独家优势样式 */
.advantage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 16px 0;
}

.advantage-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 12px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.advantage-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  flex-shrink: 0;
  /* 苹果风格磨砂玻璃效果 */
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.advantage-icon.gateway,
.advantage-icon.pool,
.advantage-icon.billing,
.advantage-icon.cache,
.advantage-icon.speed,
.advantage-icon.service {
  color: #555;
}

.advantage-content h4 {
  margin: 0 0 6px 0;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.advantage-content p {
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

/* QQ群卡片 */
.qq-group-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin: 20px 0;
}

.qq-group-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fff7e6 0%, #ffe9c4 100%);
  border: 1px solid #f5d490;
  box-shadow: 0 2px 8px rgba(245, 166, 35, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.qq-group-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #f5a623 0%, #ff8c42 100%);
}

.qq-group-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 166, 35, 0.18);
}

.qq-group-card.is-open {
  background: linear-gradient(135deg, #e8f7ec 0%, #d1eed8 100%);
  border-color: #a8d8b3;
  box-shadow: 0 2px 8px rgba(7, 193, 96, 0.08);
}

.qq-group-card.is-open::before {
  background: linear-gradient(180deg, #07c160 0%, #4caf50 100%);
}

.qq-group-card.is-open:hover {
  box-shadow: 0 6px 20px rgba(7, 193, 96, 0.18);
}

.qq-group-card.is-open .qq-group-icon-wrap {
  color: #07c160;
  box-shadow: 0 2px 6px rgba(7, 193, 96, 0.15);
}

.qq-group-card.is-open .qq-group-name {
  color: #1b6e3a;
}

.qq-group-card.is-open .qq-group-copy {
  color: #1b6e3a;
}

.qq-group-card.is-open .qq-group-copy:hover {
  color: #07c160;
}

.qq-group-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #f5a623;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(245, 166, 35, 0.15);
}

.qq-group-content {
  flex: 1;
  min-width: 0;
}

.qq-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.qq-group-name {
  font-size: 13px;
  color: #8b6914;
  font-weight: 600;
}

.qq-group-status {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.qq-group-status.is-open {
  background: linear-gradient(135deg, #07c160 0%, #4caf50 100%);
  box-shadow: 0 2px 6px rgba(7, 193, 96, 0.25);
}

.qq-group-number {
  font-size: 15px;
  color: #333;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-variant-numeric: tabular-nums;
}

.qq-group-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  color: #8b6914;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.qq-group-copy:hover {
  background: #fff;
  color: #f5a623;
}

.qq-group-copy.copied {
  background: #07c160;
  color: #fff;
}

.contact-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf0 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.contact-card.qq .contact-icon {
  color: #12b7f5;
}

.contact-card.group .contact-icon {
  color: #f5a623;
}

.contact-card.wechat .contact-icon {
  color: #07c160;
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.contact-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.contact-value {
  font-size: 15px;
  color: #333;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.05);
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.copy-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.copy-btn.copied {
  background: #07c160;
  color: #fff;
}

.copy-btn.copied::after {
  content: '已复制';
  position: absolute;
  right: 50px;
  font-size: 12px;
  color: #07c160;
  white-space: nowrap;
}

/* vuepress-theme-hope 暗色模式适配 */
/* 简介部分暗色模式 */
[data-theme="dark"] .intro-card {
  background: linear-gradient(135deg, #2a2a2a 0%, #222 100%);
  border-color: #3a3a3a;
}

[data-theme="dark"] .intro-content p {
  color: #b0b0b0;
}

[data-theme="dark"] .intro-highlight {
  color: #64b5f6;
}

[data-theme="dark"] .intro-badge {
  background: linear-gradient(135deg, #1b3d1f 0%, #163318 100%);
  color: #81c784;
}

/* 独家优势暗色模式 */
[data-theme="dark"] .advantage-card {
  background: linear-gradient(135deg, #2a2a2a 0%, #222 100%);
  border-color: #3a3a3a;
}

[data-theme="dark"] .advantage-content h4 {
  color: #e8e8e8;
}

[data-theme="dark"] .advantage-content p {
  color: #a0a0a0;
}

/* 独家优势图标暗色模式 - 磨砂玻璃效果 */
[data-theme="dark"] .advantage-icon {
  background: rgba(80, 80, 80, 0.5);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  color: #ccc;
}

/* QQ群卡片暗色模式 */
[data-theme="dark"] .qq-group-card {
  background: linear-gradient(135deg, #3a2a15 0%, #2d2010 100%);
  border-color: #5a4520;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .qq-group-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .qq-group-icon-wrap {
  background: #3a3a3a;
  color: #f5b94a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] .qq-group-name {
  color: #e8c878;
}

[data-theme="dark"] .qq-group-number {
  color: #e8e8e8;
}

[data-theme="dark"] .qq-group-copy {
  background: rgba(255, 255, 255, 0.08);
  color: #e8c878;
}

[data-theme="dark"] .qq-group-copy:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #f5b94a;
}

[data-theme="dark"] .qq-group-copy.copied {
  background: #07c160;
  color: #fff;
}

[data-theme="dark"] .qq-group-card.is-open {
  background: linear-gradient(135deg, #1b3d27 0%, #14301d 100%);
  border-color: #2e5a3d;
}

[data-theme="dark"] .qq-group-card.is-open .qq-group-icon-wrap {
  background: #2a3a30;
  color: #4cd980;
}

[data-theme="dark"] .qq-group-card.is-open .qq-group-name {
  color: #8ddba2;
}

[data-theme="dark"] .qq-group-card.is-open .qq-group-copy {
  color: #8ddba2;
}

[data-theme="dark"] .qq-group-card.is-open .qq-group-copy:hover {
  color: #4cd980;
}

/* 联系我们暗色模式 */
[data-theme="dark"] .contact-card {
  background: linear-gradient(135deg, #2d2d2d 0%, #232323 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .contact-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .contact-icon {
  background: #3a3a3a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] .contact-label {
  color: #a0a0a0;
}

[data-theme="dark"] .contact-value {
  color: #e8e8e8;
}

[data-theme="dark"] .copy-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #a0a0a0;
}

[data-theme="dark"] .copy-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #e8e8e8;
}

[data-theme="dark"] .copy-btn.copied {
  background: #07c160;
  color: #fff;
}
</style>
