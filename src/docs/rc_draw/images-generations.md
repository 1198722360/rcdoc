---
title: 图片生成
icon: material-symbols:image
order: 1
footer: false
---

# 图片生成

OpenAI Images 兼容接口，异步文生图。

`POST https://www.rightapi.ai/draw/v1/images/generations`

> 鉴权头：`Authorization: Bearer sk-xxxxx`，请求体固定带 `"async": true`。

## 请求示例

::::tabs

@tab 文生图

```bash
curl -sS -X POST "https://www.rightapi.ai/draw/v1/images/generations" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-fast",
    "prompt": "一只戴着太空头盔的橘猫，电影级光影",
    "n": 1,
    "size": "1:1",
    "imageSize": "1K",
    "async": true
  }'
```

@tab 带参考图

```bash
curl -sS -X POST "https://www.rightapi.ai/draw/v1/images/generations" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "nano-banana-fast",
    "prompt": "参考这张图，把主体改成赛博朋克风格",
    "n": 1,
    "size": "16:9",
    "async": true,
    "image": [
      "data:image/png;base64,{BASE64_IMAGE}"
    ]
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
| `model` | 是 | 图片生成模型名 |
| `prompt` | 是 | 提示词 |
| `async` | 是 | 固定 `true`，立即返回任务号 |
| `n` | 否 | 生成数量，缺省 `1` |
| `size` | 否 | 比例 `1:1`、`16:9`、`9:16`、`4:3`，或像素串 `1024x1024` |
| `imageSize` | 否 | 仅 `1K`、`2K`、`4K`，nano-banana / gpt-image vip 模型可用 |
| `image` | 否 | 参考图，data URL 数组（`data:image/png;base64,...`） |
