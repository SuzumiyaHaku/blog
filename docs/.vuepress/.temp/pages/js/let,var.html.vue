<template><div><h1 id="let和var" tabindex="-1"><a class="header-anchor" href="#let和var" aria-hidden="true">#</a> let和var</h1>
<h2 id="let和var的区别" tabindex="-1"><a class="header-anchor" href="#let和var的区别" aria-hidden="true">#</a> let和var的区别</h2>
<p>let 声明的范围是块作用域，而 var 声明的范围是函数作用域。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'QAQ'</span><span class="token punctuation">;</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// QAQ</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// QAQ</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">let</span> age <span class="token operator">=</span> <span class="token number">26</span><span class="token punctuation">;</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 26</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: age 没有定义</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，age 变量之所以不能在 if 块外部被引用，是因为它的作用域仅限于该块内部。块作用域
是函数作用域的子集，因此适用于 var 的作用域限制同样也适用于 let。</p>
<h3 id="暂时性死区" tabindex="-1"><a class="header-anchor" href="#暂时性死区" aria-hidden="true">#</a> 暂时性死区</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// name 会被提升</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'QAQ'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError：age 没有定义</span>
<span class="token keyword">let</span> age <span class="token operator">=</span> <span class="token number">26</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在解析代码时，JavaScript 引擎也会注意出现在块后面的 let 声明，只不过在此之前不能以任何方
式来引用未声明的变量。在 let 声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），在此
阶段引用任何后面才声明的变量都会抛出 ReferenceError。</p>
<h3 id="全局的声明" tabindex="-1"><a class="header-anchor" href="#全局的声明" aria-hidden="true">#</a> 全局的声明</h3>
<p>与 var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">'QAQ'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'QAQ'</span>
<span class="token keyword">let</span> age <span class="token operator">=</span> <span class="token number">26</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="let不能在同一个作用域内声明两次" tabindex="-1"><a class="header-anchor" href="#let不能在同一个作用域内声明两次" aria-hidden="true">#</a> let不能在同一个作用域内声明两次</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token number">2</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token number">3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下代码一执行就会直接报错：Uncaught SyntaxError: Identifier 's' has already been declared</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token number">2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token keyword">let</span> s <span class="token operator">=</span> <span class="token number">3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token comment">//</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for循环中的区别" tabindex="-1"><a class="header-anchor" href="#for循环中的区别" aria-hidden="true">#</a> for循环中的区别</h3>
<p>在 let 出现之前，for 循环定义的迭代变量会渗透到循环体外部：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// 循环逻辑</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改成使用 let 之后，这个问题就消失了，因为迭代变量的作用域仅限于 for 循环块内部：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// 循环逻辑</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: i 没有定义</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要想for循环每隔一秒打印0,1,2,3,4,5这样, 需要加上一个函数作用域去记住i当时的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> j <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是let就不需要</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> i <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="let到底有没有提升" tabindex="-1"><a class="header-anchor" href="#let到底有没有提升" aria-hidden="true">#</a> let到底有没有提升</h2>
<p>因为查了好些资料。发现有些说的提升有些说的没有提升，社区讨论很激烈。都是站在各自所定义的“提升”的概念上讲的。
对此，我把如下js代码编译成了字节码。执行foo的原因是，v8引擎会优化没有被执行的代码。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> qaq <span class="token operator">=</span> <span class="token number">233</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>qaq<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行</p>
<blockquote>
<p>node --print-bytecode xxx.js  &gt; xxx.txt</p>
</blockquote>
<CodeGroup>
<CodeGroupItem title="var的">
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token punctuation">[</span>generated bytecode <span class="token keyword">for</span> function<span class="token operator">:</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token number">0x2fe502d77d11</span> <span class="token operator">&lt;</span>SharedFunctionInfo foo<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">]</span>
Bytecode length<span class="token operator">:</span> <span class="token number">21</span>
Parameter count <span class="token number">1</span>
Register count <span class="token number">3</span>
Frame size <span class="token number">24</span>
OSR nesting level<span class="token operator">:</span> <span class="token number">0</span>
Bytecode Age<span class="token operator">:</span> <span class="token number">0</span>
   <span class="token number">29</span> S<span class="token operator">></span> <span class="token number">0x2fe502d786be</span> @    <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">00</span> <span class="token number">0</span>d e9 <span class="token number">00</span>       LdaSmi<span class="token punctuation">.</span>Wide <span class="token punctuation">[</span><span class="token number">233</span><span class="token punctuation">]</span>
         <span class="token number">0x2fe502d786c2</span> @    <span class="token number">4</span> <span class="token operator">:</span> c3                Star0 
   <span class="token number">36</span> S<span class="token operator">></span> <span class="token number">0x2fe502d786c3</span> @    <span class="token number">5</span> <span class="token operator">:</span> <span class="token number">21</span> <span class="token number">00</span> <span class="token number">00</span>          LdaGlobal <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
         <span class="token number">0x2fe502d786c6</span> @    <span class="token number">8</span> <span class="token operator">:</span> c1                Star2 
   <span class="token number">44</span> E<span class="token operator">></span> <span class="token number">0x2fe502d786c7</span> @    <span class="token number">9</span> <span class="token operator">:</span> <span class="token number">2</span>d f8 <span class="token number">01</span> <span class="token number">02</span>       LdaNamedProperty r2<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
         <span class="token number">0x2fe502d786cb</span> @   <span class="token number">13</span> <span class="token operator">:</span> c2                Star1 
   <span class="token number">44</span> E<span class="token operator">></span> <span class="token number">0x2fe502d786cc</span> @   <span class="token number">14</span> <span class="token operator">:</span> <span class="token number">5</span>d f9 f8 fa <span class="token number">04</span>    CallProperty1 r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> r0<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span>
         <span class="token number">0x2fe502d786d1</span> @   <span class="token number">19</span> <span class="token operator">:</span> <span class="token number">0</span>e                LdaUndefined 
   <span class="token number">54</span> S<span class="token operator">></span> <span class="token number">0x2fe502d786d2</span> @   <span class="token number">20</span> <span class="token operator">:</span> a8                Return 
Constant <span class="token function">pool</span> <span class="token punctuation">(</span>size <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token number">0x2fe502d78669</span><span class="token operator">:</span> <span class="token punctuation">[</span>FixedArray<span class="token punctuation">]</span> in OldSpace
 <span class="token operator">-</span> map<span class="token operator">:</span> <span class="token number">0x309da7f812c1</span> <span class="token operator">&lt;</span>Map<span class="token operator">></span>
 <span class="token operator">-</span> length<span class="token operator">:</span> <span class="token number">2</span>
           <span class="token number">0</span><span class="token operator">:</span> <span class="token number">0x171c960b90b1</span> <span class="token operator">&lt;</span>String<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token operator">:</span> #console<span class="token operator">></span>
           <span class="token number">1</span><span class="token operator">:</span> <span class="token number">0x171c9608c0b1</span> <span class="token operator">&lt;</span>String<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">:</span> #log<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="let的字节码">
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token punctuation">[</span>generated bytecode <span class="token keyword">for</span> function<span class="token operator">:</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token number">0x1f2c1b037d11</span> <span class="token operator">&lt;</span>SharedFunctionInfo foo<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">]</span>
Bytecode length<span class="token operator">:</span> <span class="token number">21</span>
Parameter count <span class="token number">1</span>
Register count <span class="token number">3</span>
Frame size <span class="token number">24</span>
OSR nesting level<span class="token operator">:</span> <span class="token number">0</span>
Bytecode Age<span class="token operator">:</span> <span class="token number">0</span>
   <span class="token number">29</span> S<span class="token operator">></span> <span class="token number">0x1f2c1b0386be</span> @    <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">00</span> <span class="token number">0</span>d e9 <span class="token number">00</span>       LdaSmi<span class="token punctuation">.</span>Wide <span class="token punctuation">[</span><span class="token number">233</span><span class="token punctuation">]</span>
         <span class="token number">0x1f2c1b0386c2</span> @    <span class="token number">4</span> <span class="token operator">:</span> c3                Star0 
   <span class="token number">36</span> S<span class="token operator">></span> <span class="token number">0x1f2c1b0386c3</span> @    <span class="token number">5</span> <span class="token operator">:</span> <span class="token number">21</span> <span class="token number">00</span> <span class="token number">00</span>          LdaGlobal <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
         <span class="token number">0x1f2c1b0386c6</span> @    <span class="token number">8</span> <span class="token operator">:</span> c1                Star2 
   <span class="token number">44</span> E<span class="token operator">></span> <span class="token number">0x1f2c1b0386c7</span> @    <span class="token number">9</span> <span class="token operator">:</span> <span class="token number">2</span>d f8 <span class="token number">01</span> <span class="token number">02</span>       LdaNamedProperty r2<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
         <span class="token number">0x1f2c1b0386cb</span> @   <span class="token number">13</span> <span class="token operator">:</span> c2                Star1 
   <span class="token number">44</span> E<span class="token operator">></span> <span class="token number">0x1f2c1b0386cc</span> @   <span class="token number">14</span> <span class="token operator">:</span> <span class="token number">5</span>d f9 f8 fa <span class="token number">04</span>    CallProperty1 r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> r0<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span>
         <span class="token number">0x1f2c1b0386d1</span> @   <span class="token number">19</span> <span class="token operator">:</span> <span class="token number">0</span>e                LdaUndefined 
   <span class="token number">54</span> S<span class="token operator">></span> <span class="token number">0x1f2c1b0386d2</span> @   <span class="token number">20</span> <span class="token operator">:</span> a8                Return 
Constant <span class="token function">pool</span> <span class="token punctuation">(</span>size <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token number">0x1f2c1b038669</span><span class="token operator">:</span> <span class="token punctuation">[</span>FixedArray<span class="token punctuation">]</span> in OldSpace
 <span class="token operator">-</span> map<span class="token operator">:</span> <span class="token number">0x1e0d682412c1</span> <span class="token operator">&lt;</span>Map<span class="token operator">></span>
 <span class="token operator">-</span> length<span class="token operator">:</span> <span class="token number">2</span>
           <span class="token number">0</span><span class="token operator">:</span> <span class="token number">0x3171e69390b1</span> <span class="token operator">&lt;</span>String<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token operator">:</span> #console<span class="token operator">></span>
           <span class="token number">1</span><span class="token operator">:</span> <span class="token number">0x3171e690c0b1</span> <span class="token operator">&lt;</span>String<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">:</span> #log<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<p>得到的结果是两者除了内存地址外，其他地方并没有啥区别</p>
<h2 id="声明提升" tabindex="-1"><a class="header-anchor" href="#声明提升" aria-hidden="true">#</a> 声明提升</h2>
<h3 id="_1-函数优先" tabindex="-1"><a class="header-anchor" href="#_1-函数优先" aria-hidden="true">#</a> 1. 函数优先</h3>
<p>函数声明和变量声明都会被提升。但是一个值得注意的细节，是函数会首先被提升，然后才是变量</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token keyword">var</span> foo<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会输出 1 而不是 2 ！这个代码片段会被引擎理解为如下形式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，var foo 尽管出现在 function foo()... 的声明之前，但它是重复的声明（因此被忽
略了），因为函数声明会被提升到普通变量之前。
尽管重复的 var 声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-考虑如下代码" tabindex="-1"><a class="header-anchor" href="#_2-考虑如下代码" aria-hidden="true">#</a> 2. 考虑如下代码</h3>
<CodeGroup>
<CodeGroupItem title="代码">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="结果">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 这里的var a会存在变量提升</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<p>如何让它打印1呢？改为let解决问题，但是不能删掉if()，因为提前使用let声明的变量会报错。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// var a = 2;</span>
    <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-奇怪的题" tabindex="-1"><a class="header-anchor" href="#_3-奇怪的题" aria-hidden="true">#</a> 3. 奇怪的题</h3>
<p>即使你对上面的规律很熟悉了。但是碰到这题还是很大概率会弄错！</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>	<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span>
	<span class="token punctuation">{</span> 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a0'</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
		a <span class="token operator">=</span> <span class="token number">99</span><span class="token punctuation">;</span>
		<span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
		a <span class="token operator">=</span> <span class="token number">30</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a1'</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a2'</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IE、edge</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a0 function a() {}</span>

<span class="token comment">// a1 30</span>

<span class="token comment">// a2 function a() {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Google、Firefox</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a0 ƒ function a() {}</span>

<span class="token comment">// a1 30</span>

<span class="token comment">// a2 10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/#comments" target="_blank" rel="noopener noreferrer">JavaScript Variables Lifecycle: Why let Is Not Hoisted<ExternalLinkIcon/></a></li>
<li><a href="https://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-hoisted/31222689#31222689" target="_blank" rel="noopener noreferrer">Are variables declared with let or const hoisted?<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/28140450" target="_blank" rel="noopener noreferrer">let是否存在提升<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/28590489" target="_blank" rel="noopener noreferrer">理解 V8 的字节码「译」<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/t__Jqzg1rbTlsCHXKMwh6A" target="_blank" rel="noopener noreferrer">JavaScript 引擎 V8 执行流程概述<ExternalLinkIcon/></a></li>
<li>《你不知道的JavaScript上卷》</li>
<li>《javascript高级编程第4版》</li>
</ul>
</div></template>


