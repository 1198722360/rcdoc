---
title: 使用CC-Switch配置
icon: hugeicons:configuration-01
order: 1
footer: false
---

## 什么是 CC-Switch？

**使用 CC-Switch，您可以：**

![](/assets/image/rc_quick_start/rc-0.png)

- ✅ 一键切换 API 配置 - 在多个 API 提供商之间快速切换
- ✅ 可视化配置管理 - 通过图形界面轻松管理所有配置
- ✅ 内置 Right Code 模板 - 预设了 Right Code的配置模板
- ✅ MCP 服务器管理 - 管理 Model Context Protocol 服务器
- ✅ 系统托盘快捷操作 - 通过托盘菜单快速切换
- ✅ 本地代理 - 支持热切换CC、CX、Gemini的供应商
- ✅ 故障转移 - 全自动渠道故障转移

> **目前CC-Switch 已经内置了 Right Code 的快捷配置模板，无需手动编辑配置文件！**

### 软件下载

> 访问 [CC Switch Download](https://github.com/farion1231/cc-switch/releases/latest) 页面下载最新的CC-Switch工具，在本地进行安装

![](/assets/image/rc_quick_start/rc-9.png)

### 配置渠道商

> **这一步以Codex的配置为例，CC与Gemini配置同理**

- **步骤一：**
  - 打开软件，选择要配置的CLI
  - 选择好CLI后，点击添加供应商进行配置

![](/assets/image/rc_quick_start/rc-10.png)

- **步骤二：**
  - 在上方 `预设供应商` 中选择 `Right Code` 
  - 在 `API Key` 部分填写你在后台生成的密钥
  - 右下角点击添加

::: important
我们的Claude Code目前有两个渠道：

 - CC官渠：`https://right.codes/claude`
 - AWSQ逆向渠道：`https://right.codes/claude`

如果你想使用不同的渠道，需要更改 `请求地址` 一栏内容
:::

![](/assets/image/rc_quick_start/rc-11.png)

- **步骤三：**
  - 在主界面查看，确保目前使用的渠道是我们刚配置的

![](/assets/image/rc_quick_start/rc-12.png)

- **步骤四：**
    - 在主界面点击设置按钮，进入通用设置页面

    - 在下方找到 `跳过Claude Code初次安装确认`，确保这项是打开的

![](/assets/image/rc_quick_start/rc-13.png)

![](/assets/image/rc_quick_start/rc-14.png)

- **步骤四：**
  - 打开终端，运行codex或者claude，进行简单对话，查看配置是否正常

![](/assets/image/rc_quick_start/rc-999.png)