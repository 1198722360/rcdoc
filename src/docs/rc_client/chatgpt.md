---
title: 在 ChatGPT 中配置使用
icon: hugeicons:chat-gpt
order: 2
footer: false
---

## ChatGPT 是什么?

这里的 ChatGPT 指 OpenAI 官方桌面客户端里的 Codex App，图形化界面更适合小白使用。它和 Codex CLI、VSCode 插件读取的是**同一份配置文件**，配置一次即可通用。通过修改配置文件，可以在不登录 OpenAI 账号的情况下，把请求转发到 Right Code。

配置文件位置：

- **Windows**：`%USERPROFILE%\.codex\config.toml`
- **MacOS**：`~/.codex/config.toml`

:::warning
ChatGPT 客户端的菜单名称可能会随版本变化，如果和下文不完全一致，在应用菜单中找到对应的选项即可。
:::

:::important
开始前请先准备好 RightCode 的 ApiKey。如果还没有 Key，可以先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成。
:::

## 一、下载安装

::::tabs#os

@tab Windows

1. 打开 [Codex 官方下载页](https://developers.openai.com/codex/quickstart?setup=app)，下载 Windows 版客户端。
2. 运行安装程序，按向导完成安装。
3. 安装完成后应用会自动打开登录页，**不用登录**，先完全退出应用：点击右上角 **×** 关掉窗口，再到任务栏右下角的小托盘里 **右键 ChatGPT 图标 → Exit**，注意要退出小托盘，如下图。
4. 退出后开始配置。

![](/assets/image/rc_client/chatgpt/win-exit.webp)

@tab MacOS

1. 打开 [Codex 官方下载页](https://developers.openai.com/codex/quickstart?setup=app)，下载 macOS 版客户端。
2. 打开下载好的安装包，将应用拖入 `Applications`（应用程序）文件夹。
3. 如果已经打开过应用，先按 `Command + Q` **完全退出**，然后开始配置。

::::

:::tip
**后面是手动配置教程，如果你是小白，强烈建议使用 [CC-Switch](/docs/rc_quick_start/ccs.html) 来进行配置，小白友好，避免手动配置错误！**

如果你已经按 [Codex 安装配置](/docs/rc_cli_config/codex.html) 配好了 Codex CLI，可以跳过第二步，直接看下面的「三、验证配置」。
:::

## 二、手动配置 Right Code

:::important
Codex 的 `base_url` 统一填 `https://api.site/v1`（注意要带 `/v1`），**使用哪个渠道由 ApiKey 绑定的渠道决定**。ApiKey 需要绑定 Codex 渠道，想换渠道只需要换 Key，地址不用改。详见 [渠道地址速查](/docs/rc_questions/endpoints.html)。
:::

::::tabs#os

@tab Windows

1. 打开 Codex 的配置文件夹

> 键盘按下 `Win + R`，输入 `cmd` 后回车，打开命令行窗口，输入下面的指令后回车：

```bash
start "" "%USERPROFILE%\.codex"
```

> 如果提示找不到文件夹，说明还没有生成配置目录，先运行一次下面的命令创建它，再重新打开：

```bash
mkdir "%USERPROFILE%\.codex"
```

![](/assets/image/rc_cli_config/rc-3.webp)

2. 在文件夹中打开 `config.toml` 文件，如果没有则手动创建一个，写入如下内容

   ```toml
   model_provider = "rightcode"
   model = "gpt-5.6-sol"
   model_reasoning_effort = "xhigh"
   network_access = "enabled"
   disable_response_storage = true
   windows_wsl_setup_acknowledged = true
   model_verbosity = "high"
   personality = "pragmatic"
   plan_mode_reasoning_effort = "xhigh"
   service_tier = "fast"

   [model_providers]

   [model_providers.rightcode]
   name = "rightcode"
   base_url = "https://api.site/v1"
   wire_api = "responses"
   requires_openai_auth = false
   experimental_bearer_token = "sk-xxx"
   ```

> 用记事本新建时，注意文件名要是 `config.toml`，不要变成 `config.toml.txt`。可以在文件资源管理器顶部「查看」里勾选「文件扩展名」来确认

3. 将`config.toml`文件下 `experimental_bearer_token` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

![](/assets/image/rc_cli_config/rc-16.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

@tab MacOS

1. 打开 Codex 的配置文件夹

> 按下 `Command + 空格` 打开聚焦搜索，输入 `终端`（或 `Terminal`）后打开，输入下面的指令后回车：

```bash
mkdir -p "$HOME/.codex" && open "$HOME/.codex"
```

> `.codex` 是隐藏文件夹，在访达里按 `Command + Shift + .` 可以显示隐藏文件

2. 在文件夹中打开 `config.toml` 文件，若没有则新建一个，写入如下内容:

   ```toml
   model_provider = "rightcode"
   model = "gpt-5.6-sol"
   model_reasoning_effort = "xhigh"
   network_access = "enabled"
   disable_response_storage = true
   windows_wsl_setup_acknowledged = true
   model_verbosity = "high"
   personality = "pragmatic"
   plan_mode_reasoning_effort = "xhigh"
   service_tier = "fast"

   [model_providers]

   [model_providers.rightcode]
   name = "rightcode"
   base_url = "https://api.site/v1"
   wire_api = "responses"
   requires_openai_auth = false
   experimental_bearer_token = "sk-xxx"
   ```

> 也可以直接在终端运行 `nano "$HOME/.codex/config.toml"` 编辑，粘贴内容后按 `Control + O` 回车保存，`Control + X` 退出

3. 将`config.toml`文件下 `experimental_bearer_token` 部分的`sk-xxx`替换为你在后台生成的 ApiKey，然后保存

![](/assets/image/rc_cli_config/rc-16.webp)

> 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

::::

## 三、验证配置

打开应用，读取到 `config.toml` 后会直接进入主界面（不会再显示登录页）。新建一个对话随便发送一条消息（例如 `你好`），能正常收到回复就说明配置成功。

![](/assets/image/rc_client/chatgpt/verify.webp)

:::warning 配置生效提醒
- 每次修改 `config.toml`，或用 CC-Switch 切换了 Codex 供应商后，都需要**完全退出**应用再重新打开才会生效。
- Codex CLI 和 VSCode 插件版 Codex 同样适用这套配置。
:::

## 四、配置后可能出现的问题

### 问题 1：打开后还是显示登录页

如果应用一直停在 `登录 ChatGPT` 页面：

1. 先**完全退出**应用（见下方问题 2）；
2. 检查 `config.toml` 的内容和文件名是否正确（可以在终端运行一次 `codex`，确认能正常对话）；
3. 重新打开应用。

还是要求登录的话，可以手动填入 Key：

1. 在登录页点击 `使用其他方式登录`；
2. 在 `OpenAI API 密钥` 里粘贴你的 Right Code Codex 渠道 ApiKey，点击 `继续`；
3. 进入应用后发一条测试消息，能正常回复就说明配置成功。

### 问题 2：修改配置后没有生效

只关掉窗口的话，应用可能还在后台运行，用的仍然是旧配置，需要**完全退出**后再重新打开：

::::tabs#os

@tab Windows

- 在菜单栏选择 `文件 → Quit ChatGPT`，或按 `Ctrl + Q` 退出。
- 如果只是关掉了窗口，应用还会留在任务栏右下角的小托盘里，需要 **右键 ChatGPT 图标 → Exit** 才算真正退出（见「一、下载安装」中的截图）。
- 退出后再从开始菜单重新打开应用。

@tab MacOS

- 按 `Command + Q` 退出（只点窗口左上角的红色关闭按钮，应用不会真正退出）。
- 退出后再从启动台或「应用程序」文件夹重新打开应用。

::::

:::tip
Codex 的使用技巧、全局提示词、最新模型启用方法等，可以看 [Codex 相关疑问](/docs/rc_questions/codex.html)，同样适用于桌面客户端。
:::
