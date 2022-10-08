import{_ as n,o as s,c as a,e}from"./app.eff09732.js";const p={},t=e(`<h1 id="\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u7C7B" aria-hidden="true">#</a> \u7C7B</h1><h2 id="es6-class" tabindex="-1"><a class="header-anchor" href="#es6-class" aria-hidden="true">#</a> es6 class</h2><p>es6\u5B9A\u4E49\u7C7B\u4E24\u79CD\u65B9\u5F0F\uFF1A\u7C7B\u58F0\u660E\u548C\u7C7B\u8868\u8FBE\u5F0F\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u7C7B\u58F0\u660E</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// \u7C7B\u8868\u8FBE\u5F0F</span>
<span class="token keyword">const</span> Animal <span class="token operator">=</span> <span class="token keyword">class</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0E\u51FD\u6570\u8868\u8FBE\u5F0F\u7C7B\u4F3C\uFF0C\u7C7B\u8868\u8FBE\u5F0F\u5728\u5B83\u4EEC\u88AB\u6C42\u503C\u524D\u4E5F\u4E0D\u80FD\u5F15\u7528\u3002\u4E0D\u8FC7\uFF0C\u4E0E\u51FD\u6570\u5B9A\u4E49\u4E0D\u540C\u7684\u662F\uFF0C\u867D\u7136\u51FD\u6570 \u58F0\u660E\u53EF\u4EE5\u63D0\u5347\uFF0C\u4F46\u7C7B\u5B9A\u4E49\u4E0D\u80FD\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>FunctionExpression<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53E6\u4E00\u4E2A\u8DDF\u51FD\u6570\u58F0\u660E\u4E0D\u540C\u7684\u5730\u65B9\u662F\uFF0C\u51FD\u6570\u53D7\u51FD\u6570\u4F5C\u7528\u57DF\u9650\u5236\uFF0C\u800C\u7C7B\u53D7\u5757\u4F5C\u7528\u57DF\u9650\u5236\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>
 <span class="token keyword">function</span> <span class="token function">FunctionDeclaration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token keyword">class</span> <span class="token class-name">ClassDeclaration</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>FunctionDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// FunctionDeclaration() {}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ClassDeclaration<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: ClassDeclaration is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u7C7B\u6784\u9020\u51FD\u6570\u4F1A\u5728\u6267\u884C\u4E4B\u540E\u8FD4\u56DE this \u5BF9\u8C61\u3002\u6784\u9020\u51FD\u6570\u8FD4\u56DE\u7684\u5BF9\u8C61\u4F1A\u88AB\u7528\u4F5C\u5B9E\u4F8B\u5316\u7684\u5BF9\u8C61\uFF0C\u5982\u679C\u6CA1\u6709\u4EC0\u4E48\u5F15\u7528\u65B0\u521B\u5EFA\u7684 this \u5BF9\u8C61\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u5BF9\u8C61\u4F1A\u88AB\u9500\u6BC1\u3002</p><p>\u7C7B\u6784\u9020\u51FD\u6570\u4E0E\u6784\u9020\u51FD\u6570\u7684\u4E3B\u8981\u533A\u522B\u662F\uFF0C\u8C03\u7528\u7C7B\u6784\u9020\u51FD\u6570\u5FC5\u987B\u4F7F\u7528 new \u64CD\u4F5C\u7B26\u3002\u800C\u666E\u901A\u6784\u9020\u51FD\u6570\u5982\u679C\u4E0D\u4F7F\u7528 new \u8C03\u7528\uFF0C\u90A3\u4E48\u5C31\u4F1A\u4EE5\u5168\u5C40\u7684 this\uFF08\u901A\u5E38\u662F window\uFF09\u4F5C\u4E3A\u5185\u90E8\u5BF9\u8C61\u3002\u8C03\u7528\u7C7B\u6784\u9020\u51FD\u6570\u65F6\u5982\u679C\u5FD8\u4E86\u4F7F\u7528 new \u5219\u4F1A\u629B\u51FA\u9519\u8BEF\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// \u628A window \u4F5C\u4E3A this \u6765\u6784\u5EFA\u5B9E\u4F8B</span>
<span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// TypeError: class constructor Animal cannot be invoked without &#39;new&#39; </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7C7B\u6784\u9020\u51FD\u6570\u6CA1\u6709\u4EC0\u4E48\u7279\u6B8A\u4E4B\u5904\uFF0C\u5B9E\u4F8B\u5316\u4E4B\u540E\uFF0C\u5B83\u4F1A\u6210\u4E3A\u666E\u901A\u7684\u5B9E\u4F8B\u65B9\u6CD5\uFF08\u4F46\u4F5C\u4E3A\u7C7B\u6784\u9020\u51FD\u6570\uFF0C\u4ECD\u7136 \u8981\u4F7F\u7528 new \u8C03\u7528\uFF09\u3002\u56E0\u6B64\uFF0C\u5B9E\u4F8B\u5316\u4E4B\u540E\u53EF\u4EE5\u5728\u5B9E\u4F8B\u4E0A\u5F15\u7528\u5B83\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// \u4F7F\u7528\u7C7B\u521B\u5EFA\u4E00\u4E2A\u65B0\u5B9E\u4F8B</span>
<span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p1<span class="token punctuation">.</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// TypeError: Class constructor Person cannot be invoked without &#39;new&#39;</span>
<span class="token comment">// \u4F7F\u7528\u5BF9\u7C7B\u6784\u9020\u51FD\u6570\u7684\u5F15\u7528\u521B\u5EFA\u4E00\u4E2A\u65B0\u5B9E\u4F8B</span>
<span class="token keyword">let</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">p1<span class="token punctuation">.</span>constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es6-\u7684\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#es6-\u7684\u7EE7\u627F" aria-hidden="true">#</a> es6 \u7684\u7EE7\u627F</h2><p>ECMAScript 6 \u65B0\u589E\u7279\u6027\u4E2D\u6700\u51FA\u8272\u7684\u4E00\u4E2A\u5C31\u662F\u539F\u751F\u652F\u6301\u4E86\u7C7B\u7EE7\u627F\u673A\u5236\u3002\u867D\u7136\u7C7B\u7EE7\u627F\u4F7F\u7528\u7684\u662F\u65B0\u8BED\u6CD5\uFF0C\u4F46\u80CC\u540E\u4F9D\u65E7\u4F7F\u7528\u7684\u662F\u539F\u578B\u94FE\u3002</p><h3 id="super" tabindex="-1"><a class="header-anchor" href="#super" aria-hidden="true">#</a> super</h3><p>\u6D3E\u751F\u7C7B\u7684\u65B9\u6CD5\u53EF\u4EE5\u901A\u8FC7 super \u5173\u952E\u5B57\u5F15\u7528\u5B83\u4EEC\u7684\u539F\u578B\u3002\u8FD9\u4E2A\u5173\u952E\u5B57\u53EA\u80FD\u5728\u6D3E\u751F\u7C7B\u4E2D\u4F7F\u7528\uFF0C\u800C\u4E14\u4EC5 \u9650\u4E8E\u7C7B\u6784\u9020\u51FD\u6570\u3001\u5B9E\u4F8B\u65B9\u6CD5\u548C\u9759\u6001\u65B9\u6CD5\u5185\u90E8\u3002\u5728\u7C7B\u6784\u9020\u51FD\u6570\u4E2D\u4F7F\u7528 super \u53EF\u4EE5\u8C03\u7528\u7236\u7C7B\u6784\u9020\u51FD\u6570\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>hasEngine <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// \u4E0D\u8981\u5728\u8C03\u7528 super()\u4E4B\u524D\u5F15\u7528 this\uFF0C\u5426\u5219\u4F1A\u629B\u51FA ReferenceError</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u76F8\u5F53\u4E8E super.constructor()</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vehicle</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Bus { hasEngine: true }</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u9759\u6001\u65B9\u6CD5\u4E2D\u53EF\u4EE5\u901A\u8FC7 super \u8C03\u7528\u7EE7\u627F\u7684\u7C7B\u4E0A\u5B9A\u4E49\u7684\u9759\u6001\u65B9\u6CD5\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token keyword">static</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;vehicle&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token keyword">static</span> <span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
Bus<span class="token punctuation">.</span><span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// vehicle</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES6 \u7ED9\u7C7B\u6784\u9020\u51FD\u6570\u548C\u9759\u6001\u65B9\u6CD5\u6DFB\u52A0\u4E86\u5185\u90E8\u7279\u6027[[HomeObject]]\uFF0C\u8FD9\u4E2A\u7279\u6027\u662F\u4E00\u4E2A \u6307\u9488\uFF0C\u6307\u5411\u5B9A\u4E49\u8BE5\u65B9\u6CD5\u7684\u5BF9\u8C61\u3002\u8FD9\u4E2A\u6307\u9488\u662F\u81EA\u52A8\u8D4B\u503C\u7684\uFF0C\u800C\u4E14\u53EA\u80FD\u5728 JavaScript \u5F15\u64CE\u5185\u90E8 \u8BBF\u95EE\u3002super \u59CB\u7EC8\u4F1A\u5B9A\u4E49\u4E3A[[HomeObject]]\u7684\u539F\u578B\u3002 \u5728\u4F7F\u7528 super \u65F6\u8981\u6CE8\u610F\u51E0\u4E2A\u95EE\u9898\u3002</p><ol><li>super \u53EA\u80FD\u5728\u6D3E\u751F\u7C7B\u6784\u9020\u51FD\u6570\u548C\u9759\u6001\u65B9\u6CD5\u4E2D\u4F7F\u7528\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// SyntaxError: &#39;super&#39; keyword unexpected</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u4E0D\u80FD\u5355\u72EC\u5F15\u7528 super \u5173\u952E\u5B57\uFF0C\u8981\u4E48\u7528\u5B83\u8C03\u7528\u6784\u9020\u51FD\u6570\uFF0C\u8981\u4E48\u7528\u5B83\u5F15\u7528\u9759\u6001\u65B9\u6CD5\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// SyntaxError: &#39;super&#39; keyword unexpected here</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u8C03\u7528 super()\u4F1A\u8C03\u7528\u7236\u7C7B\u6784\u9020\u51FD\u6570\uFF0C\u5E76\u5C06\u8FD4\u56DE\u7684\u5B9E\u4F8B\u8D4B\u503C\u7ED9 this</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vehicle</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>super()\u7684\u884C\u4E3A\u5982\u540C\u8C03\u7528\u6784\u9020\u51FD\u6570\uFF0C\u5982\u679C\u9700\u8981\u7ED9\u7236\u7C7B\u6784\u9020\u51FD\u6570\u4F20\u53C2\uFF0C\u5219\u9700\u8981\u624B\u52A8\u4F20\u5165\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">licensePlate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>licensePlate <span class="token operator">=</span> licensePlate<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">licensePlate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">(</span>licensePlate<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token string">&#39;1337H4X&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Bus { licensePlate: &#39;1337H4X&#39; }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>\u5982\u679C\u6CA1\u6709\u5B9A\u4E49\u7C7B\u6784\u9020\u51FD\u6570\uFF0C\u5728\u5B9E\u4F8B\u5316\u6D3E\u751F\u7C7B\u65F6\u4F1A\u8C03\u7528 super()\uFF0C\u800C\u4E14\u4F1A\u4F20\u5165\u6240\u6709\u4F20\u7ED9\u6D3E\u751F\u7C7B\u7684\u53C2\u6570\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">licensePlate</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">this</span><span class="token punctuation">.</span>licensePlate <span class="token operator">=</span> licensePlate<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token string">&#39;1337H4X&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Bus { licensePlate: &#39;1337H4X&#39; }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>\u5728\u7C7B\u6784\u9020\u51FD\u6570\u4E2D\uFF0C\u4E0D\u80FD\u5728\u8C03\u7528 super()\u4E4B\u524D\u5F15\u7528 this\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Bus</span> <span class="token keyword">extends</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span>
 <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Bus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ReferenceError: Must call super constructor in derived class</span>
<span class="token comment">// before accessing &#39;this&#39; or returning from derived constructor</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7"><li>\u5982\u679C\u5728\u6D3E\u751F\u7C7B\u4E2D\u663E\u5F0F\u5B9A\u4E49\u4E86\u6784\u9020\u51FD\u6570\uFF0C\u5219\u8981\u4E48\u5FC5\u987B\u5728\u5176\u4E2D\u8C03\u7528 super()\uFF0C\u8981\u4E48\u5FC5\u987B\u5728\u5176\u4E2D\u8FD4\u56DE\u4E00\u4E2A\u5BF9\u8C61\u3002(\u4E0D\u8FD4\u56DE\u4F1A\u62A5\u9519\uFF1AUncaught ReferenceError: Must call super constructor in derived class before accessing &#39;this&#39; or returning from derived constructor)</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Vehicle</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7406\u89E3js\u6CA1\u6709\u7C7B\u800C\u662F\u59D4\u6258" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3js\u6CA1\u6709\u7C7B\u800C\u662F\u59D4\u6258" aria-hidden="true">#</a> \u7406\u89E3js\u6CA1\u6709\u7C7B\u800C\u662F\u59D4\u6258\uFF01</h2><p>javascript\u6CA1\u6709\u7C7B\uFF01javascript\u4E00\u76F4\u5728\u6A21\u4EFF\u7C7B\uFF0C\u8BA9\u81EA\u5DF1\u770B\u8D77\u6765\u548C\u9AD8\u7EA7\u8BED\u8A00\u7684\u7C7B\u4E00\u6837\u3002 js\u7684\u7C7B\u672C\u8D28\u8FD8\u662F\u57FA\u4E8E\u539F\u578B\u94FE\uFF0C\u529F\u80FD\u7684<code>\u59D4\u6258</code>\u3002\u7EE7\u627F\u610F\u5473\u7740\u590D\u5236\u64CD\u4F5C\uFF0CJavaScript\uFF08\u9ED8\u8BA4\uFF09\u5E76\u4E0D\u4F1A\u590D\u5236\u5BF9\u8C61\u5C5E\u6027\u3002\u76F8\u53CD\uFF0CJavaScript \u4F1A\u5728\u4E24 \u4E2A\u5BF9\u8C61\u4E4B\u95F4\u521B\u5EFA\u4E00\u4E2A\u5173\u8054\uFF0C\u8FD9\u6837\u4E00\u4E2A\u5BF9\u8C61\u5C31\u53EF\u4EE5\u901A\u8FC7\u59D4\u6258\u8BBF\u95EE\u53E6\u4E00\u4E2A\u5BF9\u8C61\u7684\u5C5E\u6027\u548C\u51FD\u6570\u3002</p><h2 id="es5\u7684\u7EE7\u627F" tabindex="-1"><a class="header-anchor" href="#es5\u7684\u7EE7\u627F" aria-hidden="true">#</a> es5\u7684\u7EE7\u627F</h2><p>es5\u6709\u51E0\u79CD\u7EE7\u627F\uFF1A\u539F\u578B\u7EE7\u627F\u3001\u76D7\u7528\u6784\u9020\u51FD\u6570\u7EE7\u627F\uFF08\u7ECF\u5178\u7EE7\u627F\uFF09\u3001\u539F\u578B\u5F0F\u7EE7\u627F\u3001\u5BC4\u751F\u5F0F\u7EE7\u627F\u3001\u5BC4\u751F\u7EC4\u5408\u5F0F\u7EE7\u627F\uFF0C\u8BE6\u7EC6\u770BJavaScript\u9AD8\u7EA7\u7F16\u7A0B\u57308\u7AE0\u7EE7\u627F\u3002\u56E0\u4E3A\u73B0\u5728\u5DF2\u7ECF\u662Fes6\u7684\u65F6\u4EE3\uFF0C\u6CA1\u5FC5\u8981\u7814\u7A76\u8FD9\u4E9B\u5199\u6CD5\uFF0C\u56E0\u4E3A\u6211\u4EEC\u6709babel\u8FD9\u4E9B\u5DE5\u5177\u4F1A\u4E3A\u6211\u4EEC\u8F6C\u6210es5</p>`,39),c=[t];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","class.html.vue"]]);export{k as default};
