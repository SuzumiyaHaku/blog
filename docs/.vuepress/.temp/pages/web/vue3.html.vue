<template><div><h1 id="vue3源码-未完" tabindex="-1"><a class="header-anchor" href="#vue3源码-未完" aria-hidden="true">#</a> vue3源码[未完...]</h1>
<ClientOnly>
  <MTA/>
</ClientOnly>
<p>《vue.js设计与实现》</p>
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
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 源码vue3/core/packages/runtime-core/src/errorHandling.ts</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">fn</span><span class="token operator">:</span> Function<span class="token punctuation">,</span>
  <span class="token literal-property property">instance</span><span class="token operator">:</span> ComponentInternalInstance <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> ErrorTypes<span class="token punctuation">,</span>
  args<span class="token operator">?</span><span class="token operator">:</span> unknown<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> res
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    res <span class="token operator">=</span> args <span class="token operator">?</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">handleError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> type<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="响应式系统" tabindex="-1"><a class="header-anchor" href="#响应式系统" aria-hidden="true">#</a> 响应式系统</h2>
<p>依赖绑定原理，利用Proxy劫持对象的属性，当对象有读/写的时候，触发依赖绑定的副作用函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bucket<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> newVal<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span> <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
    bucket<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> p<span class="token punctuation">.</span>a
<span class="token punctuation">}</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  p<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">233</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>增加多个effect的依赖
得到如下模型</li>
</ol>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>target1 ---------- WeakMap1
  prototype1 ----- Map1
  prototype2 ----- Map2
    effect   ----- Set1
    effect   ----- Set1

target2 ---------- WeakMap1
  prototype3 ----- Map3
    effect   ----- Set2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> activeEffect<span class="token punctuation">;</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span> target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span>
    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span> <span class="token comment">// 根据prototype绑定对应的effect函数</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span> <span class="token operator">=</span> newValue
    <span class="token keyword">let</span> m <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">let</span> set <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prototype<span class="token punctuation">)</span>
    set <span class="token operator">&amp;&amp;</span> set<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 改变变量后执行对应的副作用函数</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  activeEffect <span class="token operator">=</span> fn <span class="token comment">// 存储副作用函数的引用，相比较之前就可以不关心函数的名称了</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'effect run'</span><span class="token punctuation">)</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> p<span class="token punctuation">.</span>a
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'p.c 1: '</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'p.c 2: '</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  p<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">233</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>增加副作用依赖记录，并且每次执行结束副作用函数要清除副作用函数</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">233</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> activeEffect<span class="token punctuation">;</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span> target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">(</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>
    activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>deps<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 存储依赖的set</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span> <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
    <span class="token keyword">let</span> m <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prototype<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 重新new set避免，fn函数里执行了删除set里元素导致无限循环的问题。</span>
    set <span class="token operator">&amp;&amp;</span> set<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 改变变量后执行对应的副作用函数</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token function-variable function">effectFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 从记录依赖的set移除副作用函数</span>
      <span class="token keyword">let</span> v <span class="token operator">=</span> effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      v<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    activeEffect <span class="token operator">=</span> effectFn<span class="token punctuation">;</span> <span class="token comment">// 存储副作用函数的引用，相比较之前就可以不关心函数的名称了</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"effect run"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>innerText <span class="token operator">=</span> p<span class="token punctuation">.</span>a <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">p.a=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>p<span class="token punctuation">.</span>a<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">p.c=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>p<span class="token punctuation">.</span>c<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  p<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">233</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>增加嵌套effect的能力</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">233</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> activeEffect<span class="token punctuation">;</span>
<span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span> target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> deps <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>deps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">(</span>deps <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    deps<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span><span class="token punctuation">;</span>
    activeEffect<span class="token punctuation">.</span>deps<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>deps<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 存储依赖的set</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prototype<span class="token punctuation">,</span> newValue<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">[</span>prototype<span class="token punctuation">]</span> <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
    <span class="token keyword">let</span> m <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>prototype<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 重新new set避免，fn函数里执行了删除set里元素导致无限循环的问题。</span>
    set <span class="token operator">&amp;&amp;</span> set<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>activeEffect <span class="token operator">!=</span> fn<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 避免 p.a = p.a + 1的get和set同时触发导致死循环的问题</span>
        <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 改变变量后执行对应的副作用函数</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> effectStack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token function-variable function">effectFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 从记录依赖的set移除副作用函数</span>
      <span class="token keyword">let</span> v <span class="token operator">=</span> effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      v<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    effectFn<span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    activeEffect <span class="token operator">=</span> effectFn<span class="token punctuation">;</span> <span class="token comment">// 存储副作用函数的引用，相比较之前就可以不关心函数的名称了</span>
    effectStack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>effectFn<span class="token punctuation">)</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    effectStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    activeEffect <span class="token operator">=</span> effectStack<span class="token punctuation">[</span>effectStack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// 嵌套情况，activeEffect的值会被覆盖，所以执行完毕fn后要重置为之前的值</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  effectFn<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"effect 1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"effect 2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> temp <span class="token operator">=</span> p<span class="token punctuation">.</span>c
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> temp <span class="token operator">=</span> p<span class="token punctuation">.</span>a
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">233</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ref和reactive的区别" tabindex="-1"><a class="header-anchor" href="#ref和reactive的区别" aria-hidden="true">#</a> ref和reactive的区别</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>ref是基于reactive的</p>
</div>
<h3 id="需要ref的原因" tabindex="-1"><a class="header-anchor" href="#需要ref的原因" aria-hidden="true">#</a> 需要ref的原因</h3>
<p>因为js存在<code v-pre>Boolean、Number、BigInt、String、Symbol、undefined 和 null 等</code>类型的值。这些值不是<code v-pre>引用类型</code>。基于proxy做响应式的条件是，传入的对象为一个<code v-pre>引用类型</code>。</p>
<h3 id="reactive源码" tabindex="-1"><a class="header-anchor" href="#reactive源码" aria-hidden="true">#</a> reactive源码</h3>
<p>vue3/core/packages/reactivity/src/reactive.ts</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">reactive</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token operator">></span></span></span><span class="token punctuation">(</span>target<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> UnwrapNestedRefs<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span>target<span class="token operator">:</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// if trying to observe a readonly proxy, return the readonly version.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReadonly</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> target
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">createReactiveObject</span><span class="token punctuation">(</span>
    target<span class="token punctuation">,</span>
    <span class="token boolean">false</span><span class="token punctuation">,</span>
    mutableHandlers<span class="token punctuation">,</span>
    mutableCollectionHandlers<span class="token punctuation">,</span>
    reactiveMap
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> toReactive <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">unknown</span></span><span class="token operator">></span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">=></span>
  <span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">reactive</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">:</span> value
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ref的源码" tabindex="-1"><a class="header-anchor" href="#ref的源码" aria-hidden="true">#</a> ref的源码</h3>
<p><code v-pre>const count = ref(0)</code>会经历如下步骤</p>
<ol>
<li>执行ref函数，ref API会直接执行源码里的createRef函数。</li>
<li>判断非<code v-pre>Ref</code>类型，则用RefImpl类进行包装，</li>
<li>RefImpl类包装时，在其不是<code v-pre>shallowRef</code>时初始化的时候会调用上面reactive源码中的<code v-pre>toReactive</code></li>
<li>执行的<code v-pre>toReactive</code>里会判断是一个Object对象时调用<code v-pre>reactive</code>API。</li>
</ol>
<p>vue3/core/packages/reactivity/src/ref.ts</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">RefImpl<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> _value<span class="token operator">:</span> <span class="token constant">T</span>
  <span class="token keyword">private</span> _rawValue<span class="token operator">:</span> <span class="token constant">T</span>

  <span class="token keyword">public</span> dep<span class="token operator">?</span><span class="token operator">:</span> Dep <span class="token operator">=</span> <span class="token keyword">undefined</span>
  <span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isRef <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isShallow<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue <span class="token operator">=</span> __v_isShallow <span class="token operator">?</span> value <span class="token operator">:</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> __v_isShallow <span class="token operator">?</span> value <span class="token operator">:</span> <span class="token function">toReactive</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">trackRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> useDirectValue <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>__v_isShallow <span class="token operator">||</span> <span class="token function">isShallow</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isReadonly</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
    newVal <span class="token operator">=</span> useDirectValue <span class="token operator">?</span> newVal <span class="token operator">:</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasChanged</span><span class="token punctuation">(</span>newVal<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_rawValue <span class="token operator">=</span> newVal
      <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> useDirectValue <span class="token operator">?</span> newVal <span class="token operator">:</span> <span class="token function">toReactive</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
      <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> newVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">createRef</span><span class="token punctuation">(</span>rawValue<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">,</span> shallow<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRef</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> rawValue
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RefImpl</span><span class="token punctuation">(</span>rawValue<span class="token punctuation">,</span> shallow<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">ref</span><span class="token punctuation">(</span>value<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">createRef</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> computed</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> plusOne <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> count<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>computed的本质是可控effect。其副作用函数<code v-pre>() =&gt; count.value + 1</code>执行时间为在读取<code v-pre>plusOne.value</code>的时候触发得到结果</p>
<p>vue3/core/packages/reactivity/src/computed.ts</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ComputedRefImpl<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> dep<span class="token operator">?</span><span class="token operator">:</span> Dep <span class="token operator">=</span> <span class="token keyword">undefined</span>

  <span class="token keyword">private</span> _value<span class="token operator">!</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token comment">// 缓存上一次计算的属性</span>
  <span class="token keyword">public</span> <span class="token keyword">readonly</span> effect<span class="token operator">:</span> ReactiveEffect<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token keyword">public</span> <span class="token keyword">readonly</span> __v_isRef <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">public</span> <span class="token keyword">readonly</span> <span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_READONLY</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token keyword">public</span> _dirty <span class="token operator">=</span> <span class="token boolean">true</span> “<span class="token comment">// 用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算”</span>

  <span class="token keyword">public</span> _cacheable<span class="token operator">:</span> <span class="token builtin">boolean</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>
    getter<span class="token operator">:</span> ComputedGetter<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> _setter<span class="token operator">:</span> ComputedSetter<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
    isReadonly<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span>
    isSSR<span class="token operator">:</span> <span class="token builtin">boolean</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_dirty <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">triggerRefValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span>computed <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>effect<span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_cacheable <span class="token operator">=</span> <span class="token operator">!</span>isSSR
    <span class="token keyword">this</span><span class="token punctuation">[</span>ReactiveFlags<span class="token punctuation">.</span><span class="token constant">IS_READONLY</span><span class="token punctuation">]</span> <span class="token operator">=</span> isReadonly
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// the computed ref may get wrapped by other proxies e.g. readonly() #3376</span>
    <span class="token keyword">const</span> self <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token function">trackRefValue</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>self<span class="token punctuation">.</span>_dirty <span class="token operator">||</span> <span class="token operator">!</span>self<span class="token punctuation">.</span>_cacheable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      self<span class="token punctuation">.</span>_dirty <span class="token operator">=</span> <span class="token boolean">false</span>
      self<span class="token punctuation">.</span>_value <span class="token operator">=</span> self<span class="token punctuation">.</span>effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">!</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> self<span class="token punctuation">.</span>_value
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">value</span><span class="token punctuation">(</span>newValue<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setter</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">computed</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
  getter<span class="token operator">:</span> ComputedGetter<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
  debugOptions<span class="token operator">?</span><span class="token operator">:</span> DebuggerOptions
<span class="token punctuation">)</span><span class="token operator">:</span> ComputedRef<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">computed</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
  options<span class="token operator">:</span> WritableComputedOptions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
  debugOptions<span class="token operator">?</span><span class="token operator">:</span> DebuggerOptions
<span class="token punctuation">)</span><span class="token operator">:</span> WritableComputedRef<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">computed</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
  getterOrOptions<span class="token operator">:</span> ComputedGetter<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token operator">|</span> WritableComputedOptions<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
  debugOptions<span class="token operator">?</span><span class="token operator">:</span> DebuggerOptions<span class="token punctuation">,</span>
  isSSR <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> getter<span class="token operator">:</span> ComputedGetter<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
  <span class="token keyword">let</span> setter<span class="token operator">:</span> ComputedSetter<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>

  <span class="token keyword">const</span> onlyGetter <span class="token operator">=</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>getterOrOptions<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>onlyGetter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    getter <span class="token operator">=</span> getterOrOptions
    setter <span class="token operator">=</span> __DEV__
      <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'Write operation failed: computed value is readonly'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token operator">:</span> <span class="token constant">NOOP</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    getter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">.</span>get
    setter <span class="token operator">=</span> getterOrOptions<span class="token punctuation">.</span>set
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> cRef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComputedRefImpl</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> setter<span class="token punctuation">,</span> onlyGetter <span class="token operator">||</span> <span class="token operator">!</span>setter<span class="token punctuation">,</span> isSSR<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> debugOptions <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isSSR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cRef<span class="token punctuation">.</span>effect<span class="token punctuation">.</span>onTrack <span class="token operator">=</span> debugOptions<span class="token punctuation">.</span>onTrack
    cRef<span class="token punctuation">.</span>effect<span class="token punctuation">.</span>onTrigger <span class="token operator">=</span> debugOptions<span class="token punctuation">.</span>onTrigger
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> cRef <span class="token keyword">as</span> <span class="token builtin">any</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vue3/core/packages/reactivity/src/effect.ts</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ReactiveEffect</span><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> any<span class="token operator">></span> <span class="token punctuation">{</span>
  active <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token literal-property property">deps</span><span class="token operator">:</span> Dep<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token literal-property property">parent</span><span class="token operator">:</span> ReactiveEffect <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> <span class="token keyword">undefined</span>

  <span class="token doc-comment comment">/**
   * Can be attached after creation
   * <span class="token keyword">@internal</span>
   */</span>
  computed<span class="token operator">?</span><span class="token operator">:</span> ComputedRefImpl<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span>
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@internal</span>
   */</span>
  allowRecurse<span class="token operator">?</span><span class="token operator">:</span> boolean
  <span class="token doc-comment comment">/**
   * <span class="token keyword">@internal</span>
   */</span>
  <span class="token keyword">private</span> deferStop<span class="token operator">?</span><span class="token operator">:</span> boolean

  onStop<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>
  <span class="token comment">// dev only</span>
  onTrack<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">event</span><span class="token operator">:</span> DebuggerEvent</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>
  <span class="token comment">// dev only</span>
  onTrigger<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">event</span><span class="token operator">:</span> DebuggerEvent</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">public</span> <span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">T</span><span class="token punctuation">,</span>
    <span class="token keyword">public</span> <span class="token literal-property property">scheduler</span><span class="token operator">:</span> EffectScheduler <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    scope<span class="token operator">?</span><span class="token operator">:</span> EffectScope
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">recordEffectScope</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> scope<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> <span class="token literal-property property">parent</span><span class="token operator">:</span> ReactiveEffect <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> activeEffect
    <span class="token keyword">let</span> lastShouldTrack <span class="token operator">=</span> shouldTrack
    <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>parent <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parent
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> activeEffect
      activeEffect <span class="token operator">=</span> <span class="token keyword">this</span>
      shouldTrack <span class="token operator">=</span> <span class="token boolean">true</span>

      trackOpBit <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token operator">++</span>effectTrackDepth

      <span class="token keyword">if</span> <span class="token punctuation">(</span>effectTrackDepth <span class="token operator">&lt;=</span> maxMarkerBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">initDepMarkers</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">cleanupEffect</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>effectTrackDepth <span class="token operator">&lt;=</span> maxMarkerBits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">finalizeDepMarkers</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      trackOpBit <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token operator">--</span>effectTrackDepth

      activeEffect <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parent
      shouldTrack <span class="token operator">=</span> lastShouldTrack
      <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> <span class="token keyword">undefined</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deferStop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// stopped while running itself - defer the cleanup</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>activeEffect <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deferStop <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">cleanupEffect</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>onStop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onStop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">watch</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"count:"</span><span class="token punctuation">,</span> count<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
count<span class="token punctuation">.</span>value<span class="token operator">++</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>watch 的实现本质上就是利用了 effect 以及 options.scheduler 选项。当<code v-pre>count.value++</code>执行的时候，就会触发回调函数</p>
<p>vue3/core/packages/runtime-core/src/apiWatch.ts</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// overload: array of multiple sources + cb</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">watch</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  <span class="token constant">T</span> <span class="token keyword">extends</span> MultiWatchSources<span class="token punctuation">,</span>
  Immediate <span class="token keyword">extends</span> Readonly<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  sources<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">T</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  cb<span class="token operator">:</span> WatchCallback<span class="token operator">&lt;</span>MapSources<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token operator">></span><span class="token punctuation">,</span> MapSources<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Immediate<span class="token operator">>></span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> WatchOptions<span class="token operator">&lt;</span>Immediate<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token operator">:</span> WatchStopHandle

<span class="token comment">// overload: multiple sources w/ `as const`</span>
<span class="token comment">// watch([foo, bar] as const, () => {})</span>
<span class="token comment">// somehow [...T] breaks when the type is readonly</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">watch</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  <span class="token constant">T</span> <span class="token keyword">extends</span> Readonly<span class="token operator">&lt;</span>MultiWatchSources<span class="token operator">></span><span class="token punctuation">,</span>
  Immediate <span class="token keyword">extends</span> Readonly<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  cb<span class="token operator">:</span> WatchCallback<span class="token operator">&lt;</span>MapSources<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token operator">></span><span class="token punctuation">,</span> MapSources<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Immediate<span class="token operator">>></span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> WatchOptions<span class="token operator">&lt;</span>Immediate<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token operator">:</span> WatchStopHandle

<span class="token comment">// overload: single source + cb</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">watch</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Immediate <span class="token keyword">extends</span> Readonly<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> WatchSource<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
  cb<span class="token operator">:</span> WatchCallback<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Immediate <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> WatchOptions<span class="token operator">&lt;</span>Immediate<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token operator">:</span> WatchStopHandle

<span class="token comment">// overload: watching reactive object w/ cb</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">watch</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  <span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token punctuation">,</span>
  Immediate <span class="token keyword">extends</span> Readonly<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  cb<span class="token operator">:</span> WatchCallback<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Immediate <span class="token keyword">extends</span> <span class="token class-name"><span class="token boolean">true</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> WatchOptions<span class="token operator">&lt;</span>Immediate<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token operator">:</span> WatchStopHandle

<span class="token comment">// implementation</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">watch</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token punctuation">,</span> Immediate <span class="token keyword">extends</span> Readonly<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">|</span> WatchSource<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span>
  cb<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> WatchOptions<span class="token operator">&lt;</span>Immediate<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token operator">:</span> WatchStopHandle <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isFunction</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">\`watch(fn, options?)\` signature has been moved to a separate API. </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Use \`watchEffect(fn, options?)\` instead. \`watch\` now only </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">supports \`watch(source, cb, options?) signature.</span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">doWatch</span><span class="token punctuation">(</span>source <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">doWatch</span><span class="token punctuation">(</span>
  source<span class="token operator">:</span> WatchSource <span class="token operator">|</span> WatchSource<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> WatchEffect <span class="token operator">|</span> object<span class="token punctuation">,</span>
  cb<span class="token operator">:</span> WatchCallback <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> immediate<span class="token punctuation">,</span> deep<span class="token punctuation">,</span> flush<span class="token punctuation">,</span> onTrack<span class="token punctuation">,</span> onTrigger <span class="token punctuation">}</span><span class="token operator">:</span> WatchOptions <span class="token operator">=</span> <span class="token constant">EMPTY_OBJ</span>
<span class="token punctuation">)</span><span class="token operator">:</span> WatchStopHandle <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>immediate <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">watch() "immediate" option is only respected when using the </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
          <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">watch(source, callback, options?) signature.</span><span class="token template-punctuation string">`</span></span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>deep <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">watch() "deep" option is only respected when using the </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
          <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">watch(source, callback, options?) signature.</span><span class="token template-punctuation string">`</span></span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> <span class="token function-variable function">warnInvalidSource</span> <span class="token operator">=</span> <span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Invalid watch source: </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
      s<span class="token punctuation">,</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">A watch source can only be a getter/effect function, a ref, </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">a reactive object, or an array of these types.</span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> instance <span class="token operator">=</span> currentInstance
  <span class="token keyword">let</span> <span class="token function-variable function">getter</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span>
  <span class="token keyword">let</span> forceTrigger <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">let</span> isMultiSource <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRef</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> source<span class="token punctuation">.</span>value
    forceTrigger <span class="token operator">=</span> <span class="token function">isShallow</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReactive</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> source
    deep <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isMultiSource <span class="token operator">=</span> <span class="token boolean">true</span>
    forceTrigger <span class="token operator">=</span> source<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span>s <span class="token operator">=></span> <span class="token function">isReactive</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isShallow</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
      source<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>s <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isRef</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> s<span class="token punctuation">.</span>value
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReactive</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">traverse</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFunction</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">WATCH_GETTER</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          __DEV__ <span class="token operator">&amp;&amp;</span> <span class="token function">warnInvalidSource</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFunction</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// getter with cb</span>
      <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">WATCH_GETTER</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// no cb -> simple effect</span>
      <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">&amp;&amp;</span> instance<span class="token punctuation">.</span>isUnmounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cleanup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">callWithAsyncErrorHandling</span><span class="token punctuation">(</span>
          source<span class="token punctuation">,</span>
          instance<span class="token punctuation">,</span>
          ErrorCodes<span class="token punctuation">.</span><span class="token constant">WATCH_CALLBACK</span><span class="token punctuation">,</span>
          <span class="token punctuation">[</span>onCleanup<span class="token punctuation">]</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    getter <span class="token operator">=</span> <span class="token constant">NOOP</span>
    __DEV__ <span class="token operator">&amp;&amp;</span> <span class="token function">warnInvalidSource</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 2.x array mutation watch compat</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__COMPAT__ <span class="token operator">&amp;&amp;</span> cb <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> baseGetter <span class="token operator">=</span> getter
    <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> val <span class="token operator">=</span> <span class="token function">baseGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token function">isArray</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token function">checkCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">WATCH_ARRAY</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">traverse</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> val
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>cb <span class="token operator">&amp;&amp;</span> deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> baseGetter <span class="token operator">=</span> getter
    <span class="token function-variable function">getter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">traverse</span><span class="token punctuation">(</span><span class="token function">baseGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> <span class="token function-variable function">cleanup</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>
  <span class="token keyword">let</span> onCleanup<span class="token operator">:</span> <span class="token function-variable function">OnCleanup</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token function-variable function">fn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    cleanup <span class="token operator">=</span> effect<span class="token punctuation">.</span><span class="token function-variable function">onStop</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">callWithErrorHandling</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">WATCH_CLEANUP</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// in SSR there is no need to setup an actual effect, and it should be noop</span>
  <span class="token comment">// unless it's eager</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__SSR__ <span class="token operator">&amp;&amp;</span> isInSSRComponentSetup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// we will also not call the invalidate callback (+ runner is not set up)</span>
    onCleanup <span class="token operator">=</span> <span class="token constant">NOOP</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">getter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">callWithAsyncErrorHandling</span><span class="token punctuation">(</span>cb<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">WATCH_CALLBACK</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
        <span class="token function">getter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        isMultiSource <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
        onCleanup
      <span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token constant">NOOP</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> oldValue <span class="token operator">=</span> isMultiSource <span class="token operator">?</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token constant">INITIAL_WATCHER_VALUE</span>
  <span class="token keyword">const</span> job<span class="token operator">:</span> <span class="token function-variable function">SchedulerJob</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>effect<span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// watch(source, cb)</span>
      <span class="token keyword">const</span> newValue <span class="token operator">=</span> effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        deep <span class="token operator">||</span>
        forceTrigger <span class="token operator">||</span>
        <span class="token punctuation">(</span>isMultiSource
          <span class="token operator">?</span> <span class="token punctuation">(</span>newValue <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token operator">=></span>
              <span class="token function">hasChanged</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> <span class="token punctuation">(</span>oldValue <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
          <span class="token operator">:</span> <span class="token function">hasChanged</span><span class="token punctuation">(</span>newValue<span class="token punctuation">,</span> oldValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token punctuation">(</span>__COMPAT__ <span class="token operator">&amp;&amp;</span>
          <span class="token function">isArray</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          <span class="token function">isCompatEnabled</span><span class="token punctuation">(</span>DeprecationTypes<span class="token punctuation">.</span><span class="token constant">WATCH_ARRAY</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// cleanup before running cb again</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cleanup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token function">callWithAsyncErrorHandling</span><span class="token punctuation">(</span>cb<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">WATCH_CALLBACK</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
          newValue<span class="token punctuation">,</span>
          <span class="token comment">// pass undefined as the old value when it's changed for the first time</span>
          oldValue <span class="token operator">===</span> <span class="token constant">INITIAL_WATCHER_VALUE</span> <span class="token operator">?</span> <span class="token keyword">undefined</span> <span class="token operator">:</span> oldValue<span class="token punctuation">,</span>
          onCleanup
        <span class="token punctuation">]</span><span class="token punctuation">)</span>
        oldValue <span class="token operator">=</span> newValue
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// watchEffect</span>
      effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// important: mark the job as a watcher callback so that scheduler knows</span>
  <span class="token comment">// it is allowed to self-trigger (#1727)</span>
  job<span class="token punctuation">.</span>allowRecurse <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>cb

  <span class="token keyword">let</span> scheduler<span class="token operator">:</span> EffectScheduler
  <span class="token keyword">if</span> <span class="token punctuation">(</span>flush <span class="token operator">===</span> <span class="token string">'sync'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    scheduler <span class="token operator">=</span> job <span class="token keyword">as</span> <span class="token builtin">any</span> <span class="token comment">// the scheduler function gets called directly</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>flush <span class="token operator">===</span> <span class="token string">'post'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">scheduler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">queuePostRenderEffect</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> instance <span class="token operator">&amp;&amp;</span> instance<span class="token punctuation">.</span>suspense<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// default: 'pre'</span>
    job<span class="token punctuation">.</span>pre <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> job<span class="token punctuation">.</span>id <span class="token operator">=</span> instance<span class="token punctuation">.</span>uid
    <span class="token function-variable function">scheduler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">queueJob</span><span class="token punctuation">(</span>job<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> effect <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReactiveEffect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> scheduler<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    effect<span class="token punctuation">.</span>onTrack <span class="token operator">=</span> onTrack
    effect<span class="token punctuation">.</span>onTrigger <span class="token operator">=</span> onTrigger
  <span class="token punctuation">}</span>

  <span class="token comment">// initial run</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">job</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      oldValue <span class="token operator">=</span> effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>flush <span class="token operator">===</span> <span class="token string">'post'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">queuePostRenderEffect</span><span class="token punctuation">(</span>
      effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>effect<span class="token punctuation">)</span><span class="token punctuation">,</span>
      instance <span class="token operator">&amp;&amp;</span> instance<span class="token punctuation">.</span>suspense
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    effect<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    effect<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">&amp;&amp;</span> instance<span class="token punctuation">.</span>scope<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">remove</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>scope<span class="token punctuation">.</span>effects<span class="token operator">!</span><span class="token punctuation">,</span> effect<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="diff算法" tabindex="-1"><a class="header-anchor" href="#diff算法" aria-hidden="true">#</a> diff算法</h2>
<h3 id="简单比较" tabindex="-1"><a class="header-anchor" href="#简单比较" aria-hidden="true">#</a> 简单比较</h3>
<h3 id="双端比较" tabindex="-1"><a class="header-anchor" href="#双端比较" aria-hidden="true">#</a> 双端比较</h3>
<h3 id="最长递增子序列" tabindex="-1"><a class="header-anchor" href="#最长递增子序列" aria-hidden="true">#</a> 最长递增子序列</h3>
<p>vue3/core/packages/runtime-core/src/renderer.ts</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// https://en.wikipedia.org/wiki/Longest_increasing_subsequence</span>
<span class="token keyword">function</span> <span class="token function">getSequence</span><span class="token punctuation">(</span>arr<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> p <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> i<span class="token punctuation">,</span> j<span class="token punctuation">,</span> u<span class="token punctuation">,</span> v<span class="token punctuation">,</span> c
  <span class="token keyword">const</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arrI <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arrI <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      j <span class="token operator">=</span> result<span class="token punctuation">[</span>result<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> arrI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        p<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> j
        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token keyword">continue</span>
      <span class="token punctuation">}</span>
      u <span class="token operator">=</span> <span class="token number">0</span>
      v <span class="token operator">=</span> result<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>u <span class="token operator">&lt;</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        c <span class="token operator">=</span> <span class="token punctuation">(</span>u <span class="token operator">+</span> v<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>result<span class="token punctuation">[</span>c<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> arrI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          u <span class="token operator">=</span> c <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          v <span class="token operator">=</span> c
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arrI <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>result<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>u <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          p<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result<span class="token punctuation">[</span>u <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        result<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> i
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  u <span class="token operator">=</span> result<span class="token punctuation">.</span>length
  v <span class="token operator">=</span> result<span class="token punctuation">[</span>u <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>u<span class="token operator">--</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> v
    v <span class="token operator">=</span> p<span class="token punctuation">[</span>v<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


