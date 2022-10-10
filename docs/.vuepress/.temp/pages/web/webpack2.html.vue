<template><div><h1 id="webpack-和-vite" tabindex="-1"><a class="header-anchor" href="#webpack-和-vite" aria-hidden="true">#</a> webpack 和 vite</h1>
<ClientOnly>
  <MTA/>
</ClientOnly>
<h2 id="webpack和vite两者有什么区别" tabindex="-1"><a class="header-anchor" href="#webpack和vite两者有什么区别" aria-hidden="true">#</a> webpack和vite两者有什么区别</h2>
<p>webpack core 是一个纯打包工具（对标 Rollup），而 Vite 其实是一个更上层的工具链方案，对标的是 （webpack + 针对 web 的常用配置 + webpack-dev-server）。</p>
<p>意思两者不是同样的东西。vite被分为cli部分和api的部分，api的部分才和webpack相似。</p>
<h2 id="vite和webpack5的缓存" tabindex="-1"><a class="header-anchor" href="#vite和webpack5的缓存" aria-hidden="true">#</a> vite和webpack5的缓存</h2>
<h3 id="vite缓存" tabindex="-1"><a class="header-anchor" href="#vite缓存" aria-hidden="true">#</a> vite缓存</h3>
<ol>
<li>浏览器缓存
解析后的依赖请求会以 HTTP 头 max-age=31536000,immutable 强缓存，以提高在开发时的页面重载性能。一旦被缓存，这些请求将永远不会再到达开发服务器。</li>
<li>文件系统缓存
Vite会将预构建的依赖缓存到node_modules/.vite。它根据几个源来决定是否需要重新运行预构建步骤：</li>
</ol>
<ul>
<li>package.json中的dependencies列表。</li>
<li>包管理器的 lockfile，例如 package-lock.json, yarn.lock，或者 pnpm-lock.yaml。</li>
<li>可能在 vite.config.js 相关字段中配置过的。</li>
</ul>
<p>只有在上述其中一项发生更改时，才需要重新运行预构建。</p>
<p>如果出于某些原因，你想要强制 Vite 重新构建依赖，你可以用 --force 命令行选项启动开发服务器，或者手动删除 node_modules/.vite 目录。</p>
<h3 id="webpack缓存" tabindex="-1"><a class="header-anchor" href="#webpack缓存" aria-hidden="true">#</a> webpack缓存</h3>
<p>在4.x版本中需要使用cache-loader来对打包结果进行缓存。在5.x版本中，无需再次安装cache-loader，如果没有做任何配置，默认就开启了打包缓存，不过是缓存到内存(memory)中，内存的空间多么宝贵啊，有些时候内存可能还不够用，我们就可以对cache配置，将缓存结果缓存到硬盘(filesystem)中。同时也可以指定缓存文件被保存的位置。
配置webpack.config.js的cache.type 设置为 'filesystem'时，编译的缓存默认在 node_modules/.cache/webpack里</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">cache</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'filesystem'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">allowCollectingMemory</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">buildDependencies</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token punctuation">[</span>__filename<span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">compression</span><span class="token operator">:</span> <span class="token string">'gzip'</span><span class="token punctuation">,</span> <span class="token comment">// 配置项仅在 cache.type 设为 'filesystem' 时可用。用于缓存文件的压缩类型。development 模式下默认为 false，production 模式下默认为 'gzip'。</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vite为啥比webpack快" tabindex="-1"><a class="header-anchor" href="#vite为啥比webpack快" aria-hidden="true">#</a> vite为啥比webpack快？</h2>
<p>vite的打包用的是<code v-pre>rollup</code>，开发的时候用的<code v-pre>esbuild</code>。所以我们说快，指的一般是开发的体验。</p>
<h3 id="vite开发时快在哪" tabindex="-1"><a class="header-anchor" href="#vite开发时快在哪" aria-hidden="true">#</a> vite开发时快在哪？</h3>
<p>Vite 通过在一开始将应用中的模块区分为 <code v-pre>依赖</code> 和 <code v-pre>源码</code> 两类，改进了开发服务器启动时间</p>
<ol>
<li><code v-pre>依赖</code></li>
</ol>
<ul>
<li>大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。</li>
<li>Vite 将会使用 <code v-pre>esbuild</code> 预构建依赖。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。</li>
</ul>
<ol start="2">
<li><code v-pre>源码</code></li>
</ol>
<ul>
<li>通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。</li>
<li>Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。</li>
</ul>
<p>在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活（大多数时候只是模块本身），使得无论应用大小如何，HMR 始终能保持快速更新。</p>
<p>vite 同时利用 HTTP 头来进行缓存</p>
<ul>
<li>源码模块使用<code v-pre>304 Not Modified</code>进行协商缓存</li>
<li>依赖模块请求会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求</li>
</ul>
<h3 id="webpack开发时慢在哪" tabindex="-1"><a class="header-anchor" href="#webpack开发时慢在哪" aria-hidden="true">#</a> webpack开发时慢在哪？</h3>
<p>webpack 的本质就是先打包，再加载。webpack-dev-server 只是一个在内存里用 webpack 打包的服务器而已。webpack 的一个软肋是 loader / 插件机制跟打包的这个设计前提耦合过深。如果想走no-bundle 路线就不再是webpack了。</p>
<p>所以即使webpack用esbuild也不能和vite一样块。因为还有loader、plugin等复杂的东西。
如果是打包速度的话，两者就变成了webpack和rollup打包谁快的问题了。</p>
<h2 id="hmr-热更新原理" tabindex="-1"><a class="header-anchor" href="#hmr-热更新原理" aria-hidden="true">#</a> HMR 热更新原理</h2>
<h3 id="webpack热更新" tabindex="-1"><a class="header-anchor" href="#webpack热更新" aria-hidden="true">#</a> webpack热更新</h3>
<ol>
<li>webpack-dev-middleware 是一个容器(wrapper), 它可以把 webpack 处理后的文件传递给一个服务器(server). webpack-dev-server 在内部使用了它。</li>
<li>浏览器加载页面后，与 webpack-dev-server 建立 WebSocket 连接</li>
<li>Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 hash 事件</li>
<li>浏览器接收到 hash 事件后，请求 manifest 资源文件，确认增量变更范围</li>
<li>浏览器加载发生变更的增量模块</li>
<li>Webpack 运行时触发变更模块的 module.hot.accept 回调，执行代码变更逻辑</li>
</ol>
<p>webpack启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改</p>
<blockquote>
<p>webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
webpack.config.js</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack-dev-middleware和webpack-dev-server的文件监听功能就是用的chokidar库，和vite用的一样。具体可以在它的依赖里看见。</p>
<ul>
<li><a href="https://github.com/webpack/webpack-dev-middleware/blob/master/package.json?#L68" target="_blank" rel="noopener noreferrer">webpack-dev-middleware  package.json<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/webpack/webpack-dev-server/blob/master/package.json?#56" target="_blank" rel="noopener noreferrer">webpack-dev-server package.json<ExternalLinkIcon/></a></li>
</ul>
<h3 id="vite-热更新" tabindex="-1"><a class="header-anchor" href="#vite-热更新" aria-hidden="true">#</a> vite 热更新</h3>
<ol>
<li>服务器启动时创建 WebSocket 实例、通过 <a href="https://www.npmjs.com/package/chokidar" target="_blank" rel="noopener noreferrer">chokidar(是封装 Node.js 监控文件系统文件变化功能的库，它解决了原生fs.watch、fs.watchFile的问题)<ExternalLinkIcon/></a> 监听文件修改</li>
<li>对请求的 HTML 文件注入客户端热更新代码</li>
<li>加载客户端热更新代码时，创建 WebSocket 实例，并注册监听</li>
<li>当被请求文件中有import.meta.hot.accept时，向该文件注入import.meta.hot.accept定义</li>
<li>当文件更新时，触发文件修改的回调。</li>
<li>如果是配置文件、自定义插件、.env文件修改直接重启服务器</li>
<li>反之，根据模块路径向上查找；收集接受当前依赖项更新的模块，并判断是否是刷新页面</li>
<li>如果是刷新页面，向客户端发送刷新页面的消息，反之发送更新消息，并将接受当前依赖项更新的模块一起发送给客户端</li>
<li>客户端接收到之后，获取要更新的模块路径和热更新回调，通过import()请求要更新模块的路径，并在 URL 挂上import和时间戳；并在下一任务队列中触发热更新回调。</li>
</ol>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>
<p><a href="https://webpack.docschina.org/configuration/cache/" target="_blank" rel="noopener noreferrer">webpack 官网 Cache部分<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://cn.vitejs.dev/guide/dep-pre-bundling.html#caching" target="_blank" rel="noopener noreferrer">vite 官网 依赖预构建<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zhuanlan.zhihu.com/p/363928061" target="_blank" rel="noopener noreferrer">吃透 Webpack 核心原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="http://webpack.wuhaolin.cn/" target="_blank" rel="noopener noreferrer">《深入浅出webpack》在线书籍<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zhuanlan.zhihu.com/p/30669007" target="_blank" rel="noopener noreferrer">Webpack HMR 原理解析<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zhuanlan.zhihu.com/p/410510492" target="_blank" rel="noopener noreferrer">HMR 原理全解析<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="http://www.icodebang.com/article/283616" target="_blank" rel="noopener noreferrer">vite 热更新原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.npmjs.com/package/chokidar" target="_blank" rel="noopener noreferrer">chokidar(是封装 Node.js 监控文件系统文件变化功能的库，它解决了原生fs.watch、fs.watchFile的问题)<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.zhihu.com/question/477139054/answer/2156019180" target="_blank" rel="noopener noreferrer">vite多久后能干掉webpack？ - 尤雨溪的回答 - 知乎<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.bilibili.com/video/BV1Rr4y1L7r3?share_source=copy_web&amp;vd_source=9283e7aefc23b98d417bbc93b42bcf05&amp;t=1412" target="_blank" rel="noopener noreferrer">【尤雨溪前端趋势2022 的主题演讲】【精准空降到 23:32】<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


