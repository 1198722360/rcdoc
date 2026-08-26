---
title: 在 Hermes Agent 中配置使用
icon: streamline:command
order: 4
footer: false
---

## 这篇教程适合谁看

这篇教程适合想在自己电脑上直接运行 `hermes` 的用户。

:::important
如果你是 Windows 用户，请先进入 WSL 再继续。Hermes 不支持 Windows 原生命令行安装。

如果你还没有装 WSL，先看 [WSL 配置](/docs/rc_cli_config/wsl.html)。
:::

这一页只讲本地命令行直接运行 `hermes` 的用法。连到 Right Code 请用 [CC-Switch](/docs/rc_cli_config/ccs.html)，不用再手改 `config.yaml` 和 `.env`。Feishu、Telegram、托管部署这些内容可以让 Hermes 本身帮你配置。

## 第一步：安装 Hermes

先根据你的系统，运行下面的命令。

:::tabs
@tab Windows + WSL

请先打开 WSL 里的 Ubuntu、Debian 之类的 Linux 终端，然后运行：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

@tab macOS

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

@tab Linux

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```
:::

装好以后，Hermes 的配置一般会出现在 `~/.hermes` 下面。

如果安装结束后当前终端里还找不到 `hermes` 命令，先把终端关掉再打开一次。

![](/assets/image/rc_extension/hermes/hermes-install.jpg)

## 第二步：用 CC-Switch 把 Hermes 连到 Right Code

还没装 CCS 的话，先看 [CC-Switch 配置](/docs/rc_cli_config/ccs.html)。

打开软件后，顶部先切到 **Hermes**，再点右上角加号添加 API。

![](/assets/image/rc_extension/hermes/hermes-ccs-plus.jpg)

预设供应商里选择 **自定义配置**。

![](/assets/image/rc_extension/hermes/hermes-ccs-custom.jpg)

按页面填好供应商名称、官网链接、API 模式、API 端点和 ApiKey，点击添加。API 模式选 `OpenAI Chat Completions`，官网链接和 API 端点都填 `https://www.rightapi.ai`。

::: important
创建 Key 时保持默认即可。`可用模型限制` 不要开。还不清楚两个开关干什么，看 [ApiKey 管理](/docs/rc_quick_start/apikey.html)。
:::

![](/assets/image/rc_extension/hermes/hermes-ccs-form.jpg)

启用后，到命令行里运行 `hermes`。能看到模型，就说明已经配好了。

![](/assets/image/rc_extension/hermes/hermes-cli-start.jpg)

## 第三步（可选）：打上缓存兼容补丁

这一步不是主流程。只有你主要走 GPT Codex 组、又很在意缓存命中时才需要。

CCS 只负责写配置，不会自动打这个补丁。补丁的作用是：把 Hermes 调整得更适合 Right Code 的 `/codex` 接口，让缓存命中接近原生 Codex。

先找一个你平时放项目的目录，然后运行：

```bash
git clone https://github.com/foryourhealth111-pixel/hermes-codex-proxy-cache-compat.git
cd hermes-codex-proxy-cache-compat
bash scripts/apply_patches.sh ~/.hermes/hermes-agent
bash scripts/install_skill.sh ~/.hermes
```

这里不用把它想得太复杂。你只要知道：

1. 中转地址不只看你发了什么内容，还会看整个请求长什么样，而 Hermes 没有配置好这些，缓存命中很低，额度就会用得很快。
2. 这个补丁就是把这部分也补齐，让其达到和原生 Codex 一样的缓存命中水平。

Hermes 更新后，补丁有可能要重新打一遍；到补丁仓库 README 看最新说明即可。

## 第四步：启动 Hermes，做一次最小可用确认

`hermes` 启动进去以后，先问一个简单问题，比如：

```text
请用三句话介绍一下 hermes 是做什么的。
```

只要它能正常返回内容，这一轮就算已经跑通。

![](/assets/image/rc_extension/hermes/hermes-chat.jpg)

如果这一步报的是 Key 错误、地址错误，或者模型不存在，回到第二步重新检查就行。

:::tip
如果你后面还想额外看一眼缓存有没有动起来，可以在同一个会话里连续问两次前缀差不多的问题，再留意 `cached_tokens` 或 `cache_read_tokens`。

如果你每次都开新会话、每次都换一大段提示词，那就算补丁装对了，也不一定能看到明显缓存命中。
:::

## 结束

现在你已经可以继续正常使用 Hermes + Right Code 了。

需要继续看 Key 或模型信息的话，可以接着看：

1. [ApiKey 管理](/docs/rc_quick_start/apikey.html)
2. [渠道与模型](/docs/rc_quick_start/models.html)
