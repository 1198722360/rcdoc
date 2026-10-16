---
title: Jev 决策模型
icon: carbon:decision-tree
order: 0
footer: false
---

# Jev 决策模型

Jev 是 TypeSafe 推出的 System One 决策模型。它**不生成文本**：你给一段上下文 `state` 和一组带类型的问题，它对每个问题并行给出**概率和置信度**。适合分类、路由、审核、打分、信息核对这类需要快速、结构化、可量化判断的场景。和让大模型输出 JSON 再解析相比，Jev 更快、更便宜，结果也更稳定。

- **一次请求问多个问题**，答案按你起的问题 id 返回。
- **四种题型**：是非 `noul`、单选 `choice`、评分 `score`、图片框选 `box`。
- **支持 PNG / JPEG 图片输入**（实验性），见[图片输入与框选](./images.md)。
- **只按输入 token 计费**，输出 token 免费。

## 可用模型

| 模型 | 说明 |
| --- | --- |
| `jev-1.14.0` | 最新版本（2026-10-14 发布），支持图片输入和框选 `box` |
| `jev-1.13.0` | 上一个版本，支持图片输入，**不支持** `box` |
| `jev-latest` | 别名，指向最新的稳定版（目前为 `jev-1.13.0`，之后会切到新版本） |
| `jev-preview` | 别名，指向最新发布的版本（目前为 `jev-1.14.0`） |

::: tip 用版本号锁定行为
别名会随新版本发布移动。响应里的 `model` 字段是实际执行的版本号；需要结果稳定、可复现时，请直接写 `jev-1.14.0` 或 `jev-1.13.0`。
:::

> 实际可用的模型和价格以[渠道与模型](../rc_quick_start/models.md)中列出的为准。

## 基础信息

| 项 | 值 |
| --- | --- |
| 接口 | `POST https://www.rightapi.ai/v1/systemone` |
| 鉴权头 | `Authorization: Bearer sk-xxxxx` |
| 请求格式 | `Content-Type: application/json`；带图片时也可以用 `multipart/form-data` |
| 流式 | 不支持，一次返回完整结果 |
| 上下文 | 单次请求 64k token，state 加任意一道题不超过 32k token；可开启[长上下文](./api.md#请求头)到 262k |
| 计费 | 按输入 token 计费，图片折算为输入 token，输出 token 免费；请求失败不扣费 |

::: warning Key 与地址
- 请使用**绑定了 Jev 渠道**的 ApiKey（见 [ApiKey 管理](../rc_quick_start/apikey.md)），直接调用上面的统一地址。
- 未绑定渠道的旧 Key：把 `https://www.rightapi.ai` 换成[模型列表](../rc_quick_start/models.md)里复制的该渠道 BaseUrl，路径仍是 `/v1/systemone`。
- 鉴权请用 `Authorization: Bearer`。用 `x-api-key` 传 Key 会导致上游鉴权失败。
:::

## 快速上手

下面一次请求同时问了三个问题：客户是否着急（是非）、该分给哪个团队（单选）、情绪有多激动（评分）。

```bash
curl -sS https://www.rightapi.ai/v1/systemone \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "jev-1.14.0",
    "state": "Our payouts have been failing for three days and we launch tomorrow. Please help!",
    "questions": {
      "is_urgent": {
        "type": "noul",
        "instructions": "Does the customer express urgency?"
      },
      "team": {
        "type": "choice",
        "instructions": "Which team should handle this message?",
        "criteria": {
          "billing": "Payments, invoices, refunds and payouts",
          "technical": "Bugs, outages and integrations",
          "sales": "Pricing, upgrades and new accounts"
        }
      },
      "frustration": {
        "type": "score",
        "instructions": "How frustrated is the customer?",
        "criteria": ["Calm", "Mildly annoyed", "Frustrated", "Very angry"]
      }
    }
  }'
```

返回（数值仅为示例）：

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
    "frustration": {
      "type": "score",
      "score": 2.1,
      "legend": { "0": "Calm", "1": "Mildly annoyed", "2": "Frustrated", "3": "Very angry" },
      "probabilities": { "0": 0.0, "1": 0.12, "2": 0.66, "3": 0.22 },
      "confidence": 0.74
    }
  },
  "usage": { "input_tokens": 118, "output_tokens": 9 }
}
```

- `noul` 是回答「是」的概率，0 表示否，1 表示是。
- `choice` 是概率最高的选项，`probabilities` 给出每个选项的概率。
- `score` 是按概率加权的分值，可能落在两个等级之间；`legend` 对应每个等级的描述。
- `confidence` 是模型对这次判断的把握程度，和概率不是一回事，用来决定要不要采纳结果。

## 文档导航

| 文档 | 内容 |
| --- | --- |
| [接口参考](./api.md) | 请求头、请求体、四种题型、响应字段、错误码和限制 |
| [图片输入与框选](./images.md) | 开启图片、`assets` 引用规则、multipart 上传、图片要求、`box` 框选 |
| [SDK 接入](./sdk.md) | 用官方 Python / JavaScript SDK 调用 Right Code |
| [在线对话测试](./chat.md) | 在控制台的「在线对话」里直接编辑问题、上传图片、查看结果 |

## 使用建议

- **一道题只问一件事。** 想知道多个维度，就拆成多道题放在同一次请求里，比分多次请求更省钱、更快。
- **把选项和等级写清楚。** `choice` 的每个选项、`score` 的每个等级都写一句描述，模型才知道边界在哪。
- **按置信度分流。** 置信度高的结果直接用；置信度低的交给人工、大模型或更细的追问。
- **用 state 的字段名指代内容。** state 是对象时，可以在 instructions 里用反引号写字段名，例如 ``Is `reply` polite to `customer`?``。
- **需要稳定结果时锁定版本号**，不要依赖 `jev-latest` 这类别名。
