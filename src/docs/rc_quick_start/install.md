---
title: 安装 AI Agent 工具
icon: mdi:download
order: 8
footer: false
---

**在这里挑好你要用的 CLI 或客户端，按对应的方式装好，再去 [CC-Switch 配置](/docs/rc_quick_start/ccs.html) 或各自的配置教程里接入 Right Code。(初次使用的小白建议安装桌面客户端)**

:::tip 装之前先确认
- 命令行工具大多通过 `npm` 安装，请先完成 [通用步骤](/docs/rc_quick_start/normal.html)，确认 Nodejs 已经装好。
- 装完后**关掉终端重新打开**，再运行工具，新装的命令才能被找到。
:::

## 一、命令行工具（CLI）

在终端里运行安装命令即可。点击「安装教程」可以看到完整步骤和各系统的区别。

| 工具 | 安装命令 | 安装教程 |
| --- | --- | --- |
| Claude Code | `npm install -g @anthropic-ai/claude-code` | [Claude Code 安装配置](/docs/rc_cli_config/claudecode.html) |
| Codex CLI | `npm i -g @openai/codex@latest` | [Codex 安装配置](/docs/rc_cli_config/codex.html) |
| Gemini CLI | - | Google 官方 **Gemini CLI** 目前稳定性较差，几乎无法正常使用，本站**不再提供**其安装与配置教程。 |
| Grok Build | 按系统运行官方安装脚本 | [Grok Build 安装配置](/docs/rc_cli_config/grok.html) |
| OpenCode      | `npm i -g opencode-ai`                     | [ OpenCode 安装配置](/docs/rc_extension/opencode.html) |
| Hermes Agent  | 运行官方安装脚本（Windows 需在 WSL 中）    | [Hermes安装配置](/docs/rc_extension/hermes.html) |
| CC-Switch CLI | 运行安装脚本或下载安装包                   | [CC-Switch CLI 安装](/docs/rc_cli_config/ccs-cli.html#安装)  |

:::important
- 安装完成后，可以运行 `工具名 --version`（例如 `codex --version`）确认是否装好。
:::

## 二、桌面客户端与编辑器插件

不想用命令行的话，可以用下面这些图形界面的工具，从官方渠道下载安装包即可。

| 工具 | 下载方式 | 安装教程 |
| --- | --- | --- |
| Claude Desktop | [官方下载页](https://claude.com/download) | [Claude Desktop安装配置](/docs/rc_client/claude-desktop.html) |
| ChatGPT / Codex App | [官方下载页](https://developers.openai.com/codex/quickstart?setup=app) | [ChatGPT安装配置](/docs/rc_client/chatgpt.html) |
| Codex VSCode 插件 | 在 VSCode 扩展中心搜索 `codex` | [Codex 安装配置](/docs/rc_cli_config/codex.html) |
| CherryStudio | [官网下载](https://www.cherry-ai.com/) | [CherryStudio 安装配置](/docs/rc_extension/cherrystudio.html) |

## 三、装好之后

- **推荐**：用 [CC-Switch](/docs/rc_quick_start/ccs.html) 一键配置，不用手动改配置文件。
- **手动配置**：直接按上面表格里的教程，把地址和 Key 写进配置文件。
- 不确定地址填哪个，看 [渠道地址速查](/docs/rc_questions/endpoints.html)。
