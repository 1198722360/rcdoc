---
title: 使用CC-Switch配置
icon: hugeicons:configuration-01
order: 9
footer: false
---

## 一、什么是 CC-Switch？

**CC-Switch** 是可以在 Windows、macOS 和 Linux 上使用的图形化管理工具，可以管理 Claude Code、Codex、Gemini CLI 这些 AI 工具的配置。如果你是小白或者新手，不想通过配置文件改地址、改密钥，强烈建议下载使用 CC Switch，不怕改错文件。它还能统一管理 MCP 插件和提示词这类常用设置。简单说，它就是 AI 编程工具的"一键换线路"开关。

> **目前CC-Switch 已经内置了 Right Code 的快捷配置模板，无需手动编辑配置文件！**

## 二、软件下载

> 访问 [CC Switch Download](https://ccswitch.io/en/) 页面下载最新的CC-Switch工具，在本地进行安装

## 三、配置渠道商

> **这一步以Codex的配置为例，ClaudeCode与其他配置同理**

- **步骤一：**
  - 打开软件，在左侧选择要配置的 CLI 或客户端
  - 选择好后，点击右上角的 `添加供应商`

![](/assets/image/rc_quick_start/rc-10.webp)

- **步骤二：**
  - 在顶部搜索栏中搜索 `rightcode`
  - 在 `第三方平台` 下点击选择 `RightCode`

![](/assets/image/rc_quick_start/rc-11.webp)

- **步骤三：**
  - 在 `API Key` 中粘贴你在后台令牌管理页面生成的密钥
  - 确认 `API 请求地址`：GPT / Codex（OpenAI 兼容客户端） 填 `https://api.site/v1`，其他 CLI 或客户端统一填 `https://api.site`
  - 右下角点击添加

::: important
用哪个渠道由 ApiKey 绑定的渠道决定，请求地址本身不区分渠道。不确定该填哪个地址，可以看 [渠道地址速查](/docs/rc_questions/endpoints.html)。
:::

![](/assets/image/rc_quick_start/rc-12.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

- **步骤四：**

  - 回到供应商列表，点击 `RightCode` 右侧的 ▷ 图标，让配置生效

  ![](/assets/image/rc_quick_start/rc-999.webp)

  > 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

- **步骤五：**

  - 生效后打开你配置的终端或客户端，运行它们进行简单对话，查看配置是否正常
  - 能正常收到回复，就说明配置成功

  ![](/assets/image/rc_quick_start/rc-20.webp)
