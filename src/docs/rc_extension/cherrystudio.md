---
title: 在 CherryStudio 中配置使用
icon: /assets/icon/cherrystudio/cherrystudio.png
order: 1
footer: false
---

CherryStudio 支持 OpenAI 兼容接口，可以直接接入 RightCode 使用。

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、进入服务商配置页面

> 根据你的情况选择对应的入口：**刚下载 CherryStudio** 的新用户看「首次启动」，**已经在用 CherryStudio** 的看「日常使用」。

::::tabs#cherrystudio

@tab 首次启动

1. 首次打开 CherryStudio 会进入欢迎页，确认底部已勾选 `我已阅读并同意 隐私协议`，然后点击 `配置其他服务商`

![](/assets/image/rc_extension/cherrystudio/welcome-setup.webp)

> 不要点上面的 `连接 CherryIN`，那是 CherryStudio 自家的服务，和 RightCode 无关。

@tab 日常使用

1. 在 CherryStudio 主界面，点击左下角的 **设置**（齿轮图标），进入配置页面

![](/assets/image/rc_extension/cherrystudio/daily-settings.webp)

> 进入后选择 `模型服务`，就能看到服务商列表，后面的操作和首次启动完全一样。

::::

## 二、添加 RightCode 服务商

:::tip
从这一步开始，**首次启动和日常使用的操作都是一样的**，按顺序往下做即可。
:::

1. 在左侧服务商列表的底部，点击 `添加服务商`

![](/assets/image/rc_extension/cherrystudio/add-provider.webp)

2. 在弹出的「添加自定义提供商」窗口中，按下面填写，然后点击 `添加`

- `提供商名称`：填 `RightCode`
- `API 密钥`：粘贴你在 RightCode 后台「令牌管理」页面生成的 ApiKey
- `端点设置` → `OpenAI`：填 `https://rightapi.ai/v1`

![](/assets/image/rc_extension/cherrystudio/provider-form.webp)

:::warning 注意地址结尾的 /v1
OpenAI 兼容的地址**必须带上 `/v1`**，即 `https://rightapi.ai/v1`。填写正确时，输入框下方会显示请求路径 `https://rightapi.ai/v1/chat/completions`。
如果还要配置其他类型的端点（如 Anthropic），地址统一填 `https://rightapi.ai`，**不带** `/v1`。
:::

3. 进入「选择模型」页面，勾选你要使用的模型（可以多选，也可以直接全选），然后点击 `添加所选模型`

![](/assets/image/rc_extension/cherrystudio/select-models.webp)

> 能看到哪些模型由你的 ApiKey 绑定的渠道决定。如果这里列表为空，请回头检查 ApiKey 和 API 地址是否填写正确。

4. CherryStudio 会自动检测并启用服务商。三项都显示绿色对勾，说明检测正常，点击 `完成`

![](/assets/image/rc_extension/cherrystudio/check-enable.webp)

5. 回到服务商页面，确认 `RightCode` 右上角的开关已经打开，并且模型列表里能看到刚才添加的模型，然后点击右下角 `下一步`

![](/assets/image/rc_extension/cherrystudio/provider-done.webp)

## 三、选择默认模型

1. 依次为 `默认助手模型`、`快速模型`、`翻译模型` 三个场景选择你需要的模型，全部选好后点击 `开始使用`

![](/assets/image/rc_extension/cherrystudio/default-models.webp)

> 三个都要选择，否则 `开始使用` 按钮是灰色的，无法点击。不确定选哪个的话，三项选同一个模型也可以，之后随时能在设置里更改。

## 四、验证配置

1. 回到对话页面，点击顶部的模型选择器，可以看到 `RightCode` 分组下刚添加的模型，选择一个你要使用的模型

![](/assets/image/rc_extension/cherrystudio/switch-model.webp)

> 日常使用中想换模型，也是在这里直接切换。

2. 发送一句简单的消息（例如「你好」），能正常回复就说明配置成功

![](/assets/image/rc_extension/cherrystudio/chat-test.webp)

:::tip 遇到问题？
- **模型列表获取失败 / 检测不通过**：优先检查 ApiKey 是否复制完整，以及 API 地址是否为 `https://rightapi.ai/v1`。
- **模型能添加但聊天报错**：确认当前 ApiKey 绑定的渠道是否支持该模型，可以换一个模型试试。
:::
