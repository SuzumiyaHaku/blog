export const data = JSON.parse("{\"key\":\"v-1e5478a6\",\"path\":\"/js/new.html\",\"title\":\"new\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"模拟实现\",\"slug\":\"模拟实现\",\"link\":\"#模拟实现\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"js/new.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
