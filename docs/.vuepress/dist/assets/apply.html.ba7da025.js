import{_ as o,r as c,o as p,c as l,a as n,d as e,e as a,b as t}from"./app.30cb7ca8.js";const i={},r=a(`<h1 id="call\u3001apply" tabindex="-1"><a class="header-anchor" href="#call\u3001apply" aria-hidden="true">#</a> call\u3001apply</h1><h2 id="call" tabindex="-1"><a class="header-anchor" href="#call" aria-hidden="true">#</a> call</h2><h3 id="call\u7684\u6A21\u62DF\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#call\u7684\u6A21\u62DF\u5B9E\u73B0" aria-hidden="true">#</a> call\u7684\u6A21\u62DF\u5B9E\u73B0</h3><p>\u57FA\u672C\u7528\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> context <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token operator">||</span> window<span class="token punctuation">;</span>
  context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;arguments[&#39;</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&#39;]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">&#39;context.fn(&#39;</span> <span class="token operator">+</span> args <span class="token operator">+</span><span class="token string">&#39;)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// context.fn(arguments[1],arguments[2])</span>
  <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="call\u7684es\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#call\u7684es\u89C4\u8303" aria-hidden="true">#</a> call\u7684es\u89C4\u8303</h3>`,7),u={href:"https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.call",target:"_blank",rel:"noopener noreferrer"},d=t("20.2.3.3 Function.prototype.call ( thisArg, ...args )"),k=a('<p>This method performs the following steps when called:</p><blockquote><p>\u6B64\u65B9\u6CD5\u5728\u8C03\u7528\u65F6\u6267\u884C\u4EE5\u4E0B\u6B65\u9AA4\uFF1A</p></blockquote><ol><li>Let <code>func</code> be the <code>this</code> value.</li></ol><blockquote><p>\u8BBE\u7F6E<code>func</code>\u4E3A<code>this</code>\u503C</p></blockquote><ol start="2"><li>If <code>IsCallable(func)</code> is <code>false</code>, throw a <code>TypeError</code> exception.</li></ol><blockquote><p>\u5982\u679C <code>IsCallable(func)</code> \u662F <code>false</code>\uFF0C\u629B\u51FA\u4E00\u4E2A<code>TypeError</code>\u7684\u5F02\u5E38\u3002</p></blockquote><ol start="3"><li>Perform <code>PrepareForTailCall()</code>.</li></ol><blockquote><p>\u6267\u884C <code>PrepareForTailCall()</code>.</p></blockquote><ol start="4"><li>Return ? <code>Call(func, thisArg, args)</code>.</li></ol><blockquote><p>\u8FD4\u56DE<code>Call(func, thisArg, args)</code>\u7684\u7ED3\u679C</p></blockquote><div class="custom-container tip"><p class="custom-container-title">NOTE 1</p><p>The thisArg value is passed without modification as the this value. This is a change from Edition 3, where an undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value. Even though the thisArg is passed without modification, non-strict functions still perform these transformations upon entry to the function.</p><blockquote><p>thisArg\u503C\u4F5C\u4E3Athis\u503C\u4F20\u9012\u800C\u4E0D\u8FDB\u884C\u4FEE\u6539\u3002\u8FD9\u662F\u7248\u672C3\u7684\u4E00\u4E2A\u53D8\u5316\uFF0C\u5728\u7248\u672C3\u4E2D\uFF0C\u672A\u5B9A\u4E49\u6216\u7A7A\u7684thisArg\u88AB\u66FF\u6362\u4E3A\u5168\u5C40\u5BF9\u8C61\uFF0CToObject\u5E94\u7528\u4E8E\u6240\u6709\u5176\u4ED6\u503C\uFF0C\u7ED3\u679C\u4F5C\u4E3AThis\u503C\u4F20\u9012\u3002\u5373\u4F7F\u4F20\u9012\u4E86thisArg\u800C\u6CA1\u6709\u4FEE\u6539\uFF0C\u975E\u4E25\u683C\u51FD\u6570\u4ECD\u7136\u5728\u8FDB\u5165\u51FD\u6570\u65F6\u6267\u884C\u8FD9\u4E9B\u8F6C\u6362\u3002</p></blockquote></div><div class="custom-container tip"><p class="custom-container-title">NOTE 2</p><p>If func is an arrow function or a bound function exotic object then the thisArg will be ignored by the function [[Call]] in step 4.</p><blockquote><p>\u5982\u679Cfunc\u662F\u7BAD\u5934\u51FD\u6570\u6216\u7ED1\u5B9A\u51FD\u6570\u5916\u6765\u5BF9\u8C61\uFF0C\u5219\u6B65\u9AA44\u4E2D\u7684\u51FD\u6570[[Call]]\u5C06\u5FFD\u7565thisArg\u3002</p></blockquote></div>',12),h={href:"https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iscallable",target:"_blank",rel:"noopener noreferrer"},b=t("7.2.3 IsCallable ( argument )"),v=a(`<p>The abstract operation IsCallable takes argument argument (an ECMAScript language value) and returns a Boolean. It determines if argument is a callable function with a [[Call]] internal method. It performs the following steps when called:</p><blockquote><p>\u62BD\u8C61\u64CD\u4F5CIsCallable\u63A5\u53D7\u53C2\u6570\uFF08js\u8BED\u8A00\u7C7B\u578B\u7684\u503C\uFF09\u5E76\u8FD4\u56DE\u5E03\u5C14\u503C\u3002\u5B83\u786E\u5B9A\u53C2\u6570\u662F\u5426\u662F\u5177\u6709[[Call]]\u5185\u90E8\u65B9\u6CD5\u7684\u53EF\u8C03\u7528\u51FD\u6570\u3002\u8C03\u7528\u65F6\uFF0C\u5B83\u6267\u884C\u4EE5\u4E0B\u6B65\u9AA4\uFF1A</p></blockquote><ol><li>If <code>argument</code> is not an <code>Object</code>, return <code>false</code>.</li></ol><blockquote><p>\u5982\u679C<code>argument</code>\u4E0D\u662FObject, \u8FD4\u56DEfalse</p></blockquote><ol start="2"><li>If <code>argument</code> has a [[Call]] internal method, return <code>true</code>.</li></ol><blockquote><p>\u5982\u679C<code>argument</code>\u6709[[Call]]\u5185\u90E8\u53EF\u8C03\u7528\u7684\u65B9\u6CD5\uFF0C\u8FD4\u56DE<code>true</code></p></blockquote><ol start="3"><li>Return <code>false</code>.</li></ol><blockquote><p>\u8FD4\u56DEfalse</p></blockquote><h2 id="apply" tabindex="-1"><a class="header-anchor" href="#apply" aria-hidden="true">#</a> apply</h2><h3 id="apply\u7684\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#apply\u7684\u5B9E\u73B0" aria-hidden="true">#</a> apply\u7684\u5B9E\u73B0</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myApply</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> context <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token operator">||</span> window<span class="token punctuation">;</span>
  context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> result<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;arr[&#39;</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&#39;]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    result <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">&#39;context.fn(&#39;</span> <span class="token operator">+</span> args <span class="token operator">+</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">)</span> <span class="token comment">// context.fn(arr[0],arr[1])</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apply\u7684es\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#apply\u7684es\u89C4\u8303" aria-hidden="true">#</a> apply\u7684es\u89C4\u8303</h3>`,12),f={href:"https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.apply",target:"_blank",rel:"noopener noreferrer"},m=t("20.2.3.1 Function.prototype.apply ( thisArg, argArray )"),g=a('<p>This method performs the following steps when called:</p><blockquote><p>\u6B64\u65B9\u6CD5\u5728\u8C03\u7528\u65F6\u6267\u884C\u4EE5\u4E0B\u6B65\u9AA4\uFF1A</p></blockquote><ol><li>Let <code>func</code> be the <code>this</code> value.</li></ol><blockquote><p>\u8BBE\u7F6E<code>func</code>\u4E3A<code>this</code>\u503C</p></blockquote><ol start="2"><li>If <code>IsCallable(func)</code> is <code>false</code>, throw a <code>TypeError</code> exception.</li></ol><blockquote><p>\u5982\u679C <code>IsCallable(func)</code> \u662F <code>false</code>\uFF0C\u629B\u51FA\u4E00\u4E2A<code>TypeError</code>\u7684\u5F02\u5E38\u3002</p></blockquote><ol start="3"><li>If <code>argArray</code> is <code>undefined</code> or <code>null</code>, then</li></ol><blockquote><p>\u5982\u679C <code>argArray</code> \u662F<code>undefined</code>\u6216\u8005<code>null</code>, \u5219 1. Perform <code>PrepareForTailCall()</code>. \u6267\u884C <code>PrepareForTailCall()</code> 2. Return ? <code>Call(func, thisArg)</code>. \u8FD4\u56DE<code>Call(func, thisArg)</code>\u7684\u7ED3\u679C</p></blockquote><ol start="4"><li>Let <code>argList</code> be ? <code>CreateListFromArrayLike(argArray)</code>.</li></ol><blockquote><p><code>argList</code>\u4E3A<code>CreateListFromArrayLike(argArray)</code>\uFF08CreateListFromArrayLike\u51FD\u6570\u53EF\u4EE5\u8FD4\u56DE\u4E00\u4E2A\u5217\u8868\u503C\uFF0C\u5176\u5143\u7D20\u7531obj\u7684\u7D22\u5F15\u63D0\u4F9B\uFF09</p></blockquote><ol start="5"><li>Perform <code>PrepareForTailCall()</code>.</li></ol><blockquote><p>\u6267\u884C <code>PrepareForTailCall()</code></p></blockquote><ol start="6"><li>Return ? <code>Call(func, thisArg, argList)</code>.</li></ol><blockquote><p>\u8FD4\u56DE<code>Call(func, thisArg, args)</code>\u7684\u7ED3\u679C</p></blockquote><div class="custom-container tip"><p class="custom-container-title">NOTE 1</p><p>The thisArg value is passed without modification as the this value. This is a change from Edition 3, where an undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value. Even though the thisArg is passed without modification, non-strict functions still perform these transformations upon entry to the function.</p><blockquote><p>thisArg\u503C\u4F5C\u4E3Athis\u503C\u4F20\u9012\u800C\u4E0D\u8FDB\u884C\u4FEE\u6539\u3002\u8FD9\u662F\u7248\u672C3\u7684\u4E00\u4E2A\u53D8\u5316\uFF0C\u5728\u7248\u672C3\u4E2D\uFF0C\u672A\u5B9A\u4E49\u6216\u7A7A\u7684thisArg\u88AB\u66FF\u6362\u4E3A\u5168\u5C40\u5BF9\u8C61\uFF0CToObject\u5E94\u7528\u4E8E\u6240\u6709\u5176\u4ED6\u503C\uFF0C\u7ED3\u679C\u4F5C\u4E3AThis\u503C\u4F20\u9012\u3002\u5373\u4F7F\u4F20\u9012\u4E86thisArg\u800C\u6CA1\u6709\u4FEE\u6539\uFF0C\u975E\u4E25\u683C\u51FD\u6570\u4ECD\u7136\u5728\u8FDB\u5165\u51FD\u6570\u65F6\u6267\u884C\u8FD9\u4E9B\u8F6C\u6362\u3002</p></blockquote></div><div class="custom-container tip"><p class="custom-container-title">NOTE 2</p><p>If func is an arrow function or a bound function exotic object then the thisArg will be ignored by the function [[Call]] in step 6.</p><blockquote><p>\u5982\u679Cfunc\u662F\u7BAD\u5934\u51FD\u6570\u6216\u7ED1\u5B9A\u51FD\u6570\u5916\u6765\u5BF9\u8C61\uFF0C\u5219\u6B65\u9AA46\u4E2D\u7684\u51FD\u6570[[Call]]\u5C06\u5FFD\u7565thisArg\u3002</p></blockquote></div>',16);function y(w,q){const s=c("ExternalLinkIcon");return p(),l("div",null,[r,n("p",null,[n("a",u,[d,e(s)])]),k,n("p",null,[n("a",h,[b,e(s)])]),v,n("p",null,[n("a",f,[m,e(s)])]),g])}const x=o(i,[["render",y],["__file","apply.html.vue"]]);export{x as default};
