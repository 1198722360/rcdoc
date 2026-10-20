---
title: Claude Code 相关疑问
icon: material-icon-theme:claude
order: 1
footer: false
---

## 首次启动提示无法连接 Anthropic 或要求登录

第一次运行 `claude` 时，可能会卡在官方登录页，或者报下面这样的错：

```text
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com: ERR_BAD_REQUEST
```

这是 Claude Code 在走官方的初次登录流程，和 Right Code 的配置无关。告诉它“已经完成过初始化”就能跳过：

1. 打开用户目录下的 `.claude.json` 文件（注意是用户目录下的文件，不是 `.claude` 文件夹）

:::tabs
@tab Windows
CMD命令行：
```bash
notepad "%USERPROFILE%\.claude.json"
```

@tab MacOS
```bash
open -e "$HOME/.claude.json"
```
:::

2. 在最外层的大括号里加上一行 `"hasCompletedOnboarding": true`，保存。如果文件不存在或者是空的，直接写入：

```json
{
  "hasCompletedOnboarding": true
}
```

3. 按 [手动配置 Claude Code](/docs/rc_cli_config/claudecode.html) 配好 `settings.json` 后，重新运行 `claude`。

:::tip
用 [CC-Switch](/docs/rc_quick_start/ccs.html) 或 [CC-Switch CLI](/docs/rc_cli_config/ccs-cli.html) 配置的话，在设置里打开“跳过 Claude Code 初次安装确认”，效果一样。
:::

## 明明选的是 Opus，账单里怎么有别的模型

**这是正常现象，不是配置错了，也不是被多扣钱。**

Claude Code 会在后台自己做一些辅助工作，比如给对话生成标题、压缩过长的上下文。这些活它会交给更便宜、更快的小模型（例如 Haiku）去做，而不是用你选的主模型。另外，如果你用了子 Agent（Subagent，比如内置的 Explore，或者你自定义的 Agent），每个子 Agent 也可以单独指定模型，账单里自然会出现对应记录。

Claude Desktop 也一样：新建对话发出第一条消息后，会自动调一次小模型来生成对话标题。

- 这类调用一般只花几分钱，不用管；
- 如果金额明显偏大，到后台的使用记录里查一下对应时间的那几笔，看清楚是哪个模型、哪个 Key 产生的，有疑问可以进群找我们，群号见 [Right Code 简介](/docs/rc_quick_start/intro.html#qq群)。

## VSCode 插件怎么用 Right Code

VSCode 的 Claude Code 插件会读取 Claude Code CLI 的配置，所以**先确保 CLI 已经能正常对话**（参考 [手动配置 Claude Code](/docs/rc_cli_config/claudecode.html)）。

如果插件仍然要求登录官方账号，可以这样处理：

1. 打开 Claude Code 的配置文件夹

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

2. 在里面新建（或打开）`config.json`，写入下面内容并保存。这里的值随便填一个非空字符串即可，真正的 Key 仍然以 `settings.json` 为准：

```json
{
  "primaryApiKey": "RightCode"
}
```

3. 完全重启 VSCode。

## 常用命令速查

| 命令 | 作用 |
| --- | --- |
| `claude` | 在当前目录启动交互式会话 |
| `claude "解释一下这个项目"` | 启动时带上第一个问题 |
| `claude -p "解释这个函数"` | 一次性问答，输出后直接退出，适合脚本调用 |
| `cat logs.txt \| claude -p "总结报错"` | 把文件或命令输出通过管道交给 Claude |
| `claude -c` | 继续当前目录最近的一次会话 |
| `claude -r <会话ID>` | 恢复指定的会话 |
| `claude --model sonnet` | 指定本次会话使用的模型 |
| `claude --add-dir ../lib` | 额外允许访问其他目录 |
| `claude mcp` | 管理 MCP 服务器 |
| `claude update` | 更新 Claude Code |

:::warning
`claude --dangerously-skip-permissions` 会跳过所有权限确认，让 Claude 直接读写文件、执行命令，只在你完全信任的环境（例如隔离的容器）里使用。
:::

## 额度消耗得太快

可以从这几个方向排查：

1. 尽量在同一个会话里连续工作，不要频繁开新会话，缓存才能持续命中；
2. MCP、Skills 不用的就关掉，它们的定义每次请求都会带上；
3. 任务拆小一点，避免上下文被撑满后反复压缩；
4. 重度用户可以试试 [Claude Code 缓存优化代理](/docs/rc_cli_config/cache-fix.html)。
