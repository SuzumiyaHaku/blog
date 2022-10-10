import{_ as e,r as n,o,c,a as s,w as i,b as a,d as l,e as u}from"./app.17321d1b.js";const r={},k=a("h1",{id:"\u51FD\u6570",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#\u51FD\u6570","aria-hidden":"true"},"#"),l(" \u51FD\u6570")],-1),d=u(`<h2 id="\u4E3A\u5565\u9700\u8981\u7BAD\u5934\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u5565\u9700\u8981\u7BAD\u5934\u51FD\u6570" aria-hidden="true">#</a> \u4E3A\u5565\u9700\u8981\u7BAD\u5934\u51FD\u6570</h2><p>var self = this \u8FD9\u79CD\u89E3\u51B3\u65B9\u6848\u5706\u6EE1\u89E3\u51B3\u4E86\u7406\u89E3\u548C\u6B63\u786E\u4F7F\u7528this\u7ED1\u5B9A\u7684\u95EE\u9898\uFF0C\u5E76\u4E14\u6CA1\u6709\u628A\u95EE\u9898\u8FC7\u4E8E\u590D\u6742\u5316\uFF0C\u5B83\u4F7F\u7528\u7684\u662F\u6211\u4EEC\u975E\u5E38\u719F\u6089\u7684\u5DE5\u5177\uFF1A\u8BCD\u6CD5\u4F5C\u7528\u57DF\u3002self \u53EA\u662F\u4E00\u4E2Akey\u901A\u8FC7\u6B64\u6CD5\u603B\u7531\u4E8E\u548C\u95ED\u5305\u8FDB\u884C\u5F15\u7528 \u7684\u6807\u8BC6\u7B26\uFF0C\u4E0D\u5173\u5FC3this\u7ED1\u5B9A\u8FC7\u7A0B\u4E2D\u53D1\u751F\u4E86\u4EC0\u4E48\u3002 \u4EBA\u4EEC\u4E0D\u559C\u6B22\u5199\u5197\u957F\u7684\u4E1C\u897F\uFF0C\u5C24\u5176\u662F\u4E00\u904D\u53C8\u4E00\u904D\u5730\u5199\u3002\u56E0\u6B64 ES6 \u7684\u4E00\u4E2A\u521D\u8877\u5C31\u662F\u5E2E\u52A9\u4EBA\u4EEC\u51CF \u5C11\u91CD\u590D\u7684\u573A\u666F\uFF0C\u4E8B\u5B9E\u4E0A\u5305\u62EC\u4FEE\u590D\u67D0\u4E9B\u4E60\u60EF\u7528\u6CD5\u7684\u95EE\u9898\uFF0Cthis \u5C31\u662F\u5176\u4E2D\u4E00\u4E2A\u3002</p><h2 id="\u7BAD\u5934\u51FD\u6570\u548C\u666E\u901A\u51FD\u6570\u6709\u4EC0\u4E48\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u7BAD\u5934\u51FD\u6570\u548C\u666E\u901A\u51FD\u6570\u6709\u4EC0\u4E48\u533A\u522B" aria-hidden="true">#</a> \u7BAD\u5934\u51FD\u6570\u548C\u666E\u901A\u51FD\u6570\u6709\u4EC0\u4E48\u533A\u522B</h2><p>\u7BAD\u5934\u51FD\u6570\u4E0D\u80FD\u7528\u6765\u5B9A\u4E49\u751F\u6210\u5668\u51FD\u6570\u3002</p><p>\u7BAD\u5934\u51FD\u6570\u6CA1\u6709arguments</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span> <span class="token comment">// Arguments(3) [1, 2, 3, callee: \u0192, Symbol(Symbol.iterator): \u0192]</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F46\u662F\u7BAD\u5934\u51FD\u6570\u6709es6\u7684\u8BED\u6CD5\u53EF\u4EE5\u66FF\u4EE3</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span> <span class="token comment">// [1, 2, 3]</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u867D\u7136\u53EF\u4EE5\u5728\u7BAD\u5934\u51FD\u6570\u4E0A\u8C03\u7528call(), apply(), bind()\u7684\u65B9\u6CD5\uFF0C\u4F46\u662F\u7BAD\u5934\u51FD\u6570\u4E2D\u7684this\u5374\u4E0D\u4F1A\u53D7\u5230\u5F71\u54CD\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> window<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">&#39;obj&#39;</span> <span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token keyword">let</span> fn <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> window<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">&#39;obj&#39;</span> <span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// false</span>

<span class="token keyword">let</span> fn <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ECMAScript \u4E2D\u7684\u51FD\u6570\u59CB\u7EC8\u53EF\u4EE5\u4F5C\u4E3A\u6784\u9020\u51FD\u6570\u5B9E\u4F8B\u5316\u4E00\u4E2A\u65B0\u5BF9\u8C61\uFF0C\u4E5F\u53EF\u4EE5\u4F5C\u4E3A\u666E\u901A\u51FD\u6570\u88AB\u8C03\u7528\u3002 ECMAScript 6 \u65B0\u589E\u4E86\u68C0\u6D4B\u51FD\u6570\u662F\u5426\u4F7F\u7528 new \u5173\u952E\u5B57\u8C03\u7528\u7684 new.target \u5C5E\u6027\u3002\u5982\u679C\u51FD\u6570\u662F\u6B63\u5E38\u8C03\u7528\u7684\uFF0C\u5219 new.target \u7684\u503C\u662F undefined\uFF1B\u5982\u679C\u662F\u4F7F\u7528 new \u5173\u952E\u5B57\u8C03\u7528\u7684\uFF0C\u5219 new.target \u5C06\u5F15\u7528\u88AB\u8C03\u7528\u7684\u6784\u9020\u51FD\u6570\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">new</span><span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token string">&#39;\u6CA1\u6709\u7528new\u8C03\u7528&#39;</span>
 <span class="token punctuation">}</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B63\u5E38\u7684\u4F7F\u7528\u4E86new\u8C03\u7528&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u6B63\u5E38\u7684\u4F7F\u7528\u4E86new\u8C03\u7528</span>
<span class="token function">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// Uncaught \u6CA1\u6709\u7528new\u8C03\u7528</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7BAD\u5934\u51FD\u6570\u867D\u7136\u8BED\u6CD5\u7B80\u6D01\uFF0C\u4F46\u4E5F\u6709\u5F88\u591A\u573A\u5408\u4E0D\u9002\u7528\u3002\u7BAD\u5934\u51FD\u6570\u4E0D\u80FD\u4F7F\u7528 arguments\u3001super \u548C new.target\uFF0C\u4E5F\u4E0D\u80FD\u7528\u4F5C\u6784\u9020\u51FD\u6570\u3002\u6B64\u5916\uFF0C\u7BAD\u5934\u51FD\u6570\u4E5F\u6CA1\u6709 prototype \u5C5E\u6027\u3002</p><h2 id="\u5C3E\u9012\u5F52\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#\u5C3E\u9012\u5F52\u8C03\u7528" aria-hidden="true">#</a> \u5C3E\u9012\u5F52\u8C03\u7528</h2><p>\u5728ECMAScript5\u7684\u5F15\u64CE\u4E2D\uFF0C\u5C3E\u8C03\u7528\u7684\u5B9E\u73B0\u4E0E\u5176\u4ED6\u51FD\u6570\u8C03\u7528\u7684\u5B9E\u73B0\u7C7B\u4F3C\uFF0C\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u6808\u5E27\uFF08stack frame\uFF09\uFF0C\u5C06\u5176\u63A8\u5165\u8C03\u7528\u6808\u6765\u8868\u793A\u51FD\u6570\u8C03\u7528\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u518D\u5FAA\u73AF\u8C03\u7528\u4E2D\uFF0C\u6BCF\u4E00\u4E2A\u672A\u5B8C\u6210\u7684\u6808\u5E27\u90FD\u4F1A\u88AB\u4FDD\u5B58\u5728\u5185\u5B58\u4E2D\uFF0C\u5F53\u8C03\u7528\u6808\u53D8\u5F97\u8FC7\u5927\u65F6\uFF0C\u4F1A\u9020\u6210\u7A0B\u5E8F\u95EE\u9898\u3002</p><p>ECMAScript 6\u7F29\u51CF\u4E86\u4E25\u683C\u6A21\u5F0F\u4E0B\u5C3E\u8C03\u7528\u6808\u7684\u5927\u5C0F\uFF08\u975E\u4E25\u683C\u6A21\u5F0F\u4E0B\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u5982\u679C\u6EE1\u8DB3\u4EE5\u4E0B\u6761\u4EF6\uFF0C\u5C3E\u8C03\u7528\u4E0D\u5728\u521B\u5EFA\u65B0\u7684\u6808\u5E27\uFF0C\u800C\u662F\u6E05\u9664\u5E76\u91CD\u7528\u5F53\u524D\u6808\u5E27\uFF1A</p><ol><li>\u4EE3\u7801\u5728\u4E25\u683C\u6A21\u5F0F\u4E0B\u6267\u884C</li><li>\u5C3E\u8C03\u7528\u4E0D\u59A8\u95EE\u5F53\u524D\u6808\u5E27\u7684\u53D8\u91CF\uFF08\u4E5F\u5C31\u662F\u8BF4\u51FD\u6570\u4E0D\u662F\u4E00\u4E2A\u95ED\u5305\uFF09\u3002</li><li>\u5728\u51FD\u6570\u5185\u90E8\uFF0C\u5C3E\u8C03\u7528\u662F\u6700\u540E\u4E00\u6761\u8BED\u53E5\u3002</li><li>\u5C3E\u8C03\u7528\u7684\u7ED3\u679C\u4F5C\u4E3A\u51FD\u6570\u503C\u8FD4\u56DE\uFF0C\u5E76\u4E14\u4E0D\u9700\u8981\u6267\u884C\u989D\u5916\u7684\u903B\u8F91\u3002</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u65E0\u4F18\u5316\uFF1A\u5C3E\u8C03\u7528\u6CA1\u6709\u8FD4\u56DE</span>
<span class="token keyword">function</span> <span class="token function">outerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token function">innerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u65E0\u4F18\u5316\uFF1A\u5C3E\u8C03\u7528\u6CA1\u6709\u76F4\u63A5\u8FD4\u56DE</span>
<span class="token keyword">function</span> <span class="token function">outerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">let</span> innerFunctionResult <span class="token operator">=</span> <span class="token function">innerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">return</span> innerFunctionResult<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u65E0\u4F18\u5316\uFF1A\u5C3E\u8C03\u7528\u8FD4\u56DE\u540E\u5FC5\u987B\u8F6C\u578B\u4E3A\u5B57\u7B26\u4E32</span>
<span class="token keyword">function</span> <span class="token function">outerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token function">innerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u65E0\u4F18\u5316\uFF1A\u5C3E\u8C03\u7528\u662F\u4E00\u4E2A\u95ED\u5305</span>
<span class="token keyword">function</span> <span class="token function">outerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">;</span>
 <span class="token keyword">function</span> <span class="token function">innerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> foo<span class="token punctuation">;</span> <span class="token punctuation">}</span>
 <span class="token keyword">return</span> <span class="token function">innerFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// \u6709\u4F18\u5316\uFF1A\u6808\u5E27\u9500\u6BC1\u524D\u6267\u884C\u53C2\u6570\u8BA1\u7B97</span>
<span class="token keyword">function</span> <span class="token function">outerFunction</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token function">innerFunction</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u6709\u4F18\u5316\uFF1A\u521D\u59CB\u8FD4\u56DE\u503C\u4E0D\u6D89\u53CA\u6808\u5E27</span>
<span class="token keyword">function</span> <span class="token function">outerFunction</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">&lt;</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">return</span> <span class="token function">innerFunction</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u6709\u4F18\u5316\uFF1A\u4E24\u4E2A\u5185\u90E8\u51FD\u6570\u90FD\u5728\u5C3E\u90E8</span>
<span class="token keyword">function</span> <span class="token function">outerFunction</span><span class="token punctuation">(</span><span class="token parameter">condition</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> condition <span class="token operator">?</span> <span class="token function">innerFunctionA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">innerFunctionB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u5229\u7528\u5C3E\u9012\u5F52\u8C03\u7528\u4F18\u5316 \u5B9E\u9645\u4E0A\uFF0C\u5C3E\u8C03\u7528\u7684\u4F18\u5316\u53D1\u751F\u5728\u5F15\u64CE\u80CC\u540E\uFF0C\u9664\u975E\u4F60\u5C1D\u8BD5\u4F18\u5316\u4E00\u4E2A\u51FD\u6570\uFF0C\u5426\u5219\u65E0\u9700\u601D\u8003\u6B64\u7C7B\u95EE\u9898\u3002\u9012\u5F52\u51FD\u6570\u662F\u5176\u6700\u4E3B\u8981\u7684\u5E94\u7528\u573A\u666F\uFF0C\u6B64\u65F6\u5C3E\u8C03\u7528\u4F18\u5316\u7684\u6548\u679C\u6700\u663E\u8457\u3002\u8BF7\u770B\u4E0B\u9762\u8FD9\u4E2A\u9636\u4E58\u51FD\u6570\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">factorial</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  	<span class="token comment">// \u65E0\u6CD5\u4F18\u5316\uFF0C\u5FC5\u987B\u5728\u8FD4\u56DE\u540E\u6267\u884C\u4E58\u6CD5\u64CD\u4F5C</span>
    <span class="token keyword">return</span> n <span class="token operator">*</span> <span class="token function">factorial</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7531\u4E8E\u5728\u9012\u5F52\u8C03\u7528\u524D\uFF0C\u6267\u884C\u4E86\u4E58\u6CD5\u64CD\u4F5C\uFF0C\u56E0\u800C\u5F53\u524D\u7248\u672C\u7684\u9636\u4E58\u51FD\u6570\u65E0\u6CD5\u88AB\u5F15\u64CE\u4F18\u5316\u3002\u5982\u679Cn\u662F\u4E00\u4E2A\u975E\u5E38\u5927\u7684\u6570\uFF0C\u5219\u8C03\u7528\u6808\u7684\u5C3A\u5BF8\u5C31\u4F1A\u4E0D\u65AD\u589E\u957F\u5E76\u5B58\u5728\uFF0C\u6700\u7EC8\u5BFC\u81F4\u6808\u6EA2\u51FA\u7684\u6F5C\u5728\u98CE\u9669\u3002 \u4F18\u5316\u8FD9\u4E2A\u51FD\u6570\uFF0C\u9996\u5148\u8981\u786E\u4FDD\u4E58\u6CD5\u4E0D\u4F1A\u518D\u51FD\u6570\u8C03\u7528\u540E\u6267\u884C\uFF0C\u4F60\u53EF\u4EE5\u901A\u8FC7\u9ED8\u8BA4\u53C2\u6570\u6765\u5C06\u4E58\u6CD5\u64CD\u4F5C\u79FB\u51FAreturn\u8BED\u53E5\uFF0C\u7ED3\u679C\u51FD\u6570\u53EF\u4EE5\u643A\u5E26\u4E34\u65F6\u7ED3\u679C\u8FDB\u5165\u5230\u4E0B\u4E00\u4E2A\u8FED\u4EE3\u4E2D\u3002\u4EE5\u4E0B\u8FD9\u6BB5\u65B0\u4EE3\u7801\u5177\u6709\u76F8\u540C\u7684\u884C\u4E3A\uFF0C\u4F46\u53EF\u4EE5\u88ABECMAScript 6\u5F15\u64CE\u4F18\u5316:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">factorial</span><span class="token punctuation">(</span><span class="token parameter">n<span class="token punctuation">,</span> p <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token keyword">return</span> <span class="token number">1</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  	<span class="token keyword">let</span> result <span class="token operator">=</span> n <span class="token operator">*</span> p<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">factorial</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u8FD9\u4E2A\u91CD\u5199\u540E\u7684factorial()\u51FD\u6570\u4E2D\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570p\u7684\u9ED8\u8BA4\u503C\u4E3A1\uFF0C\u6211\u4EEC\u7528\u5B83\u4FDD\u5B58\u4E58\u6CD5\u7ED3\u679C\uFF0C\u4E0B\u4E00\u6B21\u8FED\u4EE3\u4E2D\u53EF\u4EE5\u53D6\u51FA\u7528\u4E8E\u8BA1\u7B97\uFF0C\u4E0D\u518D\u9700\u8981\u989D\u5916\u7684\u51FD\u6570\u8C03\u7528\u3002\u5F53n\u5927\u4E8E1\u65F6\uFF0C\u5148\u6267\u884C\u4E00\u8F6E\u4E58\u6CD5\u8BA1\u7B97\uFF0C\u7136\u540E\u5C06\u7ED3\u679C\u4F20\u7ED9\u7B2C\u4E8C\u6B21factorial()\u8C03\u7528\u7684\u53C2\u6570\u3002\u73B0\u5728\uFF0CECMAScript 6\u5F15\u64CE\u5C31\u53EF\u4EE5\u4F18\u5316\u9012\u5F52\u8C03\u7528\u4E86\u3002 \u5F53\u4F60\u5199\u9012\u5F52\u51FD\u6570\u7684\u65F6\u5019\uFF0C\u8BB0\u5F97\u4F7F\u7528\u5C3E\u9012\u5F52\u4F18\u5316\u7684\u7279\u6027\uFF0C\u5982\u679C\u9012\u5F52\u51FD\u6570\u7684\u8BA1\u7B97\u91CF\u8DB3\u591F\u5927\uFF0C\u5219\u5C3E\u9012\u5F52\u4F18\u5316\u53EF\u4EE5\u5927\u5E45\u5EA6\u63D0\u5347\u7A0B\u5E8F\u7684\u6027\u80FD\u3002</p><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2><ul><li>\u300A\u4F60\u4E0D\u77E5\u9053\u7684javascript\u4E0A\u5377\u300B</li><li>\u300Ajavascript\u9AD8\u7EA7\u7F16\u7A0B\u7B2C4\u7248\u300B</li><li>\u300A\u6DF1\u5165\u7406\u89E3ES6\u300B</li></ul>`,27);function v(m,b){const t=n("MTA"),p=n("ClientOnly");return o(),c("div",null,[k,s(p,null,{default:i(()=>[s(t)]),_:1}),d])}const w=e(r,[["render",v],["__file","function.html.vue"]]);export{w as default};