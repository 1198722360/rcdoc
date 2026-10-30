---
title: 在 DeepSeek Harness 中配置使用
icon: /deepseek-logo.svg
order: 3
footer: false
---

DeepSeek Harness 支持添加自定义模型 API（OpenAI / Anthropic 兼容协议），可以直接接入 RightCode 使用。

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、进入设置页面

1. 打开 DeepSeek Harness，点击左下角你的账号，在弹出的菜单中点击 `设置`

![](/assets/image/rc_extension/deepseek/open-settings.webp)

> 也可以直接用快捷键 `⌘ + ,` 打开设置。

## 二、添加 RightCode 模型提供商

1. 在设置窗口左侧选择 `模型`，然后点击 `添加模型提供商`

![](/assets/image/rc_extension/deepseek/add-provider.webp)

> 列表里的 `DeepSeek 账号` 和 `DeepSeek` 是官方自带的服务商，和 RightCode 无关，不用动它们。

2. 在弹出的页面顶部切换到 `自定义模型 API`，按下面填写

- `Provider ID`：可以随意填，以小写字母开头即可，例如 `rightcode-gateway`
- `显示名称`：可以随意填，只是显示的名称，建议填 `RightCode`
- `API 地址`：填 `https://api.site/v1`
- `API 协议`：选择 `OpenAI Chat Completions`
- `API 密钥`：粘贴你在 RightCode 后台「令牌管理」页面生成的 ApiKey

填好后点击「模型目录」右侧的 `获取可用模型`

![](/assets/image/rc_extension/deepseek/provider-form.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

:::warning API 协议决定地址是否带 /v1
`API 地址` 是否加 `/v1`，取决于你在 `API 协议` 中选择的格式：
- 选择 **OpenAI** 格式（如 `OpenAI Chat Completions`）时，地址**必须带上 `/v1`**，即 `https://api.site/v1`。
- 选择其他格式（如 Anthropic）时，地址填 `https://api.site`，**不带** `/v1`。
:::

3. 在弹出的「选择要添加的模型」窗口中，勾选你要使用的模型（默认全选，也可以通过搜索框筛选），然后点击 `添加所选`

![](/assets/image/rc_extension/deepseek/select-models.webp)

> 能看到哪些模型由你的 ApiKey 绑定的渠道决定。如果这里列表为空或获取失败，请回头检查 ApiKey、API 地址和 API 协议是否填写正确。

4. 回到表单，确认「模型目录」中已经出现刚才勾选的模型，然后点击右下角 `创建提供商`

![](/assets/image/rc_extension/deepseek/create-provider.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

> 自定义模型 API 至少需要一个模型，模型目录为空时 `创建提供商` 按钮是灰色的，无法点击。

## 三、选择 RightCode 模型

1. 回到对话页面，点击输入框右下角的模型选择器，在 `RightCode` 分组下选择你要使用的模型

![](/assets/image/rc_extension/deepseek/switch-model.webp)

:::danger 一定要选「RightCode」分组下的模型
模型列表最上方 `DeepSeek 账号` 分组里的 DeepSeek-V4.1-Flash、DeepSeek-V4-Pro 等是官方自带模型，**不走 RightCode**。
请选择你刚刚添加的 `RightCode`（即你填写的显示名称）分组下的模型。
:::

> 日常使用中想换模型，也是在这里直接切换。

## 四、验证配置

1. 发送一句简单的消息（例如「你好」），能正常回复就说明配置成功。输入框右下角会显示当前使用的模型名，可以确认是否为 RightCode 的模型

![](/assets/image/rc_extension/deepseek/chat-test.webp)

:::tip 遇到问题？
- **获取可用模型失败**：优先检查 ApiKey 是否复制完整，以及 API 地址和 API 协议是否匹配（OpenAI 格式要带 `/v1`）。
- **发送消息报错**：先确认模型选择器里选中的是 `RightCode` 分组下的模型；再确认当前 ApiKey 绑定的渠道支持该模型，可以换一个模型试试。
:::
