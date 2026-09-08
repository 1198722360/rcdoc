---
title: 使用CC-Switch配置
icon: hugeicons:configuration-01
order: 1
footer: false
---

## 什么是 CC-Switch？

**使用 CC-Switch，您可以：**

![](/assets/image/rc_quick_start/rc-0.webp)

- ✅ 一键切换 API 配置 - 在多个 API 提供商之间快速切换
- ✅ 可视化配置管理 - 通过图形界面轻松管理所有配置
- ✅ 内置 Right Code 模板 - 预设了 Right Code 的配置模板
- ✅ MCP 服务器管理 - 管理 Model Context Protocol 服务器
- ✅ 系统托盘快捷操作 - 通过托盘菜单快速切换
- ✅ 故障转移 - 全自动渠道故障转移

> **目前 CC-Switch 已经内置了 Right Code 的快捷配置模板，无需手动编辑配置文件！**

OpenCode、Hermes 也请用 CCS 配，教程分别在 [OpenCode](/docs/rc_extension/opencode.html) 和 [Hermes Agent](/docs/rc_extension/hermes.html)。

### 软件下载

> 访问 [CC Switch Download](https://github.com/farion1231/cc-switch/releases/latest) 页面下载最新的 CC-Switch 工具，在本地进行安装

![](/assets/image/rc_quick_start/rc-9.webp)

## 配置 Claude Code（CC）

### 第一步：选中 Claude Code，添加供应商

打开软件，顶部先切到 **Claude Code**，再点添加供应商。

![](/assets/image/rc_quick_start/ccs-cc-add.jpg)

### 第二步：选 Right Code 预设，填入 Key

- 在上方 `预设供应商` 中选择 `Right Code`
- 在 `API Key` 部分填写你在后台生成的密钥
- 右下角点击添加

::: important
**我们的 Claude Code 目前有三个渠道：**

- CC 官渠：`https://rightapi.ai/claude`
- CC-Sale 渠道：`https://rightapi.ai/claude-sale`
- AWSQ 逆向渠道：`https://rightapi.ai/claude-aws`

如果你想使用不同的渠道，需要更改 `请求地址` 一栏内容
:::

![](/assets/image/rc_quick_start/ccs-cc-preset.jpg)

### 第三步：确认当前渠道

在主界面查看，确保目前使用的渠道是我们刚配置的。

![](/assets/image/rc_quick_start/rc-12.webp)

### 第四步：跳过 Claude Code 初次安装确认

1. 在主界面点击设置按钮，进入通用设置页面
2. 在下方找到 `跳过Claude Code初次安装确认`，确保这项是打开的

![](/assets/image/rc_quick_start/rc-13.webp)

![](/assets/image/rc_quick_start/rc-14.webp)

### 第五步：终端测一下

打开终端，运行 `claude`，随便问一句，看配置是否正常。

![](/assets/image/rc_quick_start/rc-999.webp)

## 配置 Codex（CX）

### 第一步：打开 Codex 增强，不要开本地路由

先进入设置里的 **Codex 应用增强**，把 **非接管切换时保留官方登录** 和 **统一 Codex 会话历史** 打开。

![](/assets/image/rc_quick_start/ccs-cx-enhance.jpg)

::: warning 不要开本地路由
Right Code 的 Codex 本身就是原生 Responses 接口，不需要 CCS 再做协议转换。

- 本地路由开了以后，流量会拐到 `127.0.0.1:15721`
- 容易连错地址、计费对不上、缓存失效
- 配 Right Code 时，把本地路由保持关闭
:::

### 第二步：选中 Codex，添加供应商

顶部切到 **Codex**，再点添加供应商。

![](/assets/image/rc_quick_start/ccs-cx-add.jpg)

### 第三步：填入 Key 和请求地址

- 供应商名称随便起
- `API Key` 填写你在后台生成的密钥
- `API 请求地址` 填兼容 OpenAI Response 格式的端点：`https://www.rightapi.ai/openai`
- 默认模型填 `gpt-5.4`
- 右下角点击添加

![](/assets/image/rc_quick_start/ccs-cx-preset.jpg)

### 第四步：确认当前供应商

主界面确认当前启用的是刚加的 Right Code。

![](/assets/image/rc_quick_start/ccs-cx-active.jpg)

### 第五步：终端测一下

打开终端，运行 `codex`，随便问一句。

![](/assets/image/rc_quick_start/rc-999.webp)

## 配置 Grok Build

### 第一步：选中 Grok，添加供应商

打开软件，顶部先切到 **Grok**，再点添加供应商。

### 第二步：选 xAI (Grok) 预设，填入 Key

- 在上方 `预设供应商` 中选择 `xAI (Grok)`
- 请求地址改为：`https://rightapi.ai/grok/v1`
- `API Key` 填写后台生成的密钥
- 右下角点击添加

![](/assets/image/rc_quick_start/ccs-grok-add.jpg)

### 第三步：终端测一下

打开终端，运行 `grok`，随便问一句。
