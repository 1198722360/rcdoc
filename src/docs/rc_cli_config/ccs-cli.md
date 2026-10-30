---
title: CC-Switch CLI 使用
icon: streamline:command
order: 2
footer: false
---

## 一、什么时候用 CC-Switch CLI

[CC-Switch](/docs/rc_quick_start/ccs.html) 桌面版需要图形界面。如果你在 **云服务器、SSH 远程、WSL** 这类只有终端的环境里，或者想用脚本批量切换配置，就用它的命令行版本 [cc-switch-cli](https://github.com/SaladDay/cc-switch-cli)。

它有两种用法：

- **TUI 界面**：直接运行 `cc-switch`，在终端里像桌面版一样新增、编辑、切换供应商，第一次配置推荐用这个。
- **命令行**：`cc-switch provider list` 这类命令，适合日常切换、排错，也可以直接让 Claude Code / Codex 帮你执行。

## 二、安装

:::tabs
@tab MacOS / Linux（推荐）
```bash
curl -fsSL https://github.com/SaladDay/cc-switch-cli/releases/latest/download/install.sh | bash
```
默认装到 `~/.local/bin`。如果装完提示找不到 `cc-switch`，把 `~/.local/bin` 加到 `PATH` 里再重开终端。

@tab MacOS 手动安装
```bash
curl -LO https://github.com/saladday/cc-switch-cli/releases/latest/download/cc-switch-cli-darwin-universal.tar.gz
tar -xzf cc-switch-cli-darwin-universal.tar.gz
chmod +x cc-switch
sudo mv cc-switch /usr/local/bin/
# 如果提示“无法验证开发者”
xattr -cr /usr/local/bin/cc-switch
```

@tab Linux 手动安装
```bash
# x64 机器；ARM64 机器把 x64 换成 arm64
curl -LO https://github.com/saladday/cc-switch-cli/releases/latest/download/cc-switch-cli-linux-x64-musl.tar.gz
tar -xzf cc-switch-cli-linux-x64-musl.tar.gz
chmod +x cc-switch
sudo mv cc-switch /usr/local/bin/
```

@tab Windows
到 [GitHub Releases](https://github.com/SaladDay/cc-switch-cli/releases/latest) 下载 `cc-switch-cli-windows-x64.zip`，解压后把 `cc-switch.exe` 放到 `PATH` 里的任意目录，或者在解压目录里直接运行 `.\cc-switch.exe`。
:::

## 三、配置 Right Code

1. 先确认要配置的 CLI 已经装好，并且至少运行过一次（这样它才会生成自己的配置目录），可以用下面命令检查：

```bash
cc-switch env tools
```

2. 到后台为要用的 CLI 创建对应渠道的 ApiKey：Claude Code 选 Claude 渠道，Codex 选 Codex 渠道。用哪个渠道由 Key 决定，地址是统一的，见 [渠道地址速查](/docs/rc_questions/endpoints.html)。

3. 进入 TUI。默认管理的是 Claude Code，要配置其他 CLI 就加 `--app`：

```bash
cc-switch                 # Claude Code
cc-switch --app codex     # Codex
```

4. 在左侧选 `Providers`，新增一个供应商：
   - 模板列表里有 `Right Code` 就直接选它，只需要填 `API Key`。
   - 没有的话选自定义：Claude Code 的请求地址填 `https://api.site`，Codex 填 `https://api.site/v1`。

   ![](/assets/image/rc_cli_config/rc-24.webp)

   ![](/assets/image/rc_cli_config/rc-25.webp)

   > 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

5. 保存后回到供应商列表，确认当前选中的是刚添加的 Right Code。

   ![](/assets/image/rc_cli_config/rc-26.webp)

   > 注意：图中的请求地址为旧地址，请改为 `https://api.site`；原来带 `/v1` 的保留 `/v1`，即 `https://api.site/v1`。

6. 如果配置的是 Claude Code，到 `设置` 里打开 **跳过 Claude Code 初次安装确认**。它会往 `~/.claude.json` 写入 `hasCompletedOnboarding: true`，避免 Claude Code 第一次启动卡在官方登录页。

   ![](/assets/image/rc_cli_config/rc-27.webp)

7. 运行 `claude` 或 `codex`，随便聊一句，能正常回复就说明配置好了。

## 四、常用命令

```bash
cc-switch                             # 进入 TUI 界面
cc-switch env tools                   # 检查本机装了哪些 CLI
cc-switch env check                   # 检查环境变量是否冲突
cc-switch provider list               # 查看 Claude Code 的供应商
cc-switch provider current            # 查看当前生效的供应商
cc-switch provider switch <id>        # 切换供应商
cc-switch provider stream-check <id>  # 检查供应商流式响应是否正常
cc-switch provider fetch-models <id>  # 拉取该供应商的模型列表
cc-switch --app codex provider list   # 管理 Codex 时加 --app codex
cc-switch update                      # 更新 cc-switch-cli 本身
```

:::tip 让 AI 帮你操作
你已经在用 Claude Code 或 Codex 的话，可以直接对它说：“帮我运行 `cc-switch provider list`，看看当前有哪些供应商”，或者“帮我运行 `cc-switch env check`，检查有没有环境变量冲突”。
:::

:::warning 环境变量会覆盖配置
如果系统里设置过 `ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN`、`OPENAI_API_KEY` 这类环境变量，它们可能会覆盖 CC-Switch 写入的配置，导致“明明切换了却不生效”。遇到这种情况先跑一遍 `cc-switch env check`。
:::
