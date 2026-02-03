---
title: Right Code文档站
icon: fa7-solid:home-lg
pageClass: custom-home
article: false
pageInfo: false
editLink: false
lastUpdated: false
contributors: false
comment: false
breadcrumb: false
copyright: false
footer: Copyright © 2026-present Right Code
---

<div class="home-page">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-bg">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    <div class="hero-content">
      <div class="logo-container">
        <img src="/1024.png" alt="Right Code" class="hero-logo" />
      </div>
      <h1 class="hero-title">
        <span class="gradient-text">Right Code</span>
      </h1>
      <p class="hero-tagline">企业级 AI Agent 中转平台</p>
      <p class="hero-description">涵盖 Claude Code、Codex、Gemini CLI、Grok Code 的统一接入与管理</p>
      <div class="hero-actions">
        <a href="/docs/rc_quick_start/intro.html" class="btn btn-primary">
          <span class="btn-icon">🚀</span> 快速开始
        </a>
        <a href="https://check.linux.do/group/RightCode" class="btn btn-secondary">
          <span class="btn-icon">📖</span> 服务监控
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">4+</span>
          <span class="stat-label">AI Agent 支持</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">99.9%</span>
          <span class="stat-label">服务可用性</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">1</span>
          <span class="stat-label">统一 API Key</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="features-section">
    <div class="section-header">
      <h2 class="section-title">为什么选择 Right Code？</h2>
      <p class="section-subtitle">一站式 AI Agent 中转解决方案，让您轻松接入最强大的 AI</p>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🤖</div>
        <h3 class="feature-title">Claude Code</h3>
        <p class="feature-description">支持 Anthropic Claude 全系列模型，包括 Claude 3.5 Sonnet、Claude Opus 4.5 等</p>
        <a href="/guide/claude-code.html" class="feature-link">了解更多 →</a>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💻</div>
        <h3 class="feature-title">OpenAI Codex</h3>
        <p class="feature-description">接入 OpenAI Codex CLI，强大的代码生成与理解能力</p>
        <a href="/guide/codex.html" class="feature-link">了解更多 →</a>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💎</div>
        <h3 class="feature-title">Gemini CLI</h3>
        <p class="feature-description">Google Gemini 系列模型支持，多模态 AI 能力</p>
        <a href="/guide/gemini.html" class="feature-link">了解更多 →</a>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3 class="feature-title">Grok Code</h3>
        <p class="feature-description">xAI Grok 模型接入，实时信息获取能力</p>
        <a href="/guide/grok.html" class="feature-link">了解更多 →</a>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔌</div>
        <h3 class="feature-title">统一 API</h3>
        <p class="feature-description">一个 API Key 访问所有 AI Agent，简化开发流程</p>
        <a href="/guide/api.html" class="feature-link">了解更多 →</a>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚖️</div>
        <h3 class="feature-title">负载均衡</h3>
        <p class="feature-description">智能负载均衡，自动故障转移，保障服务稳定性</p>
        <a href="/guide/load-balance.html" class="feature-link">了解更多 →</a>
      </div>
    </div>
  </section>

  <!-- Integration Section -->
  <section class="integration-section">
    <div class="section-header">
      <h2 class="section-title">灵活的接入方式</h2>
      <p class="section-subtitle">多种接入方式，满足不同场景需求</p>
    </div>
    <div class="integration-grid">
      <div class="integration-card">
        <div class="integration-icon">⌨️</div>
        <h3 class="integration-title">CLI 工具</h3>
        <p class="integration-description">命令行工具直接使用，开发者友好</p>
      </div>
      <div class="integration-card">
        <div class="integration-icon">📦</div>
        <h3 class="integration-title">SDK 支持</h3>
        <p class="integration-description">Python、Node.js、Go 等多语言 SDK</p>
      </div>
      <div class="integration-card">
        <div class="integration-icon">🧩</div>
        <h3 class="integration-title">IDE 插件</h3>
        <p class="integration-description">VS Code、JetBrains 等主流 IDE 插件支持</p>
      </div>
    </div>
  </section>

</div>

<style scoped>
/* Base Styles */
.home-page {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  --text-color: #1f2937;
  --text-muted: #6b7280;
  --bg-color: #ffffff;
  --card-bg: #f9fafb;
  --border-color: #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-color);
  overflow-x: hidden;
}

.dark .home-page,
html[data-theme="dark"] .home-page {
  --text-color: #f3f4f6;
  --text-muted: #9ca3af;
  --bg-color: #111827;
  --card-bg: #1f2937;
  --border-color: #374151;
}

/* Auto mode - follow system preference */
@media (prefers-color-scheme: dark) {
  html[data-theme="auto"] .home-page {
    --text-color: #f3f4f6;
    --text-muted: #9ca3af;
    --bg-color: #111827;
    --card-bg: #1f2937;
    --border-color: #374151;
  }
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  top: -200px;
  right: -100px;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  bottom: -100px;
  left: -100px;
  animation-delay: -5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -30px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(-30px, -20px) scale(1.02); }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
}

.logo-container {
  margin-bottom: 1.5rem;
}

.hero-logo {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(99, 102, 241, 0.3);
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.5rem;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-muted);
  margin: 0 0 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white !important;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
  color: white !important;
}

.btn-secondary {
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--border-color);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Section Styles */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem;
  color: var(--text-color);
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-muted);
  margin: 0;
}

/* Features Section */
.features-section {
  padding: 6rem 2rem;
  background: var(--bg-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.feature-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: var(--text-color);
}

.feature-description {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 1rem;
}

.feature-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.feature-link:hover {
  color: var(--primary-dark);
}

/* Integration Section */
.integration-section {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, var(--card-bg) 0%, var(--bg-color) 100%);
}

.integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.integration-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.integration-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.integration-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.integration-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--text-color);
}

.integration-description {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-tagline {
    font-size: 1.25rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
