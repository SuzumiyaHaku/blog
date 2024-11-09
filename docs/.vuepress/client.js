import { defineClientConfig } from '@vuepress/client'
import Equal from './components/Equal.vue'
import MTA from './components/MTA.vue'
import SierpinskiTriangle from './components/SierpinskiTriangle.vue'
import Leaf from './components/Leaf.vue'
import MandelbrotSet from './components/MandelbrotSet.vue'
import Power from './components/Power.vue'
import Menu from './components/Menu.vue'
import HeartBase from './components/heart/HeartBase.vue'
import HeartLine from './components/heart/HeartLine.vue'
import HeartFill from './components/heart/HeartFill.vue'
import Heartbeat from './components/heart/Heartbeat.vue'
import LineCanvasGame from './components/LineCanvasGame.vue'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Equal', Equal)
    app.component('MTA', MTA)
    app.component('SierpinskiTriangle', SierpinskiTriangle)
    app.component('Leaf', Leaf)
    app.component('MandelbrotSet', MandelbrotSet)
    app.component('Power', Power)
    app.component('Menu', Menu)
    app.component('HeartBase', HeartBase)
    app.component('HeartLine', HeartLine)
    app.component('HeartFill', HeartFill)
    app.component('Heartbeat', Heartbeat)
    app.component('LineCanvasGame', LineCanvasGame)
  },
})
