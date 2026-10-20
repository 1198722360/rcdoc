---
title: 任务查询
icon: material-symbols:manage-search
order: 3
footer: false
---

# 任务查询

轮询异步画图任务，取最终结果。[OpenAI 生成](./openai.md)和 [Gemini 生成](./gemini.md)提交后返回的 `task_id` 都在这里查。

`GET https://rightapi.ai/v1/tasks/{task_id}`

> 鉴权头：`Authorization: Bearer sk-xxxxx`，只能查询自己 API Key 名下的任务。

## 请求示例

```bash
curl -sS "https://rightapi.ai/v1/tasks/{task_id}" \
  -H "Authorization: Bearer sk-xxxxx"
```

## 响应

- **处理中 / 失败**：返回任务信息，含 `status`、`progress`、`error.message`。
- **完成**：按提交时的协议返回结果，**不再带 `status` 字段**——OpenAI 生成返回 `data[].url`，Gemini 生成返回 `candidates[].content.parts[].text`（文本就是图片 URL）。

::::tabs

@tab 处理中

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "object": "image",
  "model": "gpt-image-2",
  "status": "in_progress",
  "progress": 45,
  "created_at": 1782800000
}
```

@tab 完成（OpenAI）

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
  "modelVersion": "gemini-3-pro-image-preview"
}
```

@tab 失败

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "object": "image",
  "model": "gpt-image-2",
  "status": "failed",
  "progress": 100,
  "error": { "message": "上游生成失败", "code": "" }
}
```

::::

## 状态说明

| `status` | 含义 | 怎么处理 |
| --- | --- | --- |
| `queued` / `in_progress` | 排队或处理中（提交接口返回的 `processing` 同义） | 继续轮询 |
| `failed` | 生成失败 | 停止轮询，看 `error.message` |
| `expired` / `canceled` | 任务过期或已取消 | 停止轮询，按失败处理 |
| *（无 `status`，有 `data` / `candidates`）* | 已完成 | 取图片 URL |

> 轮询间隔建议 3–5 秒，并给整体等待设置上限（如 10 分钟），避免无限轮询。

## 完整示例

提交任务 + 轮询取结果，同时兼容 OpenAI 生成和 Gemini 生成的返回形状（Python，依赖 `requests`）：

```python
import time
import requests

API_KEY = "sk-xxxxx"
BASE_URL = "https://rightapi.ai"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}


def wait_for_result(task_id, interval=5, timeout=600):
    """轮询任务，返回图片 URL 列表"""
    deadline = time.time() + timeout
    while time.time() < deadline:
        result = requests.get(
            f"{BASE_URL}/v1/tasks/{task_id}", headers=HEADERS, timeout=30
        ).json()

        if "data" in result:  # OpenAI 生成完成
            return [item["url"] for item in result["data"]]
        if "candidates" in result:  # Gemini 生成完成，URL 在 text 里
            return [
                part["text"]
                for candidate in result["candidates"]
                for part in candidate["content"]["parts"]
                if "text" in part
            ]
        if result.get("status") in ("failed", "expired", "canceled"):
            raise RuntimeError(f"任务失败: {result.get('error')}")

        time.sleep(interval)
    raise TimeoutError(f"任务 {task_id} 超时未完成")


# 1. 提交任务（Gemini 生成同理：换成 generateContent 的地址和请求体）
task = requests.post(
    f"{BASE_URL}/v1/images/generations",
    headers=HEADERS,
    json={
        "model": "gpt-image-2",
        "prompt": "一只戴着太空头盔的橘猫，电影级光影",
        "n": 1,
        "size": "1024x1024",
        "async": True,
    },
    timeout=60,
).json()

if "task_id" not in task or task.get("status") == "failed":
    raise RuntimeError(f"提交失败: {task}")

# 2. 轮询结果
print(wait_for_result(task["task_id"]))
```
