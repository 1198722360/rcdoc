<template>
  <div :class="['api-tester', { dark: isDark }]">
    <!-- API Key 输入区域 -->
    <div class="api-key-section glass-panel">
      <label class="api-key-label">
        <iconify-icon icon="mdi:key-variant" width="18" height="18"></iconify-icon>
        API Key
      </label>
      <div class="api-key-input-wrapper">
        <input
          v-model="apiKey"
          :type="showApiKey ? 'text' : 'password'"
          class="api-key-input"
          placeholder="请输入您的 API Key"
        />
        <button class="toggle-visibility" @click="showApiKey = !showApiKey">
          <iconify-icon v-if="showApiKey" icon="mdi:eye-off" width="18" height="18"></iconify-icon>
          <iconify-icon v-else icon="mdi:eye" width="18" height="18"></iconify-icon>
        </button>
      </div>
    </div>

    <!-- API 选择标签页 -->
    <div class="api-tabs">
      <button
        v-for="api in apis"
        :key="api.id"
        :class="['tab-btn', { active: activeApi === api.id }]"
        @click="activeApi = api.id"
      >
        <iconify-icon v-if="api.id === 'codex'" icon="simple-icons:openai" width="18" height="18"></iconify-icon>
        <iconify-icon v-else-if="api.id === 'claude'" icon="simple-icons:anthropic" width="18" height="18"></iconify-icon>
        <iconify-icon v-else-if="api.id === 'gemini'" icon="simple-icons:googlegemini" width="18" height="18"></iconify-icon>
        {{ api.name }}
      </button>
    </div>

    <!-- 当前 API 配置面板 -->
    <div class="api-panel glass-panel">
      <div v-for="api in apis" :key="api.id" v-show="activeApi === api.id">
        <!-- 接口选择（如果有多个） -->
        <div v-if="api.endpoints.length > 1" class="endpoint-selector">
          <label>选择接口：</label>
          <select v-model="api.selectedEndpoint" class="endpoint-select">
            <option v-for="ep in api.endpoints" :key="ep.name" :value="ep.name">
              {{ ep.label }}
            </option>
          </select>
        </div>

        <!-- 模型选择 -->
        <div class="model-selector">
          <label>模型：</label>
          <select v-model="api.selectedModel" class="model-select">
            <option v-for="model in api.models" :key="model" :value="model">
              {{ model }}
            </option>
          </select>
        </div>

        <!-- 消息输入 -->
        <div class="message-input-section">
          <label>消息内容：</label>
          <textarea
            v-model="api.message"
            class="message-input"
            placeholder="请输入要发送的消息..."
            rows="3"
          ></textarea>
        </div>

        <!-- 测试按钮 -->
        <div class="action-buttons">
          <button
            class="test-btn"
            :disabled="!apiKey || loading"
            @click="testApi(api)"
          >
            <span v-if="loading" class="loading-spinner"></span>
            <iconify-icon v-else icon="mdi:rocket-launch" width="18" height="18"></iconify-icon>
            {{ loading ? '请求中...' : '发送测试请求' }}
          </button>
          <button class="copy-curl-btn" @click="copyCurl(api)">
            <iconify-icon icon="mdi:content-copy" width="18" height="18"></iconify-icon>
            复制 Curl 命令
          </button>
        </div>

        <!-- Curl 预览 -->
        <div class="curl-preview">
          <div class="curl-header">
            <span>Curl 命令预览</span>
            <button class="expand-btn" @click="api.showCurl = !api.showCurl">
              {{ api.showCurl ? '收起' : '展开' }}
            </button>
          </div>
          <pre v-show="api.showCurl" class="curl-code">{{ generateCurl(api) }}</pre>
        </div>
      </div>
    </div>

    <!-- 响应结果区域 -->
    <div v-if="response || error" class="response-section glass-panel">
      <div class="response-header">
        <span>
          <iconify-icon v-if="error" icon="mdi:close-circle" width="18" height="18" class="error-icon"></iconify-icon>
          <iconify-icon v-else icon="mdi:check-circle" width="18" height="18" class="success-icon"></iconify-icon>
          {{ error ? '错误' : '响应结果' }}
        </span>
        <button class="clear-btn" @click="clearResponse">清除</button>
      </div>
      <pre :class="['response-content', { error: error }]">{{ error || response }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const apiKey = ref('')
const showApiKey = ref(false)
const activeApi = ref('codex')
const loading = ref(false)
const response = ref('')
const error = ref('')
const isDark = ref(false)

// 检测主题模式
function detectTheme() {
  if (typeof window === 'undefined') return

  const scheme = localStorage.getItem('vuepress-theme-hope-scheme')

  if (scheme === 'dark') {
    isDark.value = true
  } else if (scheme === 'light') {
    isDark.value = false
  } else {
    // auto 模式，跟随系统
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

// 监听主题变化
let mediaQuery = null
let storageHandler = null
let observer = null

onMounted(() => {
  detectTheme()

  // 监听系统主题变化
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', detectTheme)

  // 监听 localStorage 变化
  storageHandler = (e) => {
    if (e.key === 'vuepress-theme-hope-scheme') {
      detectTheme()
    }
  }
  window.addEventListener('storage', storageHandler)

  // 监听 DOM 变化（主题切换时 html 标签会变化）
  observer = new MutationObserver(detectTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', detectTheme)
  }
  if (storageHandler) {
    window.removeEventListener('storage', storageHandler)
  }
  if (observer) {
    observer.disconnect()
  }
})

const apis = reactive([
  {
    id: 'codex',
    name: 'GPT-Codex',
    selectedEndpoint: 'responses',
    selectedModel: 'gpt-5.2',
    message: '你好',
    showCurl: false,
    endpoints: [
      { name: 'responses', label: 'responses 接口', path: '/codex/v1/responses' },
      { name: 'completions', label: 'completions 接口', path: '/codex/v1/chat/completions' }
    ],
    models: [
  "gpt-5",
  "gpt-5-codex",
  "gpt-5-codex-mini",
  "gpt-5.1",
  "gpt-5.1-codex",
  "gpt-5.1-codex-max",
  "gpt-5.1-codex-mini",
  "gpt-5.2",
  "gpt-5.2-codex",
  "gpt-5.2-codex-high",
  "gpt-5.2-codex-low",
  "gpt-5.2-codex-medium",
  "gpt-5.2-codex-xhigh",
  "gpt-5.2-high",
  "gpt-5.2-low",
  "gpt-5.2-medium",
  "gpt-5.2-xhigh"
]

  },
  {
    id: 'claude',
    name: 'Claude',
    selectedEndpoint: 'messages',
    selectedModel: 'claude-sonnet-4-5-20250929',
    message: '你好',
    showCurl: false,
    endpoints: [
      { name: 'messages', label: 'messages 接口', path: '/claude/v1/messages' }
    ],
    models: [
  "claude-opus-4-5",
  "claude-opus-4-5-20251101",
  "claude-sonnet-4-5",
  "claude-sonnet-4-5-20250929",
  "claude-sonnet-4-5-20250929-thinking"
]

  },
  {
    id: 'gemini',
    name: 'Gemini',
    selectedEndpoint: 'generate',
    selectedModel: 'gemini-3-pro-preview',
    message: '你好',
    showCurl: false,
    endpoints: [
      { name: 'generate', label: 'streamGenerateContent', path: '/gemini/v1beta/models' }
    ],
    models: [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.5-pro-thinking",
  "gemini-3-flash-preview",
  "gemini-3-flash-preview-thinking",
  "gemini-3-pro-preview"
]

  }
])

function generateCurl(api) {
  const key = apiKey.value || '{此处填写ApiKey}'

  if (api.id === 'codex') {
    const endpoint = api.endpoints.find(e => e.name === api.selectedEndpoint)
    if (api.selectedEndpoint === 'responses') {
      return `curl https://www.right.codes${endpoint.path} \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${key}' \\
  -d '{
    "model": "${api.selectedModel}",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "${api.message}"
          }
        ]
      }
    ],
    "stream": true
  }'`
    } else {
      return `curl https://www.right.codes${endpoint.path} \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer ${key}' \\
  -d '{
    "model": "${api.selectedModel}",
    "messages": [
      {
        "role": "user",
        "content": "${api.message}"
      }
    ],
    "stream": true
  }'`
    }
  } else if (api.id === 'claude') {
    return `curl https://www.right.codes/claude/v1/messages \\
  -H 'Content-Type: application/json' \\
  -H 'x-api-key: ${key}' \\
  -d '{
    "model": "${api.selectedModel}",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "${api.message}",
            "cache_control": { "type": "ephemeral" }
          }
        ]
      }
    ],
    "max_tokens": 32000,
    "stream": true
  }'`
  } else if (api.id === 'gemini') {
    return `curl --location 'https://right.codes/gemini/v1beta/models/${api.selectedModel}:streamGenerateContent?alt=sse' \\
--header 'connection: keep-alive' \\
--header 'x-goog-api-key: ${key}' \\
--header 'content-type: application/json' \\
--data '{
    "generationConfig": {
        "temperature": 1
    },
    "contents": [
        {
            "role": "user",
            "parts": [
                {
                    "text": "${api.message}"
                }
            ]
        }
    ]
}'`
  }
}

async function testApi(api) {
  if (!apiKey.value) {
    error.value = '请先输入 API Key'
    return
  }

  loading.value = true
  response.value = ''
  error.value = ''

  try {
    let url, headers, body

    if (api.id === 'codex') {
      const endpoint = api.endpoints.find(e => e.name === api.selectedEndpoint)
      url = `https://www.right.codes${endpoint.path}`
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      }
      if (api.selectedEndpoint === 'responses') {
        body = {
          model: api.selectedModel,
          input: [{
            type: 'message',
            role: 'user',
            content: [{ type: 'input_text', text: api.message }]
          }],
          stream: false
        }
      } else {
        body = {
          model: api.selectedModel,
          messages: [{ role: 'user', content: api.message }],
          stream: false
        }
      }
    } else if (api.id === 'claude') {
      url = 'https://www.right.codes/claude/v1/messages'
      headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey.value
      }
      body = {
        model: api.selectedModel,
        messages: [{
          role: 'user',
          content: [{ type: 'text', text: api.message }]
        }],
        max_tokens: 1024,
        stream: false
      }
    } else if (api.id === 'gemini') {
      url = `https://right.codes/gemini/v1beta/models/${api.selectedModel}:generateContent`
      headers = {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey.value
      }
      body = {
        generationConfig: { temperature: 1 },
        contents: [{
          role: 'user',
          parts: [{ text: api.message }]
        }]
      }
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    const data = await res.json()
    response.value = JSON.stringify(data, null, 2)
  } catch (err) {
    error.value = `请求失败: ${err.message}`
  } finally {
    loading.value = false
  }
}

async function copyCurl(api) {
  const curl = generateCurl(api)
  try {
    await navigator.clipboard.writeText(curl)
    alert('Curl 命令已复制到剪贴板')
  } catch {
    alert('复制失败，请手动复制')
  }
}

function clearResponse() {
  response.value = ''
  error.value = ''
}
</script>

<style scoped>
/* 基础变量 - 亮色模式 */
.api-tester {
  --bg-primary: rgba(255, 255, 255, 0.72);
  --bg-secondary: rgba(255, 255, 255, 0.6);
  --bg-tertiary: rgba(245, 245, 247, 0.8);
  --text-primary: #1d1d1f;
  --text-secondary: #86868b;
  --border-color: rgba(0, 0, 0, 0.1);
  --accent-color: #0071e3;
  --accent-hover: #0077ed;
  --input-bg: rgba(255, 255, 255, 0.8);
  --code-bg: rgba(30, 30, 30, 0.95);
  --code-header-bg: rgba(45, 45, 45, 0.95);
  --shadow-color: rgba(0, 0, 0, 0.1);
  --tab-active-bg: rgba(255, 255, 255, 0.9);
  --tab-inactive-bg: rgba(255, 255, 255, 0.3);
  --tab-inactive-text: #1d1d1f;
}

/* 暗色模式变量 */
.api-tester.dark {
  --bg-primary: rgba(30, 30, 30, 0.72);
  --bg-secondary: rgba(44, 44, 46, 0.6);
  --bg-tertiary: rgba(58, 58, 60, 0.8);
  --text-primary: #f5f5f7;
  --text-secondary: #a1a1a6;
  --border-color: rgba(255, 255, 255, 0.1);
  --accent-color: #0a84ff;
  --accent-hover: #409cff;
  --input-bg: rgba(44, 44, 46, 0.8);
  --code-bg: rgba(0, 0, 0, 0.6);
  --code-header-bg: rgba(28, 28, 30, 0.8);
  --shadow-color: rgba(0, 0, 0, 0.3);
  --tab-active-bg: rgba(255, 255, 255, 0.15);
  --tab-inactive-bg: rgba(255, 255, 255, 0.05);
  --tab-inactive-text: #f5f5f7;
}

.api-tester {
  border-radius: 20px;
  padding: 24px;
  margin: 20px 0;
}

/* 磨砂玻璃面板 */
.glass-panel {
  background: var(--bg-primary);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 4px 30px var(--shadow-color);
}

.api-key-section {
  padding: 20px;
  margin-bottom: 20px;
}

.api-key-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 15px;
}

.api-key-input-wrapper {
  display: flex;
  gap: 10px;
}

.api-key-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.api-key-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
}

.api-key-input::placeholder {
  color: var(--text-secondary);
}

.toggle-visibility {
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-visibility:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.api-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid var(--border-color);
  background: var(--tab-inactive-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--tab-inactive-text);
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: var(--tab-active-bg);
  transform: translateY(-1px);
}

.tab-btn.active {
  background: var(--tab-active-bg);
  border-color: var(--accent-color);
  color: var(--accent-color);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.api-panel {
  padding: 24px;
}

.endpoint-selector,
.model-selector,
.message-input-section {
  margin-bottom: 20px;
}

.endpoint-selector label,
.model-selector label,
.message-input-section label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 14px;
}

.endpoint-select,
.model-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.endpoint-select:focus,
.model-select:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
}

.message-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.message-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
}

.message-input::placeholder {
  color: var(--text-secondary);
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.test-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border: none;
  background: var(--accent-color);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.3);
}

.test-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.4);
}

.test-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.copy-curl-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: 1px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.copy-curl-btn:hover {
  background: var(--accent-color);
  color: white;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.curl-preview {
  background: var(--code-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.curl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--code-header-bg);
  color: #a1a1a6;
  font-size: 13px;
  font-weight: 500;
}

.expand-btn {
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #a1a1a6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.expand-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f5f5f7;
}

.curl-code {
  margin: 0;
  padding: 16px;
  color: #98c379;
  font-size: 13px;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}

.response-section {
  margin-top: 20px;
  overflow: hidden;
}

.response-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
}

.response-header span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.clear-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.response-content {
  margin: 0;
  padding: 16px 20px;
  background: var(--code-bg);
  color: #4ec9b0;
  font-size: 13px;
  line-height: 1.7;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}

.response-content.error {
  color: #f48771;
}

/* Iconify 图标样式 */
iconify-icon {
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
}

.error-icon {
  color: #ff453a;
}

.success-icon {
  color: #30d158;
}

@media (max-width: 600px) {
  .api-tester {
    padding: 16px;
  }

  .api-key-section,
  .api-panel {
    padding: 16px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .test-btn,
  .copy-curl-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>