import{_ as n,o as s,c as a,e as t}from"./app.30cb7ca8.js";const p={},o=t(`<h1 id="new" tabindex="-1"><a class="header-anchor" href="#new" aria-hidden="true">#</a> new</h1><h2 id="\u6A21\u62DF\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u6A21\u62DF\u5B9E\u73B0" aria-hidden="true">#</a> \u6A21\u62DF\u5B9E\u73B0</h2><p>\u5148\u770B\u770Bnew\u662F\u505A\u4E86\u4EC0\u4E48</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;aaa&quot;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">233</span>
<span class="token punctuation">}</span>
<span class="token class-name">Foo</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u56E0\u4E3A new \u7684\u7ED3\u679C\u662F\u4E00\u4E2A\u65B0\u5BF9\u8C61\uFF0C\u6240\u4EE5\u5728\u6A21\u62DF\u5B9E\u73B0\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u4E5F\u8981\u5EFA\u7ACB\u4E00\u4E2A\u65B0\u5BF9\u8C61\uFF0C\u5047\u8BBE\u8FD9\u4E2A\u5BF9\u8C61\u53EB obj\uFF0C\u56E0\u4E3A obj \u4F1A\u5177\u6709 Foo \u6784\u9020\u51FD\u6570\u91CC\u7684\u5C5E\u6027\uFF0C\u60F3\u60F3\u7ECF\u5178\u7EE7\u627F\u7684\u4F8B\u5B50\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 Foo.apply(obj, arguments)\u6765\u7ED9 obj \u6DFB\u52A0\u65B0\u7684\u5C5E\u6027\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">objectFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u4ECEObject.prototype\u4E0A\u514B\u9686\u4E00\u4E2A\u5BF9\u8C61</span>

  <span class="token keyword">var</span> Constructor <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u53D6\u5F97\u5916\u90E8\u4F20\u5165\u7684\u6784\u9020\u5668\uFF08\u6784\u9020\u51FD\u6570\uFF09</span>

  <span class="token keyword">var</span> <span class="token function-variable function">F</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token class-name">Constructor</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
  obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u6307\u5411\u6B63\u786E\u7684\u539F\u578B</span>

  <span class="token keyword">var</span> ret <span class="token operator">=</span> <span class="token function">Constructor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//\u501F\u7528\u5916\u90E8\u4F20\u5165\u7684\u6784\u9020\u5668\u7ED9obj\u8BBE\u7F6E\u5C5E\u6027</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> ret <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">?</span> ret <span class="token operator">:</span> obj<span class="token punctuation">;</span><span class="token comment">//\u786E\u4FDD\u6784\u9020\u5668\u603B\u662F\u8FD4\u56DE\u4E00\u4E2A\u5BF9\u8C61</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),e=[o];function c(l,i){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","new.html.vue"]]);export{k as default};
