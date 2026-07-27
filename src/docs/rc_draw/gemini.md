---
title: Gemini 生成
icon: vscode-icons:file-type-gemini
order: 2
footer: false
---

# Gemini 生成

Gemini `generateContent` 兼容接口，异步生图。

`POST https://www.rightapi.ai/draw/v1beta/models/{model}:generateContent`

> 鉴权头：`Authorization: Bearer sk-xxxxx`，请求体固定带 `"async": true`。

## 请求示例

::::tabs

@tab 文生图

```bash
curl -sS -X POST "https://www.rightapi.ai/draw/v1beta/models/nano-banana-fast:generateContent" \
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
      "imageConfig": { "aspectRatio": "16:9", "imageSize": "2K" }
    }
  }'
```

@tab 带参考图

```bash
curl -sS -X POST "https://www.rightapi.ai/draw/v1beta/models/nano-banana-fast:generateContent" \
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
      "imageConfig": { "aspectRatio": "4:3", "imageSize": "2K" }
    }
  }'
```

::::

## 响应

提交成功后立即返回 `task_id`，拿去[任务查询](./tasks.md)轮询即可。

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "status": "processing",
  "progress": 0,
  "message": "任务id: task_0123456789abcdef0123456789abcdef，任务还在处理中，请稍后到异步任务中查看结果"
}
```

## 参数

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `{model}` | 是 | 路径里的模型名，如 `nano-banana-fast` |
| `async` | 是 | 固定 `true`，立即返回任务号 |
| `contents[].parts[].text` | 是 | 提示词文本，多个 part 会拼接 |
| `contents[].parts[].inline_data` | 否 | 参考图，`mime_type` + base64 `data` |
| `generationConfig.imageConfig.aspectRatio` | 否 | 比例 `1:1`、`16:9`、`9:16`、`4:3` |
| `generationConfig.imageConfig.imageSize` | 否 | 仅 `1K`、`2K`、`4K` |
