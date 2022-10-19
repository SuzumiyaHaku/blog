import { defineClientConfig } from '@vuepress/client'
import Equal from './components/Equal.vue'
import MTA from './components/MTA.vue'
import SierpinskiTriangle from './components/SierpinskiTriangle.vue'
import Leaf from './components/Leaf.vue'
import MandelbrotSet from './components/MandelbrotSet.vue'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Equal', Equal)
    app.component('MTA', MTA)
    app.component('SierpinskiTriangle', SierpinskiTriangle),
    app.component('Leaf', Leaf)
    app.component('MandelbrotSet', MandelbrotSet)
  },
})
