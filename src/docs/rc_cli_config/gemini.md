---
title: 手动配置Codex
icon: hugeicons:chat-gpt
order: 4
footer: false
---

:::tip
**强烈建议使用CC-Switch来进行配置，小白友好！**
:::

1. 找到Gemini的配置文件夹
> 首先打开你的`终端`程序，不管你是Windows还是MacOS系统
> 然后根据系统，运行下面的命令，打开gemini的配置文件夹
:::tabs
@tab Windows
CMD命令行：
```bash
start "" "%USERPROFILE%\.gemini"
```

@tab MacOS
```bash
open "$HOME/.gemini"
```
:::

![](/assets/image/rc_cli_config/rc-5.png)

2. 手动创建 `.env` 文件，写入如下内容
```text
GOOGLE_GEMINI_BASE_URL=https://right.codes/gemini
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3-pro-preview
```

3. 在 `GEMINI_API_KEY` 部分填入你在后台生成的Gemini渠道的ApiKey，然后保存

4. 在终端运行 `gemini`，对话查看是否配置成功

![](/assets/image/rc_cli_config/rc-6.png)