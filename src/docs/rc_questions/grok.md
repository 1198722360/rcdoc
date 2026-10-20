---
title: Grok Build 相关疑问
icon: /grok-logo.svg
order: 3
footer: false
---

基础配置请先看 [Grok Build 安装配置](/docs/rc_cli_config/grok.html)。

## 把 Key 填到 env_key 里后用不了

`env_key` 只能填**环境变量的名字**（比如 `RIGHTCODE_API_KEY`），不能直接填 Key 本身。

想把 Key 直接写在配置文件里，请用 `api_key`：

```toml
[model."grok-4.5"]
api_key = "你的 Right Code Key"
```

想用环境变量的话，先在系统里设置好 `RIGHTCODE_API_KEY`，再在配置里写 `env_key = "RIGHTCODE_API_KEY"`。

## 提示模型不存在或没有权限

按顺序检查：

1. Key 绑定的渠道下有没有你填的模型，看 [渠道与模型](/docs/rc_quick_start/models.html)；
2. `models_base_url` 是否和 [Grok Build 安装配置](/docs/rc_cli_config/grok.html) 里写的一致；
3. `[model."xxx"]` 里的 `model` 是否和后台显示的模型名称完全一致；
4. Key 是否复制完整，前后有没有多余的空格。

## /effort 调整思考强度不生效

需要在该模型的配置块里声明支持思考强度：

```toml
[model."grok-4.5"]
supports_reasoning_effort = true
```

只有加了这一行，`/effort` 命令和 `--effort` 参数才会对这个模型生效。

## 接入非 Grok 模型后无法对话

Grok Build 的 `workflows` 是 Grok 模型专属功能，接其他模型时要关掉，否则对话会失败：

```toml
[workflows]
enabled = false
```

:::tip
以上配置改完后，都要先 `Ctrl + C` 退出 `grok` 再重新运行才会生效。
:::
