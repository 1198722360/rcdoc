---
title: Claude Code 缓存优化代理
icon: mdi:cached
order: 8
footer: false
---

## 这是什么

[claude-code-cache-fix](https://github.com/cnighswonger/claude-code-cache-fix) 是一个第三方开源工具，在本机起一个小代理，放在 Claude Code 和 Right Code 之间。它会把 Claude Code 发出的请求整理成稳定的结构，让服务端更容易命中缓存，从而**省额度**。它不会让模型变聪明，只是让同样的额度用得更久。

## 为什么会需要它

Claude Code 用久了，可能会遇到这些情况：

- 聊的内容差不多，额度却掉得很快；
- 用 `--resume` 恢复旧会话，好像又从头计费了一遍；
- 开了一堆 MCP、Skills、Hooks 之后，消耗明显变高。

这些大多是因为 Claude Code 每次发的请求结构不够稳定（工具顺序变了、带了版本号等），服务端认不出“这一段之前见过”，缓存就没命中。这个代理做的事情就是：

| 它做了什么 | 对你的好处 |
| --- | --- |
| 修正恢复会话时的请求结构 | `--resume` 后能继续命中缓存 |
| 去掉版本号等不稳定字段 | Claude Code 升级后缓存不会突然失效 |
| 按固定顺序排列工具和 MCP 定义 | 同样的配置每次请求都一样 |
| 自动补上 `cache_control` 标记 | 主动告诉服务端哪些内容要缓存 |
| 在 `~/.claude/quota-status/` 记录缓存命中情况 | 出问题时方便排查 |

## 用之前先看

:::warning 注意事项
- **这不是 Right Code 官方维护的工具**，你的 API 请求会经过它，安装前请自行审查源码和依赖。
- **它只能优化缓存命中**。模型本身的价格、长上下文消耗、频繁读大文件这类问题，它解决不了。
- **Windows 用户请在 WSL 里配置**，不要用原生 CMD / PowerShell。也不要一半在 Windows、一半在 WSL，否则很容易出现路径、端口、环境变量对不上的问题。WSL 的安装可以参考 [微软官方 WSL 安装文档](https://learn.microsoft.com/zh-cn/windows/wsl/install)。
- 适合重度使用 Claude Code、经常恢复长会话、开了很多 MCP / Skills 的用户；只想开箱即用的话，可以先不折腾它。
:::

## 推荐：让 AI 帮你配

这个工具涉及本地代理、环境变量和后台服务，手动配置容易漏步骤。推荐直接把下面这段话发给 Claude Code 或 Codex，让它按你的机器生成命令：

```text
请根据 https://github.com/cnighswonger/claude-code-cache-fix 的最新 README，
帮我在当前系统中配置 Claude Code 缓存优化代理。要求：
1. 我使用 Right Code，upstream 必须是 https://api.site
2. Claude Code 的 ANTHROPIC_BASE_URL 改为指向本地代理 http://127.0.0.1:9801
3. 保留 ANTHROPIC_AUTH_TOKEN，继续使用我的 Right Code Claude 渠道 Key
4. 如果是 Windows，请按 WSL 里的 Linux 环境来配置
5. 给出检查代理是否正常、Claude Code 是否能正常回复的命令
6. 给出适合当前系统的后台常驻方式
```

:::tip
无论用 Claude 官渠还是 AwsQ 渠道，upstream 都是 `https://api.site`，渠道由你的 Key 决定。
:::

## 手动快速验证

想先自己跑通看看效果，可以在 MacOS / Linux / WSL 里执行：

1. 安装并启动代理

```bash
npm install -g claude-code-cache-fix
CACHE_FIX_PROXY_UPSTREAM=https://api.site cache-fix-proxy server
```

2. 修改 Claude Code 的 `~/.claude/settings.json`，把 `ANTHROPIC_BASE_URL` 指向本地代理，Key 不变

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的 Right Code Claude 渠道 Key",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:9801",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

:::important
如果你用 [CC-Switch](/docs/rc_quick_start/ccs.html) 管理 Claude Code，切换供应商时它会重写 `settings.json`。用代理期间，请在 CC-Switch 里把请求地址也改成 `http://127.0.0.1:9801`，否则一切换就失效了。
:::

3. 另开一个终端，检查代理状态

```bash
curl http://127.0.0.1:9801/health
```

返回 `{"status":"ok"}` 后，重新打开终端运行 `claude`，能正常对话就说明已经连通。

4. 长期使用

手动启动只适合临时验证，关掉终端代理就没了。长期使用请让 AI 帮你配置成后台服务（Linux 用 systemd，MacOS 用 launchd），省得每次用 Claude Code 前都要先手动启动代理。
