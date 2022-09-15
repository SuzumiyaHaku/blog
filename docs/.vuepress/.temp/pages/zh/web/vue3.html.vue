<template><div><h1 id="vue3" tabindex="-1"><a class="header-anchor" href="#vue3" aria-hidden="true">#</a> vue3</h1>
<h2 id="模块" tabindex="-1"><a class="header-anchor" href="#模块" aria-hidden="true">#</a> 模块</h2>
<p>带有-browser字样的esm资源是直接给&lt;script type =&quot;module&quot;&gt;使用的
带有-bundler是给打包工具使用的</p>
<h2 id="tree-shaking副作用移除注释" tabindex="-1"><a class="header-anchor" href="#tree-shaking副作用移除注释" aria-hidden="true">#</a> Tree-Shaking副作用移除注释</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./utils'</span>
<span class="token comment">/*#__PURE__*/</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注释代码告诉rollup.js、webpack、压缩的terser。 对于foo函数的调用不会产生副作用，可以摇掉。</p>
<h2 id="特性开关" tabindex="-1"><a class="header-anchor" href="#特性开关" aria-hidden="true">#</a> 特性开关</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_OPTIONS_API__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“当 Vue.js 构建资源时，如果构建的资源是供打包工具使用的（即带有 -bundler 字样的资源），那么上面的代码在资源中会变成”</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>__VUE_OPTIONS_API__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>__VUE_OPTIONS_API__是一个特性开关
可以在，webpack.DefinePlugin开启特性</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">__VUE_OPTIONS_API__</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>“<span class="token comment">// utils.js</span>
 <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
   <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
   <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">function</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">try</span> <span class="token punctuation">{</span>
     fn <span class="token operator">&amp;&amp;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


