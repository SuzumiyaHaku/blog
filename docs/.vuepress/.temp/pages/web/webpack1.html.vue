<template><div><h1 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack" aria-hidden="true">#</a> webpack</h1>
<ClientOnly>
  <MTA/>
</ClientOnly>
<h2 id="常用loader" tabindex="-1"><a class="header-anchor" href="#常用loader" aria-hidden="true">#</a> 常用loader</h2>
<ul>
<li><code v-pre>babel-loader</code> 语法转换</li>
<li><code v-pre>sass-loader</code> sass转css</li>
<li><code v-pre>less-loader</code> less转css</li>
<li><code v-pre>css-loader</code> 加载 CSS，支持模块化、压缩、文件导入等特性</li>
<li><code v-pre>style-loader</code> 把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS</li>
<li><code v-pre>postcss-loader</code> 扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.css$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'style-loader'</span><span class="token punctuation">,</span> <span class="token string">"css-loader"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">"postcss-loader"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">postcssOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">[</span>
                  <span class="token string">"autoprefixer"</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>vue-loader</code> vue文件解析</li>
<li><code v-pre>eslint-loader</code> eslint检查</li>
<li><code v-pre>tslint-loader</code> tslint检查</li>
<li><code v-pre>mocha-loader</code> 加载 Mocha 测试用例的代码</li>
<li><a href="https://webpack.docschina.org/guides/asset-modules/#general-asset-type" target="_blank" rel="noopener noreferrer"><code v-pre>assets通用资源类型</code><ExternalLinkIcon/></a> webpack5用来替代image-loader/url-loader/file-loader</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.(jpg|png|jpeg|gif|webp|)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'asset'</span><span class="token punctuation">,</span>
       <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">dataUrlCondition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
           <span class="token literal-property property">maxSize</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token comment">// 4kb</span>
         <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用plugin" tabindex="-1"><a class="header-anchor" href="#常用plugin" aria-hidden="true">#</a> 常用plugin</h2>
<ul>
<li>
<p><code v-pre>html-webpack-plugin</code> html文件的创建</p>
</li>
<li>
<p><code v-pre>copy-webpack-plugin</code> 文件拷贝</p>
</li>
<li>
<p><code v-pre>IgnorePlugin</code> 忽略某些文件，比如去掉moment.js时间库里的非中文的语言，大大减少包的体积</p>
</li>
<li>
<p><code v-pre>mini-css-extract-plugin</code></p>
<ul>
<li>webpack4.0通常使用mini-css-extract-plugin 提取css</li>
<li>webpack3.0 使用 extract-text-webpack-plugin提取css</li>
</ul>
</li>
<li>
<p><code v-pre>uglifyjs-webpack-plugin</code> js压缩 不支持 ES6 压缩 (Webpack4 以前)</p>
</li>
<li>
<p><code v-pre>terser-webpack-plugin</code> js压缩 支持压缩 ES6</p>
</li>
<li>
<p><code v-pre>optimize-css-assets-webpack-plugin </code> css压缩 webpack5以前</p>
</li>
<li>
<p><code v-pre>css-minimizer-webpack-plugin</code> css压缩</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack5使用css-minimizer-webpack-plugin（需要注意使用TerserWebpackPlugin来压缩js</span>
<span class="token keyword">const</span> CssMinimizerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"css-minimizer-webpack-plugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> TerserWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'terser-webpack-plugin'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token punctuation">{</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">// 配置了该选项，则认为开发者自定义压缩</span>
        <span class="token keyword">new</span> <span class="token class-name">TerserWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js(\?.*)?$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 压缩js</span>
        <span class="token keyword">new</span> <span class="token class-name">CssMinimizerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><a href="https://github.com/webpack-contrib/eslint-webpack-plugin/blob/master/README.md" target="_blank" rel="noopener noreferrer"><code v-pre>eslint-webpack-plugin</code><ExternalLinkIcon/></a>在 webpack 4 中，ESLint 是通过 loader 的方式集成到 webpack 中的。在 webpack 5 中，是通过 plugins（插件）的形式进行集成</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> ESLintPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'eslint-webpack-plugin'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">ESLintPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">fix</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token comment">/* 自动修改不合法的写法 */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>clean-webpack-plugin</code> 目录清理 webpack5已内置可配置output.clean: true开启，具体查看https://webpack.js.org/configuration/output/#outputclean</li>
<li><code v-pre>speed-measure-webpack-plugin</code> 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)</li>
<li><code v-pre>webpack-merge</code> 配置合并</li>
<li><code v-pre>compression-webpack-plugin</code> gzip压缩</li>
<li><code v-pre>webpack-bundle-analyzer</code> 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)</li>
</ul>
<h2 id="loader的原理" tabindex="-1"><a class="header-anchor" href="#loader的原理" aria-hidden="true">#</a> loader的原理</h2>
<p>loader本质是一个JavaScript模块，用来处理传入的内容然后返回。</p>
<h3 id="实现一个最简单的loader" tabindex="-1"><a class="header-anchor" href="#实现一个最简单的loader" aria-hidden="true">#</a> 实现一个最简单的loader</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// source 为 compiler 传递给 Loader 的一个文件的原内容</span>
  <span class="token comment">// 直接把原内容返回了，相当于该 Loader 没有做任何转换</span>
  <span class="token keyword">return</span> source<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 通过 this.callback 告诉 Webpack 返回的结果</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> source<span class="token punctuation">,</span> sourceMaps<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，</span>
  <span class="token comment">// 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 </span>
  <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的 this.callback 是 Webpack 给 Loader 注入的 API，以方便 Loader 和 Webpack 之间通信。 this.callback 的详细使用方法如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span>
    <span class="token comment">// 当无法转换原内容时，给 Webpack 返回一个 Error</span>
    <span class="token literal-property property">err</span><span class="token operator">:</span> Error <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token comment">// 原内容转换后的内容</span>
    <span class="token literal-property property">content</span><span class="token operator">:</span> string <span class="token operator">|</span> Buffer<span class="token punctuation">,</span>
    <span class="token comment">// 用于把转换后的内容得出原内容的 Source Map，方便调试</span>
    sourceMap<span class="token operator">?</span><span class="token operator">:</span> SourceMap<span class="token punctuation">,</span>
    <span class="token comment">// 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，</span>
    <span class="token comment">// 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能</span>
    abstractSyntaxTree<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">AST</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Webpack 提供了loader-utils工具为我们读取下图里loader的配置</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
              <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
              <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                  <span class="token punctuation">{</span>
                      <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">'my-loader'</span><span class="token punctuation">,</span>
                      <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                          <span class="token literal-property property">flag</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                      <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> loaderUtils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'loader-utils'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> loaderUtils<span class="token punctuation">.</span><span class="token function">getOptions</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'options'</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  <span class="token keyword">return</span> content
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让loader缓存处理结果也就是没有依赖变化的话，就直接读缓存的，这样可以加快webpack的构建速度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 开始缓存</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>cacheable <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cacheable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 传入false关闭缓存</span>
  <span class="token keyword">return</span> content
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异步loader</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    
    <span class="token comment">// 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果</span>
    <span class="token keyword">var</span> callback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">setTimeout</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result<span class="token punctuation">,</span> sourceMaps<span class="token punctuation">,</span> ast</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 通过 callback 返回异步执行后的结果</span>
      <span class="token function">callback</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> result<span class="token punctuation">,</span> sourceMaps<span class="token punctuation">,</span> ast<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugin的原理" tabindex="-1"><a class="header-anchor" href="#plugin的原理" aria-hidden="true">#</a> plugin的原理</h2>
<p>每一个 plugin 都是一个类（因为js的类本质也可以是一个函数，所以也能写成函数），主要关注这个类的两个方法，一个是构造函数 constructor ，还有一个是 apply 方法。在 constructor 中可以获得配置 plugin 时传入的参数，而 apply 方法则是 webpack 会调用的方法。每个插件都有两个重要的钩子，一个是compiler钩子，还有一个是compilation钩子。</p>
<p>compiler是webpack构建启动[plugin].apply(compiler)传进来的。
具体可以找到<a href="https://github.com/webpack/webpack/blob/main/lib/webpack.js#L70_L74" target="_blank" rel="noopener noreferrer">webpack源码 main/lib/webpack.js<ExternalLinkIcon/></a>里</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// ...</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>plugins<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> plugin <span class="token keyword">of</span> options<span class="token punctuation">.</span>plugins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> plugin <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token function">plugin</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>compiler<span class="token punctuation">,</span> compiler<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				<span class="token function">plugin</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现一个最简单的plugin" tabindex="-1"><a class="header-anchor" href="#实现一个最简单的plugin" aria-hidden="true">#</a> 实现一个最简单的plugin</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 异步plugin</span>
<span class="token keyword">class</span> <span class="token class-name">HelloAsyncPlugin</span> <span class="token punctuation">{</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tapAsync</span><span class="token punctuation">(</span>
      <span class="token string">'HelloAsyncPlugin'</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token parameter">compilation<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行某些异步操作...</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'异步任务完成...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> HelloAsyncPlugin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//异步promise</span>
<span class="token keyword">class</span> <span class="token class-name">HelloAsyncPlugin</span> <span class="token punctuation">{</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>emit<span class="token punctuation">.</span><span class="token function">tapPromise</span><span class="token punctuation">(</span><span class="token string">'HelloAsyncPlugin'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 返回一个 pormise ，异步任务完成后 resolve</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'异步任务完成...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> HelloAsyncPlugin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="webpack5的对比4的新特性" tabindex="-1"><a class="header-anchor" href="#webpack5的对比4的新特性" aria-hidden="true">#</a> webpack5的对比4的新特性</h2>
<ol>
<li>打包缓存</li>
</ol>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>模块联邦</li>
</ol>
<p>在webpack.config.js中增加模块联邦配置。其实就是一个plugins插件，它的位置在webpack/lib/container/ModuleFederationPlugin，我们只需要引入即可。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// paas项目的 webpack.config.js</span>
<span class="token keyword">const</span> ModuleFederationPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"webpack/lib/container/ModuleFederationPlugin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">"development"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">ModuleFederationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"paas"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">"paas-file-entry.js"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">exposes</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">"./paasComp"</span><span class="token operator">:</span> <span class="token string">"./src/paasComp.js"</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 1. name 当前应用名称，需要全局唯一。</span>
<span class="token comment">// 2. remotes 可以将其他项目的 name 映射到当前项目中。</span>
<span class="token comment">// 3. filename 构建后的chunk名称</span>
<span class="token comment">// 4. exposes 表示导出的模块，用于暴露对外提供的modules模块。只有在此申明的模块才可以作为远程依赖被使用。</span>
<span class="token comment">// 5. shared 声明共享的第三方资源。例如可以让远程加载的模块对应依赖改为使用本地项目的 React 或 ReactDOM。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>加强了tree shaking 优化
还需要在加强！</li>
</ol>
<h2 id="webpack性能优化" tabindex="-1"><a class="header-anchor" href="#webpack性能优化" aria-hidden="true">#</a> webpack性能优化</h2>
<p>性能优化，要不就是打包优化，要不就是运行优化。可能升级版本就是最大的优化。
webpack官网已经给出了一些优化建议<a href="https://www.webpackjs.com/guides/build-performance/" target="_blank" rel="noopener noreferrer">构建性能<ExternalLinkIcon/></a></p>
<h3 id="terser-webpack-plugin-优化代码的流程主要体现在这几个方面" tabindex="-1"><a class="header-anchor" href="#terser-webpack-plugin-优化代码的流程主要体现在这几个方面" aria-hidden="true">#</a> terser-webpack-plugin 优化代码的流程主要体现在这几个方面</h3>
<ol>
<li>异步注册 compilation.hooks.optimizeChunkAssets</li>
<li>在回调中调用 plugin 实例的 optimise 方法</li>
<li>并行模式：创建 Worker 进行多线程编译</li>
<li>minify 过程调用 terser 库对代码进行处理</li>
</ol>
<h3 id="gzip进行压缩" tabindex="-1"><a class="header-anchor" href="#gzip进行压缩" aria-hidden="true">#</a> gzip进行压缩</h3>
<blockquote>
<p>pnpm add compression-webpack-plugin --save-dev</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">CompressionPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">algorithm</span><span class="token operator">:</span> <span class="token string">"gzip"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>压缩后得到，.gz的文件。在nginx配置里配置gzip有静态和动态的， 两个的区别，就是静态Gzip是直接用已经存在的.gz文件进行加载，而动态Gzip则是实时加载（CPU负载高）。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>    gzip_static on<span class="token punctuation">;</span>
    gzip_proxied expired no-cache no-store private auth<span class="token punctuation">;</span>
    <span class="token function">gzip</span> on<span class="token punctuation">;</span>
    gzip_min_length 1k<span class="token punctuation">;</span>
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript<span class="token punctuation">;</span>
    gzip_vary on<span class="token punctuation">;</span>
    gzip_disable <span class="token string">"MSIE [1-6]\."</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>
<p><a href="https://webpack.js.org/configuration/" target="_blank" rel="noopener noreferrer">webpack5 官网英文 配置部分<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.webpackjs.com/loaders/url-loader/" target="_blank" rel="noopener noreferrer">webpack5 官网中文 loader<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://webpack.docschina.org/contribute/writing-a-plugin/" target="_blank" rel="noopener noreferrer">webpack 官网 手写Plugin<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://webpack.docschina.org/contribute/writing-a-loader/" target="_blank" rel="noopener noreferrer">webpack 官网 编写loader<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://webpack.docschina.org/guides/tree-shaking/" target="_blank" rel="noopener noreferrer">webpack 官网 Tree Shaking<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zhuanlan.zhihu.com/p/363928061" target="_blank" rel="noopener noreferrer">吃透 Webpack 核心原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/webpack-contrib/url-loader/blob/master/src/index.js" target="_blank" rel="noopener noreferrer">loader-runner —— loader的执行库<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6992754161221632030#heading-5" target="_blank" rel="noopener noreferrer">多图详解，一次性搞懂Webpack Loader<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="http://webpack.wuhaolin.cn/" target="_blank" rel="noopener noreferrer">《深入浅出webpack》在线书籍<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844904183917871117" target="_blank" rel="noopener noreferrer">在淘宝优化了一个大型项目，分享一些干货（Webpack，SplitChunk代码实例，图文结合）<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844904196790026253" target="_blank" rel="noopener noreferrer">妈妈再也不用担心我的优化｜Webpack系列（二）：SplitChunksPlugin源码讲解<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/McigcfZyIuuA-vfOu3F7VQ" target="_blank" rel="noopener noreferrer">Tree-Shaking 实现原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zhuanlan.zhihu.com/p/422460780" target="_blank" rel="noopener noreferrer">基于 Webpack Module Federation，这可能是一个比较优雅的微前端解决方案<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


