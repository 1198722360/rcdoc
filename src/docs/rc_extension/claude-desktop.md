---
title: 在 Claude Desktop 中配置使用
icon: material-icon-theme:claude
order: 2
footer: false
---

## Claude Desktop 是什么

Claude Desktop 是 Anthropic 官方桌面客户端，支持聊天、文件处理以及 Claude Code / CoWork 等能力。通过第三方推理配置，可以在不登录 Anthropic 账号的情况下，把请求转发到 Right Code。

:::tip
**强烈建议使用 [CC-Switch](https://docs.rightapi.ai/docs/rc_cli_config/ccs.html) 来进行配置，小白友好！（点击跳转）**

CC-Switch 支持一键导入 Claude Code 配置并切换渠道。如果你只想手动配置，继续按照下面的步骤操作即可。
:::

:::warning
Claude Desktop 的菜单名称可能会随版本变化。本文使用 macOS 截图演示；Windows 的操作基本一样，在应用菜单中找到对应配置即可。
:::

## 一、下载安装

1. 打开 [Claude Desktop 官方下载页](https://claude.com/download)，在 `Desktop` 区域选择对应系统的安装包。
2. 下载并安装客户端。macOS 用户将 Claude 拖入 `Applications` 文件夹；Windows 用户运行安装程序并按向导完成安装。

## 二、开启开发者模式

首次打开 Claude Desktop 时，登录页面可以直接关闭，不需要先登录 Anthropic 账号。第三方推理配置需要先打开开发者模式。

1. 点击顶部菜单栏中的 `Help`。
2. 进入 `Troubleshooting`，点击 `Enable Developer Mode`。

![在 macOS 中启用开发者模式](/assets/image/rc_extension/claude-desktop/mac-01.png)

启用后，顶部菜单会出现 `Developer` 项。部分版本需要完全退出 Claude Desktop 后重新打开，菜单才会刷新。

:::info Windows 用户
Windows 版本的操作基本一样。在 Claude Desktop 左上角打开应用菜单，找到对应的 `Help → Troubleshooting → Enable Developer Mode` 配置即可。
:::

## 三、配置 Right Code 网关

1. 从顶部菜单进入 `Developer → Configure third-party inference`。

![打开第三方推理配置](/assets/image/rc_extension/claude-desktop/mac-02.png)

2. 在配置窗口选择 `Connection` 为 `Gateway`，然后填写网关信息。

建议按下表填写：

| 配置项 | 填写内容 | 说明 |
| --- | --- | --- |
| Gateway base URL | `https://www.rightapi.ai/claude` | Right Code 官渠；不要在末尾额外添加 `/v1/messages` |
| Credential kind | `Static API key` | 使用固定的 Right Code API Key |
| Gateway API key | `你的 Right Code ApiKey` | 在 Right Code 后台生成，粘贴后不要带空格 |
| Gateway auth scheme | `bearer` | 通过 `Authorization: Bearer` 发送凭据 |

先填写 `Gateway base URL`，再将 `Credential kind` 选择为 `Static API key`。

![选择 Static API key](/assets/image/rc_extension/claude-desktop/mac-03.png)

然后填写 API Key，将 `Gateway auth scheme` 选择为 `bearer`。其余选项保持默认即可。

![填写完整的 Gateway 配置](/assets/image/rc_extension/claude-desktop/mac-04.png)

Right Code 还提供两个可切换渠道，按需替换 `Gateway base URL` 即可：

- CC-Sale 渠道：`https://www.rightapi.ai/claude-sale`
- AWSQ 逆向渠道：`https://www.rightapi.ai/claude-aws`

:::warning
不要把 API Key 写入公开截图、提交到 Git 仓库或发给他人。本文使用 `你的 Right Code ApiKey` 作为占位符；请使用你自己后台生成的 Key。
:::

3. 点击右下角的 `Apply Changes` 保存配置。部分旧版本中，这个按钮可能显示为 `Apply locally`。

4. 出现 `Save & Restart?` 提示后，点击 `Save & Restart`，等待 Claude Desktop 自动重启。

![保存配置并重启 Claude Desktop](/assets/image/rc_extension/claude-desktop/mac-05.png)

:::tip
`Test connection` 仅用于辅助检查。最终请以 Claude Desktop 重启后能否正常发送消息为准。
:::

## 四、验证是否配置成功

1. 回到 Claude Desktop 的主界面，新建一个对话。
2. 发送一条简单消息，例如：`请用一句话介绍 Right Code。`
3. 能正常收到回复，就说明 Claude Desktop 已经通过 Right Code 工作。

![Claude Desktop 对话测试](/assets/image/rc_extension/claude-desktop/mac-06.png)

如果仍然无法回复，按下面顺序排查：

- `Gateway base URL` 是否使用了正确渠道，且没有多余空格或路径。
- API Key 是否属于 Claude 渠道，是否已过期或额度不足。
- `Credential kind` 是否为 `Static API key`。
- `Gateway auth scheme` 是否为 `bearer`。
- 修改后是否点击了 `Apply Changes`，并完成 `Save & Restart`。

:::info
新建对话后可能会出现一笔很小的模型调用，用于自动生成对话标题，这是 Claude Desktop 的正常行为。
:::

## 五、配置字段速查

下面这份清单适合复制到自己的配置记录中，Key 请自行填写：

```text
Connection: Gateway
Gateway base URL: https://www.rightapi.ai/claude
Credential kind: Static API key
Gateway API key: 你的 Right Code ApiKey
Gateway auth scheme: bearer
```

完成后无需登录 Anthropic 官方账号，直接在 Claude Desktop 中使用 Right Code 提供的 Claude 模型即可。
