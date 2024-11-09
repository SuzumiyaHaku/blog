import { defaultTheme, defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import mathjax3 from "markdown-it-mathjax3"
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Dragon的博客',
  description: 'Dragon的博客',
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  extendsMarkdown: (md) => {
    md.use(mathjax3)
    md.linkify.set({ fuzzyEmail: false })
  },
  theme: defaultTheme({
    // docsDir: 'zh',
    lastUpdated: false,
    contributors: false,
    home: '/',
    locales: {
      '/': {
        sidebar: {
          // SidebarItem
          '/': [
            {
              text: 'css',
              children: [
                '/css/filter.md'
              ]
            },
            {
              text: 'javascript', children: [
                '/js/event.md',
                '/js/function.md',
                '/js/module.md',
                '/js/promise1.md',
                '/js/promise2.md',
                '/js/scope.md',
                '/js/class.md',
                '/js/new.md',
                '/js/let,var.md',
                '/js/this.md',
                '/js/bind.md',
                '/js/apply.md',
                '/js/equal.md',
                '/js/assign.md',
                '/js/instanceof.md',
              ]
            },
            
            {
              text: 'typescript', children: [
                `/typescript/tsconfig.md`,
                '/typescript/base.md',
                '/typescript/polyfill.md',
                '/typescript/gymnastics.md',
              ]
            },
            {
              text: '前端相关', children: [
                '/web/index.md',
                '/web/webpack1.md',
                '/web/webpack2.md',
                '/web/url.md',
                '/web/babel.md',
                '/web/webassembly.md',
                '/web/vue3.md',
                '/web/react-hooks.md',
                '/web/onion.md',
              ]
            },
            {
              text: 'web安全相关', children: [
                '/security/xss与csrf.md',
                '/security/cors请求.md',
                '/security/cookie和session.md',
                '/security/oauth2.0和jwt.md',
              ]
            },
            
            {
              text: '计算机网络相关', children: [
                '/network/http.md',
                '/network/tcp,udp.md',
              ]
            },
            // {
            //   text: '数据结构与算法', children: [
            //     '/structure/sort.md',
            //   ]
            // },
            {
              text: 'java', children: [
                '/java/springboot.md',
              ]
            },
            {
              text: '计算机图形学',children: [
                '/graphics/fractal.md',
                '/graphics/heart.md',
                '/graphics/chaos.md'
              ]
            }
          ],
        },
      }
    }
  }),
  plugins: [
    searchPlugin({
      // 配置项
    }),
  ],
  
})