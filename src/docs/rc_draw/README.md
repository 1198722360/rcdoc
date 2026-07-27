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
3. 从任务结果里取图片 URL 或 base64。

## 接口一览

| 接口 | 用途 |
| --- | --- |
| [图片生成](./images-generations.md) | OpenAI Images 兼容，文生图 / 带参考图 |
| [Gemini 生成](./gemini.md) | Gemini `generateContent` 兼容 |
| [任务查询](./tasks.md) | 轮询异步任务结果 |
