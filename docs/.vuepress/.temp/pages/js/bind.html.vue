<template><div><h1 id="bind" tabindex="-1"><a class="header-anchor" href="#bind" aria-hidden="true">#</a> bind</h1>
<ClientOnly>
  <MTA/>
</ClientOnly>
<h2 id="js模拟实现bind" tabindex="-1"><a class="header-anchor" href="#js模拟实现bind" aria-hidden="true">#</a> js模拟实现bind</h2>
<p>基本的bind用法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 返回了一个函数</span>
<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token function">bindFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mybind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Function.prototype.bind - what is trying to be bound is not callable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 只截取.bind(this, ...args)里args的部分</span>

  <span class="token keyword">var</span> <span class="token function-variable function">fNOP</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> <span class="token function-variable function">fBound</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> bindArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 合并运行时传入的参数</span>

    <span class="token comment">// 没有传context的时候要指向当前this</span>
    <span class="token keyword">return</span> <span class="token function">self</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fNOP</span> <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> context<span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>bindArgs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  fNOP<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
  fBound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fNOP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 用于instanceof判断</span>
  <span class="token keyword">return</span> fBound<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es6规范" tabindex="-1"><a class="header-anchor" href="#es6规范" aria-hidden="true">#</a> es6规范</h2>
<p><a href="https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.bind" target="_blank" rel="noopener noreferrer">20.2.3.2 Function.prototype.bind ( thisArg, ...args )<ExternalLinkIcon/></a>
This method performs the following steps when called:</p>
<ol>
<li>Let <code v-pre>Target</code> be the this value.</li>
<li>If <code v-pre>IsCallable(Target)</code> is false, throw a TypeError exception.</li>
<li>Let <code v-pre>F</code> be ? <code v-pre>BoundFunctionCreate(Target, thisArg, args)</code>.</li>
<li>Let <code v-pre>L</code> be 0.</li>
<li>Let <code v-pre>targetHasLength</code> be ? <code v-pre>HasOwnProperty(Target, &quot;length&quot;)</code>.</li>
<li>If <code v-pre>targetHasLength</code> is <code v-pre>true</code>, then
<ol>
<li>Let <code v-pre>targetLen</code> be ? <code v-pre>Get(Target, &quot;length&quot;)</code>.</li>
<li>If <code v-pre>targetLen</code> is a Number, then
<ol>
<li>If <code v-pre>targetLen</code> is +∞𝔽, set <code v-pre>L</code> to +∞.</li>
<li>Else if <code v-pre>targetLen</code> is -∞𝔽, set <code v-pre>L</code> to 0.</li>
<li>Else,
<ol>
<li>Let <code v-pre>targetLenAsInt</code> be ! <code v-pre>ToIntegerOrInfinity(targetLen)</code>.</li>
<li>Assert: <code v-pre>targetLenAsInt</code> is finite.</li>
<li>Let <code v-pre>argCount</code> be the number of elements in args.</li>
<li>Set <code v-pre>L</code> to <code v-pre>max(targetLenAsInt - argCount, 0)</code>.</li>
</ol>
</li>
</ol>
</li>
</ol>
</li>
<li>Perform <code v-pre>SetFunctionLength(F, L)</code>.</li>
<li>Let <code v-pre>targetName</code> be ? <code v-pre>Get(Target, &quot;name&quot;)</code>.</li>
<li>If <code v-pre>targetName</code> is not a String, set <code v-pre>targetName</code> to the empty String.</li>
<li>Perform <code v-pre>SetFunctionName(F, targetName, &quot;bound&quot;)</code>.</li>
<li>Return F.</li>
</ol>
<h2 id="polyfill的bind实现" tabindex="-1"><a class="header-anchor" href="#polyfill的bind实现" aria-hidden="true">#</a> polyfill的bind实现</h2>
<p>Function.prototype.bind 的 polyfill的实现<a href="https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/function-bind.js" target="_blank" rel="noopener noreferrer">core-js<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> uncurryThis <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../internals/function-uncurry-this'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> aCallable <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../internals/a-callable'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> isObject <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../internals/is-object'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> hasOwn <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../internals/has-own-property'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> arraySlice <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../internals/array-slice'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token constant">NATIVE_BIND</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../internals/function-bind-native'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> $Function <span class="token operator">=</span> Function<span class="token punctuation">;</span>
<span class="token keyword">var</span> concat <span class="token operator">=</span> <span class="token function">uncurryThis</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>concat<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> join <span class="token operator">=</span> <span class="token function">uncurryThis</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>join<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> factories <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">construct</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">C</span><span class="token punctuation">,</span> argsLength<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>factories<span class="token punctuation">,</span> argsLength<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> argsLength<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> list<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'a['</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">;</span>
    factories<span class="token punctuation">[</span>argsLength<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">$Function</span><span class="token punctuation">(</span><span class="token string">'C,a'</span><span class="token punctuation">,</span> <span class="token string">'return new C('</span> <span class="token operator">+</span> <span class="token function">join</span><span class="token punctuation">(</span>list<span class="token punctuation">,</span> <span class="token string">','</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">')'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">return</span> factories<span class="token punctuation">[</span>argsLength<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token constant">C</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// `Function.prototype.bind` method implementation</span>
<span class="token comment">// https://tc39.es/ecma262/#sec-function.prototype.bind</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token constant">NATIVE_BIND</span> <span class="token operator">?</span> $Function<span class="token punctuation">.</span><span class="token function-variable function">bind</span> <span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">bind</span><span class="token punctuation">(</span>that <span class="token comment">/* , ...args */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> <span class="token constant">F</span> <span class="token operator">=</span> <span class="token function">aCallable</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> Prototype <span class="token operator">=</span> <span class="token class-name">F</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
  <span class="token keyword">var</span> partArgs <span class="token operator">=</span> <span class="token function">arraySlice</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> <span class="token function-variable function">boundFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">bound</span><span class="token punctuation">(</span><span class="token comment">/* args... */</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token function">concat</span><span class="token punctuation">(</span>partArgs<span class="token punctuation">,</span> <span class="token function">arraySlice</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">boundFunction</span> <span class="token operator">?</span> <span class="token function">construct</span><span class="token punctuation">(</span><span class="token constant">F</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span>length<span class="token punctuation">,</span> args<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token constant">F</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>that<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isObject</span><span class="token punctuation">(</span>Prototype<span class="token punctuation">)</span><span class="token punctuation">)</span> boundFunction<span class="token punctuation">.</span>prototype <span class="token operator">=</span> Prototype<span class="token punctuation">;</span>
  <span class="token keyword">return</span> boundFunction<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="v8引擎的实现" tabindex="-1"><a class="header-anchor" href="#v8引擎的实现" aria-hidden="true">#</a> v8引擎的实现</h2>
<p>v8/src/builtins/function.tq</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token comment">// Copyright 2020 the V8 project authors. All rights reserved.</span>
<span class="token comment">// Use of this source code is governed by a BSD-style license that can be</span>
<span class="token comment">// found in the LICENSE file.</span>

namespace function <span class="token punctuation">{</span>

<span class="token keyword">extern</span> macro <span class="token function">OrdinaryHasInstance</span><span class="token punctuation">(</span>Context<span class="token punctuation">,</span> Object<span class="token punctuation">,</span> Object<span class="token punctuation">)</span><span class="token operator">:</span> JSAny<span class="token punctuation">;</span>

<span class="token comment">// ES6 section 19.2.3.6 Function.prototype[@@hasInstance]</span>
javascript builtin <span class="token function">FunctionPrototypeHasInstance</span><span class="token punctuation">(</span>
    js<span class="token operator">-</span>implicit context<span class="token operator">:</span> NativeContext<span class="token punctuation">,</span> receiver<span class="token operator">:</span> JSAny<span class="token punctuation">)</span><span class="token punctuation">(</span>value<span class="token operator">:</span> JSAny<span class="token punctuation">)</span><span class="token operator">:</span> JSAny <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">OrdinaryHasInstance</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> receiver<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">extern</span> transitioning builtin
<span class="token function">FunctionPrototypeBind</span><span class="token punctuation">(</span>implicit context<span class="token operator">:</span> Context<span class="token punctuation">)</span><span class="token punctuation">(</span>
    JSFunction<span class="token punctuation">,</span> JSAny<span class="token punctuation">,</span> int32<span class="token punctuation">)</span><span class="token operator">:</span> JSAny<span class="token punctuation">;</span>

<span class="token keyword">const</span> kLengthDescriptorIndex<span class="token operator">:</span> constexpr int32
    generates 'JSFunctionOrBoundFunctionOrWrappedFunction<span class="token operator">::</span>kLengthDescriptorIndex'
    <span class="token punctuation">;</span>
<span class="token keyword">const</span> kNameDescriptorIndex<span class="token operator">:</span> constexpr int32
    generates 'JSFunctionOrBoundFunctionOrWrappedFunction<span class="token operator">::</span>kNameDescriptorIndex'
    <span class="token punctuation">;</span>
<span class="token keyword">const</span> kMinDescriptorsForFastBindAndWrap<span class="token operator">:</span> constexpr int31
    generates 'JSFunction<span class="token operator">::</span>kMinDescriptorsForFastBindAndWrap'<span class="token punctuation">;</span>

macro <span class="token function">CheckAccessor</span><span class="token punctuation">(</span>implicit context<span class="token operator">:</span> Context<span class="token punctuation">)</span><span class="token punctuation">(</span>
    array<span class="token operator">:</span> DescriptorArray<span class="token punctuation">,</span> index<span class="token operator">:</span> constexpr int32<span class="token punctuation">,</span>
    name<span class="token operator">:</span> Name<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> labels Slow <span class="token punctuation">{</span>
  <span class="token keyword">const</span> descriptor<span class="token operator">:</span> DescriptorEntry <span class="token operator">=</span> array<span class="token punctuation">.</span>descriptors<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> key<span class="token operator">:</span> Name<span class="token operator">|</span>Undefined <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>key<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">TaggedEqual</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">goto</span> Slow<span class="token punctuation">;</span>

  <span class="token comment">// The descriptor value must be an AccessorInfo.</span>
  Cast<span class="token operator">&lt;</span>AccessorInfo<span class="token operator">></span><span class="token punctuation">(</span>descriptor<span class="token punctuation">.</span>value<span class="token punctuation">)</span> otherwise <span class="token keyword">goto</span> Slow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// ES6 section 19.2.3.2 Function.prototype.bind</span>
transitioning javascript builtin
<span class="token function">FastFunctionPrototypeBind</span><span class="token punctuation">(</span>
    js<span class="token operator">-</span>implicit context<span class="token operator">:</span> NativeContext<span class="token punctuation">,</span> receiver<span class="token operator">:</span> JSAny<span class="token punctuation">,</span> newTarget<span class="token operator">:</span> JSAny<span class="token punctuation">,</span>
    target<span class="token operator">:</span> JSFunction<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>arguments<span class="token punctuation">)</span><span class="token operator">:</span> JSAny <span class="token punctuation">{</span>
  <span class="token keyword">const</span> argc<span class="token operator">:</span> intptr <span class="token operator">=</span> arguments<span class="token punctuation">.</span>actual_count<span class="token punctuation">;</span>
  try <span class="token punctuation">{</span>
    <span class="token function">typeswitch</span> <span class="token punctuation">(</span>receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token punctuation">(</span>fn<span class="token operator">:</span> JSFunction<span class="token operator">|</span>JSBoundFunction<span class="token operator">|</span>JSWrappedFunction<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// Disallow binding of slow-mode functions. We need to figure out</span>
        <span class="token comment">// whether the length and name property are in the original state.</span>
        <span class="token function">Comment</span><span class="token punctuation">(</span>'Disallow binding of slow<span class="token operator">-</span>mode functions'<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">IsDictionaryMap</span><span class="token punctuation">(</span>fn<span class="token punctuation">.</span>map<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">goto</span> Slow<span class="token punctuation">;</span>

        <span class="token comment">// Check whether the length and name properties are still present as</span>
        <span class="token comment">// AccessorInfo objects. If so, their value can be recomputed even if</span>
        <span class="token comment">// the actual value on the object changes.</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>fn<span class="token punctuation">.</span>map<span class="token punctuation">.</span>bit_field3<span class="token punctuation">.</span>number_of_own_descriptors <span class="token operator">&lt;</span>
            kMinDescriptorsForFastBindAndWrap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">goto</span> Slow<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> descriptors<span class="token operator">:</span> DescriptorArray <span class="token operator">=</span> fn<span class="token punctuation">.</span>map<span class="token punctuation">.</span>instance_descriptors<span class="token punctuation">;</span>
        <span class="token function">CheckAccessor</span><span class="token punctuation">(</span>
            descriptors<span class="token punctuation">,</span> kLengthDescriptorIndex<span class="token punctuation">,</span> <span class="token function">LengthStringConstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            otherwise Slow<span class="token punctuation">;</span>
        <span class="token function">CheckAccessor</span><span class="token punctuation">(</span>descriptors<span class="token punctuation">,</span> kNameDescriptorIndex<span class="token punctuation">,</span> <span class="token function">NameStringConstant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            otherwise Slow<span class="token punctuation">;</span>

        <span class="token comment">// Choose the right bound function map based on whether the target is</span>
        <span class="token comment">// constructable.</span>

        <span class="token keyword">const</span> boundFunctionMap<span class="token operator">:</span> Map <span class="token operator">=</span>
            <span class="token function">IsConstructor</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span> <span class="token operator">?</span>
            <span class="token operator">*</span><span class="token function">NativeContextSlot</span><span class="token punctuation">(</span>
                ContextSlot<span class="token operator">::</span>BOUND_FUNCTION_WITH_CONSTRUCTOR_MAP_INDEX<span class="token punctuation">)</span> <span class="token operator">:</span>
            <span class="token operator">*</span><span class="token function">NativeContextSlot</span><span class="token punctuation">(</span>ContextSlot<span class="token operator">::</span>
                                    BOUND_FUNCTION_WITHOUT_CONSTRUCTOR_MAP_INDEX<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Verify that prototype matches that of the target bound function.</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>fn<span class="token punctuation">.</span>map<span class="token punctuation">.</span>prototype <span class="token operator">!=</span> boundFunctionMap<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token keyword">goto</span> Slow<span class="token punctuation">;</span>

        <span class="token comment">// Allocate the arguments array.</span>

        <span class="token keyword">const</span> argumentsArray <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length <span class="token operator">&lt;=</span> <span class="token number">1</span> <span class="token operator">?</span>
            kEmptyFixedArray <span class="token operator">:</span>
            <span class="token function">NewFixedArray</span><span class="token punctuation">(</span>
                arguments<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> ArgumentsIterator<span class="token punctuation">{</span>arguments<span class="token punctuation">,</span> current<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> boundReceiver<span class="token operator">:</span> JSAny <span class="token operator">=</span> arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> result <span class="token operator">=</span> new JSBoundFunction<span class="token punctuation">{</span>
          map<span class="token operator">:</span> boundFunctionMap<span class="token punctuation">,</span>
          properties_or_hash<span class="token operator">:</span> kEmptyFixedArray<span class="token punctuation">,</span>
          elements<span class="token operator">:</span> kEmptyFixedArray<span class="token punctuation">,</span>
          bound_target_function<span class="token operator">:</span> fn<span class="token punctuation">,</span>
          bound_this<span class="token operator">:</span> boundReceiver<span class="token punctuation">,</span>
          bound_arguments<span class="token operator">:</span> argumentsArray
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">case</span> <span class="token punctuation">(</span>JSAny<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">goto</span> Slow<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> label Slow <span class="token punctuation">{</span>
    tail <span class="token function">FunctionPrototypeBind</span><span class="token punctuation">(</span>
        <span class="token function">LoadTargetFromFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> newTarget<span class="token punctuation">,</span> Convert<span class="token operator">&lt;</span>int32<span class="token operator">></span><span class="token punctuation">(</span>argc<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>  <span class="token comment">// namespace function</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


