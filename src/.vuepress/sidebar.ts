import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/docs/": [
    {
      text: "快速开始",
      icon: "streamline-sharp:startup-solid",
      prefix: "rc_quick_start/",
      children: [
        {
          text: "RCode简介",
          icon: "fluent-mdl2:web-environment",
          link: "intro.md",
        },
        {
          text: "注册账号",
          icon: "mdi:account-plus",
          link: "register.md",
        },
        {
          text: "充值",
          icon: "fluent-mdl2:money",
          link: "recharge.md",
        },
        {
          text: "渠道与模型",
          icon: "carbon:model-alt",
          link: "models.md",
        },
        {
          text: "ApiKey 管理",
          icon: "mdi:key",
          link: "apikey.md",
        },
        {
          text: "通用步骤 (一定要做)",
          icon: "hugeicons:configuration-01",
          link: "normal.md",
        },
        {
          text: "安装 AI Agent 工具",
          icon: "mdi:download",
          link: "install.md",
        },
        {
          text: "CC-Switch配置",
          icon: "vaadin:tools",
          link: "ccs.md",
        },
      ],
    },
    {
      text: "CLI 配置",
      icon: "streamline:command",
      prefix: "rc_cli_config/",
      children: [
        {
          text: "CC-Switch CLI",
          icon: "streamline:command",
          link: "ccs-cli.md",
        },
        {
          text: "Claude Code配置",
          icon: "material-icon-theme:claude",
          link: "claudecode.md",
        },
        {
          text: "Codex配置",
          icon: "hugeicons:chat-gpt",
          link: "codex.md",
        },
        {
          text: "Grok配置",
          icon: "/grok-logo.svg",
          link: "grok.md",
        },
        {
          text: "CC缓存优化代理",
          icon: "mdi:cached",
          link: "cache-fix.md",
        },
      ],
    },
    {
      text: "官方客户端",
      icon: "mdi:application-outline",
      prefix: "rc_client/",
      children: [
        {
          text: "Claude Desktop",
          icon: "material-icon-theme:claude",
          link: "claude-desktop.md",
        },
        {
          text: "ChatGPT",
          icon: "hugeicons:chat-gpt",
          link: "chatgpt.md",
        },
      ],
    },
    {
      text: "画图接口",
      icon: "material-symbols:draw-outline",
      prefix: "rc_draw/",
      children: [
        {
          text: "接口总览",
          icon: "material-symbols:draw-outline",
          link: "README.md",
        },
        {
          text: "OpenAI 生成",
          icon: "hugeicons:chat-gpt",
          link: "openai.md",
        },
        {
          text: "Gemini 生成",
          icon: "vscode-icons:file-type-gemini",
          link: "gemini.md",
        },
        {
          text: "任务查询",
          icon: "material-symbols:manage-search",
          link: "tasks.md",
        },
        {
          text: "ChatGPT 配置生成",
          icon: "hugeicons:chat-gpt",
          link: "chatgpt.md",
        },
      ],
    },
    {
      text: "Jev 决策模型",
      icon: "carbon:decision-tree",
      prefix: "rc_jev/",
      children: [
        {
          text: "模型总览",
          icon: "carbon:decision-tree",
          link: "README.md",
        },
        {
          text: "接口参考",
          icon: "mdi:api",
          link: "api.md",
        },
        {
          text: "图片输入与框选",
          icon: "material-symbols:image-search",
          link: "images.md",
        },
        {
          text: "SDK 接入",
          icon: "carbon:sdk",
          link: "sdk.md",
        },
        {
          text: "在线对话测试",
          icon: "mdi:chat-processing-outline",
          link: "chat.md",
        },
      ],
    },
    {
      text: "第三方使用",
      icon: "streamline-freehand-color:plugin-jigsaw-puzzle",
      prefix: "rc_extension/",
      children: [
        {
          text: "Curl调用示例",
          icon: "si:pull-request-fill",
          link: "curl.md",
        },
        {
          text: "CherryStudio",
          icon: "/assets/icon/cherrystudio/cherrystudio.png",
          link: "cherrystudio.md",
        },
        {
          text: "WorkBuddy",
          icon: "/workbuddy-logo.svg",
          link: "workbuddy.md",
        },
        {
          text: "DeepSeek Harness",
          icon: "/deepseek-logo.svg",
          link: "deepseek.md",
        },
        {
          text: "OpenCode",
          icon: "/assets/icon/opencode/opencode.jpg",
          link: "opencode.md",
        },
        {
          text: "Hermes Agent",
          icon: "/hermes-logo.svg",
          link: "hermes.md",
        },
      ],
    },
    {
      text: "常见问题",
      icon: "streamline-freehand-color:plugin-jigsaw-puzzle",
      prefix: "rc_questions/",
      children: [
        {
          text: "Claude Code",
          icon: "material-icon-theme:claude",
          link: "claudecode.md",
        },
        {
          text: "Codex",
          icon: "hugeicons:chat-gpt",
          link: "codex.md",
        },
        {
          text: "Grok Build",
          icon: "/grok-logo.svg",
          link: "grok.md",
        },
        {
          text: "渠道地址速查",
          icon: "mdi:link-variant",
          link: "endpoints.md",
        },
      ],
    },
  ],
});
