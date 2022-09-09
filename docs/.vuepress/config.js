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
    docsDir: '/zh/',
    
    sidebar: {
      // SidebarItem
      '/': [
        { 
          text: 'javascript', children: [
            'this.md',
            'class.md',
            'event.md',
            'function.md',
            'module.md',
            'promise1.md',
            'promise2.md',
            'scope.md',
            'new.md',
            'gc.md',
            'let,var.md',
            'bind.md',
            'apply.md',
            'assign.md',
          ]
        }
      ]
    },
  }),
  plugins: [
    searchPlugin({
      // 配置项
    }),

  ],

})