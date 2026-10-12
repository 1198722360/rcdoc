---
title: 图片编辑
icon: tabler:photo-edit
order: 2
footer: false
---

# 图片编辑

OpenAI Images 兼容的图生图 / 编辑接口，和官方一样同时支持**表单上传文件**和 **JSON 传参考图**两种提交方式。

`POST https://www.rightapi.ai/draw/v1/images/edits`

> 鉴权头：`Authorization: Bearer sk-xxxxx`
> 结果同样是异步的：请求体带 `"async": true` 立即返回 `task_id`，再走[任务查询](./tasks.md)。

## 请求示例

::::tabs

@tab 上传文件（multipart）

官方 SDK 的默认形态，`image` 字段直接传文件；多张参考图就重复传多个 `image` 字段。

```bash
curl -sS -X POST "https://www.rightapi.ai/draw/v1/images/edits" \
  -H "Authorization: Bearer sk-xxxxx" \
  -F "model=nano-banana-fast" \
  -F "prompt=把背景换成夜晚的雪山，保留主体" \
  -F "image=@/path/to/input.png;type=image/png" \
  -F "async=true"
```

@tab JSON + 参考图

```bash
curl -sS -X POST "https://www.rightapi.ai/draw/v1/images/edits" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-fast",
    "prompt": "把背景换成夜晚的雪山，保留主体",
    "image": [
      "data:image/png;base64,{BASE64_IMAGE}"
    ],
    "size": "16:9",
    "async": true
  }'
```

@tab 多图参考

`images` 数组传多张参考图（多图融合 / 换装 / 换背景等）。

```bash
curl -sS -X POST "https://www.rightapi.ai/draw/v1/images/edits" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-fast",
    "prompt": "把第二张图里的帽子戴到第一张图的人物头上",
    "images": [
      "https://cdn.example.com/portrait.png",
      "https://cdn.example.com/hat.png"
    ],
    "imageSize": "2K",
    "async": true
  }'
```

::::

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

最终结果从[任务查询](./tasks.md)取，形状与图片生成一致（`data[].url`）。

## 参数

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `model` | 是 | 图片模型名 |
| `prompt` | 是 | 编辑要求 |
| `image` / `images` | 是 | 参考图。multipart 下用 `image` 文件字段（可重复多个）；JSON 下 `image` 或 `images` 均可，元素支持 `data:` URL 或公网可访问的图片 URL |
| `async` | 否 | `true` 立即返回任务号；不传则等待结果（默认最多等 60 秒，超时同样返回任务号） |
| `size` | 否 | 比例 `1:1`、`16:9`、`9:16`、`4:3`，或像素串 `1024x1024` |
| `aspectRatio` | 否 | 比例，作用同 `size` 的比例写法；与 `size` 同时传时以 `size` 为准 |
| `imageSize` | 否 | 仅 `1K`、`2K`、`4K`，nano-banana / gpt-image vip 模型可用 |
| `n` | 否 | 生成数量，缺省 `1` |

## 注意事项

- **`mask`（局部重绘）当前不生效**：参数会被接收但不会作用于生成过程，需要局部修改请在提示词里说明，或改用整图编辑。
- **结果固定为图片 URL**：异步结果不回传 base64，`response_format` 不生效。
- **`variations`（图片变体）不支持**。
- 参考图较大时建议先压缩再上传，能明显加快生成速度。
