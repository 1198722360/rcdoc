---
title: Codex 相关疑问
icon: hugeicons:chat-gpt
order: 2
footer: false
---

## 如何在Codex中使用最新模型

:::tip 通用启用方式（推荐）
- 打开 `config.toml`，找到这一行：`model = "gpt-xxx"`。
- 把它改成你想启用的模型（例如：`model = "gpt-5.6-sol"`），然后保存。
- 保存后重启你正在用的客户端即可生效：`Codex CLI` / `Codex App` / `VSCode` 插件。
- **重要：启用后不要在会话里切换模型。** 如果切换过，请重新执行：`codex -m gpt-5.6-sol -c model_reasoning_effort="ultra"`。
:::

### CLI 使用方法

1. 打开终端，使用下面命令启动 Codex：

```bash
codex -m gpt-5.6-sol -c model_reasoning_effort="ultra"
```

2. 进入对话后，直接提问即可使用最新模型。

::: tip
如果你当前已经打开了 `codex`，先按 `Ctrl + C` 退出，再用上面的命令重新启动。
:::

### VSCode 版本使用方法

:::warning 版本提示
插件教程仅适用于当前支持的 Codex 插件版本 `v26.5707.31428`。
:::

1. 首先打开你的Vscode，查看你的VScode插件版本号
::: important
**这里一定要把插件换成预发布版本**
:::

![](/assets/image/rc_questions/rc-01.webp)

2. 找到Vscode的插件目录
> 首先打开你的`终端`程序，不管你是Windows还是MacOS系统
> 然后根据系统，运行下面的命令，打开vscode的插件目录
:::tabs
@tab Windows
CMD命令行：
```bash
start "" "%userprofile%\.vscode\extensions"
```

@tab MacOS
```bash
open "$HOME/.vscode/extensions"
```
:::

3. 在目录下寻找文件开头为 `openai.chatgpt`  的目录，可能会有多个，需要对应你查看的插件的版本号
::: tip
**比如上图显示的版本号为 `26.5707.31428` ，则你需要找的文件夹开头应该是：**

`openai.chatgpt-26.5707.31428-`
:::

4. 打开文件夹，接着进入 `webview\assets` 目录，这个目录会有一大堆的js文件

![](/assets/image/rc_questions/rc-02.webp)

5. 下载如下的压缩包，解压后拿到js文件，将这个js文件复制到 `webview\assets` 目录，替换原有js文件

<CodexDownload version="26.5707.31428" summary="已适配最新的 GPT-5.6 系列模型" />

6. 重启Vscode，观察模型列表是否有了最新的模型

## 改了 config.toml 但不生效

请求还是发到旧地址、或者改的模型没变化，按顺序检查：

1. **彻底重启了吗：** CLI 按 `Ctrl + C` 退出再运行 `codex`；VSCode 执行 `Reload Window`；Codex App / ChatGPT 客户端要在托盘图标上右键退出，只关窗口不算。
2. **位置写对了吗：** `model_provider`、`model` 这些顶层配置必须写在**所有 `[xxx]` 表头之前**；`base_url` 必须写在 `[model_providers.rightcode]` 下面。写错位置会被忽略。
3. **provider 名字对吗：** 顶层 `model_provider = "rightcode"` 要和 `[model_providers.rightcode]` 的名字一致。不要把自定义 provider 命名为 `openai`，它是内置名字，不能覆盖。
4. **有环境变量在覆盖吗：** 检查系统里有没有设置 `OPENAI_BASE_URL`、`CODEX_HOME`。设置了 `CODEX_HOME` 的话，Codex 读的是那个目录下的 `config.toml`。
5. **登录了 ChatGPT 账号吗：** 用 ChatGPT 账号登录时会走官方通道，先运行 `codex logout` 退出登录。

:::tip
Windows 和 WSL 的配置文件是两份，各自独立。在哪边运行 Codex，就改哪边的 `config.toml`。
:::

## 改完配置后 Codex 打不开

**原因：** `config.toml` 里有写错的内容，Codex 启动时解析失败，表现为点了没反应或卡住。

**解决：**

1. 打开任务管理器（`Ctrl + Shift + Esc`），结束所有 `Codex`、`ChatGPT`、`codex.exe` 进程；
2. 把配置文件夹里的 `config.toml` 改名为 `config.toml.bak`，再打开 Codex；
3. 能打开就说明是配置写错了。对照 [手动配置 Codex](/docs/rc_cli_config/codex.html#二、手动配置-right-code) 重新写一份，或者把旧配置分段加回去，找出出错的那几行。

:::warning 常见写错的地方
- **Windows 路径：** 路径里的反斜杠要写成 `\\`，或者直接用单引号包起来，例如 `'C:\Users\你的用户名\.codex'`；
- **复制了别人的配置：** 里面的路径带着别人电脑的用户名，在你电脑上全部无效，要改成自己的；
- **参数不支持：** 报 `400` 时，把非必要的参数（如 `service_tier`、`model_verbosity`）先注释掉，逐个加回来排查。
:::

## 提示未设置 API Key

**解决：**

1. 打开 `config.toml`，确认 `[model_providers.rightcode]` 下面有 `experimental_bearer_token = "sk-xxx"`，并且填的是**完整**的 Key；
2. 如果你用的是 `env_key`（从环境变量读取 Key），设置环境变量后要**彻底退出** Codex 再打开，仍不生效就重启电脑；
3. 嫌麻烦的话，直接把 `env_key = ...` 换成 `experimental_bearer_token = "你的Key"` 最省事。

:::warning
用 `experimental_bearer_token` 时 Key 是明文保存的，不要把 `config.toml` 发给别人。
:::

## 报错 requires Responses for tool calls

**现象：** 纯聊天正常，一让它读写文件、执行命令就报 `requires Responses for tool calls; this account only supports Chat Completions`。

**解决：**

1. 检查 `config.toml` 里是否写了 `wire_api = "responses"`；
2. 确认 Key 绑定的是 **Codex 渠道**，在后台「令牌管理」里查看；
3. 以上都没问题仍报错，进群反馈，附上报错截图和使用的模型名。

## 其他常见报错

| 报错关键词 | 一句话处理 |
| --- | --- |
| `401` / `Invalid API key` | Key 填错或不完整，到「令牌管理」重新复制完整 Key |
| `504 Gateway time-out` | 等 2 分钟后发“继续”，大任务拆小 |
| `522 Connection timed out` | 等 2 分钟后重试，持续出现进群反馈 |
| `model not found` | 模型名写错，或 Key 没有该模型的权限 |

> 详细说明见 [Claude Code 常见报错速查](/docs/rc_questions/claudecode.html#常见报错速查)，处理方法通用。ChatGPT 客户端（Codex App）打开仍显示登录页，见 [ChatGPT 配置后可能出现的问题](/docs/rc_client/chatgpt.html#四、配置后可能出现的问题)。

## 账单里为什么有别的模型

**这是正常现象，不是配置错了。** Codex 会在后台自己做一些辅助工作，比如给会话生成标题（`/resume` 列表里那一行）、压缩上下文（`/compact`）、生成代码审查（`/review`，后台可能显示为 `codex-auto-review`）、整理联网搜索结果。这些活会交给另外的模型处理，而不是你在 `/model` 或 `config.toml` 里选的那个。

这类调用一般金额很小，属于 Codex 官方行为，没法在 `config.toml` 里关掉。如果金额明显偏大，到后台使用记录里查一下对应时间的调用，有疑问进群找我们。

## 设置全局提示词（AGENTS.md）

Codex 会读取配置文件夹（`~/.codex`，Windows 是 `%USERPROFILE%\.codex`）下的 `AGENTS.md` 作为全局提示词，没有就新建一个。比如：

```markdown
# 全局工作指南

- 回答必须使用中文
- 总结、计划、任务列表等长内容，先整理逻辑，再用表格输出
```

保存后重启 Codex（或 VSCode）即可生效。项目根目录下也可以放一个 `AGENTS.md`，只对该项目生效，在 Codex 里运行 `/init` 能自动生成模板。

## Windows 下输出中文乱码

1. 按 `Win + R`，输入 `intl.cpl` 回车；
2. 切到 `管理` 选项卡，点击 `更改系统区域设置`；
3. 勾选 `Beta 版：使用 Unicode UTF-8 提供全球语言支持`，确定后重启电脑。

## 用得好不好，关键在任务拆分

很多人觉得 Codex 用久了“变笨”了，大多数时候其实是任务给得太笼统。几个小建议：

- **不要一句话丢一个大需求**（比如“帮我写一个管理后台”），拆成一个个模块化的小任务；
- **提交前心里有数**：大概知道这次会改哪些文件、产生哪些变化，别让项目脱离你的掌控；
- **尽量别触发压缩**：一个任务用了六成上下文还没做完，说明拆得还不够细，宁可开新会话继续。

## 常用命令速查

| 命令 | 作用 |
| --- | --- |
| `/model` | 切换模型和推理强度 |
| `/approvals` | 设置本次会话的审批规则 |
| `/review` | 让 Codex 审查当前工作区的改动 |
| `/resume` | 从历史会话中选一个继续 |
| `/new` | 开启新对话 |
| `/init` | 在当前目录生成 `AGENTS.md` 模板 |
| `/compact` | 压缩对话内容，释放上下文 |
| `/diff` | 查看当前的 git diff |
| `/mention` | 把文件或目录加入对话 |
| `/status` | 查看当前配置和 token 用量 |
| `/mcp` | 列出可用的 MCP 工具 |

<script setup>
import CodexDownload from "@source/.vuepress/components/CodexDownload.vue";
</script>
