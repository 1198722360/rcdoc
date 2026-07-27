---
title: 任务查询
icon: material-symbols:manage-search
order: 3
footer: false
---

# 任务查询

轮询异步绘图任务，取最终结果。这是站点级接口，**不带** `/draw` 前缀。

`GET https://www.rightapi.ai/v1/tasks/{task_id}`

> 鉴权头：`Authorization: Bearer sk-xxxxx`，只能查询自己 API Key 名下的任务。

## 请求示例

```bash
curl -sS "https://www.rightapi.ai/v1/tasks/{task_id}" \
  -H "Authorization: Bearer sk-xxxxx"
```

## 响应

结果按提交时的协议回译：Images 请求返回 Images 形状，Gemini 请求返回 Gemini 形状。

::::tabs

@tab 处理中

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "object": "image",
  "model": "nano-banana-fast",
  "status": "in_progress",
  "progress": 45,
  "created_at": 1782800000
}
```

@tab 完成（Images）

```json
{
  "created": 1782800000,
  "data": [
    { "url": "https://cdn.example.com/results/task_0123456789abcdef.png" }
  ]
}
```

@tab 完成（Gemini）

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
  "modelVersion": "nano-banana-fast"
}
```

@tab 失败

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "object": "image",
  "model": "nano-banana-fast",
  "status": "failed",
  "progress": 100,
  "error": { "message": "上游生成失败", "code": "" }
}
```

::::

## 状态说明

| `status` | 含义 |
| --- | --- |
| `queued` / `in_progress` | 任务排队或处理中，继续轮询 |
| `completed` | 完成，从 `data` 或 `candidates` 取结果 |
| `failed` | 失败，见 `error.message` |
