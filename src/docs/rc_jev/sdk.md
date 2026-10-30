---
title: SDK 接入
icon: carbon:sdk
order: 3
footer: false
---

# SDK 接入

TypeSafe 官方提供 Python 和 JavaScript SDK，把 base URL 指到 Right Code、换上你的 ApiKey 就能直接用。

::: warning 三个必改项
1. **base URL**：`https://api.site`。SDK 会自动拼上 `/v1/systemone`，不要自己加 `/v1`。
2. **API Key**：使用绑定了 Jev 渠道的 Right Code ApiKey（`sk-xxxxx`）。
3. **关闭请求压缩**：SDK 默认用 zstd 压缩 1 KiB 以上的请求体，Right Code 目前不支持，会返回 415。Python 传 `compression=False`，JavaScript 传 `compression: false`。
:::

> 未绑定渠道的旧 Key：base URL 填[模型列表](../rc_quick_start/models.md)里复制的该渠道地址；如果复制出来的地址以 `/v1` 结尾，去掉 `/v1`。

## Python

```bash
pip install typesafe-sdk
```

::::tabs

@tab 文本判断

```python
from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

with TypeSafeClient(
    api_key="sk-xxxxx",
    base_url="https://api.site",
    model="jev-1.14.0",
    compression=False,  # Right Code 不接受压缩的请求体
) as client:
    response = client.system_one(
        state="Our payouts have been failing for three days and we launch tomorrow. Please help!",
        questions={
            "is_urgent": Noul(instructions="Does the customer express urgency?"),
            "team": Choice(
                instructions="Which team should handle this message?",
                criteria={
                    "billing": "Payments, invoices, refunds and payouts",
                    "technical": "Bugs, outages and integrations",
                    "sales": None,
                },
            ),
            "frustration": Score(
                instructions="How frustrated is the customer?",
                criteria=["Calm", "Mildly annoyed", "Frustrated", "Very angry"],
            ),
        },
    )

print(response.model)                       # 实际执行的版本号
print(response.nouls["is_urgent"].noul)     # 回答「是」的概率
team = response.choices["team"]
print(team.choice, team.confidence)
print(response.scores["frustration"].score)
print(response.usage.input_tokens)
```

@tab 图片与框选

图片要通过 `headers` 打开开关。`Image` 可以传文件路径或图片字节，直接放进 `state` 或问题里，SDK 会自动生成引用串、填好 `assets`。

```python
from pathlib import Path

from typesafe_sdk import Box, Image, Noul, TypeSafeClient

with TypeSafeClient(
    api_key="sk-xxxxx",
    base_url="https://api.site",
    model="jev-1.14.0",  # box 题需要 1.14
    compression=False,
    headers={"TypeSafe-Danger-Zone-Images": "true"},
) as client:
    response = client.system_one(
        state=["A photo of the kitchen:", Image(Path("kitchen.jpg"))],
        questions={
            "has_mug": Noul(instructions="Is there a coffee mug in the photo?"),
            "mug": Box(instructions="the coffee mug in the photo"),
        },
    )

mug = response.boxes["mug"]
print(response.nouls["has_mug"].noul)
print(mug.box.left, mug.box.top, mug.box.right, mug.box.bottom, mug.confidence)
```

图片需要先处理到符合要求时，可以把[图片要求](./images.md#图片要求)里的 `prepare_for_jev()` 结果直接传给 `Image(...)`。

@tab 异步客户端

```python
import asyncio

from typesafe_sdk import AsyncTypeSafeClient, Noul


async def main() -> None:
    async with AsyncTypeSafeClient(
        api_key="sk-xxxxx",
        base_url="https://api.site",
        model="jev-1.14.0",
        compression=False,
    ) as client:
        response = await client.system_one(
            state={"document": "Order arrived broken. I want a refund."},
            questions={"refund": Noul(instructions="Is the customer asking for a refund?")},
        )
    print(response.nouls["refund"].noul)


asyncio.run(main())
```

::::

- 也可以用环境变量代替构造参数：`TYPESAFE_API_KEY`、`TYPESAFE_BASE_URL`、`TYPESAFE_DEFAULT_MODEL`。
- 只想给单次请求加请求头（例如长上下文），用 `system_one(..., extra_headers={"TypeSafe-Danger-Zone-Long-Context": "true"})`。
- 返回对象上：`nouls`、`choices`、`scores`、`boxes` 按题型取答案，`answers` 是全部答案，`usage` 是 token 用量。

## JavaScript / TypeScript

需要 Node.js 22 或更高版本。

```bash
npm install @typesafe-ai/sdk
```

::::tabs

@tab 文本判断

```ts
import { TypeSafeClient, choice, noul, score } from "@typesafe-ai/sdk";

const client = new TypeSafeClient({
  apiKey: "sk-xxxxx",
  baseURL: "https://api.site",
  defaultModel: "jev-1.14.0",
  compression: false, // Right Code 不接受压缩的请求体
});

const response = await client.systemOne({
  state: "Our payouts have been failing for three days and we launch tomorrow. Please help!",
  questions: {
    is_urgent: noul("Does the customer express urgency?"),
    team: choice("Which team should handle this message?", {
      billing: "Payments, invoices, refunds and payouts",
      technical: "Bugs, outages and integrations",
      sales: null,
    }),
    frustration: score("How frustrated is the customer?", ["Calm", "Mildly annoyed", "Frustrated", "Very angry"]),
  },
});

console.log(response.model);
console.log(response.answers.is_urgent.noul);
console.log(response.answers.team.choice, response.answers.team.confidence);
console.log(response.answers.frustration.score);
console.log(response.usage);
```

@tab 图片与框选

```ts
import { openAsBlob } from "node:fs";
import { TypeSafeClient, box, image, noul } from "@typesafe-ai/sdk";

const client = new TypeSafeClient({
  apiKey: "sk-xxxxx",
  baseURL: "https://api.site",
  defaultModel: "jev-1.14.0", // box 题需要 1.14
  compression: false,
  defaultHeaders: { "TypeSafe-Danger-Zone-Images": "true" },
});

const kitchen = image(await openAsBlob("kitchen.jpg"));
const { answers } = await client.systemOne({
  state: { photo: kitchen },
  questions: {
    has_mug: noul("Is there a coffee mug in `photo`?"),
    mug: box("the coffee mug in `photo`"),
  },
});

console.log(answers.has_mug.noul);
console.log(answers.mug.box, answers.mug.confidence); // { top, bottom, left, right }
```

`image()` 接收图片字节或 `Blob`，只支持 PNG / JPEG；base64 字符串用 `Image.fromBase64(...)`。

::::

- 也可以用环境变量：`TYPESAFE_API_KEY`、`TYPESAFE_BASE_URL`、`TYPESAFE_DEFAULT_MODEL`。
- 单次请求加请求头：`client.systemOne({ ..., headers: { "TypeSafe-Danger-Zone-Long-Context": "true" } })`。
- SDK 默认不允许在浏览器里使用，以免把 Key 暴露给页面用户。

## 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| 415 | 请求体被压缩了，按上面的方式关闭 `compression` |
| 401 | Key 不对，或 base URL 没指到 Right Code，请求发去了 TypeSafe 官方 |
| 404 | base URL 多写了 `/v1`，变成了 `/v1/v1/systemone` |
| 400 带图片时 | 没打开 `TypeSafe-Danger-Zone-Images` 请求头，或图片不符合[要求](./images.md#图片要求) |
| 超时 | JavaScript SDK 单次尝试默认 10 秒超时，图片多或开了长上下文时可调大 `timeout` |
