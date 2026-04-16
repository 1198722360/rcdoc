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

如果你还没有装 WSL，先看 [WSL 配置](/docs/rc_extension/wsl.html)。
:::

这一页只讲本地命令行直接运行 `hermes` 的用法， Feishu、Telegram、托管部署这些内容可以让hermes本身帮你配置。

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

## 第二步：把 Hermes 连到 Right Code

先把 Hermes 的配置目录打开。你用自己顺手的编辑器改文件就行。

:::tabs
@tab Windows + WSL

先在 WSL 里进入配置目录，然后把它在 Windows 里打开：

```bash
cd ~/.hermes
explorer.exe .
```

@tab macOS

```bash
open "$HOME/.hermes"
```

@tab Linux

```bash
xdg-open "$HOME/.hermes"
```
:::

如果这条命令没有反应，也可以直接用文件管理器手动打开 `~/.hermes`。
<img width="848" height="551" alt="image" src="https://github.com/user-attachments/assets/269b9fdf-afe6-400a-8a62-5dd74ea63b13" />


然后先打开 `config.yaml`，把模型这一段改成下面这样：

```yaml
model:
  provider: custom
  default: gpt-5.4-xhigh
  base_url: https://right.codes/codex/v1
  api_mode: chat_completions
```

<img width="412" height="141" alt="image" src="https://github.com/user-attachments/assets/9b0e4e4f-b22a-4df9-8768-068cd5ccbe03" />

可以直接这样理解：

1. `base_url` 就是告诉 Hermes 以后往哪条接口地址发请求。
2. `default` 就是默认先用哪个模型。
3. `api_mode` 先照着写就行，不需要先研究它背后的协议细节。

然后再打开 `~/.hermes/.env`，填入你自己的 Right Code Key：

```bash
OPENAI_API_KEY=你的 Right Code Key
```

如果这个文件里已经有 `OPENAI_API_KEY`，就把它改成你这次要用的 Key。

如果你还没有 Key，可以先看 [ApiKey 管理](/docs/rc_quick_start/apikey.html)。

## 第三步：打上缓存兼容补丁（暂时只支持GPT Codex组）

这一步可以简单理解成：
把 Hermes 调整得更适合 Right Code 这类 `/codex` 接口。

先找一个你平时放项目的目录，然后运行：

```bash
git clone https://github.com/foryourhealth111-pixel/hermes-codex-proxy-cache-compat.git
cd hermes-codex-proxy-cache-compat
bash scripts/apply_patches.sh ~/.hermes/hermes-agent
bash scripts/install_skill.sh ~/.hermes
```

这里不用把它想得太复杂。你只要知道：

1. 中转地址不只看你发了什么内容，还会看整个请求长什么样，而hermes没有配置好这些，缓存命中很低，额度就会用的很快。
2. 这个补丁就是把这部分也补齐。让其达到和原生Codex一样的缓存命中水平

## 第四步：启动 Hermes，做一次最小可用确认

现在直接启动：

```bash
hermes
```

进去以后，先问一个简单问题，比如：

<img width="1876" height="950" alt="image" src="https://github.com/user-attachments/assets/e988357c-f0e7-46ee-8959-f4c505ef3b10" />


```text
请用三句话介绍一下hermes 是做什么的。
```

只要它能正常返回内容，这一轮就算已经跑通。

如果这一步报的是 Key 错误、地址错误，或者模型不存在，回到第二步重新检查就行。

:::tip
如果你后面还想额外看一眼缓存有没有动起来，可以在同一个会话里连续问两次前缀差不多的问题，再留意 `cached_tokens` 或 `cache_read_tokens`。

如果你每次都开新会话、每次都换一大段提示词，那就算补丁装对了，也不一定能看到明显缓存命中。
:::

## 结束

现在你已经可以继续正常使用 Hermes + Right Code 了。

如果后面 Hermes 更新了，补丁有可能要重新打一遍；到补丁仓库 README 看最新说明即可。

需要继续看 Key 或模型信息的话，可以接着看：

1. [ApiKey 管理](/docs/rc_quick_start/apikey.html)
2. [渠道与模型](/docs/rc_quick_start/models.html)
