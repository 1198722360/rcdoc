---
title: 画图接口
icon: material-symbols:draw-outline
order: 0
footer: false
---

# 画图接口

Right Code 绘图接口统一走**异步模式**：提交任务拿到 `task_id`，再轮询任务查询接口取结果。

## 基础信息

| 项 | 值 |
| --- | --- |
| 绘图基础地址 | `https://www.rightapi.ai/draw` |
| 任务查询地址 | `https://www.rightapi.ai/v1/tasks/{task_id}`（站点级，不带 `/draw`） |
| 鉴权头 | `Authorization: Bearer sk-xxxxx` |

## 异步流程

1. 提交请求，请求体带 `"async": true`，立即返回 `task_id`。
2. 轮询 `GET /v1/tasks/{task_id}`，直到 `status` 为 `completed`。
3. 从任务结果里取图片 URL。

不带 `"async": true` 时，接口会先等结果（默认最多 60 秒），超时同样返回 `task_id`；两种情况都按上面的第 2 步取结果。

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

## 接口一览

| 接口 | 用途 |
| --- | --- |
| [图片生成](./images-generations.md) | OpenAI Images 兼容，文生图 / 带参考图 |
| [图片编辑](./images-edits.md) | OpenAI Images 兼容，图生图 / 编辑（支持上传文件、多图参考） |
| [Gemini 生成](./gemini.md) | Gemini `generateContent` 兼容，文生图 / 带参考图 |
| [任务查询](./tasks.md) | 轮询异步任务结果 |

## 能力支持

| 能力 | 支持的接口 | 说明 |
| --- | --- | --- |
| 文生图 | Images 生成、Gemini 生成 | 只给提示词 |
| 带参考图生成 / 图生图 | Images 生成、图片编辑、Gemini 生成 | 参考图可传 `data:` URL、公网 URL、或表单文件 |
| 多图参考（融合 / 换装 / 换背景） | 图片编辑、Gemini 生成 | Images 生成也可用 `image` 数组 |
| 分辨率档位 1K / 2K / 4K | Images 生成、图片编辑、Gemini 生成 | 仅 nano-banana / gpt-image vip 系列模型 |
| 局部重绘（mask） | — | 暂不支持，`mask` 参数不生效 |
| 图片变体（variations） | — | 暂不支持 |

> 结果统一为**图片 URL**（不返回 base64），`response_format` 不生效。
