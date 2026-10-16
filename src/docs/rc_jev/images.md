---
title: 图片输入与框选
icon: material-symbols:image-search
order: 2
footer: false
---

# 图片输入与框选

Jev 1.13 和 1.14 可以接收 PNG / JPEG 图片：图片可以放进 `state` 作为被评估的内容，也可以放进问题的 `instructions` 或 `criteria` 作为参照。`jev-1.14.0` 还新增了 [`box` 框选题](#box-框选)，用来定位图片里的目标。

::: warning 实验性功能
图片输入目前是 TypeSafe 的实验性功能，请求格式、限制和准确率都可能随版本变化。官方也提示，所有模型处理图片的效果都不如处理纯文本，上线前请用自己的图片充分测试。
:::

## 开启方式

带图片或 `box` 题的请求，必须加请求头：

```text
TypeSafe-Danger-Zone-Images: true
```

不带这个头会返回 400。不带图片、也没有 `box` 题的普通请求不需要加。

| 模型 | 图片输入 | `box` 框选 |
| --- | --- | --- |
| `jev-1.14.0` / `jev-preview` | ✅ | ✅ |
| `jev-1.13.0` | ✅ | ❌ |
| `jev-latest` | ✅ | 取决于当前指向的版本，建议直接写 `jev-1.14.0` |

## JSON 传图

图片统一放在请求体顶层的 `assets` 里：键是你起的**引用串**，值是图片数据。然后在 `state`、`instructions` 或 `criteria` 的文本里写这个引用串，表示「图片放在这里」。

```json
{
  "model": "jev-1.14.0",
  "state": { "photo": "a3f1c2e8-found" },
  "assets": {
    "a3f1c2e8-found": {
      "type": "image",
      "format": "jpg",
      "data_base64": "{BASE64_IMAGE}"
    }
  },
  "questions": {
    "has_collar": {
      "type": "noul",
      "instructions": "Is the dog in `photo` wearing a collar?"
    }
  }
}
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | 否 | 传的话必须是 `"image"` |
| `format` | 用 `data_base64` 时必填 | `png`、`jpg` 或 `jpeg`（小写，`jpeg` 等同 `jpg`） |
| `data_base64` | 用 JSON 传图时必填 | 标准 base64（带 `=` 补位），不能有空格换行，不能带 `data:image/...;base64,` 前缀 |
| `part` | 用 multipart 上传时必填 | 对应的文件 part 名，见 [multipart 上传](#multipart-上传) |

base64 很长，建议把请求体存成文件再发：

```bash
curl -sS https://www.rightapi.ai/v1/systemone \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "Content-Type: application/json" \
  -H "TypeSafe-Danger-Zone-Images: true" \
  -d @request.json
```

::: info 如何得到 BASE64_IMAGE
填图片文件的纯 base64 字符串：

- macOS：`base64 -i photo.jpg | tr -d '\n'`
- Linux：`base64 -w 0 photo.jpg`
:::

## 引用规则

- **按纯文本匹配。** 引用串出现在字符串的任何位置都会被替换成图片，包括句子中间。所以引用串要足够独特，推荐用 UUID，避免和正文里的普通单词撞上。
- **对象的键不会被替换。** 问题 id、`choice` 的选项名等键永远是文本。
- **每张图都必须被引用。** `assets` 里有图但文本里没出现它的引用串，会返回 400。
- **出现几次就算几份。** 同一个引用串写两次，模型会看到两份图片，token 也算两份。
- **答案里只回显引用串。** 例如 `score` 题的等级描述里用了图片，`legend` 里看到的是引用串，不是图片。
- 单个引用串最长 1,024 字节，全部引用串合计不超过 65,536 字节，不能是空串或纯空白。

## 图片放在哪里

::::tabs

@tab 放进 state

图片和其他数据一起被评估，可以嵌套在对象或数组里，问题里用反引号写字段名来指代。

```json
{
  "state": {
    "listing_photo": "8d0e6f4a-listing",
    "returned_photo": "2b7c9e1d-returned",
    "customer_note": "The item arrived scratched."
  },
  "questions": {
    "same_item": {
      "type": "noul",
      "instructions": "Is `returned_photo` the same item as `listing_photo`?"
    },
    "damaged": {
      "type": "noul",
      "instructions": "Does `returned_photo` show visible damage?"
    }
  }
}
```

@tab 放进 instructions

图片只随这一道题发送，适合「拿这张参考图来对比」这类问题。

```json
{
  "state": { "photo": "a3f1c2e8-found" },
  "questions": {
    "same_dog": {
      "type": "noul",
      "instructions": {
        "question": "Is the dog in `photo` the same dog as in `reference`?",
        "reference": "5c1d7b20-lost-dog"
      }
    }
  }
}
```

@tab 放进 criteria

用示例图定义选项或等级。每个选项可以是一张图、一段描述加若干示例图，或者纯文字。

```json
{
  "state": { "photo": "a3f1c2e8-hand" },
  "questions": {
    "gesture": {
      "type": "choice",
      "instructions": "Which gesture is shown in `photo`?",
      "criteria": {
        "thumbs_up": "0b6c51aa-thumb",
        "open_palm": {
          "description": "Palm facing the camera.",
          "examples": ["4fd2e7b9-palm1", "91aa03c6-palm2"]
        },
        "none": "No hand, or a hand matching no example."
      }
    }
  }
}
```

`score` 的等级、`noul` 的 `true` / `false` 说明也可以这样带图。

::::

> 以上片段省略了 `model` 和 `assets`，实际请求里每个引用串都要在 `assets` 中有对应图片。

## multipart 上传

base64 会让体积增大约三分之一，图片多或图片大时建议用 `multipart/form-data` 直接上传文件：

- 第一个 part 名为 `request`，内容是上面的 JSON 请求体（`Content-Type: application/json`）。
- 每张图一个文件 part，在 `assets` 里用 `"part": "<part 名>"` 指向它，此时不需要 `data_base64`，`format` 也可以省略。
- 文件 part 的类型可以是 `image/png`、`image/jpeg`、`application/octet-stream` 或不写。
- part 名不能重复，`request` 是保留名；每个文件 part 必须恰好被一个图片引用。

`request.json`：

```json
{
  "model": "jev-1.14.0",
  "state": { "photo": "a3f1c2e8-kitchen" },
  "assets": { "a3f1c2e8-kitchen": { "type": "image", "part": "kitchen" } },
  "questions": {
    "has_mug": { "type": "noul", "instructions": "Is there a coffee mug in `photo`?" },
    "mug": { "type": "box", "instructions": "the coffee mug in `photo`" }
  }
}
```

```bash
curl -sS https://www.rightapi.ai/v1/systemone \
  -H "Authorization: Bearer sk-xxxxx" \
  -H "TypeSafe-Danger-Zone-Images: true" \
  -F "request=<request.json;type=application/json" \
  -F "kitchen=@kitchen.jpg;type=image/jpeg"
```

::: tip
`-F` 时不要手动写 `Content-Type: multipart/form-data`，curl 会自动带上 boundary。`request=<文件` 表示把文件内容作为普通字段发送，`kitchen=@文件` 表示上传文件。
:::

## 图片要求

| 项 | 要求 |
| --- | --- |
| 格式 | PNG 或 JPEG 静态图；动图 PNG 会被拒绝 |
| 宽、高 | 每边 256 到 1568 像素 |
| 总像素 | 78,400 到 2,458,624（即 280×280 到 1568×1568） |
| 单张大小 | 16 MiB（base64 按解码后计算） |
| 请求体 | 32 MiB，包含 JSON、base64 和 multipart 分隔 |
| 张数 | 没有固定上限，受请求体大小和上下文长度限制 |

**超出范围的图片会被直接拒绝，不会自动缩放**；任何一张图不合规，整个请求都会失败。上游会去掉图片的元数据，**也不会按 EXIF 方向旋转**。发送前建议：

- 按 EXIF 方向把像素摆正（手机拍的照片常见问题）。
- 长边缩到 1568 以内；每边小于 256 的放大，或在短边补边。
- GIF、WebP、HEIC 先转成 PNG 或 JPEG；JPEG 优先用普通（非渐进式）格式。
- 某张图在别处能打开、发过去却被拒绝时，重新导出成 PNG 或 JPEG 再试。

下面这个 Python 函数（依赖 Pillow）把任意图片转成符合要求的 JPEG：

```python
import math
from io import BytesIO

from PIL import Image, ImageOps

MIN_SIDE, MAX_SIDE, MIN_PIXELS = 256, 1568, 78_400


def prepare_for_jev(path: str) -> bytes:
    """把任意图片转成 Jev 接受的 JPEG：摆正方向、去透明和动画、尺寸调进官方范围。"""
    img = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    w, h = img.size
    scale = min(1.0, MAX_SIDE / max(w, h))  # 太大：缩小
    scale = max(scale, MIN_SIDE / min(w, h), math.sqrt(MIN_PIXELS / (w * h)))  # 太小：放大
    scale = min(scale, MAX_SIDE / max(w, h))  # 放大后也不能超过 1568
    size = (min(MAX_SIDE, max(1, round(w * scale))), min(MAX_SIDE, max(1, round(h * scale))))
    img = img.resize(size, Image.LANCZOS)

    # 长宽比太极端、放大不够时，在短边居中补白
    cw, ch = max(img.width, MIN_SIDE), max(img.height, MIN_SIDE)
    if cw * ch < MIN_PIXELS:
        if cw <= ch:
            cw = math.ceil(MIN_PIXELS / ch)
        else:
            ch = math.ceil(MIN_PIXELS / cw)
    if (cw, ch) != img.size:
        canvas = Image.new("RGB", (cw, ch), "white")
        canvas.paste(img, ((cw - img.width) // 2, (ch - img.height) // 2))
        img = canvas

    buf = BytesIO()
    img.save(buf, format="JPEG", quality=90)
    return buf.getvalue()
```

## 计费

图片没有单独费用，按输入 token 计费：图片折算的 token 已包含在 `usage.input_tokens` 里，也计入上下文长度。同一张图每被引用一次就多算一份。

## box 框选

`box` 题在图片里找出 `instructions` 描述的目标，返回一个矩形框。只有 `jev-1.14.0` / `jev-preview` 支持，请求里必须有图片和 `TypeSafe-Danger-Zone-Images: true` 头；`box` 题不带 `criteria`，可以和其他题型放在同一次请求里。

```json
{
  "model": "jev-1.14.0",
  "state": { "photo": "a3f1c2e8-kitchen" },
  "assets": {
    "a3f1c2e8-kitchen": { "type": "image", "format": "jpg", "data_base64": "{BASE64_IMAGE}" }
  },
  "questions": {
    "has_mug": { "type": "noul", "instructions": "Is there a coffee mug in `photo`?" },
    "mug": { "type": "box", "instructions": "the coffee mug in `photo`" }
  }
}
```

返回：

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "has_mug": { "type": "noul", "noul": 0.98 },
    "mug": {
      "type": "box",
      "box": { "top": 0.25, "bottom": 0.82, "left": 0.44, "right": 0.84 },
      "confidence": 0.92
    }
  },
  "usage": { "input_tokens": 290, "output_tokens": 21 }
}
```

### 坐标

四条边都是 0 到 1 的比例，原点在**左上角**：`top` / `bottom` 相对图片高度，`left` / `right` 相对图片宽度，并且 `left < right`、`top < bottom`。换算成像素（`W`、`H` 是**你发送的那张图**的宽高）：

```text
x1 = left × W     y1 = top × H
x2 = right × W    y2 = bottom × H
```

如果发送前缩放或补过边，要用处理后的图换算，再映射回原图。

### 使用建议

- **配一道 noul 判断目标在不在。** `box` 每次都会给出一个框，即使图里没有目标；先看 noul 的概率，低时忽略这个框。
- **写清目标和图片。** 有多张图时，用反引号写明是哪张，例如 ``the red car in `rear_camera` ``。
- **同类目标有多个时**，描述你要的那一个（「最左边的杯子」），或者每个目标单独一道 `box` 题。每道 `box` 题只返回一个框。
- **小目标先粗后细。** 先在整图上框出大致区域，裁剪后再问一次，最后把坐标换算回原图。
- **低置信度时**，可以换更大或裁剪过的图重试，或把框适当外扩后裁剪，再用 noul 题逐条检查边缘是否切到目标。

## 常见错误

| 状态码 | 原因 |
| --- | --- |
| 400 | 没带 `TypeSafe-Danger-Zone-Images` 头；格式不是 PNG/JPEG、动图、图片损坏或尺寸太小；base64 不合法；有图片没被引用；引用串为空；multipart 规则不满足 |
| 400 `max_tokens_exceeded` | 图片加文本超出上下文长度 |
| 413 | 单张图、像素、请求体、图片总量或引用串长度超出限制 |

一个请求里有多张图不合规时，只会报告其中一个问题，修正后再重试即可。
