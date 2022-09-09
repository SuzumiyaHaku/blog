<template><div><h1 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h1>
<h2 id="es6-class" tabindex="-1"><a class="header-anchor" href="#es6-class" aria-hidden="true">#</a> es6 class</h2>
<p>es6定义类两种方式：类声明和类表达式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 类声明</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 类表达式</span>
<span class="token keyword">const</span> Animal <span class="token operator">=</span> <span class="token keyword">class</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与函数表达式类似，类表达式在它们被求值前也不能引用。不过，与函数定义不同的是，虽然函数
声明可以提升，但类定义不能：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>FunctionExpression<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token keyword">var</span> <span class="token function-variable function">FunctionExpression</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>FunctionExpression<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// function() {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>FunctionDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// FunctionDeclaration() {}</span>
<span class="token keyword">function</span> <span class="token function">FunctionDeclaration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>FunctionDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// FunctionDeclaration() {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ClassExpression<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token keyword">var</span> ClassExpression <span class="token operator">=</span> <span class="token keyword">class</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ClassExpression<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// class {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ClassDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: ClassDeclaration is not defined</span>
<span class="token keyword">class</span> <span class="token class-name">ClassDeclaration</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ClassDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// class ClassDeclaration {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受块作用域限制：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
 <span class="token keyword">function</span> <span class="token function">FunctionDeclaration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token keyword">class</span> <span class="token class-name">ClassDeclaration</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>FunctionDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// FunctionDeclaration() {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ClassDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: ClassDeclaration is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，类构造函数会在执行之后返回 this 对象。构造函数返回的对象会被用作实例化的对象，如果没有什么引用新创建的 this 对象，那么这个对象会被销毁。</p>
<p>类构造函数与构造函数的主要区别是，调用类构造函数必须使用 new 操作符。而普通构造函数如果不使用 new 调用，那么就会以全局的 this（通常是 window）作为内部对象。调用类构造函数时如果忘了使用 new 则会抛出错误：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 把 window 作为 this 来构建实例</span>
<span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// TypeError: class constructor Animal cannot be invoked without 'new' </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类构造函数没有什么特殊之处，实例化之后，它会成为普通的实例方法（但作为类构造函数，仍然
要使用 new 调用）。因此，实例化之后可以在实例上引用它：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 使用类创建一个新实例</span>
<span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p1<span class="token punctuation">.</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// TypeError: Class constructor Person cannot be invoked without 'new'</span>
<span class="token comment">// 使用对类构造函数的引用创建一个新实例</span>
<span class="token keyword">let</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">p1<span class="token punctuation">.</span>constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es6-的继承" tabindex="-1"><a class="header-anchor" href="#es6-的继承" aria-hidden="true">#</a> es6 的继承</h2>
<p>ECMAScript 6 新增特性中最出色的一个就是原生支持了类继承机制。虽然类继承使用的是新语法，但背后依旧使用的是原型链。</p>
<h3 id="super" tabindex="-1"><a class="header-anchor" href="#super" aria-hidden="true">#</a> super</h3>
<p>派生类的方法可以通过 super 关键字引用它们的原型。这个关键字只能在派生类中使用，而且仅
限于类构造函数、实例方法和静态方法内部。在类构造函数中使用 super 可以调用父类构造函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>hasEngine <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// 不要在调用 super()之前引用 this，否则会抛出 ReferenceError</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 相当于 super.constructor()</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vehicle</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Bus { hasEngine: true }</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在静态方法中可以通过 super 调用继承的类上定义的静态方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token keyword">static</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'vehicle'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token keyword">static</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
Bus<span class="token punctuation">.</span><span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// vehicle</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6 给类构造函数和静态方法添加了内部特性[[HomeObject]]，这个特性是一个
指针，指向定义该方法的对象。这个指针是自动赋值的，而且只能在 JavaScript 引擎内部
访问。super 始终会定义为[[HomeObject]]的原型。
在使用 super 时要注意几个问题。</p>
<ol>
<li>super 只能在派生类构造函数和静态方法中使用。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// SyntaxError: 'super' keyword unexpected</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>不能单独引用 super 关键字，要么用它调用构造函数，要么用它引用静态方法。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// SyntaxError: 'super' keyword unexpected here</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>调用 super()会调用父类构造函数，并将返回的实例赋值给 this</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vehicle</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">licensePlate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>licensePlate <span class="token operator">=</span> licensePlate<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">licensePlate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span>licensePlate<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token string">'1337H4X'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Bus { licensePlate: '1337H4X' }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>如果没有定义类构造函数，在实例化派生类时会调用 super()，而且会传入所有传给派生类的参数。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">licensePlate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>licensePlate <span class="token operator">=</span> licensePlate<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token string">'1337H4X'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Bus { licensePlate: '1337H4X' }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>在类构造函数中，不能在调用 super()之前引用 this。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ReferenceError: Must call super constructor in derived class</span>
<span class="token comment">// before accessing 'this' or returning from derived constructor</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7">
<li>如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回一个对象。(不返回会报错：Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor)</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Car</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Van</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Car {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Bus {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Van</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="理解js没有类而是委托" tabindex="-1"><a class="header-anchor" href="#理解js没有类而是委托" aria-hidden="true">#</a> 理解js没有类而是委托！</h2>
<p>javascript没有类！javascript一直在模仿类，让自己看起来和高级语言的类一样。
js的类本质还是基于原型链，功能的<code v-pre>委托</code>。继承意味着复制操作，JavaScript（默认）并不会复制对象属性。相反，JavaScript 会在两 个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数。</p>
<h2 id="es5的继承" tabindex="-1"><a class="header-anchor" href="#es5的继承" aria-hidden="true">#</a> es5的继承</h2>
<p>es5有几种继承：原型继承、盗用构造函数继承（经典继承）、原型式继承、寄生式继承、寄生组合式继承，详细看JavaScript高级编程地8章继承。因为现在已经是es6的时代，没必要研究这些写法，因为我们有babel这些工具会为我们转成es5</p>
</div></template>


