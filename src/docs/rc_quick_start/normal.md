---
title: 通用配置步骤
icon: hugeicons:configuration-01
order: 7
footer: false
---

> **Claude Code、Codex 等 CLI 工具都依赖 Nodejs，请先在下面选择你的系统，确认 Nodejs 已经安装**

::::tabs#os

@tab Windows

**打开命令行，检查 Nodejs**

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，然后输入下面的命令：

```bash
node -v
```

> 能输出版本号，说明 Nodejs 已经装好了。
>
> 如果提示“不是内部或外部命令”，说明 Nodejs 没装好,点击下方链接安装。
> Nodejs下载链接:  [Nodejs 最新版下载](https://nodejs.org/en/download)
> 下载 Windows 安装包（`.msi`）安装，装好后**关掉命令行窗口重新打开**再试一次。

![](/assets/image/rc_quick_start/rc-4.webp)

@tab MacOS

**打开终端，检查 Nodejs**

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后回车，然后输入下面的命令：

```bash
node -v
```

> 能输出版本号，说明 Nodejs 已经装好了。
>
> 如果提示 `command not found`，说明还没装 Nodejs，任选一种方式安装，装好后**关掉终端重新打开**再试一次：
>
> - 到 [Nodejs 官网](https://nodejs.org/en/download) 下载 macOS 安装包（`.pkg`）安装
> - 已经装了 Homebrew 的话，直接运行 `brew install node`

![](/assets/image/rc_quick_start/rc-16.webp)

::::

## 为什么一定要装 Nodejs

Nodejs 是一个让 JavaScript 程序能直接在电脑上运行的环境，它自带的 `npm` 是安装、更新这些程序的“应用商店”。现在大部分 AI 编程工具都是基于它开发和分发的，可以把它理解成日常使用 AI 工具的**地基**：

- **安装 CLI 靠它**：Claude Code、Codex、OpenCode 等工具都通过 `npm` 一条命令安装，没有 Nodejs 就装不上；
- **运行和更新靠它**：工具更新同样用 `npm` 完成，升级到最新版只需要重新执行一次安装命令；
- **扩展能力靠它**：很多 MCP 服务器、插件、缓存代理（例如 [CC缓存优化代理](/docs/rc_cli_config/cache-fix.html)）都通过 `npx` 或 `npm` 启动，同样依赖 Nodejs；
- **AI 帮你干活也要用到它**：让 AI 新建前端项目、运行脚本、安装依赖时，背后调用的也常常是 `node`、`npm`、`npx`。

:::tip
- 建议安装官网标注为 **LTS**（长期支持）的版本，稳定、兼容性最好。部分工具对版本有要求，版本太旧时请升级。
- 装好或升级 Nodejs 后，记得**关掉命令行重新打开**，新版本才会生效。
:::

## 下一步

Nodejs 准备好以后，先到 [安装 AI Agent 工具](/docs/rc_quick_start/install.html) 装好你要用的 CLI 或客户端，然后推荐直接用 [CC-Switch](/docs/rc_quick_start/ccs.html) 一键配置；喜欢手动的话，可以看各个 CLI 的单独教程。不知道该填哪个地址，就看 [渠道地址速查](/docs/rc_questions/endpoints.html)。
