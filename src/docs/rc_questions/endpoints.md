---
title: 渠道地址速查
icon: mdi:link-variant
order: 4
footer: false
---

## 只需要记两个地址

Right Code 所有渠道共用同一个域名，**用哪个渠道由 ApiKey 绑定的渠道决定**，地址本身不区分渠道：

| 用途 | 请求地址 |
| --- | --- |
| GPT / Codex（OpenAI 兼容客户端） | `https://api.site/v1` |
| 其他所有渠道（Claude、Gemini、Grok 等） | `https://api.site` |

:::important 记住两件事
1. **换渠道 = 换 Key**：创建 ApiKey 时选了哪个渠道，这个 Key 就只能调用那个渠道下的模型，详见 [ApiKey 管理](/docs/rc_quick_start/apikey.html)。想换渠道，换一个绑定了对应渠道的 Key 即可，地址不用改。
2. **是否带 `/v1` 看客户端**：OpenAI 兼容的客户端（Codex、Cherry Studio、OpenAI SDK 等）填 `https://api.site/v1`；Claude Code、Claude Desktop 这类 Anthropic 客户端只填 `https://api.site`，不要加 `/v1` 或 `/v1/messages`。
:::

## 各工具填什么

| 工具 | 地址 |
| --- | --- |
| Codex CLI / Codex App / VSCode 插件 | `https://api.site/v1` |
| Claude Code / Claude Desktop | `https://api.site` |
| Grok Build                                 | `https://api.site/v1`                             |
| Cherry Studio、OpenCode 等 OpenAI 兼容工具 | `https://api.site/v1`                             |
| 画图接口                                   | `https://api.site`，见 [画图接口](/docs/rc_draw/) |

## 不同协议的完整地址

一般只需要在客户端里填上面的地址，后面的路径客户端会自己补上。自己写代码或用 curl 调用时，完整地址如下：

| 协议 | 完整地址 |
| --- | --- |
| OpenAI Responses | `https://api.site/v1/responses` |
| OpenAI Chat Completions | `https://api.site/v1/chat/completions` |
| Anthropic Messages | `https://api.site/v1/messages` |
| Gemini 原生 | `https://api.site/v1beta/models/<模型名>:streamGenerateContent` |

可以直接拿 [Curl 调用示例](/docs/rc_extension/curl.html) 测试一下 Key 和地址是否正确。

:::tip
有哪些渠道、每个渠道下有哪些模型、当前是否可用，请在后台的 `模型列表` 页面查看，操作见 [渠道与模型](/docs/rc_quick_start/models.html)。
:::
