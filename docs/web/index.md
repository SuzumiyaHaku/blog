# 索引
<ClientOnly>
  <MTA/>
</ClientOnly>

## 标准
- ECMA-TC39 [GitHub](https://github.com/tc39)

- W3C/WHATWG
  - [W3C CSS标准](https://www.w3.org/Style/CSS/)
  - [WHATWG HTML、XHTML、XML、HTML5标准](https://whatwg-cn.github.io/html/?spm=a21iq3.home.0.0.5d7f2764nN2UHz)
  - [WHATWG DOM标准](https://dom.spec.whatwg.org/)
  - [W3C SVG标准](https://www.w3.org/TR/SVG11/)
  - [W3C 小程序标准](https://www.w3.org/TR/mini-app-white-paper/)

## 操作系统
- Centos [官网 英文](https://www.centos.org/)、Archlinux [官网 英文](https://archlinux.org/)
- Ubuntu、Window、SUSE Linux、Debian、Fedora、OpenSUSE、FreeBSD
## 网络
- TCP/IP/UDP
- DNS
- HTTP

## webServer
- Nginx [官网](https://www.nginx.com/) [GitHub开源书 中文](https://github.com/taobao/nginx-book)
- Apache HTTP Server [官网](https://httpd.apache.org/)
  - Tomcat [官网](https://tomcat.apache.org/)

## 前端研发工具
- 编辑器 `Sublime Text3` `Visual Studio Code` `WebStorm`
- 调试预览 `FireBug` `Chrome DevTools` `编辑器的`
- 在线服务 [CodePen](https://codepen.io) `Visual Studio Online` `JSFiddle`
- 网络调试 [wireshark](https://www.wireshark.org/) [Switchhost](https://swh.app/zh)、
- 图片编辑器 `Photoshop` `Sketch`
- 版本管理 `Git` `SVN`
- F12开发者工具
  - Element、Network、Performance、Memory、Lighthouse、Application、vue/react-tools、Rendering、More tools。。。
## JavaScript
- 变量: var、let、const
- 数据类型: undefined、null、Boolean、Number、String、Symbol、Object、BigInt
- 操作符：`|`，`&`, `||`, `&&`，`<<`, `>>`, `>>>`, `<<<` , `?.`, `??`, `~`, `!`, `**`, `==`, `===`, `#`
- 语句：if、do-while、for、for-in、for-of、goto语句、break、continue、with、switch、eval
- 集合：Array、ArrayBuffer、Map、WeakMap、Set、WeakSet
- 异步流控制：callback、Promise、async/await、generator、iterable
- 模块化：amd、cmd、umd、es-module、commonJS
- 异常：try...catch...finally、throw、Error
- 其他
  - IEEE 754规范
  - this
  - getter、setter
  - 类型判断、instanceof、typeof
  - 类型转换、toString、valueOf
  - 函数/变量声明提升
  - this
  - 原型链、作用域、继承
  - 闭包
  - 箭头函数
  - 类、构造函数
  - 递归、尾递归
  - 函数表达式
  - Super、[[HomeObject]]
  - 装饰器
  - Global
  - 原子性 SharedArrayBuffer
  - Web Workers
  - GC垃圾回收
  - node事件循环、浏览器事件循环

## 浏览器
  - location、history
  - navigator
  - performance
  - Notification
  - Canvas
  - File、Blob
  - XHR、Fetch、JSONP、WebSocket、跨域CORS
  - Cookie、Session、OAuth、SSO(Single Sign On)、JWT、Samesite
  - 兼容
    - [Can I Use ?](https://caniuse.com/)、[MDN](https://developer.mozilla.org/zh-CN/)
    - polyfill、shim
    - browserslist、autoprefixer

## 工程化
### 脚手架
  - CLI开发
    - commander.js 命令行工具
    - inquirer.js 命令行美化
    - ora.js 就是命令行那个点的loading
    - chalk 终端输出美化
    - emoji 表情包
  - 初始化
    - create-react-app
    - vue-cli
    - umi
    - vite
### 包管理
  - npm、yarn、pnpm
### 开发
  - dev-server
  - HMR热加载
  - mock.js
  - proxy代理
### 打包工具
  - webpack、gulp、snowpack、vite、Turbopack
  - js、ts的编译
    - [tsc](https://www.typescriptlang.org/)
    - [babel](https://www.babeljs.cn/)
    - [esbuild](https://esbuild.github.io/)
    - [swc](https://swc.rs/)
### css预处理
  - sass、less、stylus、postcss
### 代码规范
  - js规范
    - [Airbnb JavaScript Style Guide](https://github.com/sivan/javascript-style-guide)
    - [JavaScript Standard Style](https://github.com/standard/standard/blob/master/docs/README-zhcn.md)
    - [Google 开源项目风格指南](https://github.com/zh-google-styleguide/zh-google-styleguide)
    - [阿里巴巴前端规约及配套工具](https://github.com/alibaba/f2e-spec)
  - css命名规范
    - BEM 风格 [官网](https://getbem.com/)
    - SMACSS 风格 [官网](http://smacss.com/)
  - 约束工具
    - ESlint [官网](https://eslint.org/)
    - stylelint [github](https://github.com/stylelint/stylelint)
    - commitlint [官网](https://commitlint.js.org/)
    - Prettier(代码格式化) [官网](https://prettier.io/)
    - husky 和lint-staged(流程控制) [husky github](https://github.com/typicode/husky)
    - F2Elint (阿里前端规约配套的Lint工具) [NPM包](https://www.npmjs.com/)

### 测试
  - 单元测试
    - [jest](https://jestjs.io/zh-Hans/)
    - [mocha](https://mochajs.org/)
    - [jasmine](https://jasmine.github.io/)
  - E2E测试
    - [karma](https://github.com/karma-runner/karma)多浏览器场景下的测试
    - [cypress](https://docs.cypress.io/guides/overview/why-cypress)完整的端到端测试。
    - [playwright](https://playwright.dev/)貌似把Puppeteer的团队挖过来做这个了
    - [Puppeteer](https://github.com/puppeteer/puppeteer)无界面Chrome (Chromium) Node.js API环境
    - [Appium](https://github.com/appium/appium)
    - [WebDriver](https://www.w3.org/TR/webdriver/)
    - [ChromeDriver](https://chromedevtools.github.io/devtools-protocol/)、
    - UIRecorder阿里的 UI录制和回归测试 工具
  - 覆盖率测试
    - Istanbul
    - blanket
    - JSCover
### CI/CD
  - [TravisCI](https://travis-ci.org/)
  - [CircleCI](https://circleci.com/)
  - [Codecov](https://about.codecov.io/)
  - [Jenkins](https://www.jenkins.io/zh/)

### 库 DRY(Don’t Repeat Yourselt)原则
  - CSS
    - scoped CSS
    - css modules
    - css-in-js
    - 样式库
      - Normalize.css 默认html元素css初始化
      - [Tailwind](https://tailwindcss.com/)
  - JS工具包
    - lodash、axios、rxjs、immutable.js/immer.js、dayjs/moment.js等
  - 文档
    - [jsdoc](https://jsdoc.app/)、[dumi](https://d.umijs.org/zh-CN)、[Storybook](https://storybook.js.org/docs/react/get-started/introduction)
  - 设计规范/组件库
    - [ElementUI](https://element.eleme.cn/#/zh-CN)、[Ant Design](https://ant.design/components/overview-cn/)、[Material UI](https://mui.com/zh/material-ui/getting-started/overview/)等
### 性能优化
  - [性能指标](https://web.dev/metrics/)
    - Time to First Byte 第一字节时间 (TTFB)
    - First Contentful Paint 首次内容绘制 (FCP)
    - Largest Contentful Paint 最大内容绘制 (LCP)
    - First Input Delay 首次输入延迟 (FID)
    - Time to Interactive 可交互时间 (TTI)
    - Total Blocking Time 总阻塞时间 (TBT)
    - Cumulative Layout Shift 累积布局偏移 (CLS)
    - Interaction to Next Paint (INP)
  - 评估工具
    - LightHouse
    - [WebPageTest](https://www.webpagetest.org/)
  - 优化方案
    - 代码压缩、文本压缩(gzip、Brotili、Zopfil)、Tree-shaking、code-splitting
    - 图片压缩、小图优化、iconfont、图片格式的选择webp等
    - 加载策略
      - 懒加载、DNS预解析、离线（ServiceWorker、AppCache、离线包）、
      - HTTP缓存、本地缓存、请求合并
      - HTTP2、HTTP3、CDN、服务端渲染
    - 渲染
      - 回流重绘、GPU加速、requestAnimationFrame、防抖
    - 体验加上骨架屏、Loading
### 模块规范
  - 模块研发规范、模块依赖关系描述规范、模块数据描述规范JSON

### DevOps
  - 日志、负载均衡、Shell、Docker、k8s
  - 性能监控
  - web服务器、Nginx、pm2

## 后端部分
  - 数据库
    - MySQL
    - Mariadb
    - PostageSQL
    - MongoDB
    - Redis
    - Oracle
    - Elasticsearch
    - 浏览器
      - WebSQL、IndexedDB
  - API Clients
    - RESTful
    - [GraphQL](https://graphql.org/)
  - 分布式服务
    - RPC(Remote Procedure Call): gRPC、Dubbo、Dnode
    - 实时通讯 Scoket.io
    - 消息中间件 RabbitMQ、Kafka
  - node框架
    - Meteor.js、Express.js、Koa.js、Egg.js、Sails.js、Nest.js（号称为node版本的spring）
    - 服务端渲染SSR/SSG/CSR/ISR
      - [Next.js](https://nextjs.zcopy.site/) 轻量级react服务端渲染应用框架
      - [Nuxt.js](https://www.nuxtjs.cn/) 预设了vue服务端渲染应用的各种配置
  - java框架
    - [Spring Boot](https://spring.io/projects/spring-boot/)、Spring Cloud、Zookeeper、Hadoop
  - 接口文档：Swagger、Yapi、Postman

## 中后台
  - 微前端 qiankun、single-spa
  - 中后台物料规范
  - 中后台低代码搭建协议规范：协议结构、低代码物料描述、应用描述
  - 微前端规范：主应用、子应用、微模块、生命周期函数
  - 物料脚手架
  - Lowcode引擎：入料模块、编排模块、渲染模块、出码模块、大纲/编排/属性/属性设置器面板
  - 市面上的No-Code/LowCode平台
    - 宜搭、乐高、CONE、云凤碟、PowerApps、Outsystems、
  - 开源的Lowcode
    - Budibase(前端svelte,后端koa)、retool、appsmith、mendix、百度amis、阿里LowCodeEngine、腾讯tmagic-editor
  - 体验管理
    - 体验数据采集、稳定性数据采集、性能数据采集
    - 任务分析、任务转化率、任务完成数
    - 行为分析、行文流、热力图、网站旅程
## 数据可视化
  - 数据可视化
    - 技术标准: Canvas、SVG、[WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)、WebGPU、OpenGL
  - 图表类库/可视化框架
    - 基础可视框架：[d3.js](https://d3js.org/)、[AntV G2](http://antv.antfin.com/zh-cn/g2/3.x/index.html)、[F2 移动方案](http://antv.antfin.com/zh-cn/f2/3.x/index.html)、[Vega](http://vega.github.io/)
    - 常用统计图表：[Charjs](https://chartjs.bootcss.com/)、[ECharts](https://echarts.apache.org/zh/index.html)、[Highcharts](https://www.hcharts.cn/)、[AntV G2Plot](https://antv-g2plot.gitee.io/zh/examples/gallery)
    - 图分析与编排：[Cytoscape](https://cytoscape.org/)、[AntV G6](https://antv-g6.gitee.io/zh/)、[mxGraph](https://github.com/jgraph/mxgraph)、[Sigma.js](https://github.com/jacomyal/sigma.js)、[AntV X6](https://antv-x6.gitee.io/zh/)
    - 地理空间可视化：[AntV L7](https://antv-l7.gitee.io/zh/)、[Leaflet](https://leafletjs.com/)、[Mapbox](https://github.com/mapbox/mapbox.js)、[PolyMaps](http://polymaps.org/)
## 互动技术
  - 技术标准
    - CSS、Canvas、SVG、Shader、WGSL
    - WebGPU(最新的)、Metal（Apple设备上的API）、VulKan（OpenGL 的下一代版本）、Direct3D 12、[WebGL(仅实现了OpenGL 2.x/3.x的标准，无法满足现在的GPU的框架体系)](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)、OpenGL、
    - web媒体技术：WebXR、WebRTC
    - [WebAssembly](https://www.wasm.com.cn/)
  - 基础概念
    - 场景、节点、组件、相机、灯光、材质、着色器、网格、后处理、刚体、环境渲染、天空盒子、射线、粒子、碰撞器
  - 互动引擎：渲染引擎、动画引擎、声音引擎、GUI引擎、XR引擎、物理引擎
  - 网页游戏引擎
    - [babylonjs](https://www.babylonjs.com/)
    - [Egret白鹭](https://www.egret.com/)
    - [Laya](http://www.layabox.com/)
    - [three.js](https://threejs.org/)
## 智能化
  - 深度学习框架Tensorflow
    - [Tensorflow.js](https://tensorflow.google.cn/js/guide?hl=zh-cn)
  - 基础概念
    深度学习(卷积神经网络)