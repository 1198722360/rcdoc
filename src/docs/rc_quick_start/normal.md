---
title: 通用配置步骤
icon: hugeicons:configuration-01
order: 4
footer: false
---

## Nodejs检查

> **首先在 Windows 或者 macOS 下运行你的命令行，输入以下命令观察 Node.js 是否安装**
>
> **如果没有版本号输出就是没安装，点下面链接下载安装一下**

```bash
node -v
```

> Node.js 下载链接：[Nodejs最新版下载](https://nodejs.org/en/download)

![](/assets/image/rc_quick_start/rc-4.webp)

### CLI 安装

> **打开终端，先装 Claude Code 和 Codex。Grok Build 不是 npm 包，下一节单独装。**

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
```

![](/assets/image/rc_quick_start/rc-5.jpg)

### 安装 Grok Build

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

装完检查一下：

```bash
grok --version
```

![](/assets/image/rc_quick_start/rc-grok-install.jpg)

### 用 CC-Switch 配置 Grok

打开 CC-Switch，顶部切到 **Grok**，再点添加供应商。

- 在上方预设中选择 `xAI (Grok)`
- 请求地址改为：`https://rightapi.ai/grok/v1`
- `API Key` 填写你在后台生成的密钥
- 右下角点击添加

![](/assets/image/rc_quick_start/ccs-grok-add.jpg)

### 测试运行

> **打开三个终端，分别运行 Claude Code、Codex、Grok Build。如果有界面，说明没有问题了，不需要管其他的报错！**

```bash
claude
```

```bash
codex
```

```bash
grok
```

![](/assets/image/rc_quick_start/rc-6.jpg)

### 常见问题

#### Claude Code 提示缺少 Git

> **如下图所示，提示 Claude Code 缺少 Git 环境，你需要访问下面的链接下载最新的 Git 工具进行安装**
>
> **安装好后，重新上面的步骤运行 claude 进行测试**

> **Git Bash 下载地址**：[Git Download](https://git-scm.com/install/windows)

![QQ20260125-132755](/assets/image/rc_quick_start/rc-8.webp)
