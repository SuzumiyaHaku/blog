export const themeData = JSON.parse("{\"lastUpdated\":false,\"contributors\":false,\"home\":\"/\",\"locales\":{\"/\":{\"sidebar\":{\"/\":[{\"text\":\"javascript\",\"children\":[\"/js/event.md\",\"/js/function.md\",\"/js/module.md\",\"/js/promise1.md\",\"/js/promise2.md\",\"/js/scope.md\",\"/js/class.md\",\"/js/new.md\",\"/js/let,var.md\",\"/js/this.md\",\"/js/bind.md\",\"/js/apply.md\",\"/js/equal.md\",\"/js/assign.md\",\"/js/instanceof.md\"]},{\"text\":\"typescript\",\"children\":[\"/typescript/tsconfig.md\",\"/typescript/base.md\",\"/typescript/polyfill.md\",\"/typescript/gymnastics.md\"]},{\"text\":\"前端相关\",\"children\":[\"/web/index.md\",\"/web/webpack1.md\",\"/web/webpack2.md\",\"/web/url.md\",\"/web/babel.md\",\"/web/webassembly.md\",\"/web/vue3.md\",\"/web/react-hooks.md\"]},{\"text\":\"web安全相关\",\"children\":[\"/security/xss与csrf.md\",\"/security/cors请求.md\",\"/security/cookie和session.md\",\"/security/oauth2.0和jwt.md\"]},{\"text\":\"计算机网络相关\",\"children\":[\"/network/http.md\",\"/network/tcp,udp.md\"]},{\"text\":\"java\",\"children\":[\"/java/springboot.md\"]},{\"text\":\"计算机图形学\",\"children\":[\"/graphics/fractal.md\"]}]},\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdatedText\":\"Last Updated\",\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
