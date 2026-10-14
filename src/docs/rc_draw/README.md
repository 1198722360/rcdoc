---
title: 画图接口
icon: material-symbols:draw-outline
order: 0
footer: false
---

# 画图接口

Right Code 画图接口统一走**异步模式**：提交任务拿到 `task_id`，再轮询任务查询接口取结果。按模型协议分两类：

- **[OpenAI 生成](./openai.md)**：GPT Image 系列模型，走 OpenAI Images 协议，提供文生图和**独立的图片编辑接口**（`/v1/images/edits`）。
- **[Gemini 生成](./gemini.md)**：Gemini 图像模型（Nano Banana 系列），走 Gemini `generateContent` 协议，文生图和参考图编辑都在同一个接口里完成。

## 可用模型

| 模型 | 定位 | 调用方式 |
| --- | --- | --- |
| `gpt-image-2` | GPT Image 2 基础模型 | [OpenAI 生成](./openai.md) |
| `gpt-image-2.5-flare` | 速度优先，适合日常高质量图片生成 | [OpenAI 生成](./openai.md) |
| `gpt-image-2.5-sunburst` | 能力优先，适合对编辑精度要求高的场景 | [OpenAI 生成](./openai.md) |
| `gemini-3-pro-image-preview` | Nano Banana Pro，画质和理解能力优先 | [Gemini 生成](./gemini.md) |
| `gemini-nano-banana-2.1` | Nano Banana 2 系列，速度优先 | [Gemini 生成](./gemini.md) |

::: warning 质量档位
`xhigh` 和 `max` 是 GPT Image 2.5 新增的质量档位，只能用于 `gpt-image-2.5-flare` 和 `gpt-image-2.5-sunburst`。`gpt-image-2` 仍只支持 `auto`、`low`、`medium`、`high`。
:::

## 基础信息

| 项 | 值 |
| --- | --- |
| 基础地址 | `https://www.rightapi.ai` |
| 鉴权头 | `Authorization: Bearer sk-xxxxx` |
| 请求格式 | `Content-Type: application/json`（OpenAI 图片编辑上传文件时用 `multipart/form-data`） |
| 结果形态 | 图片 URL（不返回 base64） |

## 接口一览

| 接口 | 方法与路径 | 用途 |
| --- | --- | --- |
| [OpenAI 生成 · 文生图](./openai.md#文生图) | `POST /v1/images/generations` | GPT Image 文生图 |
| [OpenAI 生成 · 图片编辑](./openai.md#图片编辑) | `POST /v1/images/edits` | 图生图、换背景、多图融合（支持上传文件或 JSON 传图） |
| [Gemini 生成](./gemini.md) | `POST /v1beta/models/{model}:generateContent` | Gemini 文生图 / 带参考图编辑 |
| [任务查询](./tasks.md) | `GET /v1/tasks/{task_id}` | 轮询异步任务结果 |

## 怎么选

| 对比项 | OpenAI 生成 | Gemini 生成 |
| --- | --- | --- |
| 模型 | `gpt-image-2`、`gpt-image-2.5-flare`、`gpt-image-2.5-sunburst` | `gemini-3-pro-image-preview`、`gemini-nano-banana-2.1` |
| 模型写在哪 | 请求体 `model` 字段 | 请求路径 `/v1beta/models/{model}:generateContent` |
| 尺寸写法 | `size` 像素值，如 `1024x1024`、`1536x1024` | `aspectRatio` 比例 + `imageSize` 档位（`1K` / `2K` / `4K`） |
| 质量控制 | `quality`：`auto` / `low` / `medium` / `high`，2.5 模型另有 `xhigh` / `max` | 通过 `imageSize` 档位控制 |
| 文生图 | ✅ `/v1/images/generations` | ✅ `generateContent` |
| 参考图 / 图片编辑 | ✅ `/v1/images/edits`，支持上传文件、URL、base64 | ✅ 同一接口，`parts` 里加 `inline_data`（base64） |
| 多图参考 | ✅ | ✅ |
| 局部重绘（mask） | ❌ 参数会被接收但暂不生效 | ❌ |
| 完成后的结果 | `data[].url` | `candidates[].content.parts[].text`（文本即图片 URL） |

> 可用的模型名以[渠道与模型](../rc_quick_start/models.md)中列出的为准。

## 异步流程

1. 提交请求，请求体带 `"async": true`，立即返回 `task_id`。
2. 每隔几秒轮询一次 `GET /v1/tasks/{task_id}`。
3. 返回里出现 `data`（OpenAI 生成）或 `candidates`（Gemini 生成）即为完成，从中取图片 URL；`status` 为 `failed` / `expired` / `canceled` 则按失败处理。

提交 + 轮询的完整代码见[任务查询 · 完整示例](./tasks.md#完整示例)。

::: tip
不带 `"async": true` 时，接口会先等结果（默认最多 60 秒），超时同样返回 `task_id`。图片生成耗时波动较大，建议始终带 `"async": true`，统一按轮询处理。
:::

### 提交就失败

参数错误、余额不足、上游拒绝等会在提交阶段直接返回失败，此时 `status` 为 `failed`，看 `error` 字段：

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "status": "failed",
  "error": "上游 HTTP 404: 404 page not found",
  "message": "任务id: task_0123456789abcdef0123456789abcdef 处理失败"
}
```

### 常见 HTTP 错误

| 状态码 | 常见原因 | 处理建议 |
| --- | --- | --- |
| 400 | JSON / 表单格式错误，缺少 `model`、`prompt`，或 `size`、`aspectRatio` 等取值不被模型支持 | 先用文档里的最小请求验证，再逐个加参数 |
| 401 | 未传 API Key、Key 无效或已过期 | 检查 `Authorization: Bearer sk-xxxxx` |
| 403 | Key 被禁用，或分组未开通该模型 | 检查 Key 状态和所属分组 |
| 404 | 模型名不存在或路径写错 | 核对模型名和请求路径 |
| 429 | 触发限流或余额不足 | 降低并发，检查余额 |
| 5xx | 暂无可用上游或上游临时不可用 | 稍后重试 |

## 注意事项

- 结果统一为**图片 URL**，`response_format` 不生效；拿到 URL 后建议自行下载保存。
- 局部重绘（`mask`）、图片变体（`variations`）暂不支持。
- 参考图较大时建议先压缩再上传，能明显加快生成速度。
