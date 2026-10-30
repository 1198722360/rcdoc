---
title: 安装配置Grok Build
icon: /grok-logo.svg
order: 5
footer: false
---

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、安装 Grok Build

> Grok Build 使用官方安装脚本安装，**不需要** Nodejs

::::tabs#os

@tab Windows

1. 安装 Grok Build

> 键盘按下 `Win + R`，输入 `powershell` 后回车，打开 PowerShell 窗口，输入下面的指令后回车：

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

![](/assets/image/rc_cli_config/rc-17.webp)

2. 检查是否安装成功

> 安装完成后，**关掉 PowerShell 窗口重新打开**，输入下面的指令后回车：

```powershell
grok --version
```

> 能输出版本号，说明安装成功。

![](/assets/image/rc_cli_config/rc-18.webp)

:::warning 提示找不到 grok 命令
如果重新打开窗口后仍提示“无法将 grok 项识别为 cmdlet、函数……”，说明安装目录还没有加入环境变量。可以注销或重启电脑后再试一次；仍然不行的话，重新运行一次安装命令，留意安装结束时输出的安装路径提示。
:::

@tab MacOS

1. 安装 Grok Build

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

![](/assets/image/rc_cli_config/rc-19.webp)

2. 检查是否安装成功

> 安装完成后，**关掉终端重新打开**，输入下面的指令后回车：

```bash
grok --version
```

> 能输出版本号，说明安装成功。

![](/assets/image/rc_cli_config/rc-20.webp)

:::warning 提示 command not found
如果重新打开终端后仍提示 `command not found: grok`，说明安装目录还没有加入 `PATH`。请按安装结束时输出的提示，把对应目录加入 `PATH` 后重开终端；或者重新运行一次安装命令。
:::

::::

:::tip
**后面是手动配置教程，如果你是小白，强烈建议使用 [CC-Switch](/docs/rc_quick_start/ccs.html) 来进行配置，小白友好，避免手动配置错误！**
:::

## 二、手动配置 Right Code

:::important
Grok Build 的 `models_base_url` 统一填 `https://api.site/v1`（注意要带 `/v1`），**使用哪个渠道由 ApiKey 绑定的渠道决定**。ApiKey 需要绑定 Grok 渠道，想换渠道只需要换 Key，地址不用改。
:::

::::tabs#os

@tab Windows

1. 打开 Grok Build 的配置文件夹

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，输入下面的指令后回车：

```bash
start "" "%USERPROFILE%\.grok"
```

> 如果提示找不到文件夹，说明还没有生成配置目录，先运行一次下面的命令创建它，再重新打开：

```bash
mkdir "%USERPROFILE%\.grok"
```

![](/assets/image/rc_cli_config/rc-21.webp)

2. 在文件夹中打开 `config.toml` 文件，如果没有则手动创建一个，写入如下内容

   ```toml
   [models]
   default = "grok-4.7"
   web_search = "grok-4.7"

   [endpoints]
   models_base_url = "https://api.site/v1"

   [model."grok-4.7"]
   model = "grok-4.7"
   name = "Grok 4.7"
   description = "Grok 4.7 via Right Code"
   api_key = "sk-xxx"
   api_backend = "responses"
   context_window = 1000000
   ```

> 用记事本新建时，注意文件名要是 `config.toml`，不要变成 `config.toml.txt`。可以在文件资源管理器顶部「查看」里勾选「文件扩展名」来确认

3. 将`config.toml`文件下 `api_key` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

![](/assets/image/rc_cli_config/rc-22.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

@tab MacOS

1. 打开 Grok Build 的配置文件夹

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
mkdir -p "$HOME/.grok" && open "$HOME/.grok"
```

> `.grok` 是隐藏文件夹，在访达里按 `Command + Shift + .` 可以显示隐藏文件

2. 在文件夹中打开 `config.toml` 文件，若没有则新建一个，写入如下内容:

   ```toml
   [models]
   default = "grok-4.7"
   web_search = "grok-4.7"

   [endpoints]
   models_base_url = "https://api.site/v1"

   [model."grok-4.7"]
   model = "grok-4.7"
   name = "Grok 4.7"
   description = "Grok 4.7 via Right Code"
   api_key = "sk-xxx"
   api_backend = "responses"
   context_window = 1000000
   ```

> 也可以直接在终端运行 `nano "$HOME/.grok/config.toml"` 编辑，粘贴内容后按 `Control + O` 回车保存，`Control + X` 退出

3. 将`config.toml`文件下 `api_key` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

![](/assets/image/rc_cli_config/rc-22.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

::::

## 三、验证配置

在终端运行`grok`，进行简单对话，查看是否配置成功

![](/assets/image/rc_cli_config/rc-23.webp)

:::warning 配置生效提醒
- 每次修改 `config.toml` 后，都需要重启 `grok` 才会生效。
- 怎么重启：先 `Ctrl + C` 退出当前 `grok`，再重新运行 `grok`。
:::

:::tip
遇到 Key 填写、`env_key` 等问题，请看 [Grok Build 常见问题](/docs/rc_questions/grok.html)。
:::
