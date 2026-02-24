---
title: 在 OpenCode 中配置使用
icon: /opencode.jpg
order: 1
footer: false
---

## 手把手教你配置 OpenCode

1. 下载 [OpenCode（带御三家 + 缓存）](/assets/file/opencode/QuickConfiguration.zip) 压缩包，解压后得到以下文件

![](/assets/image/rc_extension/opencode/rc-01.webp)

2. 打开 `opencode.json` 文件，分别在 `Gemini`、`Claude`、`GPT` 部分配置相应的 API Key，并保存

::: important
注意查看 [ApiKey 生成](/docs/rc_quick_start/apikey.html#如何生成apikey) 教程，要生成正确渠道的 Key：`可用渠道` 记得选择你要使用的渠道，`可用模型` 保持默认即可。
:::

![Gemini配置](/assets/image/rc_extension/opencode/rc-02.webp)

![Claude配置](/assets/image/rc_extension/opencode/rc-03.webp)

![GPT配置](/assets/image/rc_extension/opencode/rc-04.webp)

3. 找到 OpenCode 的配置文件夹

:::important
如果你是初次配置，请先在终端安装 OpenCode，并运行一次：
```bash
npm i -g opencode-ai
```

运行OpenCode
```bash
opencode
```
:::

> 首先打开你的终端程序，不管你是 Windows 还是 macOS 系统  
> 然后根据系统，运行下面的命令，打开 OpenCode 的配置文件夹

:::tabs
@tab Windows
CMD命令行：
```bash
start "" "%USERPROFILE%\.config\opencode"
```

@tab MacOS
```bash
open "$HOME/.config/opencode"
```
:::

![](/assets/image/rc_extension/opencode/rc-05.webp)

4. 将刚才你修改好的 `opencode.json` 与 `plugins` 目录复制到 OpenCode 的配置文件夹

![](/assets/image/rc_extension/opencode/rc-06.webp)

5. 在终端运行 `opencode`，再使用 `/models` 命令查看配置是否成功

![](/assets/image/rc_extension/opencode/rc-07.webp)
