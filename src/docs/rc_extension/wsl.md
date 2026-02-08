---
title: Windows 系统下配置 WSL 运行 AI 终端
icon: /wsl2-logo.svg
order: 1
footer: false
---

## 什么是 WSL？为什么要配置 WSL？

WSL = Windows Subsystem for Linux，可以让你在 Windows 下几乎无感地运行 Linux 子系统，无需配置或运行虚拟机软件。
由于不少 AI 工具在 Linux 环境下原生支持更好，使用 WSL 运行 AI 终端通常能获得比直接在 Windows 上运行更好的体验。

## 配置 WSL


打开命令行并执行：

```bash
wsl --install
```

安装完成后，按提示配置用户并重启。重启后执行以下命令：

```bash
wsl -l -v
```

通常你会看到已经安装了一个 Ubuntu 作为默认发行版。
<img src="/assets/image/rc_extension/wsl/rc-1.webp" width="600" style="display:block;margin:0 auto;height:auto;" />
打开终端并输入 `wsl` 来连接到相应的 WSL。
<img src="/assets/image/rc_extension/wsl/rc-2.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

:::tip
如果输入 `wsl --install` 无反应，尝试用 `wsl.exe` 替换 `wsl`。
:::

:::tabs
@tab 卸载已经安装的发行版
```bash
wsl --unregister <DistributionName>
```

> 1. 如果你想卸载刚才安装的默认 Ubuntu：
```bash
wsl --list --verbose
```

> 2. 此时你应该会在命令行中看到已安装的发行版名称，例如 `Ubuntu-24.04`。通过以下命令即可卸载：
```bash
wsl --unregister Ubuntu-24.04
```

@tab 指定位置安装发行版
```bash
wsl --install <DistributionName> --location ""
```

> 1. 在目标位置创建新文件夹，例如 `D:\wsl`
> 2. 通过此命令安装 Ubuntu-24.04：
```bash
wsl --install Ubuntu-24.04 --location "D:\wsl"
```

@tab 更多相关参数
<https://learn.microsoft.com/en-us/windows/wsl/basic-commands#install>
:::



## 在 WSL 中使用 Codex 或其他 AI 终端
打开命令行，输入 `wsl` 登录到默认的 WSL。
由于 WSL 是全新的系统，你仍然需要在其中重新安装 AI 终端相关工具。

> 首先安装 Node.js 和 npm（此处使用 nvm 管理）：
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

nvm install 22
nvm use 22
```

<img src="/assets/image/rc_extension/wsl/rc-3.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

> 然后通过 npm 安装 Codex：

```bash
npm install -g openai@codex
```

<img src="/assets/image/rc_extension/wsl/rc-4.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

> WSL 和 Windows 的配置文件不互通  
> 因此，我们需要在 WSL 中导入一份配置文件。

:::tabs
@tab 手动导入
> 1. 手动复制以下路径中的 `.codex` 或 `.claude` 配置文件夹：
<img src="/assets/image/rc_extension/wsl/rc-5.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

```bash
C:\Users\<your-user-name>
```


> 2. 在资源管理器中输入以下路径（或从左下角小企鹅手动进入此路径）：

<img src="/assets/image/rc_extension/wsl/rc-6.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

```bash
\\wsl.localhost\<Your-Distro-Name>\home\<Your-User-Name>
```

<img src="/assets/image/rc_extension/wsl/rc-7.webp" width="600" style="display:block;margin:0 auto;height:auto;" />
> 3. 将刚才复制的文件夹粘贴到该目录下，并重新启动 AI 终端即可

@tab 通过 Windows 下的 CC-Switch 导入

> 1. 点击左上角的设置（齿轮）按钮 → 高级 → 配置文件目录
<img src="/assets/image/rc_extension/wsl/rc-8.webp" width="600" style="display:block;margin:0 auto;height:auto;" />
> 2. 将路径修改为（以 Codex 为例）：

```bash
\\wsl.localhost\<Your-Distro-Name>\home\<Your-User-Name>\.codex
```
:::
 
> 现在你应该能够在 Windows 目录中唤起 WSL，然后在 WSL 中正常使用 Codex。  
> 如果你觉得麻烦，可以直接看下一节。
<img src="/assets/image/rc_extension/wsl/rc-9.webp" width="600" style="display:block;margin:0 auto;height:auto;" />


## 使用 VS Code 与 WSL 协作（以 Codex 扩展为例）


:::tabs
@tab VS Code 留在 Windows 中
**在不连接 WSL、在 Windows 目录下工作的前提下：**
<img src="/assets/image/rc_extension/wsl/rc-10.webp" width="600" style="display:block;margin:0 auto;height:auto;" />
如图所示，在 VS Code 的 Codex 扩展右上角设置中点选 `Windows 设置 - 在 WSL 中运行`，然后重新加载 VS Code 窗口即可。
如右上角无相关设置：
使用 `Ctrl+,` 进入 VS Code 设置页面，搜索 `codex`，勾选 `Run Codex In Windows Subsystem For Linux` 设置即可。



@tab VS Code 连接到 WSL
点击左下角的 `><`（远程连接）按钮

<img src="/assets/image/rc_extension/wsl/rc-11.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

选择 `Connect to WSL Using Distro`

<img src="/assets/image/rc_extension/wsl/rc-12.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

选择你在上一节中迁移过配置文件的 Linux 发行版

<img src="/assets/image/rc_extension/wsl/rc-13.webp" width="600" style="display:block;margin:0 auto;height:auto;" />

此时，VS Code 已经连接到指定的 WSL。  
如提示缺少 Codex CLI，请在 WSL 中重新安装 Codex CLI；随后直接唤起 Codex 扩展即可使用。  
此时可在 Terminal 或扩展中唤起相应 AI 终端即可。  
**如发现扩展提示需登录，请回看第二节「在 WSL 中使用 Codex 或其他 AI 终端」中的配置迁移部分。**
:::
