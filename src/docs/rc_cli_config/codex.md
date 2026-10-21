---
title: 安装配置Codex
icon: hugeicons:chat-gpt
order: 3
footer: false
---

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、安装 Codex

> 安装前请先完成 [通用步骤](/docs/rc_quick_start/normal.html)，确认 Nodejs 已经装好

::::tabs#os

@tab Windows

1. 安装 Codex CLI

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，输入下面的指令后回车：

```bash
npm i -g @openai/codex@latest
```

![](/assets/image/rc_cli_config/rc-12.webp)

2. 检查是否安装成功

> 安装完成后，**关掉命令行窗口重新打开**，输入下面的指令后回车：

```bash
codex --version
```

> 能输出版本号，说明安装成功。

![](/assets/image/rc_cli_config/rc-13.webp)

:::warning 在 PowerShell 里提示“禁止运行脚本”
如果你用的是 PowerShell，运行 `npm` 或 `codex` 时提示“因为在此系统上禁止运行脚本”，可以改用 CMD 命令行；或者在 PowerShell 里先运行下面的命令，再重新打开 PowerShell：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
:::

@tab MacOS

1. 安装 Codex CLI

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
npm i -g @openai/codex@latest
```

![](/assets/image/rc_cli_config/rc-14.webp)

2. 检查是否安装成功

> 安装完成后，**关掉终端重新打开**，输入下面的指令后回车：

```bash
codex --version
```

> 能输出版本号，说明安装成功。

![](/assets/image/rc_cli_config/rc-15.webp)

:::warning 提示 permission denied
如果安装时提示 `EACCES: permission denied`，说明没有全局安装的权限，在命令前加上 `sudo` 再运行一次，按提示输入电脑开机密码即可：

```bash
sudo npm i -g @openai/codex@latest
```
:::

::::

:::info 不用命令行？也可以装 VSCode 插件或 Codex App
- **VSCode 插件**：在 VSCode 扩展中心搜索 `codex` 安装。
- **Codex App**：前往 [ChatGPT客户端](/docs/rc_client/chatgpt.html) 进行安装配置。

插件和 App 与 Codex CLI 共用同一份配置文件，按下面的步骤配置一次即可。
:::

:::tip
**后面是手动配置教程，如果你是小白，强烈建议使用 [CC-Switch](/docs/rc_quick_start/ccs.html) 来进行配置，小白友好，避免手动配置错误！**
:::

## 二、手动配置 Right Code

:::important
Codex 的 `base_url` 统一填 `https://rightapi.ai/v1`（注意要带 `/v1`），**使用哪个渠道由 ApiKey 绑定的渠道决定**。ApiKey 需要绑定 Codex 渠道，想换渠道只需要换 Key，地址不用改。
:::

::::tabs#os

@tab Windows

1. 打开 Codex 的配置文件夹

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，输入下面的指令后回车：

```bash
start "" "%USERPROFILE%\.codex"
```

> 如果提示找不到文件夹，说明还没有生成配置目录，先运行一次下面的命令创建它，再重新打开：

```bash
mkdir "%USERPROFILE%\.codex"
```

![](/assets/image/rc_cli_config/rc-3.webp)

2. 在文件夹中打开 `config.toml` 文件，如果没有则手动创建一个，写入如下内容

   ```toml
   model_provider = "rightcode"
   model = "gpt-5.6-sol"
   model_reasoning_effort = "xhigh"
   network_access = "enabled"
   disable_response_storage = true
   windows_wsl_setup_acknowledged = true
   model_verbosity = "high"
   personality = "pragmatic"
   plan_mode_reasoning_effort = "xhigh"
   service_tier = "fast"

   [model_providers]

   [model_providers.rightcode]
   name = "rightcode"
   base_url = "https://rightapi.ai/v1"
   wire_api = "responses"
   requires_openai_auth = false
   experimental_bearer_token = "sk-xxx"
   ```

> 用记事本新建时，注意文件名要是 `config.toml`，不要变成 `config.toml.txt`。可以在文件资源管理器顶部「查看」里勾选「文件扩展名」来确认

3. 将`config.toml`文件下 `experimental_bearer_token` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

![](/assets/image/rc_cli_config/rc-16.webp)

@tab MacOS

1. 打开 Codex 的配置文件夹

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
mkdir -p "$HOME/.codex" && open "$HOME/.codex"
```

> `.codex` 是隐藏文件夹，在访达里按 `Command + Shift + .` 可以显示隐藏文件

2. 在文件夹中打开 `config.toml` 文件，若没有则新建一个，写入如下内容:

   ```toml
   model_provider = "rightcode"
   model = "gpt-5.6-sol"
   model_reasoning_effort = "xhigh"
   network_access = "enabled"
   disable_response_storage = true
   windows_wsl_setup_acknowledged = true
   model_verbosity = "high"
   personality = "pragmatic"
   plan_mode_reasoning_effort = "xhigh"
   service_tier = "fast"

   [model_providers]

   [model_providers.rightcode]
   name = "rightcode"
   base_url = "https://rightapi.ai/v1"
   wire_api = "responses"
   requires_openai_auth = false
   experimental_bearer_token = "sk-xxx"
   ```

> 也可以直接在终端运行 `nano "$HOME/.codex/config.toml"` 编辑，粘贴内容后按 `Control + O` 回车保存，`Control + X` 退出

3. 将`config.toml`文件下 `experimental_bearer_token` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

![](/assets/image/rc_cli_config/rc-16.webp)

::::

## 三、验证配置

在终端运行 `codex`，进行简单对话，查看是否配置成功

![](/assets/image/rc_cli_config/rc-4.webp)

:::warning 配置生效提醒
- 每次修改 `config.toml` 或 `auth.json` 后，都需要重启 `codex` 才会生效。
- 怎么重启：先 `Ctrl + C` 退出当前 `codex`，再重新运行 `codex`。
- 适用范围：VSCode 插件版 Codex 和 Codex App 同样适用这套配置。
:::

:::tip
想换用最新模型或遇到其他问题，请看 [Codex 常见问题](/docs/rc_questions/codex.html)。
:::
