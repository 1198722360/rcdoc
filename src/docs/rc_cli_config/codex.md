---
title: 手动配置Codex
icon: hugeicons:chat-gpt
order: 3
footer: false
---

:::tip
**强烈建议使用CC-Switch来进行配置，小白友好！**
:::

1. 找到Codex的配置文件夹
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

![](/assets/image/rc_cli_config/rc-3.png)

2. 手动创建 `config.toml` 与 `auth.json` 文件，写入如下内容

:::tabs

@tab config.toml

```json
model_provider = "rightcode"
model = "gpt-5.2"
model_reasoning_effort = "xhigh"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.rightcode]
name = "rightcode"
base_url = "https://right.codes/codex/v1"
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

3. 在 `auth.json` 配置文件中的 `OPENAI_API_KEY` 部分填入你在后台生成的ApiKey，然后保存

4. 在终端运行 `codex`，对话查看是否配置成功

![](/assets/image/rc_cli_config/rc-4.png)