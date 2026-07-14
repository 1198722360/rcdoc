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
          text: "充值",
          icon: "fluent-mdl2:money",
          link: "recharge.md",
        },
        {
          text: "ApiKey 管理",
          icon: "mdi:key",
          link: "apikey.md",
        },
        {
          text: "渠道与模型",
          icon: "carbon:model-alt",
          link: "models.md",
        },
        {
          text: "通用步骤 (一定要看)",
          icon: "hugeicons:configuration-01",
          link: "normal.md",
        },
      ],
    },
    {
      text: "CLI 配置",
      icon: "streamline:command",
      prefix: "rc_cli_config/",
      children: [
        {
          text: "CC-Switch配置",
          icon: "vaadin:tools",
          link: "ccs.md",
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
          text: "Gemini配置",
          icon: "vscode-icons:file-type-gemini",
          link: "gemini.md",
        },
        {
          text: "Grok配置",
          icon: "ri:robot-2-fill",
          link: "grok.md",
        },
        {
          text: "WSL 配置",
          icon: "/wsl2-logo.svg",
          link: "wsl.md",
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
          text: "图片生成",
          icon: "material-symbols:image",
          link: "images-generations.md",
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
          text: "OpenCode",
          icon: "/assets/icon/opencode/opencode.jpg",
          link: "opencode.md",
        },
        {
          text: "Hermes Agent",
          icon: "streamline:command",
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
          text: "Codex",
          icon: "hugeicons:chat-gpt",
          link: "codex.md",
        },
      ],
    },
  ],
});
