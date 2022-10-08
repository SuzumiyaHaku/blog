import{_ as s,o as n,c as a,e}from"./app.eff09732.js";const p={},t=e(`<h1 id="\u5DE5\u5177\u7C7B\u7684\u6A21\u62DF\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u5DE5\u5177\u7C7B\u7684\u6A21\u62DF\u5B9E\u73B0" aria-hidden="true">#</a> \u5DE5\u5177\u7C7B\u7684\u6A21\u62DF\u5B9E\u73B0</h1><h2 id="partial-type" tabindex="-1"><a class="header-anchor" href="#partial-type" aria-hidden="true">#</a> Partial&lt;Type&gt;</h2><p>\u529F\u80FD\uFF1A\u628A\u5C5E\u6027\u7684\u5FC5\u9009\u6539\u4E3A<code>?</code></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyPartial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Test3</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token number">1</span>
  age<span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">NewTest2</span> <span class="token operator">=</span> MyPartial<span class="token operator">&lt;</span>Test3<span class="token operator">&gt;</span> <span class="token comment">// { name?: 1; age?: 2; }</span>
<span class="token keyword">type</span> <span class="token class-name">NewTest3</span> <span class="token operator">=</span> Partial<span class="token operator">&lt;</span>Test3<span class="token operator">&gt;</span> <span class="token comment">// { name?: 1; age?: 2; }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="required-type" tabindex="-1"><a class="header-anchor" href="#required-type" aria-hidden="true">#</a> Required&lt;Type&gt;</h2><p>\u529F\u80FD\uFF1A\u628A\u5C5E\u6027\u4E3A<code>?</code>\u7684\uFF0C\u53BB\u6389\u8FD9\u4E2A<code>?</code></p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyRequired<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">-</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Test3</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">?</span><span class="token operator">:</span> <span class="token number">1</span>
  age<span class="token operator">?</span><span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">NewTest2</span> <span class="token operator">=</span> MyRequired<span class="token operator">&lt;</span>Test3<span class="token operator">&gt;</span> <span class="token comment">// { name: 1; age: 2; }</span>
<span class="token keyword">type</span> <span class="token class-name">NewTest3</span> <span class="token operator">=</span> Required<span class="token operator">&lt;</span>Test3<span class="token operator">&gt;</span> <span class="token comment">// { name: 1; age: 2; }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="readonly-type" tabindex="-1"><a class="header-anchor" href="#readonly-type" aria-hidden="true">#</a> Readonly&lt;Type&gt;</h2><p>\u628A\u5C5E\u6027\u53D8\u4E3A\u53EA\u8BFBreadonly</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">readonly</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> obj1<span class="token operator">:</span> MyReadonly<span class="token operator">&lt;</span><span class="token keyword">typeof</span> o1<span class="token operator">&gt;</span> <span class="token operator">=</span> o1

obj1<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">233</span> <span class="token comment">//\u9519\u8BEF \uFF1A Cannot assign to &#39;a&#39; because it is a read-only property.</span>

<span class="token keyword">let</span> o2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> obj2<span class="token operator">:</span> MyReadonly<span class="token operator">&lt;</span><span class="token keyword">typeof</span> o2<span class="token operator">&gt;</span> <span class="token operator">=</span> o2
obj2<span class="token punctuation">.</span>push <span class="token comment">// \u9519\u8BEF \uFF1AProperty &#39;push&#39; does not exist on type &#39;readonly number[]&#39;.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="record-keys-type" tabindex="-1"><a class="header-anchor" href="#record-keys-type" aria-hidden="true">#</a> Record&lt;Keys, Type&gt;</h2><p>\u529F\u80FD\uFF1A\u8BA9\u4E00\u4E2A\u5BF9\u8C61\u7684key\u6307\u5B9A\u4E3ARecord\u4F20\u8FDB\u6765\u7684Keys\u7684\u96C6\u5408\u4E4B\u4E00\uFF0C\u503C\u4E3AType\u7C7B\u578B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">CatInfo</span> <span class="token punctuation">{</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  breed<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token keyword">type</span> <span class="token class-name">CatName</span> <span class="token operator">=</span> <span class="token string">&quot;miffy&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;boris&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;mordred&quot;</span><span class="token punctuation">;</span>
 
<span class="token keyword">const</span> cats<span class="token operator">:</span> Record<span class="token operator">&lt;</span>CatName<span class="token punctuation">,</span> CatInfo<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  miffy<span class="token operator">:</span> <span class="token punctuation">{</span> age<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> breed<span class="token operator">:</span> <span class="token string">&quot;Persian&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  boris<span class="token operator">:</span> <span class="token punctuation">{</span> age<span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> breed<span class="token operator">:</span> <span class="token string">&quot;Maine Coon&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  mordred<span class="token operator">:</span> <span class="token punctuation">{</span> age<span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span> breed<span class="token operator">:</span> <span class="token string">&quot;British Shorthair&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>type MyRecord<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name">string</span> <span class="token operator">|</span> number <span class="token operator">|</span> symbol<span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">U</span> <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pick-type-keys" tabindex="-1"><a class="header-anchor" href="#pick-type-keys" aria-hidden="true">#</a> Pick&lt;Type, Keys&gt;</h2><p>\u91C7\u53D6\u5BF9\u8C61\u4E0Akey\u5C5E\u4E8EKeys\u7684\u5C5E\u6027\uFF0C\u8FD4\u56DE\u5BF9\u8C61\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyPick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token constant">U</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">User4</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;1&#39;</span>
  age<span class="token operator">:</span> <span class="token number">233</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">B5</span></span> <span class="token operator">=</span> MyPick<span class="token operator">&lt;</span>User4<span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token operator">&gt;</span> <span class="token comment">// { name: &#39;1&#39; }</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">B6</span></span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>User4<span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token operator">&gt;</span> <span class="token comment">// { name: &#39;1&#39; }</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="omit-type-keys" tabindex="-1"><a class="header-anchor" href="#omit-type-keys" aria-hidden="true">#</a> Omit&lt;Type, Keys&gt;</h2><p>\u6392\u9664\uFF0C\u5BF9\u8C61\u7684Keys\u5C5E\u6027</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// type MyOmit&lt;T, K extends keyof T&gt; = { [U in Exclude&lt;keyof T, K&gt;]:T[U] }</span>
<span class="token keyword">type</span> <span class="token class-name">MyOmit<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> Exclude<span class="token operator">&lt;</span><span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span><span class="token operator">&gt;&gt;</span> <span class="token comment">// \u6392\u9664K\u9700\u8981\u5206\u914D\u5F8B\uFF0C\u6240\u4EE5\u9700\u8981\u5199Exclude\u5355\u72EC\u7684\u51FD\u6570</span>

<span class="token keyword">interface</span> <span class="token class-name">User5</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;sdsd&#39;</span>
  age<span class="token operator">:</span> <span class="token number">233</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R11</span></span> <span class="token operator">=</span> MyOmit<span class="token operator">&lt;</span>User5<span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token operator">&gt;</span> <span class="token comment">// { age: 233 }</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R12</span></span> <span class="token operator">=</span> Omit<span class="token operator">&lt;</span>User5<span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token operator">&gt;</span> <span class="token comment">// { age: 233 }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="exclude-uniontype-excludedmembers" tabindex="-1"><a class="header-anchor" href="#exclude-uniontype-excludedmembers" aria-hidden="true">#</a> Exclude&lt;UnionType, ExcludedMembers&gt;</h2><p>\u8E22\u9664\u6389UnionType\u91CC\u7684\uFF0C\u67D0\u4E2A\u7C7B\u578B\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyExclude<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">boolean</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R9</span></span> <span class="token operator">=</span> MyExclude<span class="token operator">&lt;</span><span class="token constant">A</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token comment">// number | boolean</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R10</span></span> <span class="token operator">=</span> Exclude<span class="token operator">&lt;</span><span class="token constant">A</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token comment">// number | boolean</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extract-type-union" tabindex="-1"><a class="header-anchor" href="#extract-type-union" aria-hidden="true">#</a> Extract&lt;Type, Union&gt;</h2><p>\u53EA\u63D0\u53D6\u67D0\u4E9B\u7C7B\u578B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyExtract<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token constant">T</span> <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R13</span></span> <span class="token operator">=</span> MyExtract<span class="token operator">&lt;</span><span class="token number">1</span> <span class="token operator">|</span> <span class="token number">2</span> <span class="token operator">|</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token operator">&gt;</span> <span class="token comment">// 3</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R14</span></span> <span class="token operator">=</span> Extract<span class="token operator">&lt;</span><span class="token number">1</span> <span class="token operator">|</span> <span class="token number">2</span> <span class="token operator">|</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token operator">&gt;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nonnullable-type" tabindex="-1"><a class="header-anchor" href="#nonnullable-type" aria-hidden="true">#</a> NonNullable&lt;Type&gt;</h2><p>\u8E22\u9664 null undefined\u7C7B\u578B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyNonNullable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token keyword">null</span></span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R15</span></span> <span class="token operator">=</span> MyNonNullable<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span> <span class="token comment">// string</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R16</span></span> <span class="token operator">=</span> NonNullable<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span> <span class="token comment">// string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="parameters-type" tabindex="-1"><a class="header-anchor" href="#parameters-type" aria-hidden="true">#</a> Parameters&lt;Type&gt;</h2><p>\u83B7\u53D6\u51FD\u6570\u58F0\u660E\u91CC\u7684\u53C2\u6570\u7C7B\u578B\uFF0C\u8FD4\u56DE\u7684\u662F\u53C2\u6570\u6784\u6210\u7684\u5143\u7EC4</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyParameters<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token keyword">infer</span> <span class="token constant">R</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token builtin">never</span>

<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R17</span></span> <span class="token operator">=</span> MyParameters<span class="token operator">&lt;</span><span class="token keyword">typeof</span> foo<span class="token operator">&gt;</span> <span class="token comment">// [a: string, b: number]</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R18</span></span> <span class="token operator">=</span> Parameters<span class="token operator">&lt;</span><span class="token keyword">typeof</span> foo<span class="token operator">&gt;</span> <span class="token comment">// [a: string, b: number]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="constructorparameters-type" tabindex="-1"><a class="header-anchor" href="#constructorparameters-type" aria-hidden="true">#</a> ConstructorParameters&lt;Type&gt;</h2><p>\u63D0\u53D6\u6784\u9020\u51FD\u6570\u7684\u53C2\u6570\u7C7B\u578B\uFF0C\u8FD4\u56DE\u7684\u662F\u53C2\u6570\u6784\u6210\u7684\u5143\u7EC4</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T0</span></span> <span class="token operator">=</span> ConstructorParameters<span class="token operator">&lt;</span>ErrorConstructor<span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">MyConstructorParameters<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token keyword">abstract</span> <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token keyword">abstract</span></span> <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token keyword">infer</span> <span class="token constant">R</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token builtin">never</span>

<span class="token keyword">let</span> a<span class="token operator">:</span> ErrorConstructor <span class="token operator">=</span> Error

<span class="token keyword">let</span> b<span class="token operator">:</span> ArrayConstructor <span class="token operator">=</span> <span class="token builtin">Array</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">R21</span></span> <span class="token operator">=</span> MyConstructorParameters<span class="token operator">&lt;</span>ErrorConstructor<span class="token operator">&gt;</span> <span class="token comment">// [message?: string]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="returntype-type" tabindex="-1"><a class="header-anchor" href="#returntype-type" aria-hidden="true">#</a> ReturnType&lt;Type&gt;</h2><p>\u83B7\u53D6\u51FD\u6570\u7684\u8FD4\u56DE\u7C7B\u578B</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReturnType<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span></span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">infer</span> <span class="token constant">R</span> <span class="token operator">?</span> <span class="token constant">R</span> <span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token keyword">type</span> <span class="token class-name">Test1</span> <span class="token operator">=</span> MyReturnType<span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">boolean</span><span class="token operator">&gt;</span> <span class="token comment">// true</span>
<span class="token keyword">type</span> <span class="token class-name">Test2</span> <span class="token operator">=</span> ReturnType<span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">boolean</span><span class="token operator">&gt;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="readonly-type-1" tabindex="-1"><a class="header-anchor" href="#readonly-type-1" aria-hidden="true">#</a> Readonly&lt;Type&gt;</h2><p>\u5C5E\u6027\u90FD\u6539\u4E3A\u53EA\u8BFB</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">MyReadonly<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">readonly</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> obj1<span class="token operator">:</span> MyReadonly<span class="token operator">&lt;</span><span class="token keyword">typeof</span> o1<span class="token operator">&gt;</span> <span class="token operator">=</span> o1

obj1<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">233</span> <span class="token comment">//\u9519\u8BEF \uFF1A Cannot assign to &#39;a&#39; because it is a read-only property.</span>

<span class="token keyword">let</span> o2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
<span class="token keyword">let</span> obj2<span class="token operator">:</span> MyReadonly<span class="token operator">&lt;</span><span class="token keyword">typeof</span> o2<span class="token operator">&gt;</span> <span class="token operator">=</span> o2
obj2<span class="token punctuation">.</span>push <span class="token comment">// \u9519\u8BEF \uFF1AProperty &#39;push&#39; does not exist on type &#39;readonly number[]&#39;.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,41),o=[t];function c(l,r){return n(),a("div",null,o)}const k=s(p,[["render",c],["__file","polyfill.html.vue"]]);export{k as default};
