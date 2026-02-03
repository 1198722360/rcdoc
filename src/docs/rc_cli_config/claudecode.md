---
title: 手动配置Claude Code
icon: hugeicons:configuration-01
order: 2
footer: false
---

:::tip
**强烈建议使用CC-Switch来进行配置，小白友好！**
:::

1. 找到Claude Code的配置文件夹
> 首先打开你的`终端`程序，不管你是Windows还是MacOS系统
> 然后根据系统，运行下面的命令，打开claude code的配置文件夹
:::tabs
@tab Windows
CMD命令行：
```bash
start "" "%USERPROFILE%\.claude"
```

@tab MacOS
```bash
open "$HOME/.claude"
```
:::

![](/assets/image/rc_cli_config/rc-1.png)

2. 手动创建 `settings.json` 文件，写入如下内容

:::important
这里以官渠CC作为示例，如果你想使用其他渠道，请更换 `ANTHROPIC_BASE_URL`
:::

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "",
    "ANTHROPIC_BASE_URL": "https://right.codes/claude", 
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

3. 在 `ANTHROPIC_AUTH_TOKEN` 部分填入你在后台生成的ApiKey，然后保存

4. 在终端运行 `claude`，对话查看是否配置成功

![](/assets/image/rc_cli_config/rc-2.png)