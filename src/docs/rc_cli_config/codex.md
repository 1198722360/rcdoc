---
title: 手动配置Codex
icon: hugeicons:chat-gpt
order: 3
footer: false
---

:::tip
**强烈建议使用 [CC-Switch](/docs/rc_cli_config/ccs.html) 来进行配置，小白友好！（点击跳转）**
:::

1. Codex 安装

:::tabs

@tab Codex CLI
如果你使用命令行版本（Codex CLI），先运行下面命令安装：  
```bash
npm i -g @openai/codex@latest
```
Codex CLI 包地址：  
<https://www.npmjs.com/package/@openai/codex>

@tab VSCode 插件
如果你使用 VSCode，也可以安装官方插件：  
<https://marketplace.visualstudio.com/items?itemName=openai.chatgpt>

**也可以直接在 VSCode 扩展中心搜索 `codex` 进行安装。**

@tab Codex App
如果你还没安装 `Codex App`，可以从这里下载：  
<https://developers.openai.com/codex/quickstart?setup=app>

:::

2. 找到Codex的配置文件夹
> 首先打开你的`终端`程序，不管你是Windows还是MacOS系统
> 然后根据系统，运行下面的命令，打开codex的配置文件夹

:::tabs
@tab Windows
CMD命令行：
```bash
start "" "%USERPROFILE%\.codex"
```

@tab MacOS
```bash
open "$HOME/.codex"
```
:::

![](/assets/image/rc_cli_config/rc-3.webp)

3. 手动创建 `config.toml` 与 `auth.json` 文件，写入如下内容

:::tabs

@tab config.toml

```json
model_provider = "rightcode"
model = "gpt-5.6-sol"
model_reasoning_effort = "xhigh"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.rightcode]
name = "rightcode"
base_url = "https://rightapi.ai/codex/v1"
wire_api = "responses"
requires_openai_auth = true
```

@tab auth.json

```json
{
  "OPENAI_API_KEY": ""
}
```

:::

4. 在 `auth.json` 配置文件中的 `OPENAI_API_KEY` 部分填入你在后台生成的ApiKey，然后保存

5. 在终端运行 `codex`，对话查看是否配置成功

:::warning CLI 模型提醒
- CLI 版本启动后，尽量不要在会话里切换模型。
- 如果你切换过模型，需要重新用下面命令启动，才会继续使用 `gpt-5.6-sol`：
```bash
codex -m gpt-5.6-sol -c model_reasoning_effort="xhigh"
```
:::

:::warning 配置生效提醒
- 每次修改 `config.toml` 或 `auth.json` 后，都需要重启 `codex` 才会生效。
- 怎么重启：先 `Ctrl + C` 退出当前 `codex`，再重新运行 `codex`。
- 适用范围：VSCode 插件版 Codex 和 Codex App 同样适用这套配置。
:::

![](/assets/image/rc_cli_config/rc-4.webp)
