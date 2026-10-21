---
title: 安装配置Claude Code
icon: hugeicons:configuration-01
order: 2
footer: false
---

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、安装 Claude Code

> 安装前请先完成 [通用步骤](/docs/rc_quick_start/normal.html)，确认 Nodejs 已经装好

::::tabs#os

@tab Windows

1. 安装 Claude Code

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，输入下面的指令后回车：

```bash
npm install -g @anthropic-ai/claude-code
```

> 安装结束时如果出现几行黄色的 `npm warn install-scripts` 提示，不影响使用，直接进行下一步检查即可。

![](/assets/image/rc_cli_config/rc-7.webp)

2. 检查是否安装成功

> 安装完成后，**关掉命令行窗口重新打开**，输入下面的指令后回车：

```bash
claude --version
```

> 能输出版本号，说明安装成功。

![](/assets/image/rc_cli_config/rc-8.webp)

:::warning 在 PowerShell 里提示“禁止运行脚本”
如果你用的是 PowerShell，运行 `npm` 或 `claude` 时提示“因为在此系统上禁止运行脚本”，可以改用 CMD 命令行；或者在 PowerShell 里先运行下面的命令，再重新打开 PowerShell：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
:::

@tab MacOS

1. 安装 Claude Code

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
npm install -g @anthropic-ai/claude-code
```

> 安装结束时如果出现几行黄色的 `npm warn allow-scripts` 提示，不影响使用，直接进行下一步检查即可。

![](/assets/image/rc_cli_config/rc-9.webp)

2. 检查是否安装成功

> 安装完成后，**关掉终端重新打开**，输入下面的指令后回车：

```bash
claude --version
```

> 能输出版本号，说明安装成功。

![](/assets/image/rc_cli_config/rc-10.webp)

:::warning 提示 permission denied
如果安装时提示 `EACCES: permission denied`，说明没有全局安装的权限，在命令前加上 `sudo` 再运行一次，按提示输入电脑开机密码即可：

```bash
sudo npm install -g @anthropic-ai/claude-code
```
:::

::::

:::tip
**后面是手动配置教程，如果你是小白，强烈建议使用 [CC-Switch](/docs/rc_quick_start/ccs.html) 来进行配置，小白友好，避免手动配置错误！**
:::

## 二、手动配置 Right Code

:::important
所有 Claude 渠道的 `ANTHROPIC_BASE_URL` 都统一填 `https://rightapi.ai`，**使用哪个渠道由 ApiKey 绑定的渠道决定**。想换渠道，只需要换一个绑定了对应渠道的 Key，地址不用改。
:::

::::tabs#os

@tab Windows

1. 打开 Claude Code 的配置文件夹

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，输入下面的指令后回车：

```bash
start "" "%USERPROFILE%\.claude"
```

> 如果提示找不到文件夹，说明还没有生成配置目录，先运行一次下面的命令创建它，再重新打开：

```bash
mkdir "%USERPROFILE%\.claude"
```

![](/assets/image/rc_cli_config/rc-1.webp)

2. 在文件夹中打开 `settings.json` 文件，如果没有则手动创建一个，写入如下内容

   ```json
   {
     "env": {
       "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
       "ANTHROPIC_BASE_URL": "https://rightapi.ai",
       "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
     }
   }
   ```

> 用记事本新建时，注意文件名要是 `settings.json`，不要变成 `settings.json.txt`。可以在文件资源管理器顶部「查看」里勾选「文件扩展名」来确认

3. 将`settings.json`文件下 `ANTHROPIC_AUTH_TOKEN` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

![](/assets/image/rc_cli_config/rc-11.webp)

@tab MacOS

1. 打开 Claude Code 的配置文件夹

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
mkdir -p "$HOME/.claude" && open "$HOME/.claude"
```

> `.claude` 是隐藏文件夹，在访达里按 `Command + Shift + .` 可以显示隐藏文件

2. 在文件夹中打开 `settings.json` 文件，若没有则新建一个，写入如下内容:

   ```json
   {
     "env": {
       "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
       "ANTHROPIC_BASE_URL": "https://rightapi.ai",
       "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
     }
   }
   ```

> 也可以直接在终端运行 `nano "$HOME/.claude/settings.json"` 编辑，粘贴内容后按 `Control + O` 回车保存，`Control + X` 退出

3. 将`settings.json`文件下 `ANTHROPIC_AUTH_TOKEN` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

   ![](/assets/image/rc_cli_config/rc-11.webp)

::::

## 三、验证配置

在终端运行 `claude`，进行简单对话，查看是否配置成功

![](/assets/image/rc_cli_config/rc-2.webp)

:::tip
首次启动如果卡在官方登录页，或提示无法连接 Anthropic，请看 [Claude Code 常见问题](/docs/rc_questions/claudecode.html#首次启动提示无法连接-anthropic-或要求登录)。
:::
