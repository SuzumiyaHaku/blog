import { defineClientConfig } from '@vuepress/client'
import Equal from './components/Equal.vue'
import MTA from './components/MTA.vue'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Equal', Equal)
    app.component('MTA', MTA)
  },
})
