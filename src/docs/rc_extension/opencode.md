---
title: 在 OpenCode 中配置使用
icon: /assets/icon/opencode/opencode.jpg
order: 1
footer: false
---

## 手把手教你用 CC-Switch 配置 OpenCode

OpenCode 现在请直接用 [CC-Switch](/docs/rc_cli_config/ccs.html) 配，不用再下载旧的 zip、手改 `opencode.json`。

### 第一步：先装好 OpenCode

如果你是初次配置，先在终端安装并运行一次：

```bash
npm i -g opencode-ai
```

```bash
opencode
```

![](/assets/image/rc_extension/opencode/oc-install.jpg)

### 第二步：在 OpenCode 里添加凭证

输入 `provider_id`，以及你自己使用的中转站 ApiKey。

![](/assets/image/rc_extension/opencode/oc-cli-credential.jpg)

### 第三步：打开 CC-Switch，切到 OpenCode

还没装 CCS 的话，先看 [CC-Switch 配置](/docs/rc_cli_config/ccs.html) 完成下载安装。

打开软件后，顶部先切到 **OpenCode**，再点右上角加号。

![](/assets/image/rc_extension/opencode/oc-ccs-plus.jpg)

### 第四步：添加供应商

供应商标识必须和刚才在命令行里填的 `provider_id` 一样，再填入你在后台生成的 ApiKey，点击添加。

::: important
创建 Key 时保持默认即可。`可用模型限制` 不要开——选模型是在 OpenCode 里选，不是在创建 Key 的时候选。还不清楚的话看 [ApiKey 管理](/docs/rc_quick_start/apikey.html)。
:::

![](/assets/image/rc_extension/opencode/oc-ccs-provider-id.jpg)

### 第五步：重启终端，启动 OpenCode

重启命令行，再运行 `opencode`，能看到模型就说明配置成功。

![](/assets/image/rc_extension/opencode/oc-restart-models.jpg)
