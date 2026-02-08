---
title: 配置在 Zed 中使用
icon: /zed-logo.svg
order: 1
footer: false
---

# 在 Zed 中配置并使用

在 Zed 中有两种使用方式：一种是 ACP 模式，另一种是 Zed Agent 模式。


## 以 ACP 方式使用

使用 ACP 模式时，内置以下几个 Agent：

- Claude Code
- Codex CLI
- Gemini CLI

![Zed ACP](/assets/image/rc_extension/zed/zed-agents.png)

其他 Agent（例如 OpenCode）可以点击上图中的 `Add More Agents`，从 `ACP Registry` 添加。

![Zed ACPs](/assets/image/rc_extension/zed/acps.png)

这种方式按 Claude Code / Codex CLI / Gemini CLI 的配置方式进行即可。

## 在 Zed Agent 模式中使用

1. 打开右下角的 Agent Panel，点击当前模型

![ Change Model](/assets/image/rc_extension/zed/change-model.png)

2. 点击 `Configure`

![ Zed acps](/assets/image/rc_extension/zed/add-providers.png)

3. 点击 `Add Provider`，并选择 `Compatible APIs OpenAI`

4. 按下图进行配置：

![ Zed acps](/assets/image/rc_extension/zed/set-provider.png)

**一定要勾选 `support chat/completions`，否则会报错。**
