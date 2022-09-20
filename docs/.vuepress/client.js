import { defineClientConfig } from '@vuepress/client'
import Equal from './components/Equal.vue'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Equal', Equal)
  },
})
