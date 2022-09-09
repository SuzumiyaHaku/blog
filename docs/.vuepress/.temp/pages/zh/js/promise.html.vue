<template><div><h1 id="深入promise" tabindex="-1"><a class="header-anchor" href="#深入promise" aria-hidden="true">#</a> 深入Promise</h1>
<h3 id="阅读前你需要掌握的知识" tabindex="-1"><a class="header-anchor" href="#阅读前你需要掌握的知识" aria-hidden="true">#</a> 阅读前你需要掌握的知识</h3>
<ul>
<li>Promise的基本使用</li>
<li>js的事件循环，宏任务微任务</li>
<li>npm的使用</li>
</ul>
<h3 id="promisea" tabindex="-1"><a class="header-anchor" href="#promisea" aria-hidden="true">#</a> PromiseA+</h3>
<p><a href="https://promisesaplus.com/" target="_blank" rel="noopener noreferrer">PromiseA+英文规范<ExternalLinkIcon/></a>
下面是中文的翻译</p>
<h4 id="术语" tabindex="-1"><a class="header-anchor" href="#术语" aria-hidden="true">#</a> 术语</h4>
<ul>
<li><code v-pre>解决（fulfill）</code>：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 fulfill 来表示解决，但在后世的 promise 实现多以 resolve 来指代之。</li>
<li><code v-pre>拒绝（reject）</code>：指一个 promise 失败时进行的一系列操作。</li>
<li><code v-pre>终值（eventual value）</code>：所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。</li>
<li>据因（reason）：也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值。</li>
</ul>
<h3 id="对照规范实现promisea" tabindex="-1"><a class="header-anchor" href="#对照规范实现promisea" aria-hidden="true">#</a> 对照规范实现PromiseA+</h3>
<p>下面的代码，加上中英文注释特别长，如果想搞懂，需要动手写。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// A promise must be in one of three states: pending, fulfilled, or rejected.</span>
<span class="token comment">// 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。</span>
<span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">'pending'</span>
<span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">'rejected'</span>
<span class="token keyword">const</span> <span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token string">'fulfilled'</span>
<span class="token keyword">function</span> <span class="token function">PromiseA</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">PENDING</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>res <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>onFulfilledCallbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>onRejectedCallbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token class-name">PromiseA</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token comment">// 2.1.1 When pending, a promise:</span>
<span class="token comment">//      2.1.1.1 may transition to either the fulfilled or rejected state.</span>

<span class="token comment">// 2.1.1 处于pending状态，一个promise满足：</span>
<span class="token comment">//      2.1.1.1 可以迁移至执行态或拒绝态</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>res <span class="token operator">=</span> v
    <span class="token comment">// 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].</span>
    <span class="token comment">// execution context： https://es5.github.io/#x10.3</span>

    <span class="token comment">// 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）</span>
    <span class="token comment">// 执行上下文 ：https://es5.github.io/#x10.3</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">FULFILLED</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>onFulfilledCallbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    
  <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>
<span class="token class-name">PromiseA</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token comment">// 2.1.1 When pending, a promise:</span>
<span class="token comment">//      2.1.1.1 may transition to either the fulfilled or rejected state.</span>

<span class="token comment">// 2.1.1 处于pending状态，一个promise满足：</span>
<span class="token comment">//      2.1.1.1 可以迁移至执行态或拒绝态</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>res <span class="token operator">=</span> reason

    <span class="token comment">// 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].</span>
    <span class="token comment">// execution context： https://es5.github.io/#x10.3</span>

    <span class="token comment">// 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）</span>
    <span class="token comment">// 执行上下文 ：https://es5.github.io/#x10.3</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">REJECTED</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>onRejectedCallbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=></span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// A promise must provide a then method to access its current or eventual value or reason.</span>
<span class="token comment">// A promise’s then method accepts two arguments:</span>
<span class="token comment">// promise.then(onFulfilled, onRejected)</span>

<span class="token comment">// 一个 promise 必须提供一个 then 方法以访问其当前值、终值和拒因(也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值）</span>
<span class="token comment">// promise 的 then 方法接受两个参数：</span>
<span class="token comment">// promise.then(onFulfilled, onRejected)</span>
<span class="token class-name">PromiseA</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">then</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">onFulfilled<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> that <span class="token operator">=</span> <span class="token keyword">this</span>

  <span class="token comment">// 2.2.2.1 If onFulfilled is not a function, it must be ignored.</span>

  <span class="token comment">// 2.2.2.1 如果 onFulfilled 不是函数，其必须被忽略</span>
  <span class="token keyword">var</span> onFulfilled <span class="token operator">=</span> <span class="token keyword">typeof</span> onFulfilled <span class="token operator">===</span> <span class="token string">'function'</span> <span class="token operator">?</span> <span class="token function-variable function">onFulfilled</span> <span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> value <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// 2.2.2.2 If onRejected is not a function, it must be ignored.</span>

  <span class="token comment">// 2.2.2.2 如果 onRejected 不是函数，其必须被忽略</span>
  <span class="token keyword">var</span> onRejected <span class="token operator">=</span> <span class="token keyword">typeof</span> onRejected <span class="token operator">===</span> <span class="token string">'function'</span> <span class="token operator">?</span> <span class="token function-variable function">onRejected</span> <span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">throw</span> reason<span class="token punctuation">;</span><span class="token punctuation">}</span>


  <span class="token comment">// 2.2.7 then must return a promise [3.3].</span>

  <span class="token comment">// 2.2.7 then方法必须返回一个promise对象[注3.3]</span>
  <span class="token keyword">var</span> promise2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PromiseA</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>

    <span class="token keyword">function</span> <span class="token function">foo1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.2.2 If onFulfilled is a function:</span>
        <span class="token comment">//      2.2.2.1 it must be called after promise is fulfilled, with promise’s value as its first argument.</span>

        <span class="token comment">// 2.2.2 如果 onFulfilled 是函数</span>
        <span class="token comment">//      2.2.2.1 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值</span>
        <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token function">onFulfilled</span><span class="token punctuation">(</span>that<span class="token punctuation">.</span>res<span class="token punctuation">)</span>

        <span class="token comment">// 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).</span>

        <span class="token comment">// 2.2.7.1 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)</span>
        <span class="token function">resolvePromise</span><span class="token punctuation">(</span>promise2<span class="token punctuation">,</span> x<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>

      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.</span>

        <span class="token comment">// 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">foo2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.2.3 If onRejected is a function:</span>
        <span class="token comment">//      2.2.3.1 it must be called after promise is rejected, with promise’s reason as its first argument.</span>

        <span class="token comment">// 2.2.3 如果 onRejected 是函数：</span>
        <span class="token comment">//      2.2.3.1 当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的拒因</span>
        <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token function">onRejected</span><span class="token punctuation">(</span>that<span class="token punctuation">.</span>res<span class="token punctuation">)</span>
        
        <span class="token comment">// 2.2.7.1 If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).</span>

        <span class="token comment">// 2.2.7.1 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)</span>
        <span class="token function">resolvePromise</span><span class="token punctuation">(</span>promise2<span class="token punctuation">,</span> x<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 2.2.7.2 If either onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 2.2.2 If onFulfilled is a function:</span>
    <span class="token comment">//      2.2.2.2 it must not be called before promise is fulfilled.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>that<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">FULFILLED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token comment">// 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].</span>
      <span class="token comment">// execution context: https://es5.github.io/#x10.3</span>

      <span class="token comment">// 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）</span>
      <span class="token comment">// 执行上下文 ：https://es5.github.io/#x10.3</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span>foo1<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

      <span class="token comment">// 2.2.3 If onRejected is a function:</span>
      <span class="token comment">//      2.2.3.2 it must not be called before promise is rejected</span>

      <span class="token comment">// 2.2.3 如果 onRejected 是函数</span>
      <span class="token comment">//      2.2.3.2 在 promise 被拒绝执行前其不可被调用</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>that<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">REJECTED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 2.2.4 onFulfilled or onRejected must not be called until the execution context stack contains only platform code.[3.1].</span>
      <span class="token comment">// execution context: https://es5.github.io/#x10.3</span>

      <span class="token comment">// 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现）</span>
      <span class="token comment">// 执行上下文 ：https://es5.github.io/#x10.3</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span>foo2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
      
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>that<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 2.2.6 then may be called multiple times on the same promise.</span>
      <span class="token comment">// 2.2.6 then 方法可以被同一个 promise 调用多次</span>

      <span class="token comment">//      2.2.6.1 If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.</span>
      <span class="token comment">//      2.2.6.1 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调</span>
      that<span class="token punctuation">.</span>onFulfilledCallbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>foo1<span class="token punctuation">)</span>

      <span class="token comment">//      2.2.6.2 If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.</span>
      <span class="token comment">//      2.2.6.2 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调</span>
      that<span class="token punctuation">.</span>onRejectedCallbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>foo2<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> promise2
<span class="token punctuation">}</span>


<span class="token keyword">function</span> <span class="token function">resolvePromise</span><span class="token punctuation">(</span><span class="token parameter">promise2<span class="token punctuation">,</span> x<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.</span>
  <span class="token comment">// 2.3.1 如果 promise 和 x 指向同一对象，以 TypeError 为拒因拒绝执行 promise</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> promise2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">'Chaining cycle detected for promise'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 2.3.2 If x is a promise, adopt its state[3.4].</span>

  <span class="token comment">// 2.3.2 如果 x 为 Promise ，则使 promise 接受 x 的状态 [注3.4]</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token keyword">instanceof</span> <span class="token class-name">PromiseA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
    <span class="token comment">// 2.3.2.1 If x is pending, promise must remain pending until x is fulfilled or rejected</span>
    <span class="token comment">// 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PENDING</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      x<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">y</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">resolvePromise</span><span class="token punctuation">(</span>promise2<span class="token punctuation">,</span> y<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value</span>

    <span class="token comment">// 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">FULFILLED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>res<span class="token punctuation">)</span>

    <span class="token comment">// 2.3.2.3 If/when x is rejected, reject promise with the same reason.</span>
    <span class="token comment">// 如果 x 处于拒绝态，用相同的拒因拒绝 promise</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>x<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">REJECTED</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>res<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

  <span class="token comment">// 2.3.3 Otherwise, if x is an object or function;</span>

  <span class="token comment">// 2.3.3 否则，如果 x 为对象或者函数：</span>
 <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.</span>

    <span class="token comment">// 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为拒因拒绝 promise</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> then <span class="token operator">=</span> x<span class="token punctuation">.</span>then
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> then <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> isCalled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 2.3.3.3.4 If calling then throws an exception e.</span>

        <span class="token comment">// 2.3.3.3.4 如果调用 then 方法抛出了异常 e：</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token comment">// 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:</span>
          
          <span class="token comment">// 2.3.3.3  如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:</span>
          <span class="token function">then</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  
            <span class="token comment">// 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored</span>

            <span class="token comment">// 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>isCalled<span class="token punctuation">)</span> <span class="token keyword">return</span>
            isCalled <span class="token operator">=</span> <span class="token boolean">true</span>
  
            <span class="token function">resolvePromise</span><span class="token punctuation">(</span>promise2<span class="token punctuation">,</span> y<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  
            <span class="token comment">// 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored</span>

            <span class="token comment">// 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>isCalled<span class="token punctuation">)</span> <span class="token keyword">return</span>
            isCalled <span class="token operator">=</span> <span class="token boolean">true</span>
  
            <span class="token function">reject</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored</span>

          <span class="token comment">// 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>isCalled<span class="token punctuation">)</span> <span class="token keyword">return</span>
          isCalled <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      
      <span class="token comment">// 2.3.3.4 If then is not a function, fulfill promise with x</span>

      <span class="token comment">// 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

  <span class="token comment">// 2.3.4 If x is not an object or function, fulfill promise with x</span>

  <span class="token comment">// 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试要加的代码</span>
PromiseA<span class="token punctuation">.</span><span class="token function-variable function">deferred</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  obj<span class="token punctuation">.</span>promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PromiseA</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    obj<span class="token punctuation">.</span>resolve <span class="token operator">=</span> resolve
    obj<span class="token punctuation">.</span>reject <span class="token operator">=</span> reject
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> obj
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> PromiseA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>安装promises-aplus-tests</p>
<blockquote>
<p>npm install -g promises-aplus-tests
在package.json里添加</p>
</blockquote>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"test"</span><span class="token operator">:</span> <span class="token string">"promises-aplus-tests ./PromiseA.js"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在你写的PromiseA.js添加如下几段代码，用于测试</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 测试要加的代码</span>
PromiseA<span class="token punctuation">.</span><span class="token function-variable function">deferred</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  obj<span class="token punctuation">.</span>promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PromiseA</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    obj<span class="token punctuation">.</span>resolve <span class="token operator">=</span> resolve
    obj<span class="token punctuation">.</span>reject <span class="token operator">=</span> reject
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> obj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行</p>
<blockquote>
<p>npm run test</p>
</blockquote>
<h3 id="promise的缺点" tabindex="-1"><a class="header-anchor" href="#promise的缺点" aria-hidden="true">#</a> Promise的缺点</h3>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.ituring.com.cn/article/66566" target="_blank" rel="noopener noreferrer">【翻译】Promises/A+规范<ExternalLinkIcon/></a></li>
<li><a href="https://promisesaplus.com/" target="_blank" rel="noopener noreferrer">Promise/A+规范英文文档<ExternalLinkIcon/></a></li>
</ul>
</div></template>


