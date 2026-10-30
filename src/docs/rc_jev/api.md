---
title: 接口参考
icon: mdi:api
order: 1
footer: false
---

# 接口参考

`POST https://api.site/v1/systemone`

对一个 `state` 并行回答一组带类型的问题，一次返回全部答案。不支持流式。

## 请求头

| 请求头 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-xxxxx`，使用绑定了 Jev 渠道的 ApiKey |
| `Content-Type` | 是 | `application/json`；带图片时也可以用 `multipart/form-data`，见[图片输入与框选](./images.md#multipart-上传) |
| `TypeSafe-Danger-Zone-Images` | 带图片或 `box` 题时必填 | 固定 `true`。请求里有图片或 `box` 题却没带这个头，会返回 400 |
| `TypeSafe-Danger-Zone-Long-Context` | 否 | 固定 `true`，把单次请求和单题上下文都放宽到 262k token。同样按 token 计费，但更慢、准确率更低，只在确实需要时开启 |

::: warning 不要压缩请求体
官方 SDK 默认会用 zstd 压缩 1 KiB 以上的请求体（`Content-Encoding: zstd`）。Right Code 需要读取请求体计费，目前不支持压缩请求，会返回 415。用 SDK 时请关闭压缩，见 [SDK 接入](./sdk.md)。
:::

## 请求体

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型名，如 `jev-1.14.0`、`jev-latest`，见[可用模型](./README.md#可用模型) |
| `state` | string / object / array | 是 | 要评估的上下文：一段文本，或聊天记录、表单、业务数据等结构化 JSON |
| `questions` | object | 是 | 问题表，键是你自定义的问题 id，值是 [Question](#题型)。至少一道题 |
| `assets` | object | 否 | 图片资源表，带图片时使用，见[图片输入与框选](./images.md) |

### state

- **纯文本**：直接传字符串。
- **结构化数据**：传对象或数组，字段名也会被模型看到。在问题里可以用反引号写字段名来指代内容，例如 state 是 `{"reply": "...", "customer": "..."}` 时，问 ``Is `reply` polite to `customer`?``。
- 数组和对象最多嵌套 64 层；数字只能是有限值，ID、大整数这类需要精确保留的值请用字符串。

### questions

- 问题 id **不会发给模型**，只用来对应答案，可以随意命名。
- 每道题都有 `type` 和 `instructions`，大多数题型还带 `criteria`。
- `instructions` 可以是字符串、对象或数组。用对象时，可以把问题放在一个字段里，参考资料放在其他字段里。

```json
{
  "type": "noul",
  "instructions": {
    "question": "Does the reply follow `policy`?",
    "policy": "Never promise a refund before the order is inspected."
  }
}
```

## 题型

### noul：是非题

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | 是 | `"noul"` |
| `instructions` | 是 | 要判断的问题 |
| `criteria` | 否 | `{"true": "什么算是", "false": "什么算否"}`，用来说明判断边界 |

```json
{
  "type": "noul",
  "instructions": "Does the customer express urgency?",
  "criteria": { "true": "Explicitly time-sensitive", "false": "No urgency expressed" }
}
```

答案：

| 字段 | 说明 |
| --- | --- |
| `noul` | 回答「是」的概率，0 到 1。接近 1 表示是，接近 0 表示否 |

### choice：单选题

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | 是 | `"choice"` |
| `instructions` | 是 | 问题 |
| `criteria` | 是 | 选项表：键是选项名，值是选项描述（可以为 `null`）。1 到 255 个选项 |

```json
{
  "type": "choice",
  "instructions": "Which team should handle this message?",
  "criteria": {
    "billing": "Payments, invoices, refunds and payouts",
    "technical": "Bugs, outages and integrations",
    "sales": null
  }
}
```

答案：

| 字段 | 说明 |
| --- | --- |
| `choice` | 概率最高的选项名 |
| `probabilities` | 每个选项的概率，总和为 1 |
| `confidence` | 置信度，0 到 1 |

### score：评分题

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | 是 | `"score"` |
| `instructions` | 是 | 问题 |
| `criteria` | 是 | 有序等级描述数组，第一个是 0 分。2 到 10 个等级 |

```json
{
  "type": "score",
  "instructions": "How frustrated is the customer?",
  "criteria": ["Calm", "Mildly annoyed", "Frustrated", "Very angry"]
}
```

答案：

| 字段 | 说明 |
| --- | --- |
| `score` | 按概率加权的分值，可能落在两个等级之间，例如 `2.1` |
| `legend` | 等级编号（字符串）到等级描述的映射 |
| `probabilities` | 每个等级的概率，总和为 1 |
| `confidence` | 置信度，0 到 1 |

### box：图片框选

在图片里定位 `instructions` 描述的目标，**只有 `jev-1.14.0`（或 `jev-preview`）支持**，请求里必须带图片和 `TypeSafe-Danger-Zone-Images: true` 头。

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | 是 | `"box"` |
| `instructions` | 是 | 要找什么、在哪张图里，例如 ``the coffee mug in `photo` `` |
| `criteria` | — | 不支持，不要传 |

答案：

| 字段 | 说明 |
| --- | --- |
| `box.top` / `box.bottom` | 上、下边，相对**图片高度**的比例，0 到 1 |
| `box.left` / `box.right` | 左、右边，相对**图片宽度**的比例，0 到 1 |
| `confidence` | 置信度，0 到 1，可能为 `null` |

坐标原点在图片左上角，换算和使用建议见[图片输入与框选 · box](./images.md#box-框选)。

## 响应

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `model` | string | 实际执行的版本号，例如请求 `jev-latest` 时这里是 `jev-1.13.0` |
| `answers` | object | 每道题一个答案，键与请求里的问题 id 相同，每个答案带 `type` |
| `usage.input_tokens` | integer | 输入 token 数，包含图片折算的 token |
| `usage.output_tokens` | integer | 输出 token 数（不计费） |

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "is_urgent": { "type": "noul", "noul": 0.97 },
    "team": {
      "type": "choice",
      "choice": "billing",
      "probabilities": { "billing": 0.88, "technical": 0.12, "sales": 0.0 },
      "confidence": 0.81
    },
    "mug": {
      "type": "box",
      "box": { "top": 0.25, "bottom": 0.82, "left": 0.44, "right": 0.84 },
      "confidence": 0.92
    }
  },
  "usage": { "input_tokens": 290, "output_tokens": 21 }
}
```

## 限制

| 项 | 限制 |
| --- | --- |
| 请求体大小 | 32 MiB（包含 JSON、base64 图片和 multipart 分隔，不含请求头） |
| 编码 | UTF-8 JSON，不能带 BOM |
| 嵌套层数 | `state`、`instructions`、`criteria` 最多 64 层 |
| 上下文 | 单次请求（state 加全部题目）64k token；state 加任意一道题 32k token；开启长上下文后都是 262k |
| 选项 / 等级 | `choice` 最多 255 个选项；`score` 2 到 10 个等级 |
| 题目数量 | 不限，只要满足上面的上下文限制 |

## 错误码

| 状态码 | 常见原因 | 处理建议 |
| --- | --- | --- |
| 400 | 请求不符合规则；带图片或 `box` 题却没带 `TypeSafe-Danger-Zone-Images`；图片不合规；`max_tokens_exceeded` 表示超出上下文长度 | 按返回信息修正；超长时精简 state，或开启长上下文 |
| 401 | 未传 Key、Key 无效，或用了 `x-api-key` 传 Key | 改用 `Authorization: Bearer sk-xxxxx` |
| 403 | Key 被禁用，或没有该模型的权限 | 检查 [ApiKey 管理](../rc_quick_start/apikey.md)中的 Key 状态和可用模型 |
| 413 | 请求体超过 32 MiB，或图片超出大小限制 | 减少或压缩图片 |
| 415 | 请求体被压缩（`Content-Encoding`） | 关闭 SDK 的请求压缩 |
| 422 | 字段缺失或格式错误，例如 `choice` 题没有 `criteria`；返回体会指出出错字段 | 按返回的字段路径修正 |
| 429 | 触发限流或余额不足 | 降低并发，检查余额 |
| 529 | 上游临时过载 | 稍等后重试，建议指数退避 |
| 5xx | 暂无可用上游或上游临时不可用 | 稍后重试 |

## 注意事项

- **每次请求都是独立评估**，不保存上下文；需要参考历史时，请把历史放进 `state`。
- **请求失败不扣费**，只有成功返回的请求按 `usage.input_tokens` 计费。
- 如果账号开启了「隐私过滤」，state 和问题里的手机号、邮箱、证件号、密钥等会被替换成占位符再发给模型，可能影响相关判断。需要判断这类信息时请关闭该功能。
