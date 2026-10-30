---
title: OpenAI 生成
icon: hugeicons:chat-gpt
order: 1
footer: false
redirectFrom:
  - /docs/rc_draw/images-generations.html
  - /docs/rc_draw/images-edits.html
---

# OpenAI 生成

OpenAI Images 兼容接口，适用于 GPT Image 系列模型（`gpt-image-2`、`gpt-image-2.5-flare`、`gpt-image-2.5-sunburst`），适合高质量文生图、图片编辑、多参考图融合、海报 / 商品图和文字渲染等场景。

| 接口 | 地址 | 用途 |
| --- | --- | --- |
| [文生图](#文生图) | `POST https://api.site/v1/images/generations` | 只给提示词生成图片 |
| [图片编辑](#图片编辑) | `POST https://api.site/v1/images/edits` | 基于已有图片修改：图生图、换背景、多图融合 |

> 只有 OpenAI 协议有独立的图片编辑接口。Gemini 模型的编辑直接在 [Gemini 生成](./gemini.md) 的同一个接口里带参考图完成。

::: tip 通用约定
- 鉴权头：`Authorization: Bearer sk-xxxxx`
- 请求体带 `"async": true`，立即返回 `task_id`，再到[任务查询](./tasks.md)取结果。
- 结果为图片 URL（`data[].url`），不返回 base64。
:::

## 模型

| 模型 | 定位 | 质量档位（`quality`） |
| --- | --- | --- |
| `gpt-image-2` | GPT Image 2 基础模型 | `auto`、`low`、`medium`、`high` |
| `gpt-image-2.5-flare` | 速度优先，适合日常高质量图片生成 | `auto`、`low`、`medium`、`high`、`xhigh`、`max` |
| `gpt-image-2.5-sunburst` | 能力优先，适合对编辑精度要求高的场景 | `auto`、`low`、`medium`、`high`、`xhigh`、`max` |

::: warning 质量档位
`xhigh` 和 `max` 是 GPT Image 2.5 新增的质量档位，只能用于 `gpt-image-2.5-flare` 和 `gpt-image-2.5-sunburst`。`gpt-image-2` 仍只支持 `auto`、`low`、`medium`、`high`。
:::

**怎么选**：日常出图、批量出图选 `gpt-image-2.5-flare`；图片编辑、多图融合、对细节和文字要求高时选 `gpt-image-2.5-sunburst`。三个模型的接口和参数完全一致，换模型只需改 `model`。

## 文生图

`POST https://api.site/v1/images/generations`

### 请求示例

::::tabs

@tab 基础

```bash
curl -sS -X POST "https://api.site/v1/images/generations" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "一只戴着太空头盔的橘猫，电影级光影",
    "n": 1,
    "size": "1024x1024",
    "async": true
  }'
```

@tab 高质量（GPT Image 2.5）

```bash
curl -sS -X POST "https://api.site/v1/images/generations" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2.5-flare",
    "prompt": "湿润黑色岩石上的透明香水瓶商业海报，棚拍光线清晰锐利，顶部写有优雅的英文标题 \"AURORA\"",
    "n": 1,
    "size": "1536x1024",
    "quality": "xhigh",
    "output_format": "png",
    "async": true
  }'
```

::::

### 请求参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `model` | string | 是 | - | `gpt-image-2`、`gpt-image-2.5-flare` 或 `gpt-image-2.5-sunburst` |
| `prompt` | string | 是 | - | 提示词。建议写清主体、场景、材质、光线、构图、风格，以及需要出现在图里的文字 |
| `async` | boolean | 是 | - | 固定 `true`，立即返回 `task_id` |
| `n` | integer | 否 | `1` | 生成数量。建议保持 `1`，便于控制耗时和费用 |
| `size` | string | 否 | `auto` | 输出尺寸：`auto` 或 `宽x高` 像素值，如 `1024x1024`、`1536x1024`、`1024x1536`，规则见[尺寸规则](#尺寸规则) |
| `quality` | string | 否 | `auto` | 渲染质量。`gpt-image-2` 可选 `auto`、`low`、`medium`、`high`；两个 2.5 模型还可选 `xhigh`、`max` |
| `output_format` | string | 否 | `png` | 图片格式：`png`、`jpeg`、`webp`。关注体积和速度时可优先用 `jpeg` |
| `output_compression` | integer | 否 | - | 压缩率 `0`–`100`，仅 `output_format` 为 `jpeg` / `webp` 时有效 |
| `background` | string | 否 | `auto` | 背景策略。不支持透明背景，不要传 `transparent` |
| `moderation` | string | 否 | `auto` | 内容审核强度：`auto`、`low` |

### 尺寸规则

GPT Image 系列使用像素尺寸（`宽x高`），不是 `1K` / `2K` / `4K` 档位。常用值：

| 场景 | 推荐值 |
| --- | --- |
| 自动选择 | `auto` |
| 正方形 | `1024x1024`、`2048x2048` |
| 横图 | `1536x1024`、`2048x1152`、`3840x2160` |
| 竖图 | `1024x1536`、`2160x3840` |

自定义尺寸需同时满足：

| 约束 | 规则 |
| --- | --- |
| 最大边长 | 宽、高都不超过 `3840` px |
| 边长倍数 | 宽、高都是 `16` 的倍数 |
| 宽高比 | 长边 : 短边不超过 `3:1` |
| 总像素 | 介于 `655,360` 与 `8,294,400` 之间 |

::: warning
超过 `2560x1440` 的尺寸属于实验性大图，耗时更长、失败率更高，建议先小批量验证再正式使用。
:::

## 图片编辑

`POST https://api.site/v1/images/edits`

和 OpenAI 官方一样，支持两种传图方式：

| 方式 | Content-Type | 参考图字段 |
| --- | --- | --- |
| 上传文件 | `multipart/form-data` | `image` 文件字段，多张就重复传多个 `image` |
| JSON 传图 | `application/json` | `image` 或 `images` 数组，元素为 `data:` URL 或公网图片 URL |

### 请求示例

::::tabs

@tab 上传文件（multipart）

官方 SDK 的默认形态，`image` 字段直接传本地文件。

```bash
curl -sS -X POST "https://api.site/v1/images/edits" \
  -H "Authorization: Bearer sk-xxxxx" \
  -F "model=gpt-image-2" \
  -F "prompt=把背景换成夜晚的雪山，保留主体" \
  -F "image=@/path/to/input.png;type=image/png" \
  -F "size=1024x1024" \
  -F "async=true"
```

@tab JSON + base64

```bash
curl -sS -X POST "https://api.site/v1/images/edits" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2",
    "prompt": "把背景换成夜晚的雪山，保留主体",
    "image": [
      "data:image/png;base64,{BASE64_IMAGE}"
    ],
    "size": "1024x1024",
    "async": true
  }'
```

@tab 多图参考（URL）

传多张参考图做融合 / 换装 / 换背景，提示词里用「第一张图」「第二张图」指代各参考图。对编辑精度要求高时推荐 `gpt-image-2.5-sunburst`。

```bash
curl -sS -X POST "https://api.site/v1/images/edits" \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-2.5-sunburst",
    "prompt": "把第一张图的商品放进第二张图的场景里，保持商品标签清晰锐利",
    "images": [
      "https://cdn.example.com/product.png",
      "https://cdn.example.com/background.png"
    ],
    "size": "1536x1024",
    "quality": "xhigh",
    "async": true
  }'
```

::::

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | `gpt-image-2`、`gpt-image-2.5-flare` 或 `gpt-image-2.5-sunburst` |
| `prompt` | string | 是 | 编辑指令。建议说明保留哪些元素、修改哪些区域、目标风格和文字要求 |
| `image` / `images` | file / array | 是 | 参考图。multipart 下用 `image` 文件字段（可重复多个）；JSON 下 `image` 与 `images` 等价，元素支持 `data:image/...;base64,...` 或公网可访问的 `http(s)` 图片 URL |
| `async` | boolean | 是 | 固定 `true`，立即返回 `task_id` |
| `n` | integer | 否 | 生成数量，缺省 `1` |
| `size` | string | 否 | 输出尺寸，规则同[文生图](#尺寸规则) |
| `quality` | string | 否 | 同文生图：`gpt-image-2` 最高 `high`，2.5 模型可用 `xhigh`、`max` |
| `output_format` / `output_compression` / `moderation` | - | 否 | 同[文生图](#请求参数) |
| `mask` | file | 否 | 局部重绘遮罩，**当前不生效**，需要局部修改请在提示词里写清楚 |

## 响应

两个接口的响应一致。提交成功后立即返回任务号：

```json
{
  "task_id": "task_0123456789abcdef0123456789abcdef",
  "status": "processing",
  "progress": 0,
  "message": "任务id: task_0123456789abcdef0123456789abcdef，任务还在处理中，请稍后到异步任务中查看结果"
}
```

拿 `task_id` 到[任务查询](./tasks.md)轮询，完成后返回 OpenAI `ImagesResponse` 形状，图片在 `data[].url`：

```json
{
  "created": 1782800000,
  "data": [
    { "url": "https://cdn.example.com/results/task_0123456789abcdef.png" }
  ]
}
```

## 提示词建议

- **按「主体 → 场景 → 风格 → 细节」组织**：如「一瓶透明香水，放在湿润的黑色岩石上，商业棚拍风格，柔和侧光，浅景深」。
- **图中文字用引号括起来**，并说明位置和字体风格，如：顶部居中写 "AURORA"，细衬线字体。
- **编辑时先说保留什么，再说改什么**，如「保持人物面部和姿势不变，只把背景换成夜晚的雪山」。
- **多图参考时按顺序指代**：「第一张图的商品」「第二张图的场景」。

## 耗时与费用

- 质量越高、尺寸越大、参考图越多，耗时和费用越高。
- 对速度敏感的场景，先用 `quality: "low"` 或较小尺寸出草稿，确认构图后再提到 `medium` / `high`。
- 只有使用 2.5 模型且确实需要更高画质时，再选 `xhigh` 或 `max`。

## 注意事项

- **结果固定为图片 URL**：异步结果不回传 base64，`response_format` 不生效。
- **`mask`（局部重绘）当前不生效**：参数会被接收但不作用于生成，请改为在提示词里描述要修改的区域。
- **`variations`（图片变体）不支持**。
- 参考图 URL 必须公网可访问；图片较大时建议先压缩再上传，能明显加快生成速度。
