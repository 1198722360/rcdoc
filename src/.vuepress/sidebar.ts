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
                    text: "充值与Apikey生成",
                    icon: "fluent-mdl2:money",
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
                }
            ],
        },
        {
            text: "相关问题",
            icon: "bi:patch-question-fill",
            prefix: "rc_questions/",
            children: [
                {
                    text: "Curl调用示例",
                    icon: "si:pull-request-fill",
                    link: "curl.md",
                }
            ],
        },
    ],
});
