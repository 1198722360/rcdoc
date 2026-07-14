---
title: 手动配置Grok Build
icon: ri:robot-2-fill
order: 5
footer: false
---

1. 安装 Grok Build

:::tabs

@tab MacOS / Linux
```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

@tab Windows (PowerShell)
```powershell
irm https://x.ai/cli/install.ps1 | iex
```

:::

安装完成后，运行下面命令检查是否安装成功：
```bash
grok --version
```

2. 找到Grok的配置文件夹
> 首先打开你的`终端`程序，不管你是Windows还是MacOS系统
> 然后根据系统，运行下面的命令，打开grok的配置文件夹

:::tabs
@tab Windows
CMD命令行：
```bash
start "" "%USERPROFILE%\.grok"
```

@tab MacOS
```bash
open "$HOME/.grok"
```
:::

3. 手动创建 `config.toml` 文件（如果没有就新建一个），写入如下内容

```toml
[models]
default = "grok-4.5"
web_search = "grok-4.5"

[endpoints]
models_base_url = "https://right.codes/grok/v1"

[model."grok-4.5"]
model = "grok-4.5"
name = "Grok 4.5"
description = "Grok 4.5 via Right Code"
api_key = "xxx"
api_backend = "responses"
context_window = 1000000
```

:::important
- `models_base_url` 是模型网关的统一入口地址，固定填写 `https://right.codes/grok/v1` 即可
- `api_backend = "responses"` 表示该模型走 Responses API，与官方默认示例保持一致
- 不想把 ApiKey 明文写进配置文件的话，可以把 `api_key = "xxx"` 换成 `env_key = "RIGHTCODE_API_KEY"`（注意这里填的是环境变量的**名字**，不是密钥本身），然后在系统环境变量中设置 `RIGHTCODE_API_KEY` 的值
:::

4. 在 `api_key` 部分填入你在后台生成的ApiKey，替换掉里面的 `xxx`，然后保存

:::warning
请不要把包含真实ApiKey的配置文件截图、发到聊天记录、上传到公开仓库或提交到工单里，避免密钥泄露
:::

5. 在终端运行 `grok inspect`，检查配置是否被正确加载；也可以直接运行下面命令做一次简单测试：
```bash
grok -p "只回复 ok" -m grok-4.5
```

:::warning 配置生效提醒
- 每次修改 `config.toml` 后，都需要重启 `grok` 才会生效。
- 怎么重启：先 `Ctrl + C` 退出当前 `grok`，再重新运行 `grok`。
:::
