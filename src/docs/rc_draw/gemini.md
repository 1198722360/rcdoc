---
title: Gemini 生成
icon: vscode-icons:file-type-gemini
order: 2
footer: false
---

# Gemini 生成

Gemini `generateContent` 兼容接口，适用于 `gemini-3-pro-image-preview`、`gemini-nano-banana-2.1` 等 Gemini 图像模型（Nano Banana 系列）。文生图、带参考图编辑、多图融合都走**同一个接口**：只给文本就是文生图，在 `parts` 里加参考图就是图片编辑，没有单独的编辑接口。

`POST https://api.site/v1beta/models/{model}:generateContent`

::: tip 通用约定
- 鉴权头：`Authorization: Bearer sk-xxxxx`，也可用 Gemini 习惯的 `x-goog-api-key: sk-xxxxx`。
- 请求体带 `"async": true`，立即返回 `task_id`，再到[任务查询](./tasks.md)取结果。
- 不支持 `:streamGenerateContent`（流式请求不进异步通道）。
:::

## 模型

| 模型 | 定位 |
| --- | --- |
| `gemini-3-pro-image-preview` | Gemini 3 Pro Image（Nano Banana Pro），画质和理解能力优先，适合高质量出图、图片编辑、多参考图融合、角色 / 商品一致性 |
| `gemini-nano-banana-2.1` | Nano Banana 2 系列，速度优先，适合快速创意出图、社媒素材、批量验证提示词 |

模型名写在请求路径里，两个模型的请求体完全一致，换模型只需改路径中的 `{model}`：

```text
https://api.site/v1beta/models/gemini-3-pro-image-preview:generateContent
https://api.site/v1beta/models/gemini-nano-banana-2.1:generateContent
```

## 请求示例

::::tabs

@tab 文生图

```bash
curl -sS -X POST "https://api.site/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "async": true,
    "contents": [
      {
        "role": "user",
        "parts": [
          { "text": "生成一张 16:9 的未来城市雨夜海报" }
        ]
      }
    ],
    "generationConfig": {
      "imageConfig": { "aspectRatio": "16:9", "imageSize": "1K" }
    }
  }'
```

@tab 带参考图（图片编辑）

```bash
curl -sS -X POST "https://api.site/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "async": true,
    "contents": [
      {
        "role": "user",
        "parts": [
          { "text": "参考图片，把它改成高级杂志封面风格" },
          {
            "inline_data": {
              "mime_type": "image/png",
              "data": "{BASE64_IMAGE}"
            }
          }
        ]
      }
    ],
    "generationConfig": {
      "imageConfig": { "aspectRatio": "4:3", "imageSize": "1K" }
    }
  }'
```

@tab 多图参考

每张参考图一个 `inline_data` part，提示词里用「第一张图」「第二张图」指代。

```bash
curl -sS -X POST "https://api.site/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "async": true,
    "contents": [
      {
        "role": "user",
        "parts": [
          { "text": "把第二张图里的帽子戴到第一张图的人物头上，保持人物面部和光线不变" },
          { "inline_data": { "mime_type": "image/png", "data": "{BASE64_PORTRAIT}" } },
          { "inline_data": { "mime_type": "image/png", "data": "{BASE64_HAT}" } }
        ]
      }
    ],
    "generationConfig": {
      "imageConfig": { "aspectRatio": "3:4", "imageSize": "1K" }
    }
  }'
```

::::

::: info 如何得到 BASE64_IMAGE
`data` 填图片文件的纯 base64 字符串（不带 `data:image/png;base64,` 前缀）：

- macOS：`base64 -i input.png | tr -d '\n'`
- Linux：`base64 -w 0 input.png`
:::

## 请求参数

### 顶层参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `{model}` | string | 是 | 写在路径里的模型名：`gemini-3-pro-image-preview` 或 `gemini-nano-banana-2.1` |
| `async` | boolean | 是 | 固定 `true`，立即返回 `task_id` |
| `contents` | Content[] | 是 | 请求内容。单轮请求传一条 `role: "user"` 的 Content 即可 |
| `generationConfig` | object | 否 | 生成配置，图像输出主要用其中的 `imageConfig` |

### Content / Part

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `role` | string | 否 | 内容角色，建议显式传 `user` |
| `parts` | Part[] | 是 | 内容片段，每个 part 是 `text` 或 `inline_data` 之一 |
| `parts[].text` | string | 否 | 提示词文本，多个 text part 会拼接 |
| `parts[].inline_data.mime_type` | string | 否 | 参考图 MIME 类型，如 `image/png`、`image/jpeg`、`image/webp` |
| `parts[].inline_data.data` | string | 否 | 参考图的 base64 数据；多个 `inline_data` part 即多图参考 |

### generationConfig.imageConfig

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `aspectRatio` | string | 否 | 模型默认 | 宽高比，常用 `1:1`、`2:3`、`3:2`、`3:4`、`4:3`、`9:16`、`16:9`、`21:9`，以模型能力为准 |
| `imageSize` | string | 否 | `1K` | 分辨率档位：`1K`、`2K`、`4K`，`K` 必须大写；不被模型支持时返回参数错误 |

> 也兼容 REST 形态写法 `generationConfig.responseFormat.image.aspectRatio` / `imageSize`，与上面的 `imageConfig` 等价，二选一即可。

## 响应

提交成功后立即返回任务号：

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "status": "processing",
  "progress": 0,
  "message": "任务id: task_0123456789abcdef0123456789abcdef，任务还在处理中，请稍后到异步任务中查看结果"
}
```

拿 `task_id` 到[任务查询](./tasks.md)轮询，完成后返回 Gemini `GenerateContentResponse` 形状，**图片 URL 放在 `parts[].text` 里**：

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          { "text": "https://cdn.example.com/results/task_0123456789abcdef.png" }
        ]
      },
      "finishReason": "STOP",
      "index": 0
    }
  ],
  "modelVersion": "gemini-3-pro-image-preview"
}
```

## 提示词建议

- **比例和分辨率用参数控制**：写在 `imageConfig` 里比写在提示词里更可靠。
- **按「主体 → 场景 → 风格 → 细节」组织**，图中需要的文字用引号括起来。
- **编辑时先说保留什么，再说改什么**，如「保持人物面部和姿势不变，只把背景换成夜晚的雪山」。
- **多图参考按 part 顺序指代**：「第一张图」「第二张图」对应 `parts` 里 `inline_data` 的先后顺序。

## 注意事项

- **结果是 URL 文本，不是 `inlineData`**：与 Gemini 官方直接返回 base64 不同，请从 `candidates[].content.parts[].text` 取图片地址。
- 不支持 `:streamGenerateContent`，也不支持 `mask` 局部重绘；要改局部请在提示词里写清楚。
- 参考图较大时建议先压缩再上传，能明显加快生成速度。
