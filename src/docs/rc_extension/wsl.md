---
title: Windows 系统下配置 WSL 运行 AI 终端
icon: mynaui:code-waves
order: 1
footer: false
---

## 什么是 WSL？为什么要配置 WSL？

WSL=Windows Subsystem For Linux，可以让你在 Windows 下几乎无感地运行 Linux 子系统，无需配置和运行虚拟机软件。
由于大部分 AI 原生在 Linux 系统上训练，使用 WSL 运行AI终端，通常能获得比直接在 Windows 上运行更好的体验。

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

打开终端并输入 wsl 来连接到相应 wsl 

:::tip
如果输入 `wsl --install` 无反应，尝试用wsl.exe替换wsl
:::

:::tabs
@tab 卸载已经安装的发行版
```bash
wsl --unregister <DistributionName>
```

> 1.如果您想要卸载刚才安装的默认Ubuntu：
```bash
wsl --list --verbose
```

> 2.此时你应该会在命令行中看到已安装的发行版名称，如Ubuntu-24.04. 通过以下命令即可卸载
```
wsl --unregister Ubuntu-24.04
```

@tab 指定位置安装发行版
```bash
wsl --install <DistributionName> --location ""
```

> 1.在目标位置创建新文件夹，如D:\wsl
> 2.通过此命令安装Ubuntu-24.04
```bash
wsl --install Ubuntu-24.04 --location "D:\wsl"
```

@tab 更多相关参数
https://learn.microsoft.com/en-us/windows/wsl/basic-commands#install
:::







## 在WSL中使用Codex或其他AI终端

WSL和Windows的配置文件不互通
因此，我们需要在WSL中导入一份配置文件
:::tabs
@tab 手动导入
> 1.手动复制以下路径中的.codex或.claude配置文件夹：

```bash
C:\Users\<your-user-name>
```


> 2.在资源管理器中输入以下路径（或手动进入此路径）：

```bash
\\wsl.localhost\<Your-Distro-Name>\home\<Your-User-Name>
```

> 3.将刚才复制的文件夹粘贴到此文件夹下并重新启动AI终端即可

@tab 通过Windows下的CC-Switch导入

> 1.点击左上角的齿轮状设置按钮->高级->配置文件目录
> 2.将路径修改为(以Codex为例)
```bash
\\wsl.localhost\<Your-Distro-Name>\home\<Your-User-Name>\.codex
```
:::

## 使用Vscode与WSL协作
点击左下角的亮色 >< 状按钮，选择"Connect to WSL Using Distro"
选择你在上一节中迁移过配置文件的Linux发行版
此时，vscode已经连接到指定WSL.此时在terminal或扩展中唤起相应AI终端即可

:::tabs
@tab Win工作目录下让Codex在WSL中运行

在Vscode Codex拓展右上角设置中点选Windows设置-在WSL中运行即可
如右上角无相关设置：
使用ctrl+,进入vscode设置页面，搜索codex，点选"Run Codex In Windows Subsystem For Linux"设置即可
:::

