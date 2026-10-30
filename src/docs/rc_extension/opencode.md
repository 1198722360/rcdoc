---
title: 在 OpenCode 中配置使用
icon: /assets/icon/opencode/opencode.jpg
order: 1
footer: false
---

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、安装 OpenCode

> 安装前请先完成 [通用步骤](/docs/rc_quick_start/normal.html)，确认 Nodejs 已经装好
>
> 如果之前已经安装过 OpenCode，并且成功运行过一次，可以跳过这一步，直接看第二步。

::::tabs#os

@tab Windows

1. 安装 OpenCode

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，输入下面的指令后回车：

```bash
npm install -g opencode-ai
```

> 安装结束时如果出现几行黄色的 `npm warn install-scripts` 提示，不影响使用，直接进行下一步即可。

2. 首次运行，生成配置文件夹

> 关掉命令行窗口重新打开，输入下面的指令后回车：

```bash
opencode
```

> 程序启动后，按 `Ctrl + C` 退出即可。首次运行后会自动生成 `%USERPROFILE%\.config\opencode` 配置文件夹，后面的配置就放在这里。

:::warning 在 PowerShell 里提示“禁止运行脚本”
如果你用的是 PowerShell，运行 `npm` 或 `opencode` 时提示“因为在此系统上禁止运行脚本”，可以改用 CMD 命令行；或者在 PowerShell 里先运行下面的命令，再重新打开 PowerShell：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
:::

@tab MacOS

1. 安装 OpenCode

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
npm install -g opencode-ai
```

> 安装结束时如果出现几行黄色的 `npm warn allow-scripts` 提示，不影响使用，直接进行下一步即可。

2. 首次运行，生成配置文件夹

> 关掉终端重新打开，输入下面的指令后回车：

```bash
opencode
```

> 程序启动后，按 `Control + C` 退出即可。首次运行后会自动生成 `$HOME/.config/opencode` 配置文件夹，后面的配置就放在这里。

:::warning 提示 permission denied
如果安装时提示 `EACCES: permission denied`，说明没有全局安装的权限，在命令前加上 `sudo` 再运行一次，按提示输入电脑开机密码即可：

```bash
sudo npm install -g opencode-ai
```
:::

::::

## 二、配置 Right Code

:::important
压缩包里的 `opencode.json` 已经预设好了 Right Code 的接口地址和三家的模型列表，**你只需要替换 ApiKey**，地址不用改。

`opencode.json` 里共三段配置，分别对应三个渠道：`RCode_Google` 对应 Gemini、`RCode_ClaudeCode` 对应 Claude、`RCode_OpenAI` 对应 GPT。填哪一段就用哪个渠道的 Key，如果只想用其中一个渠道，也可以只改那一段。
:::

1. 下载 [OpenCode（带御三家 + 缓存）](/assets/file/opencode/QuickConfiguration.zip) 压缩包，解压后得到以下文件

   ![](/assets/image/rc_extension/opencode/rc-01.webp)

2. 用文本编辑器打开 `opencode.json`，将三段配置里 `apiKey` 部分的 `sk-xxxxxxx` 分别替换为你的 ApiKey，然后保存

   ![](/assets/image/rc_extension/opencode/rc-02.webp)

   ![Claude配置](/assets/image/rc_extension/opencode/rc-03.webp)

   ![GPT配置](/assets/image/rc_extension/opencode/rc-04.webp)

   > 注意：以上三张图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`（压缩包里的 `opencode.json` 已更新为新地址）。

:::important
注意查看 [ApiKey 生成](/docs/rc_quick_start/apikey.html#如何生成apikey) 教程，要生成正确渠道的 Key：`可用渠道` 记得选择你要使用的渠道，`可用模型` 保持默认即可。
:::

:::tip 想用别的模型？
如果预设的模型不是你想要的，可以在同一段的 `models` 里替换成你需要的模型。替换前请先确认你的 Key 有该模型的使用权限。

![](/assets/image/rc_extension/opencode/rc-09.webp)
:::

3. 打开 OpenCode 的配置文件夹

::::tabs#os

@tab Windows

> 键盘按下 `Win + R`，输入 `cmd` 后回车，输入下面的指令后回车：

```bash
start "" "%USERPROFILE%\.config\opencode"
```

@tab MacOS

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
open "$HOME/.config/opencode"
```

> `.config` 是隐藏文件夹，在访达里按 `Command + Shift + .` 可以显示隐藏文件

::::

   ![](/assets/image/rc_extension/opencode/rc-05.webp)

4. 将刚才改好的 `opencode.json` 和 `plugins` 目录复制到 OpenCode 的配置文件夹，提示重名时选择覆盖

   ![](/assets/image/rc_extension/opencode/rc-06.webp)

## 三、验证配置

1. 在终端运行 `opencode`，输入 `/models` 命令，确认能列出配置好的模型

   ![](/assets/image/rc_extension/opencode/rc-07.webp)

2. 选择模型后发送一条消息进行测试，能正常回复即说明配置成功

   ![可用性验证](/assets/image/rc_extension/opencode/rc-08.webp)

:::tip
如果 `/models` 列表里看不到 Right Code 的模型，或者对话时提示认证失败，请先确认 `opencode.json` 是否已经放进配置文件夹、`apiKey` 是否替换完整（没有残留 `xxxxxxx`），以及 Key 绑定的渠道和所在的段落是否对应。
:::
