export const themeData = JSON.parse("{\"docsDir\":\"zh\",\"lastUpdated\":false,\"contributors\":false,\"locales\":{\"/\":{\"sidebar\":{\"/zh/\":[{\"text\":\"javascript\",\"children\":[\"/zh/js/this.md\",\"/zh/js/class.md\",\"/zh/js/event.md\",\"/zh/js/function.md\",\"/zh/js/module.md\",\"/zh/js/promise1.md\",\"/zh/js/promise2.md\",\"/zh/js/scope.md\",\"/zh/js/new.md\",\"/zh/js/let,var.md\",\"/zh/js/bind.md\",\"/zh/js/apply.md\",\"/zh/js/assign.md\"]},{\"text\":\"typescript\",\"children\":[\"/zh/typescript/tsconfig.md\",\"/zh/typescript/base.md\",\"/zh/typescript/polyfill.md\",\"/zh/typescript/gymnastics.md\"]},{\"text\":\"前端相关\",\"children\":[\"/zh/web/webpack1.md\",\"/zh/web/webpack2.md\",\"/zh/web/url.md\",\"/zh/web/babel.md\"]},{\"text\":\"web安全相关\",\"children\":[\"/zh/security/xss与csrf.md\",\"/zh/security/cors请求.md\",\"/zh/security/cookie和session.md\",\"/zh/security/oauth2.0和jwt.md\"]},{\"text\":\"计算机网络相关\",\"children\":[\"/zh/network/http.md\",\"/zh/network/tcp,udp.md\"]},{\"text\":\"数据结构与算法\",\"children\":[]},{\"text\":\"java\",\"children\":[\"/zh/java/springboot.md\"]}]},\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdatedText\":\"Last Updated\",\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
