---
title: ChatGPT 配置生成
icon: hugeicons:chat-gpt
order: 4
footer: false
---

# ChatGPT 配置生成

本页教你给 ChatGPT 桌面客户端（Codex App）装一个生图技能（Skill）。装好以后，在对话里直接说「画一张雪山的高清图」，Codex 就会调用 Right Code 的 `gpt-image-2` 接口出图，并把图片保存到当前目录。

整个配置分两步：

1. **创建技能文件**：在 `.codex/skills/relay-imagegen/` 下放一个 `SKILL.md`，告诉 Codex 什么时候、怎么调用生图接口。
2. **设置环境变量**：把接口地址 `IMAGE_API_BASE` 和生图密钥 `IMAGE_API_KEY` 写进系统环境变量，技能里的脚本会自动读取。

:::important 开始前请确认
- 已经按 [在 ChatGPT 中配置使用](/docs/rc_client/chatgpt.html) 装好客户端并能正常对话。
- 已经准备好**可以调用画图模型**的 ApiKey。还没有的话先参考 [ApiKey 管理](/docs/rc_quick_start/apikey.html) 生成，可用模型见[画图接口](./README.md#可用模型)。
:::

::::tabs#os

@tab Windows

### 1. 打开 PowerShell

键盘按下 `Win + R`，输入 `powershell` 后点击 **确定**。

> 后面的指令都要在 **PowerShell** 中执行，不要用 `cmd`，否则 `$env:USERPROFILE` 这类写法不生效。

![](/assets/image/rc_draw/chatgpt/win-run.webp)

### 2. 创建技能文件夹和 SKILL.md

在 PowerShell 中依次执行下面两条指令：

```powershell
mkdir "$env:USERPROFILE\.codex\skills\relay-imagegen" -Force
```

```powershell
notepad "$env:USERPROFILE\.codex\skills\relay-imagegen\SKILL.md"
```

第一条创建技能文件夹，第二条用记事本打开 `SKILL.md`。因为文件还不存在，记事本会提示「是否创建新文件」，点击 **是** 即可。

![](/assets/image/rc_draw/chatgpt/win-skill-dir.webp)

### 3. 写入技能内容

把下面的内容**完整复制**到记事本里，按 `Ctrl + S` 保存后关闭记事本。

````markdown
---
name: relay-imagegen
description: 用户要求生成图片、画图、做图标或插画时使用。通过中转站的 gpt-image-2 接口生成图片并保存到当前目录。
---

# 生成图片

1. 把用户需求整理成清晰的 prompt。
2. 用 PowerShell 执行下面的脚本，把 PROMPT 和 output.png 替换掉：

```powershell
$body = @{ model = "gpt-image-2"; prompt = "PROMPT"; size = "1024x1024"; n = 1 } | ConvertTo-Json
$resp = Invoke-RestMethod -Uri "$env:IMAGE_API_BASE/images/generations" -Method Post `
  -Headers @{ Authorization = "Bearer $env:IMAGE_API_KEY" } `
  -ContentType "application/json; charset=utf-8" `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -TimeoutSec 180
$out = Join-Path (Get-Location) "output.png"
if ($resp.data[0].b64_json) {
  [IO.File]::WriteAllBytes($out, [Convert]::FromBase64String($resp.data[0].b64_json))
} elseif ($resp.data[0].url) {
  Invoke-WebRequest $resp.data[0].url -OutFile $out
}
Write-Output "已保存: $out"
```

3. 如果报错，把错误信息告诉用户；成功则告诉用户图片路径。
````

> 保存时确认记事本右下角编码为 **UTF-8**，否则中文会乱码。文件开头的 `---` 和 `name`、`description` 不能删，Codex 靠它识别技能。

![](/assets/image/rc_draw/chatgpt/win-skill-file.webp)

### 4. 设置接口地址和密钥

回到 PowerShell，依次执行下面两条指令，把 `sk-xxxxx` 换成你自己的生图密钥：

```powershell
setx IMAGE_API_BASE "https://rightapi.ai/v1"
```

```powershell
setx IMAGE_API_KEY "sk-xxxxx"
```

每条执行后看到「成功: 指定的值已得到保存」即可。

![](/assets/image/rc_draw/chatgpt/win-env.webp)

:::warning
`setx` 写入的环境变量**只对之后新打开的程序生效**。设置完后要把 ChatGPT 完全退出（关掉窗口后，再到任务栏右下角托盘 **右键 ChatGPT 图标 → Exit**），然后重新打开。
:::

### 5. 验证

重新打开 ChatGPT，新建一个对话，输入：

```text
画一张雪山的高清图
```

稍等一两分钟，对话里出现生成的图片，说明配置成功。

![](/assets/image/rc_draw/chatgpt/win-success.webp)

@tab MacOS

### 1. 找到 .zshrc 文件

打开 **访达**，按下 `Command + Shift + G`，输入 `~/.zshrc`，点击下方出现的结果进入。

![](/assets/image/rc_draw/chatgpt/mac-goto-zshrc.webp)

`.zshrc` 是隐藏文件，如果进入用户目录后没看到它，按下 `Command + Shift + .` 显示隐藏文件。找到后右键 **打开方式 → 文本编辑**。

![](/assets/image/rc_draw/chatgpt/mac-hidden-file.webp)

> 如果完全找不到 `.zshrc`，说明还没有这个文件。打开 **终端**，执行 `touch ~/.zshrc && open -e ~/.zshrc` 即可新建并用文本编辑打开。

### 2. 写入接口地址和密钥

把下面这一段复制到 `.zshrc` 文件末尾，把 `sk-xxxxx` 换成你自己的生图密钥，然后按 `Command + S` 保存。

```bash
# ============================================
# Image Config
# ============================================
export IMAGE_API_BASE="https://rightapi.ai/v1"
export IMAGE_API_KEY="sk-xxxxx"
```

> 文件里原有的其他内容（如 Go、Rust、Node.js 的配置）保持不动，只追加这一段。

![](/assets/image/rc_draw/chatgpt/mac-env.webp)

### 3. 创建技能文件

打开 **终端**（启动台搜索「终端」），把下面整段指令**一次性复制**进去，回车执行。它会自动创建技能文件夹并写入 `SKILL.md`：

````bash
mkdir -p ~/.codex/skills/relay-imagegen
cat > ~/.codex/skills/relay-imagegen/SKILL.md << 'EOF'
---
name: relay-imagegen
description: 用户要求生成图片、画图、做图标或插画时使用。通过中转站的 gpt-image-2 接口生成图片并保存到当前目录。
---

# 生成图片

1. 把用户的需求整理成清晰的英文或中文 prompt。
2. 执行下面的命令，把 PROMPT 和文件名替换掉：

```bash
curl -s --max-time 180 "$IMAGE_API_BASE/images/generations" \
  -H "Authorization: Bearer $IMAGE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-2","prompt":"PROMPT","size":"1024x1024","n":1}' \
  -o /tmp/img_resp.json
```

3. 解析返回结果：
   - 如果有 `data[0].b64_json`：
     `jq -r '.data[0].b64_json' /tmp/img_resp.json | base64 -d > output.png`
   - 如果有 `data[0].url`：
     `curl -s -o output.png "$(jq -r '.data[0].url' /tmp/img_resp.json)"`
   - 如果有 `error` 字段，把错误信息告诉用户。
4. 告诉用户图片保存的路径。
EOF
````

执行后终端没有任何报错、回到新的一行提示符，就说明写入成功。

![](/assets/image/rc_draw/chatgpt/mac-skill.webp)

:::tip
技能里用到了 `jq` 解析返回结果。如果终端执行 `jq --version` 提示找不到命令，先用 Homebrew 安装：`brew install jq`。
:::

:::warning
修改 `.zshrc` 后，需要按 `Command + Q` **完全退出** ChatGPT 再重新打开，新的环境变量才会生效。
:::

### 4. 验证

重新打开 ChatGPT，新建一个对话，输入：

```text
画一张雪山图片
```

稍等一两分钟，对话里出现生成的图片，说明配置成功。

![](/assets/image/rc_draw/chatgpt/mac-success.webp)

::::

## 常见问题

**Codex 没有调用技能，而是直接回复文字？**
确认技能文件路径是 `.codex/skills/relay-imagegen/SKILL.md`，文件开头的 `name` 和 `description` 完整，并且已经重启过 ChatGPT。也可以在提问时明确说「用 relay-imagegen 技能画一张……」。

**返回 401 / 403？**
密钥填错、过期，或者该 Key 所在分组没有开通画图模型。检查环境变量里的 `IMAGE_API_KEY`，错误码含义见[画图接口 · 常见 HTTP 错误](./README.md#常见-http-错误)。

**提示找不到 IMAGE_API_BASE，或请求地址不对？**
环境变量还没生效。Windows 重新执行 `setx` 后完全退出托盘里的 ChatGPT 再打开；MacOS 确认 `.zshrc` 已保存，再 `Command + Q` 退出重开。

**想换模型或尺寸？**

1. 直接通过提示词让它使用某个模型或分辨率
2. 修改 `SKILL.md` 里请求体的 `model` 和 `size` 即可，例如换成 `gpt-image-2.5-flare`、`1536x1024`。可选值见 [OpenAI 生成](./openai.md)。
