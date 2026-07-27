---
title: 在 CherryStudio 中配置使用
icon: /assets/icon/cherrystudio/cherrystudio.png
order: 1
footer: false
---

## 在 CherryStudio 中配置 RightCode

CherryStudio 支持 OpenAI 兼容接口，可以直接接入 RightCode 的 Codex Pro 地址使用。

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

1. 打开 CherryStudio，点击右上角设置按钮，进入 `模型服务` 页面。

![CherryStudio 模型服务](/assets/image/rc_extension/cherrystudio/model-services.png)

2. 在模型服务列表底部点击 `添加`，新增一个提供商。

弹窗中按下面填写：

- `提供商名称`：`RightCode`
- `提供商类型`：`New Api`

![添加 RightCode 提供商](/assets/image/rc_extension/cherrystudio/add-provider.png)

3. 进入刚创建的 `RightCode` 提供商，填写 API 配置。

- `API 密钥`：填写你的 RightCode ApiKey
- `API 地址`：`https://www.rightapi.ai/codex-pro/v1`

![配置 RightCode 提供商](/assets/image/rc_extension/cherrystudio/provider-config.png)

:::tip
填完 API 地址后，CherryStudio 预览到 `/chat/completions` 接口是正常的。
:::

4. 点击 `获取模型列表`，在模型窗口中选择你要使用的模型，例如 `gpt-5.5`。

![选择 RightCode 模型](/assets/image/rc_extension/cherrystudio/select-model.png)

5. 模型添加完成后，确认 `RightCode` 提供商右上角开关已打开，并且模型列表里能看到刚刚添加的模型。

![确认模型已添加](/assets/image/rc_extension/cherrystudio/selected-model.png)

6. 回到 CherryStudio 首页，在顶部模型选择器中选择 `gpt-5.5 | RightCode`，发送一句简单消息测试。

![测试对话](/assets/image/rc_extension/cherrystudio/chat-test.png)

如果能正常返回内容，就说明 CherryStudio 已经接入 RightCode。

:::tip
如果获取模型列表失败，优先检查 API Key 和 API 地址是否填写正确；如果模型能添加但聊天报错，再确认当前 Key 是否允许使用对应模型。
:::
