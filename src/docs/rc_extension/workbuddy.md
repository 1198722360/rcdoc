---
title: 在 WorkBuddy 中配置使用
icon: /workbuddy-logo.svg
order: 2
footer: false
---

WorkBuddy 支持添加 OpenAI 兼容协议的自定义模型，可以直接接入 RightCode 使用。

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、进入设置页面

1. 打开 WorkBuddy，点击左下角你的账号，在弹出的菜单中点击 `设置`

![](/assets/image/rc_extension/workbuddy/open-settings.webp)

> 也可以直接用快捷键 `⌘ + ,` 打开设置。

## 二、添加 RightCode 自定义模型

1. 在设置页左侧选择 `模型`，然后点击右上角「自定义模型」一栏的 `添加模型`

![](/assets/image/rc_extension/workbuddy/models-page.webp)

> 模型添加后会自动写入本地的 `~/.workbuddy-ai/models.json` 文件，不需要手动改配置文件。

2. 在弹出的「添加模型」窗口中，按下面填写，然后点击 `保存`

- `供应商`：选择 `自定义`
- `接口地址`：填 `https://api.site/v1`
- `API Key`：粘贴你在 RightCode 后台「令牌管理」页面生成的 ApiKey
- `模型名称`：填你要使用的模型名，例如 `gpt-6.1-sol`
- `高级配置`：保持勾选 `工具调用`，其他选项按需勾选

![](/assets/image/rc_extension/workbuddy/model-form.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

:::warning 注意地址结尾的 /v1
WorkBuddy 只支持 OpenAI 兼容协议，地址**必须带上 `/v1`**，即 `https://api.site/v1`。
:::

> `模型名称` 必须和 RightCode 里的模型名完全一致，不确定的话可以到模型列表里直接复制。填好后可以先点 `测试连接` 检查一下，再点击 `保存`。

## 三、选择自定义模型

1. 回到对话页面，点击输入框右下角的模型选择器，在列表底部的 **`自定义模型`** 分组下，选择刚才添加的模型

![](/assets/image/rc_extension/workbuddy/select-model.webp)

:::danger 一定要选「自定义模型」下面的模型
模型列表上方的 Gemini、GLM、Kimi 等是 WorkBuddy 自带的模型，**不走 RightCode**，选了它们会导致调用失败。
请务必滚动到列表底部，选择 `自定义模型` 分组下你刚刚添加的那个模型。
:::

## 四、验证配置

1. 发送一句简单的消息（例如「你好」），能正常回复就说明配置成功。回复下方会显示当前使用的模型名，可以确认是否为你添加的自定义模型

![](/assets/image/rc_extension/workbuddy/chat-test.webp)

:::tip 遇到问题？
- **测试连接失败**：优先检查 ApiKey 是否复制完整，以及接口地址是否为 `https://api.site/v1`。
- **发送消息报错**：先确认模型选择器里选中的是 `自定义模型` 分组下的模型，而不是 WorkBuddy 自带模型；再确认模型名称填写正确，且当前 ApiKey 绑定的渠道支持该模型。
:::
