import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Right Code文档",
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,

  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: {
            quietDeps: true,
            silenceDeprecations: ["if-function"],
          },
        },
      },
      server: {
        proxy: {
          '/rc-api': {
            target: 'https://rightapi.ai',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/rc-api/, ''),
          },
        },
      },
    },
  }),
});
