---
title: 在 Kilocode 中使用（VS Code 插件）
icon: /kilocode.gif
order: 1
footer: false
---

## 在 VS Code 中配置 Kilocode

1. 在 VS Code 的扩展面板中搜索 `Kilo Code`，下载发布者为 `kilocode.ai` 的扩展（通常是第一个）


![Kilo Code 安装](/assets/image/rc_extension/kilocode/vscode-kilocode.png)

2. 打开 Kilocode 面板，点击“设置”

![Kilo-Code 设置](/assets/image/rc_extension/kilocode/kilocode-settings.png)

3. 按下图完成配置：

![Kilo-Code 设置](/assets/image/rc_extension/kilocode/kilocode-set-providers.png)

- `API Provider`：**OpenAI Compatible (Responses)**
- `Base URL`：`https://right.codes/codex/v1`
- `API Key`：填写从 [令牌管理](https://right.codes/api-keys) 获取的令牌
- `Model`：选择 `gpt-5.2` 或其他模型

4. 继续向下滚动

![Kilo-Code 设置](/assets/image/rc_extension/kilocode/kilocode-set-providers2.png)

- 勾选 `Enable Reasoning Effort`，并选择任意值
- `Max Output Tokens`：保留 `-1` 默认值（或填入 `128000`）
- `Context Window Size`：填入 `400000`
- 勾选 `Prompt Caching`
- 其余的 `Input/Output Price` 可填可不填
- `Cache Reads/Writes Price` 为 `0`（缓存不计费）

5. 点击 `Save` 回到插件首页，选择刚刚配置的 `profile`，即可开始使用
