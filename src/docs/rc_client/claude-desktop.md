---
title: 在 Claude Desktop 中配置使用
icon: material-icon-theme:claude
order: 1
footer: false
---

## Claude Desktop 是什么?

Claude Desktop 是 Anthropic 官方桌面客户端，支持聊天、文件处理以及 Claude Code / CoWork 等能力。通过第三方推理配置，可以在不登录 Anthropic 账号的情况下，把请求转发到 Right Code。

:::warning
Claude Desktop 的菜单名称可能会随版本变化，如果和下文不完全一致，在应用菜单中找到对应的配置项即可。
:::

## 一、下载安装

::::tabs#os

@tab Windows

1. 打开 [Claude Desktop 官方下载](https://claude.com/download)。
2. 双击运行安装程序，按向导完成安装。
3. 安装完成后先退出客户端，注意退出小托盘，如下图。
4. 安装完成后开始配置

:::warning Windows 安装失败怎么办
Windows 安装程序在安装过程中需要访问 Anthropic 官方服务器。如果网络不通，安装会直接报错。可以把代理软件切换到 **TUN 模式（全局）** 后重试；或者让安装程序单独走代理：

1. 在安装程序所在的文件夹地址栏输入 `cmd` 并回车，打开命令行；
2. 确认代理软件的本地端口（例如 Clash Verge 默认是 `7897`），然后依次执行：

```bash
set HTTP_PROXY=http://127.0.0.1:7897
set HTTPS_PROXY=http://127.0.0.1:7897
"Claude Setup.exe"
```

把 `7897` 换成你自己的端口，`Claude Setup.exe` 换成实际的安装包文件名。
:::

@tab MacOS

1. 打开 [Claude Desktop 官方下载](https://claude.com/download)。
2. 打开下载好的安装包，将 Claude 拖入 `Applications`（应用程序）文件夹。
3. 在启动台或「应用程序」文件夹中打开 Claude。

::::

:::tip
**后面是手动配置教程，如果你是小白，强烈建议使用 [CC-Switch](/docs/rc_quick_start/ccs.html) 来进行配置，小白友好，避免手动配置错误！**

CC-Switch 支持一键导入 Claude Code 配置并切换渠道。如果你只想手动配置，继续按照下面的步骤操作即可。
:::

## 二、绕过登录并配置RightCode

::::tabs#os

@tab Windows

### 1. 开启开发者模式

打开 Claude Desktop（无需登录），点击窗口左上角的 **☰ 菜单**，依次选择 **帮助** → **故障排查** → **启用开发者模式...**，在弹出的确认框中确认开启。

![](/assets/image/rc_client/claude-desktop/win-01.webp)

### 2. 进入第三方推理配置

开启开发者模式后，左上角菜单中会多出 **开发者** 选项。点击 **☰ 菜单** → **开发者** → **配置第三方推理**。

![](/assets/image/rc_client/claude-desktop/win-02.webp)

### 3. 填写 Right Code 连接信息

在弹出的「Configure third-party inference」窗口中，左侧选择 **Connection**，然后按下表填写：

| 配置项 | 填写内容 |
| --- | --- |
| Connection（连接方式） | 选择 `Gateway` |
| Credential kind | 选择 `Static API key` |
| Gateway base URL | `https://rightapi.ai` |
| Gateway API key | 粘贴你在 Right Code 控制台创建的 API 密钥 |
| Gateway auth scheme | 选择 `bearer` |

其余选项保持默认即可，填写完成后点击右下角的 **Apply Changes**。

![](/assets/image/rc_client/claude-desktop/win-03.webp)

:::tip
填写完成后可以先点击右上角的 **Test connection** 测试连通性，确认无误后再应用。
:::

Gateway API key 可以在 Right Code 控制台的 **令牌管理** 页面获取：在密钥列表中找到要使用的 Key，点击密钥旁边的 **复制图标** 即可复制完整密钥。

![](/assets/image/rc_client/claude-desktop/apikey.webp)

### 4. 保存并重启

在弹出的「Save & Restart?」对话框中点击 **Save & Restart**，Claude Desktop 会自动重启并加载新配置。

![](/assets/image/rc_client/claude-desktop/win-04.webp)

### 5. 验证配置

重启后客户端会直接进入主界面，左下角显示 **Gateway** 即表示已通过网关模式运行。新建一个对话随便发送一条消息（例如 `1+1`），能正常收到回复就说明配置成功。

![](/assets/image/rc_client/claude-desktop/win-05.webp)

@tab MacOS

### 1. 开启开发者模式

打开 Claude Desktop（无需登录），点击屏幕顶部菜单栏的 **帮助** → **故障排查** → **启用开发者模式...**，在弹出的确认框中确认开启。

![](/assets/image/rc_client/claude-desktop/mac-01.webp)

### 2. 进入第三方推理配置

开启开发者模式后，顶部菜单栏会多出 **开发者** 菜单。点击 **开发者** → **配置第三方推理...**。

![](/assets/image/rc_client/claude-desktop/mac-02.webp)

### 3. 填写 Right Code 连接信息

在弹出的「Configure third-party inference」窗口中，左侧选择 **Connection**，然后按下表填写：

| 配置项 | 填写内容 |
| --- | --- |
| Connection（连接方式） | 选择 `Gateway` |
| Credential kind | 选择 `Static API key` |
| Gateway base URL | `https://rightapi.ai` |
| Gateway API key | 粘贴你在 Right Code 控制台创建的 API 密钥 |
| Gateway auth scheme | 选择 `bearer` |

其余选项保持默认即可，填写完成后点击右下角的 **Apply Changes**，并在弹出的「Save & Restart?」对话框中点击 **Save & Restart**，客户端会自动重启并加载新配置。

![](/assets/image/rc_client/claude-desktop/mac-03.webp)

:::tip
填写完成后可以先点击右上角的 **Test connection** 测试连通性，确认无误后再应用。
:::

Gateway API key 可以在 Right Code 控制台的 **令牌管理** 页面获取：在密钥列表中找到要使用的 Key，点击密钥旁边的 **复制图标** 即可复制完整密钥。

![](/assets/image/rc_client/claude-desktop/apikey.webp)

### 4. 验证配置

重启后客户端会直接进入主界面，左下角显示 **Gateway** 即表示已通过网关模式运行。新建一个对话随便发送一条消息（例如 `你好`），能正常收到回复就说明配置成功。

![](/assets/image/rc_client/claude-desktop/mac-04.webp)

::::

:::warning 常见问题
- **没有看到「开发者」菜单**：确认已在「帮助 → 故障排查」中启用开发者模式，必要时完全退出 Claude（包括托盘/菜单栏图标）后重新打开。
- **发送消息无回复或报错**：检查 Gateway base URL 是否准确填写为 `https://rightapi.ai`、API 密钥是否完整复制、auth scheme 是否为 `bearer`。
:::

## 三、配置后可能出现的问题

### 问题 1：提示 Configured model not available（模型不可用）

首次配置后，Claude Desktop 首页可能出现 **Configured model not available** 的报错，展开 **Details** 可以看到类似 `Gateway rejected model "claude-haiku-4-5" (HTTP 404)`、`{"error":"model not found"}` 的信息。

![](/assets/image/rc_client/claude-desktop/issue-01.webp)

**原因**：客户端配置的模型名（如 `claude-haiku-4-5`）与 Right Code 实际提供的模型名不一致，网关找不到该模型，于是返回 404。

**解决方法**（以 CC-Switch 为例）：

1. 打开 CC-Switch，左侧选择 **Claude Desktop**，编辑 Right Code 供应商配置；
2. 在「模型列表」中点击 **获取模型列表**，底部出现「获取到 N 个模型」的提示即表示获取成功；如果获取失败，请检查上方的 API 密钥和请求地址是否填写正确。

![](/assets/image/rc_client/claude-desktop/issue-02.webp)

3. 找到报错中提到的模型（例如 `claude-haiku-4-5`），点击该行右侧的 **下拉箭头**，在列表中选择 Right Code 实际提供的模型名（例如 `claude-haiku-4-5-20251001`）；
4. 点击右下角 **保存**，然后回到 Claude Desktop 点击报错卡片上的 **Check again**（或重启客户端），报错消失即可正常使用。

![](/assets/image/rc_client/claude-desktop/issue-03.webp)

:::tip
报错里的 `probedModel` 字段就是出问题的模型名，按照它在模型列表中找到对应行修改即可。其他模型如果也报同样的错误，用相同方法逐个替换为下拉列表中存在的模型名。
:::

### 问题 2：提示需要开启 Virtual Machine Platform（仅 Windows）

在 Windows 上切换到 **Code / Cowork** 时，右下角可能弹出提示：

> Claude's workspace requires the Virtual Machine Platform on Windows. Enable this feature, then restart.

这表示 Claude 的工作区依赖 Windows 的「虚拟机平台」功能，需要先手动开启。

![](/assets/image/rc_client/claude-desktop/issue-04.webp)

**解决方法**：

1. 按下 `Win + R` 打开「运行」窗口，输入 `optionalfeatures`，点击 **确定**；

![](/assets/image/rc_client/claude-desktop/issue-05.webp)

2. 在弹出的「Windows 功能」窗口中，找到并勾选 **Virtual Machine Platform**（中文系统中显示为 **虚拟机平台**）；
3. 点击 **确定**，等待系统安装完成后 **重启电脑**，再重新打开 Claude Desktop 即可。

![](/assets/image/rc_client/claude-desktop/issue-06.webp)

:::warning
如果勾选后仍然提示，请进入 BIOS/UEFI 确认 CPU 虚拟化（Intel VT-x / AMD-V，部分主板称为 SVM）已开启。
:::
