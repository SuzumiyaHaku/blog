<template><div><h1 id="this" tabindex="-1"><a class="header-anchor" href="#this" aria-hidden="true">#</a> this</h1>
<h2 id="摘要" tabindex="-1"><a class="header-anchor" href="#摘要" aria-hidden="true">#</a> 摘要</h2>
<p>this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调
用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文)。这个记录会包
含函数在哪里被调用（调用栈)、函数的调用方法、传人的参数等信息。this 就是记录的
其中一个属性，会在函数执行的过程中用到。</p>
<h2 id="this的四种绑定规则" tabindex="-1"><a class="header-anchor" href="#this的四种绑定规则" aria-hidden="true">#</a> this的四种绑定规则</h2>
<h3 id="_1-默认绑定" tabindex="-1"><a class="header-anchor" href="#_1-默认绑定" aria-hidden="true">#</a> 1.默认绑定</h3>
<p>默认指向window，严格模式指向undefined</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"use strict"</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// Uncaught TypeError</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-隐式绑定" tabindex="-1"><a class="header-anchor" href="#_2-隐式绑定" aria-hidden="true">#</a> 2.隐式绑定</h3>
<p>指向调用了foo的对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">this</span> <span class="token operator">===</span> window<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// window, true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">this</span> <span class="token operator">===</span> window<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">aa</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
bar<span class="token punctuation">.</span><span class="token function">aa</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// { aa: ƒ }, false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">this</span> <span class="token operator">===</span> window<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">aa</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span>
<span class="token keyword">var</span> zz <span class="token operator">=</span> bar<span class="token punctuation">.</span>aa
<span class="token function">zz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// window, true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-显式绑定" tabindex="-1"><a class="header-anchor" href="#_3-显式绑定" aria-hidden="true">#</a> 3.显式绑定</h3>
<p>使用call、apply、bind，this指向你传入的对象</p>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值
在调用时会被忽略，实际应用的是默认绑定规则</p>
</div>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>msg<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">'我是b对象'</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
<span class="token comment">//foo.apply(b)</span>
<span class="token comment">// 打印：我是b对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-new绑定" tabindex="-1"><a class="header-anchor" href="#_4-new绑定" aria-hidden="true">#</a> 4.new绑定</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">"测试"</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> qaq <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>qaq<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// "测试"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="优先级" tabindex="-1"><a class="header-anchor" href="#优先级" aria-hidden="true">#</a> 优先级</h2>
<ol>
<li>
<p>函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。</p>
</li>
<li>
<p>函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是
指定的对象。</p>
</li>
<li>
<p>函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上
下文对象。</p>
</li>
<li>
<p>如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到
全局对象。</p>
</li>
</ol>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2>
<ul>
<li>this的四种绑定规则，默认、显式、隐式、new绑定</li>
<li>四种优先级：new绑定 &gt; 显式 &gt; 隐式 &gt; 默认</li>
<li>注意隐式绑定把 null 或者 undefined 作为 this 的绑定对象传入，会走默认规则</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>你不知道的javascript上卷</li>
</ul>
</div></template>


