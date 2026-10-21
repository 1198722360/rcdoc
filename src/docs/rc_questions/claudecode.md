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

## 常见报错速查

| 报错关键词 | 一句话处理 |
| --- | --- |
| `401 Invalid API key` | Key 填错或不完整，重新复制完整 Key |
| `504 Gateway time-out` | 等 2 分钟后发“继续”，大任务拆小 |
| `522 Connection timed out` | 等 2 分钟后重试，持续出现进群反馈 |
| `empty or malformed response (HTTP 200)` | 重试一次，不行就新开会话 |
| 自动重试，`Last error: unknown` | 先等重试，不行检查网络和代理 |

### 401 Invalid API key

**原因：** Key 填错、复制不完整，或 Key 已被删除。

**解决：**

1. 到控制台「令牌管理」，点击密钥旁的复制图标，复制**完整**的 Key（不要手动框选，容易漏字符）；
2. 重新填到 `settings.json` 的 `ANTHROPIC_AUTH_TOKEN`（或 CC-Switch 里），保存后重启 `claude`；
3. 确认这个 Key 绑定的是 **Claude 渠道**，用其他渠道的 Key 调 Claude 模型也会失败。

### 504 Gateway time-out

**原因：** 单次请求处理时间太长，服务端等待超时后断开了。多见于长时间运行的大任务，和你的文件、操作无关。

**解决：**

1. 等待约 **2 分钟**，然后发送“继续”，大多数情况能接着跑；
2. 看一下工作目录，断开前可能已经生成了一半的文件，避免重复操作或用到不完整的文件；
3. 把大任务拆小，例如“下载数据 → 处理数据 → 写代码”分成几次让它做。

### 522 Connection timed out

**原因：** 暂时连不上服务器，属于服务端临时问题，**不需要改任何配置**。

**解决：** 等待 2 分钟以上再重试。如果持续出现，进群告诉我们报错时间，我们来排查。

### API returned an empty or malformed response (HTTP 200)

**现象：** 提示返回内容为空（`0 bytes`、`0 stream events received`），之后再发“继续”只回复 `No response requested`。

**解决：**

1. 稍等后重试一次；
2. 如果在同一个会话里反复发“继续”都没用，**新开一个会话**，把任务重新发一遍；
3. 频繁出现时进群反馈。

### 请求失败自动重试，Last error: unknown

**原因：** 客户端没收到可识别的错误信息，常见于网络波动、VPN 或代理断开、服务端临时故障。

**解决：**

1. 先等它自动重试，通常一两次就恢复；
2. 重试 10 次都失败，检查网络、VPN 和代理设置（如 `HTTPS_PROXY`），再检查 Key 和 `ANTHROPIC_BASE_URL` 是否填对；
3. 重启 `claude` 或新开会话；
4. 还是不行，用 `claude --debug` 启动，把具体报错截图发到群里。

:::tip
Claude Desktop 的报错（模型不可用、需要开启虚拟机平台等）请看 [Claude Desktop 配置后可能出现的问题](/docs/rc_client/claude-desktop.html#三、配置后可能出现的问题)。
:::

## 明明选的是 Opus，账单里怎么有别的模型

**这是正常现象，不是配置错了，也不是被多扣钱。**

Claude Code 会在后台自己做一些辅助工作，比如给对话生成标题、压缩过长的上下文。这些活它会交给更便宜、更快的小模型（例如 Haiku）去做，而不是用你选的主模型。另外，如果你用了子 Agent（Subagent，比如内置的 Explore，或者你自定义的 Agent），每个子 Agent 也可以单独指定模型，账单里自然会出现对应记录。

Claude Desktop 也一样：新建对话发出第一条消息后，会自动调一次小模型来生成对话标题。

- 这类调用一般只花几分钱，不用管；
- 如果金额明显偏大，到后台的使用记录里查一下对应时间的那几笔，看清楚是哪个模型、哪个 Key 产生的，有疑问可以进群找我们，群号见 [Right Code 简介](/docs/rc_quick_start/intro.html#三、交流qq群)。

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
