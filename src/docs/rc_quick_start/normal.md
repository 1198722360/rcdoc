---
title: 通用配置步骤
icon: hugeicons:configuration-01
order: 4
footer: false
---

## Nodejs检查

> **首先在Windows或者MacOS下运行你的命令行，输入以下命令观察Nodejs是否安装**
>
> **如果没有版本号输出就是没安装，点下面链接下载安装一下**

```bash
node -v
```

> Nodejs下载链接：[Nodejs最新版下载](https://nodejs.org/en/download)

![](/assets/image/rc_quick_start/rc-4.png)

### CLI安装

> **打开你的终端，输入下面的命令，一次性装好所有的CLI**
>
> **安装完若如下所示，说明没啥问题了**

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest

```

![](/assets/image/rc_quick_start/rc-5.png)

### 测试运行

> **打开三个终端，分别运行Claude Code、Codex、Gemini的CLI，如果有界面，说明没有问题了，不需要管其他的报错！**

![](/assets/image/rc_quick_start/rc-6.png)

![](/assets/image/rc_quick_start/rc-7.png)

### 常见问题

#### Claude Code提示缺少Git

> **如下图所示，提示Claude Code缺少Git环境，你需要访问下面的链接下载最新的Git工具进行安装**
>
> **安装好后，重新上面的步骤运行claude进行测试**

> **Git Bash下载地址**：[Git Download](https://git-scm.com/install/windows)

![QQ20260125-132755](/assets/image/rc_quick_start/rc-8.png)