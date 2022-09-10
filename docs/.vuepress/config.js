import { defaultTheme, defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '知识',
  description: '计算机知识',
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  
  theme: defaultTheme({
    docsDir: 'zh',
    lastUpdated: false,
    contributors: false,
    // home: '/zh/js/event.html',
    locales: {
      '/': {
        sidebar: {
          // SidebarItem
          '/zh/': [
            {
              text: 'javascript', children: [
                '/zh/js/this.md',
                '/zh/js/class.md',
                '/zh/js/event.md',
                '/zh/js/function.md',
                '/zh/js/module.md',
                '/zh/js/promise1.md',
                '/zh/js/promise2.md',
                '/zh/js/scope.md',
                '/zh/js/new.md',
                '/zh/js/gc.md',
                '/zh/js/let,var.md',
                '/zh/js/bind.md',
                '/zh/js/apply.md',
                '/zh/js/assign.md',
              ]
            },
            
            {
              text: 'typescript', children: [
                '/zh/typescript/base.md',
                '/zh/typescript/polyfill.md',
                '/zh/typescript/gymnastics.md',
              ]
            },
            {
              text: '前端相关', children: [
                '/zh/web/webpack.md',
                '/zh/web/url.md',
                '/zh/web/babel.md',
              ]
            },
            {
              text: 'web安全相关', children: [
                '/zh/security/xss与csrf.md',
                '/zh/security/cors请求.md',
                '/zh/security/cookie和session.md',
                '/zh/security/auth2.0和jwt.md',
              ]
            },
            
            {
              text: '计算机网络相关', children: [
                '/zh/network/http.md',
                '/zh/network/tcp,udp.md',
              ]
            },
            {
              text: '数据结构与算法', children: []
            },
            {
              text: 'java', children: [
                '/zh/java/springboot.md'
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