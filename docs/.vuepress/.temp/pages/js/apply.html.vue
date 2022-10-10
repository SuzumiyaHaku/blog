<template><div><h1 id="call、apply" tabindex="-1"><a class="header-anchor" href="#call、apply" aria-hidden="true">#</a> call、apply</h1>
<ClientOnly>
  <MTA/>
</ClientOnly>
<h2 id="call" tabindex="-1"><a class="header-anchor" href="#call" aria-hidden="true">#</a> call</h2>
<h3 id="call的模拟实现" tabindex="-1"><a class="header-anchor" href="#call的模拟实现" aria-hidden="true">#</a> call的模拟实现</h3>
<p>基本用法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> context <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token operator">||</span> window<span class="token punctuation">;</span>
  context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arguments['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'context.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span><span class="token string">')'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// context.fn(arguments[1],arguments[2])</span>
  <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="call的es规范" tabindex="-1"><a class="header-anchor" href="#call的es规范" aria-hidden="true">#</a> call的es规范</h3>
<p><a href="https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.call" target="_blank" rel="noopener noreferrer">20.2.3.3 Function.prototype.call ( thisArg, ...args )<ExternalLinkIcon/></a></p>
<p>This method performs the following steps when called:</p>
<blockquote>
<p>此方法在调用时执行以下步骤：</p>
</blockquote>
<ol>
<li>Let <code v-pre>func</code> be the <code v-pre>this</code> value.</li>
</ol>
<blockquote>
<p>设置<code v-pre>func</code>为<code v-pre>this</code>值</p>
</blockquote>
<ol start="2">
<li>If <code v-pre>IsCallable(func)</code> is <code v-pre>false</code>, throw a <code v-pre>TypeError</code> exception.</li>
</ol>
<blockquote>
<p>如果 <code v-pre>IsCallable(func)</code> 是 <code v-pre>false</code>，抛出一个<code v-pre>TypeError</code>的异常。</p>
</blockquote>
<ol start="3">
<li>Perform <code v-pre>PrepareForTailCall()</code>.</li>
</ol>
<blockquote>
<p>执行 <code v-pre>PrepareForTailCall()</code>.</p>
</blockquote>
<ol start="4">
<li>Return ? <code v-pre>Call(func, thisArg, args)</code>.</li>
</ol>
<blockquote>
<p>返回<code v-pre>Call(func, thisArg, args)</code>的结果</p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">NOTE 1</p>
<p>The thisArg value is passed without modification as the this value. This is a change from Edition 3, where an undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value. Even though the thisArg is passed without modification, non-strict functions still perform these transformations upon entry to the function.</p>
<blockquote>
<p>thisArg值作为this值传递而不进行修改。这是版本3的一个变化，在版本3中，未定义或空的thisArg被替换为全局对象，ToObject应用于所有其他值，结果作为This值传递。即使传递了thisArg而没有修改，非严格函数仍然在进入函数时执行这些转换。</p>
</blockquote>
</div>
<div class="custom-container tip"><p class="custom-container-title">NOTE 2</p>
<p>If func is an arrow function or a bound function exotic object then the thisArg will be ignored by the function [[Call]] in step 4.</p>
<blockquote>
<p>如果func是箭头函数或绑定函数外来对象，则步骤4中的函数[[Call]]将忽略thisArg。</p>
</blockquote>
</div>
<p><a href="https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iscallable" target="_blank" rel="noopener noreferrer">7.2.3 IsCallable ( argument )<ExternalLinkIcon/></a></p>
<p>The abstract operation IsCallable takes argument argument (an ECMAScript language value) and returns a Boolean. It determines if argument is a callable function with a [[Call]] internal method. It performs the following steps when called:</p>
<blockquote>
<p>抽象操作IsCallable接受参数（js语言类型的值）并返回布尔值。它确定参数是否是具有[[Call]]内部方法的可调用函数。调用时，它执行以下步骤：</p>
</blockquote>
<ol>
<li>If <code v-pre>argument</code> is not an <code v-pre>Object</code>, return <code v-pre>false</code>.</li>
</ol>
<blockquote>
<p>如果<code v-pre>argument</code>不是Object, 返回false</p>
</blockquote>
<ol start="2">
<li>If <code v-pre>argument</code> has a [[Call]] internal method, return <code v-pre>true</code>.</li>
</ol>
<blockquote>
<p>如果<code v-pre>argument</code>有[[Call]]内部可调用的方法，返回<code v-pre>true</code></p>
</blockquote>
<ol start="3">
<li>Return <code v-pre>false</code>.</li>
</ol>
<blockquote>
<p>返回false</p>
</blockquote>
<h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply" aria-hidden="true">#</a> apply</h2>
<h3 id="apply的实现" tabindex="-1"><a class="header-anchor" href="#apply的实现" aria-hidden="true">#</a> apply的实现</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myApply</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> context <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token operator">||</span> window<span class="token punctuation">;</span>
  context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'arr['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    result <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'context.fn('</span> <span class="token operator">+</span> args <span class="token operator">+</span> <span class="token string">')'</span><span class="token punctuation">)</span> <span class="token comment">// context.fn(arr[0],arr[1])</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apply的es规范" tabindex="-1"><a class="header-anchor" href="#apply的es规范" aria-hidden="true">#</a> apply的es规范</h3>
<p><a href="https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.apply" target="_blank" rel="noopener noreferrer">20.2.3.1 Function.prototype.apply ( thisArg, argArray )<ExternalLinkIcon/></a></p>
<p>This method performs the following steps when called:</p>
<blockquote>
<p>此方法在调用时执行以下步骤：</p>
</blockquote>
<ol>
<li>Let <code v-pre>func</code> be the <code v-pre>this</code> value.</li>
</ol>
<blockquote>
<p>设置<code v-pre>func</code>为<code v-pre>this</code>值</p>
</blockquote>
<ol start="2">
<li>If <code v-pre>IsCallable(func)</code> is <code v-pre>false</code>, throw a <code v-pre>TypeError</code> exception.</li>
</ol>
<blockquote>
<p>如果 <code v-pre>IsCallable(func)</code> 是 <code v-pre>false</code>，抛出一个<code v-pre>TypeError</code>的异常。</p>
</blockquote>
<ol start="3">
<li>If <code v-pre>argArray</code> is <code v-pre>undefined</code> or <code v-pre>null</code>, then</li>
</ol>
<blockquote>
<p>如果 <code v-pre>argArray</code> 是<code v-pre>undefined</code>或者<code v-pre>null</code>, 则
1. Perform <code v-pre>PrepareForTailCall()</code>.
执行 <code v-pre>PrepareForTailCall()</code>
2. Return ? <code v-pre>Call(func, thisArg)</code>.
返回<code v-pre>Call(func, thisArg)</code>的结果</p>
</blockquote>
<ol start="4">
<li>Let <code v-pre>argList</code> be ? <code v-pre>CreateListFromArrayLike(argArray)</code>.</li>
</ol>
<blockquote>
<p><code v-pre>argList</code>为<code v-pre>CreateListFromArrayLike(argArray)</code>（CreateListFromArrayLike函数可以返回一个列表值，其元素由obj的索引提供）</p>
</blockquote>
<ol start="5">
<li>Perform <code v-pre>PrepareForTailCall()</code>.</li>
</ol>
<blockquote>
<p>执行 <code v-pre>PrepareForTailCall()</code></p>
</blockquote>
<ol start="6">
<li>Return ? <code v-pre>Call(func, thisArg, argList)</code>.</li>
</ol>
<blockquote>
<p>返回<code v-pre>Call(func, thisArg, args)</code>的结果</p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">NOTE 1</p>
<p>The thisArg value is passed without modification as the this value. This is a change from Edition 3, where an undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value. Even though the thisArg is passed without modification, non-strict functions still perform these transformations upon entry to the function.</p>
<blockquote>
<p>thisArg值作为this值传递而不进行修改。这是版本3的一个变化，在版本3中，未定义或空的thisArg被替换为全局对象，ToObject应用于所有其他值，结果作为This值传递。即使传递了thisArg而没有修改，非严格函数仍然在进入函数时执行这些转换。</p>
</blockquote>
</div>
<div class="custom-container tip"><p class="custom-container-title">NOTE 2</p>
<p>If func is an arrow function or a bound function exotic object then the thisArg will be ignored by the function [[Call]] in step 6.</p>
<blockquote>
<p>如果func是箭头函数或绑定函数外来对象，则步骤6中的函数[[Call]]将忽略thisArg。</p>
</blockquote>
</div>
</div></template>


