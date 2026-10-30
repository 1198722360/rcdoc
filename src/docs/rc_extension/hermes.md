---
title: 在 Hermes Agent 中配置使用
icon: /hermes-logo.svg
order: 4
footer: false
---

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。

如果你是 Windows 用户，请先进入 WSL 再继续，Hermes 不支持在 Windows 原生命令行里安装。还没有装 WSL 的话，可以参考 [微软官方 WSL 安装文档](https://learn.microsoft.com/zh-cn/windows/wsl/install) 先装好。
:::

本页只讲在本地命令行直接运行 `hermes` 的用法，Feishu、Telegram、托管部署这些可以让 Hermes 自己帮你配置。

## 一、安装 Hermes

::::tabs#os

@tab Windows + WSL

1. 打开 WSL 终端

> 在开始菜单里打开 `Ubuntu`（或你安装的其他发行版），或者在 CMD 里输入 `wsl` 后回车，进入 Linux 终端。

2. 安装 Hermes

> 在 WSL 的 Linux 终端里输入下面的指令后回车：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

3. 检查是否安装成功

> **关掉终端重新打开**，输入下面的指令后回车：

```bash
hermes --version
```

> 能输出版本号，说明安装成功。

@tab MacOS

1. 安装 Hermes

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

2. 检查是否安装成功

> **关掉终端重新打开**，输入下面的指令后回车：

```bash
hermes --version
```

> 能输出版本号，说明安装成功。

@tab Linux

1. 安装 Hermes

> 打开你的终端，输入下面的指令后回车：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

2. 检查是否安装成功

> **关掉终端重新打开**，输入下面的指令后回车：

```bash
hermes --version
```

> 能输出版本号，说明安装成功。

::::

> 安装完成后，Hermes 的配置目录一般是 `~/.hermes`，后面的配置就放在这里。

## 二、配置 Right Code

:::important
Hermes 走的是 OpenAI 兼容接口，所有渠道的 `base_url` 都统一填 `https://api.site/v1`，**使用哪个渠道由 ApiKey 绑定的渠道决定**。想换渠道，只需要换一个绑定了对应渠道的 Key，地址不用改。
:::

1. 打开 Hermes 的配置文件夹

::::tabs#os

@tab Windows + WSL

> 在 WSL 里输入下面的指令，它会在 Windows 里弹出这个文件夹：

```bash
cd ~/.hermes && explorer.exe .
```

@tab MacOS

> 在终端输入下面的指令后回车：

```bash
open "$HOME/.hermes"
```

@tab Linux

> 在终端输入下面的指令后回车：

```bash
xdg-open "$HOME/.hermes"
```

::::

> 如果命令没有反应，也可以直接用文件管理器手动打开 `~/.hermes`。

<img width="848" height="551" alt="image" src="https://github.com/user-attachments/assets/269b9fdf-afe6-400a-8a62-5dd74ea63b13" />

2. 打开 `config.yaml`，把 `model` 这一段改成下面这样

   ```yaml
   model:
     default: gpt-6.1-sol
     provider: rightcode
     base_url: https://api.site/v1
     api_mode: chat_completions
   ```

   几行配置分别是什么意思：

   1. `base_url` 告诉 Hermes 以后往哪条接口地址发请求。
   2. `default` 是默认先用哪个模型，可以换成你在后台能用的其他模型。
   3. `api_mode` 照着写就行，不需要先研究它背后的协议细节。

3. 打开 `~/.hermes/.env`，填入你自己的 Right Code Key

   ```bash
   OPENAI_API_KEY=你的 Right Code Key
   OPENAI_BASE_URL=https://api.site/v1
   ```

   > `.env` 文件内容比较长，直接拉到文件**最末尾**，把这两行加在最后面，再把 `你的 Right Code Key` 替换为你在后台生成的 ApiKey（`sk-` 开头），然后保存。如果文件里已经有 `OPENAI_API_KEY` 或 `OPENAI_BASE_URL`，直接改原来那一行即可，不要重复写。

   ![](/assets/image/rc_extension/hermes/rc-01.webp)

   > 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

:::important
注意生成的 Key 要选对渠道：`可用渠道` 记得选择你要使用的渠道，`可用模型` 保持默认即可。具体步骤见 [ApiKey 生成](/docs/rc_quick_start/apikey.html#如何生成apikey)。
:::

## 三、验证配置

1. 启动 Hermes

```bash
hermes
```

2. 选择模型提供商

> 在 Hermes 里输入 `/model` 后回车，打开模型选择器。用方向键选择**你的 Key 所绑定渠道对应的提供商**，回车确认：
>
> - Codex 渠道的 Key，选择 `OpenAI API`
> - Claude 渠道的 Key，选择 `Anthropic`

![](/assets/image/rc_extension/hermes/rc-02.webp)

> 启动时顶部可能会出现 `No usable credentials found for provider ...` 之类的黄色提示，或者检测到旧的 OpenClaw 目录的提示，这些不影响使用，忽略即可。

3. 选择模型

> 进入提供商后会列出可用的模型，可以直接输入模型名筛选。选中你要用的模型后回车确认：

![](/assets/image/rc_extension/hermes/rc-03.webp)

4. 发一条消息测试

> 看到 `Model switched` 的提示后，随便发一句话，比如 `你好`，能正常回复即说明配置成功：

![](/assets/image/rc_extension/hermes/rc-04.webp)

> 如果这一步报的是 Key 错误、地址错误，或者模型不存在，回到第二步重新检查即可。

:::tip
通过 `/model` 切换的模型**只在当前会话生效**，下次启动还是会用 `config.yaml` 里 `default` 设置的模型。想换掉默认模型，按提示在切换时加上 `--global`，或者直接修改 `config.yaml` 里的 `default`。
:::

## 后续说明

现在你已经可以正常使用 Hermes + Right Code 了。

需要继续看 Key 或模型信息的话，可以接着看：

1. [ApiKey 管理](/docs/rc_quick_start/apikey.html)
2. [渠道与模型](/docs/rc_quick_start/models.html)
