import{_ as r,r as t,o as c,c as p,a as n,w as d,b as e,d as a,e as l}from"./app.f0c61981.js";const h={},u=e("h1",{id:"webpack-\u548C-vite",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#webpack-\u548C-vite","aria-hidden":"true"},"#"),a(" webpack \u548C vite")],-1),k=l(`<h2 id="webpack\u548Cvite\u4E24\u8005\u6709\u4EC0\u4E48\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#webpack\u548Cvite\u4E24\u8005\u6709\u4EC0\u4E48\u533A\u522B" aria-hidden="true">#</a> webpack\u548Cvite\u4E24\u8005\u6709\u4EC0\u4E48\u533A\u522B</h2><p>webpack core \u662F\u4E00\u4E2A\u7EAF\u6253\u5305\u5DE5\u5177\uFF08\u5BF9\u6807 Rollup\uFF09\uFF0C\u800C Vite \u5176\u5B9E\u662F\u4E00\u4E2A\u66F4\u4E0A\u5C42\u7684\u5DE5\u5177\u94FE\u65B9\u6848\uFF0C\u5BF9\u6807\u7684\u662F \uFF08webpack + \u9488\u5BF9 web \u7684\u5E38\u7528\u914D\u7F6E + webpack-dev-server\uFF09\u3002</p><p>\u610F\u601D\u4E24\u8005\u4E0D\u662F\u540C\u6837\u7684\u4E1C\u897F\u3002vite\u88AB\u5206\u4E3Acli\u90E8\u5206\u548Capi\u7684\u90E8\u5206\uFF0Capi\u7684\u90E8\u5206\u624D\u548Cwebpack\u76F8\u4F3C\u3002</p><h2 id="vite\u548Cwebpack5\u7684\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#vite\u548Cwebpack5\u7684\u7F13\u5B58" aria-hidden="true">#</a> vite\u548Cwebpack5\u7684\u7F13\u5B58</h2><h3 id="vite\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#vite\u7F13\u5B58" aria-hidden="true">#</a> vite\u7F13\u5B58</h3><ol><li>\u6D4F\u89C8\u5668\u7F13\u5B58 \u89E3\u6790\u540E\u7684\u4F9D\u8D56\u8BF7\u6C42\u4F1A\u4EE5 HTTP \u5934 max-age=31536000,immutable \u5F3A\u7F13\u5B58\uFF0C\u4EE5\u63D0\u9AD8\u5728\u5F00\u53D1\u65F6\u7684\u9875\u9762\u91CD\u8F7D\u6027\u80FD\u3002\u4E00\u65E6\u88AB\u7F13\u5B58\uFF0C\u8FD9\u4E9B\u8BF7\u6C42\u5C06\u6C38\u8FDC\u4E0D\u4F1A\u518D\u5230\u8FBE\u5F00\u53D1\u670D\u52A1\u5668\u3002</li><li>\u6587\u4EF6\u7CFB\u7EDF\u7F13\u5B58 Vite\u4F1A\u5C06\u9884\u6784\u5EFA\u7684\u4F9D\u8D56\u7F13\u5B58\u5230node_modules/.vite\u3002\u5B83\u6839\u636E\u51E0\u4E2A\u6E90\u6765\u51B3\u5B9A\u662F\u5426\u9700\u8981\u91CD\u65B0\u8FD0\u884C\u9884\u6784\u5EFA\u6B65\u9AA4\uFF1A</li></ol><ul><li>package.json\u4E2D\u7684dependencies\u5217\u8868\u3002</li><li>\u5305\u7BA1\u7406\u5668\u7684 lockfile\uFF0C\u4F8B\u5982 package-lock.json, yarn.lock\uFF0C\u6216\u8005 pnpm-lock.yaml\u3002</li><li>\u53EF\u80FD\u5728 vite.config.js \u76F8\u5173\u5B57\u6BB5\u4E2D\u914D\u7F6E\u8FC7\u7684\u3002</li></ul><p>\u53EA\u6709\u5728\u4E0A\u8FF0\u5176\u4E2D\u4E00\u9879\u53D1\u751F\u66F4\u6539\u65F6\uFF0C\u624D\u9700\u8981\u91CD\u65B0\u8FD0\u884C\u9884\u6784\u5EFA\u3002</p><p>\u5982\u679C\u51FA\u4E8E\u67D0\u4E9B\u539F\u56E0\uFF0C\u4F60\u60F3\u8981\u5F3A\u5236 Vite \u91CD\u65B0\u6784\u5EFA\u4F9D\u8D56\uFF0C\u4F60\u53EF\u4EE5\u7528 --force \u547D\u4EE4\u884C\u9009\u9879\u542F\u52A8\u5F00\u53D1\u670D\u52A1\u5668\uFF0C\u6216\u8005\u624B\u52A8\u5220\u9664 node_modules/.vite \u76EE\u5F55\u3002</p><h3 id="webpack\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#webpack\u7F13\u5B58" aria-hidden="true">#</a> webpack\u7F13\u5B58</h3><p>\u57284.x\u7248\u672C\u4E2D\u9700\u8981\u4F7F\u7528cache-loader\u6765\u5BF9\u6253\u5305\u7ED3\u679C\u8FDB\u884C\u7F13\u5B58\u3002\u57285.x\u7248\u672C\u4E2D\uFF0C\u65E0\u9700\u518D\u6B21\u5B89\u88C5cache-loader\uFF0C\u5982\u679C\u6CA1\u6709\u505A\u4EFB\u4F55\u914D\u7F6E\uFF0C\u9ED8\u8BA4\u5C31\u5F00\u542F\u4E86\u6253\u5305\u7F13\u5B58\uFF0C\u4E0D\u8FC7\u662F\u7F13\u5B58\u5230\u5185\u5B58(memory)\u4E2D\uFF0C\u5185\u5B58\u7684\u7A7A\u95F4\u591A\u4E48\u5B9D\u8D35\u554A\uFF0C\u6709\u4E9B\u65F6\u5019\u5185\u5B58\u53EF\u80FD\u8FD8\u4E0D\u591F\u7528\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5BF9cache\u914D\u7F6E\uFF0C\u5C06\u7F13\u5B58\u7ED3\u679C\u7F13\u5B58\u5230\u786C\u76D8(filesystem)\u4E2D\u3002\u540C\u65F6\u4E5F\u53EF\u4EE5\u6307\u5B9A\u7F13\u5B58\u6587\u4EF6\u88AB\u4FDD\u5B58\u7684\u4F4D\u7F6E\u3002 \u914D\u7F6Ewebpack.config.js\u7684cache.type \u8BBE\u7F6E\u4E3A &#39;filesystem&#39;\u65F6\uFF0C\u7F16\u8BD1\u7684\u7F13\u5B58\u9ED8\u8BA4\u5728 node_modules/.cache/webpack\u91CC</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">cache</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;filesystem&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">allowCollectingMemory</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">buildDependencies</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token punctuation">[</span>__filename<span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// \u5F53\u6784\u5EFA\u4F9D\u8D56\u7684config\u6587\u4EF6\uFF08\u901A\u8FC7 require \u4F9D\u8D56\uFF09\u5185\u5BB9\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u7F13\u5B58\u5931\u6548</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">compression</span><span class="token operator">:</span> <span class="token string">&#39;gzip&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u914D\u7F6E\u9879\u4EC5\u5728 cache.type \u8BBE\u4E3A &#39;filesystem&#39; \u65F6\u53EF\u7528\u3002\u7528\u4E8E\u7F13\u5B58\u6587\u4EF6\u7684\u538B\u7F29\u7C7B\u578B\u3002development \u6A21\u5F0F\u4E0B\u9ED8\u8BA4\u4E3A false\uFF0Cproduction \u6A21\u5F0F\u4E0B\u9ED8\u8BA4\u4E3A &#39;gzip&#39;\u3002</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vite\u4E3A\u5565\u6BD4webpack\u5FEB" tabindex="-1"><a class="header-anchor" href="#vite\u4E3A\u5565\u6BD4webpack\u5FEB" aria-hidden="true">#</a> vite\u4E3A\u5565\u6BD4webpack\u5FEB\uFF1F</h2><p>vite\u7684\u6253\u5305\u7528\u7684\u662F<code>rollup</code>\uFF0C\u5F00\u53D1\u7684\u65F6\u5019\u7528\u7684<code>esbuild</code>\u3002\u6240\u4EE5\u6211\u4EEC\u8BF4\u5FEB\uFF0C\u6307\u7684\u4E00\u822C\u662F\u5F00\u53D1\u7684\u4F53\u9A8C\u3002</p><h3 id="vite\u5F00\u53D1\u65F6\u5FEB\u5728\u54EA" tabindex="-1"><a class="header-anchor" href="#vite\u5F00\u53D1\u65F6\u5FEB\u5728\u54EA" aria-hidden="true">#</a> vite\u5F00\u53D1\u65F6\u5FEB\u5728\u54EA\uFF1F</h3><p>Vite \u901A\u8FC7\u5728\u4E00\u5F00\u59CB\u5C06\u5E94\u7528\u4E2D\u7684\u6A21\u5757\u533A\u5206\u4E3A <code>\u4F9D\u8D56</code> \u548C <code>\u6E90\u7801</code> \u4E24\u7C7B\uFF0C\u6539\u8FDB\u4E86\u5F00\u53D1\u670D\u52A1\u5668\u542F\u52A8\u65F6\u95F4</p><ol><li><code>\u4F9D\u8D56</code></li></ol><ul><li>\u5927\u591A\u4E3A\u5728\u5F00\u53D1\u65F6\u4E0D\u4F1A\u53D8\u52A8\u7684\u7EAF JavaScript\u3002\u4E00\u4E9B\u8F83\u5927\u7684\u4F9D\u8D56\uFF08\u4F8B\u5982\u6709\u4E0A\u767E\u4E2A\u6A21\u5757\u7684\u7EC4\u4EF6\u5E93\uFF09\u5904\u7406\u7684\u4EE3\u4EF7\u4E5F\u5F88\u9AD8\u3002\u4F9D\u8D56\u4E5F\u901A\u5E38\u4F1A\u5B58\u5728\u591A\u79CD\u6A21\u5757\u5316\u683C\u5F0F\uFF08\u4F8B\u5982 ESM \u6216\u8005 CommonJS\uFF09\u3002</li><li>Vite \u5C06\u4F1A\u4F7F\u7528 <code>esbuild</code> \u9884\u6784\u5EFA\u4F9D\u8D56\u3002esbuild \u4F7F\u7528 Go \u7F16\u5199\uFF0C\u5E76\u4E14\u6BD4\u4EE5 JavaScript \u7F16\u5199\u7684\u6253\u5305\u5668\u9884\u6784\u5EFA\u4F9D\u8D56\u5FEB 10-100 \u500D\u3002</li></ul><ol start="2"><li><code>\u6E90\u7801</code></li></ol><ul><li>\u901A\u5E38\u5305\u542B\u4E00\u4E9B\u5E76\u975E\u76F4\u63A5\u662F JavaScript \u7684\u6587\u4EF6\uFF0C\u9700\u8981\u8F6C\u6362\uFF08\u4F8B\u5982 JSX\uFF0CCSS \u6216\u8005 Vue/Svelte \u7EC4\u4EF6\uFF09\uFF0C\u65F6\u5E38\u4F1A\u88AB\u7F16\u8F91\u3002\u540C\u65F6\uFF0C\u5E76\u4E0D\u662F\u6240\u6709\u7684\u6E90\u7801\u90FD\u9700\u8981\u540C\u65F6\u88AB\u52A0\u8F7D\uFF08\u4F8B\u5982\u57FA\u4E8E\u8DEF\u7531\u62C6\u5206\u7684\u4EE3\u7801\u6A21\u5757\uFF09\u3002</li><li>Vite \u4EE5 \u539F\u751F ESM \u65B9\u5F0F\u63D0\u4F9B\u6E90\u7801\u3002\u8FD9\u5B9E\u9645\u4E0A\u662F\u8BA9\u6D4F\u89C8\u5668\u63A5\u7BA1\u4E86\u6253\u5305\u7A0B\u5E8F\u7684\u90E8\u5206\u5DE5\u4F5C\uFF1AVite \u53EA\u9700\u8981\u5728\u6D4F\u89C8\u5668\u8BF7\u6C42\u6E90\u7801\u65F6\u8FDB\u884C\u8F6C\u6362\u5E76\u6309\u9700\u63D0\u4F9B\u6E90\u7801\u3002\u6839\u636E\u60C5\u666F\u52A8\u6001\u5BFC\u5165\u4EE3\u7801\uFF0C\u5373\u53EA\u5728\u5F53\u524D\u5C4F\u5E55\u4E0A\u5B9E\u9645\u4F7F\u7528\u65F6\u624D\u4F1A\u88AB\u5904\u7406\u3002</li></ul><p>\u5728 Vite \u4E2D\uFF0CHMR \u662F\u5728\u539F\u751F ESM \u4E0A\u6267\u884C\u7684\u3002\u5F53\u7F16\u8F91\u4E00\u4E2A\u6587\u4EF6\u65F6\uFF0CVite \u53EA\u9700\u8981\u7CBE\u786E\u5730\u4F7F\u5DF2\u7F16\u8F91\u7684\u6A21\u5757\u4E0E\u5176\u6700\u8FD1\u7684 HMR \u8FB9\u754C\u4E4B\u95F4\u7684\u94FE\u5931\u6D3B\uFF08\u5927\u591A\u6570\u65F6\u5019\u53EA\u662F\u6A21\u5757\u672C\u8EAB\uFF09\uFF0C\u4F7F\u5F97\u65E0\u8BBA\u5E94\u7528\u5927\u5C0F\u5982\u4F55\uFF0CHMR \u59CB\u7EC8\u80FD\u4FDD\u6301\u5FEB\u901F\u66F4\u65B0\u3002</p><p>vite \u540C\u65F6\u5229\u7528 HTTP \u5934\u6765\u8FDB\u884C\u7F13\u5B58</p><ul><li>\u6E90\u7801\u6A21\u5757\u4F7F\u7528<code>304 Not Modified</code>\u8FDB\u884C\u534F\u5546\u7F13\u5B58</li><li>\u4F9D\u8D56\u6A21\u5757\u8BF7\u6C42\u4F1A\u901A\u8FC7 Cache-Control: max-age=31536000,immutable \u8FDB\u884C\u5F3A\u7F13\u5B58\uFF0C\u56E0\u6B64\u4E00\u65E6\u88AB\u7F13\u5B58\u5B83\u4EEC\u5C06\u4E0D\u9700\u8981\u518D\u6B21\u8BF7\u6C42</li></ul><h3 id="webpack\u5F00\u53D1\u65F6\u6162\u5728\u54EA" tabindex="-1"><a class="header-anchor" href="#webpack\u5F00\u53D1\u65F6\u6162\u5728\u54EA" aria-hidden="true">#</a> webpack\u5F00\u53D1\u65F6\u6162\u5728\u54EA\uFF1F</h3><p>webpack \u7684\u672C\u8D28\u5C31\u662F\u5148\u6253\u5305\uFF0C\u518D\u52A0\u8F7D\u3002webpack-dev-server \u53EA\u662F\u4E00\u4E2A\u5728\u5185\u5B58\u91CC\u7528 webpack \u6253\u5305\u7684\u670D\u52A1\u5668\u800C\u5DF2\u3002webpack \u7684\u4E00\u4E2A\u8F6F\u808B\u662F loader / \u63D2\u4EF6\u673A\u5236\u8DDF\u6253\u5305\u7684\u8FD9\u4E2A\u8BBE\u8BA1\u524D\u63D0\u8026\u5408\u8FC7\u6DF1\u3002\u5982\u679C\u60F3\u8D70no-bundle \u8DEF\u7EBF\u5C31\u4E0D\u518D\u662Fwebpack\u4E86\u3002</p><p>\u6240\u4EE5\u5373\u4F7Fwebpack\u7528esbuild\u4E5F\u4E0D\u80FD\u548Cvite\u4E00\u6837\u5757\u3002\u56E0\u4E3A\u8FD8\u6709loader\u3001plugin\u7B49\u590D\u6742\u7684\u4E1C\u897F\u3002 \u5982\u679C\u662F\u6253\u5305\u901F\u5EA6\u7684\u8BDD\uFF0C\u4E24\u8005\u5C31\u53D8\u6210\u4E86webpack\u548Crollup\u6253\u5305\u8C01\u5FEB\u7684\u95EE\u9898\u4E86\u3002</p><h2 id="hmr-\u70ED\u66F4\u65B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#hmr-\u70ED\u66F4\u65B0\u539F\u7406" aria-hidden="true">#</a> HMR \u70ED\u66F4\u65B0\u539F\u7406</h2><h3 id="webpack\u70ED\u66F4\u65B0" tabindex="-1"><a class="header-anchor" href="#webpack\u70ED\u66F4\u65B0" aria-hidden="true">#</a> webpack\u70ED\u66F4\u65B0</h3><ol><li>webpack-dev-middleware \u662F\u4E00\u4E2A\u5BB9\u5668(wrapper), \u5B83\u53EF\u4EE5\u628A webpack \u5904\u7406\u540E\u7684\u6587\u4EF6\u4F20\u9012\u7ED9\u4E00\u4E2A\u670D\u52A1\u5668(server). webpack-dev-server \u5728\u5185\u90E8\u4F7F\u7528\u4E86\u5B83\u3002</li><li>\u6D4F\u89C8\u5668\u52A0\u8F7D\u9875\u9762\u540E\uFF0C\u4E0E webpack-dev-server \u5EFA\u7ACB WebSocket \u8FDE\u63A5</li><li>Webpack \u76D1\u542C\u5230\u6587\u4EF6\u53D8\u5316\u540E\uFF0C\u589E\u91CF\u6784\u5EFA\u53D1\u751F\u53D8\u66F4\u7684\u6A21\u5757\uFF0C\u5E76\u901A\u8FC7 WebSocket \u53D1\u9001 hash \u4E8B\u4EF6</li><li>\u6D4F\u89C8\u5668\u63A5\u6536\u5230 hash \u4E8B\u4EF6\u540E\uFF0C\u8BF7\u6C42 manifest \u8D44\u6E90\u6587\u4EF6\uFF0C\u786E\u8BA4\u589E\u91CF\u53D8\u66F4\u8303\u56F4</li><li>\u6D4F\u89C8\u5668\u52A0\u8F7D\u53D1\u751F\u53D8\u66F4\u7684\u589E\u91CF\u6A21\u5757</li><li>Webpack \u8FD0\u884C\u65F6\u89E6\u53D1\u53D8\u66F4\u6A21\u5757\u7684 module.hot.accept \u56DE\u8C03\uFF0C\u6267\u884C\u4EE3\u7801\u53D8\u66F4\u903B\u8F91</li></ol><p>webpack\u542F\u7528 Watch \u6A21\u5F0F\u3002\u8FD9\u610F\u5473\u7740\u5728\u521D\u59CB\u6784\u5EFA\u4E4B\u540E\uFF0Cwebpack \u5C06\u7EE7\u7EED\u76D1\u542C\u4EFB\u4F55\u5DF2\u89E3\u6790\u6587\u4EF6\u7684\u66F4\u6539</p><blockquote><p>webpack-dev-server \u548C webpack-dev-middleware \u91CC Watch \u6A21\u5F0F\u9ED8\u8BA4\u5F00\u542F\u3002 webpack.config.js</p></blockquote><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack-dev-middleware\u548Cwebpack-dev-server\u7684\u6587\u4EF6\u76D1\u542C\u529F\u80FD\u5C31\u662F\u7528\u7684chokidar\u5E93\uFF0C\u548Cvite\u7528\u7684\u4E00\u6837\u3002\u5177\u4F53\u53EF\u4EE5\u5728\u5B83\u7684\u4F9D\u8D56\u91CC\u770B\u89C1\u3002</p>`,33),b={href:"https://github.com/webpack/webpack-dev-middleware/blob/master/package.json?#L68",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/webpack/webpack-dev-server/blob/master/package.json?#56",target:"_blank",rel:"noopener noreferrer"},w=e("h3",{id:"vite-\u70ED\u66F4\u65B0",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vite-\u70ED\u66F4\u65B0","aria-hidden":"true"},"#"),a(" vite \u70ED\u66F4\u65B0")],-1),m={href:"https://www.npmjs.com/package/chokidar",target:"_blank",rel:"noopener noreferrer"},_=l("<li>\u5BF9\u8BF7\u6C42\u7684 HTML \u6587\u4EF6\u6CE8\u5165\u5BA2\u6237\u7AEF\u70ED\u66F4\u65B0\u4EE3\u7801</li><li>\u52A0\u8F7D\u5BA2\u6237\u7AEF\u70ED\u66F4\u65B0\u4EE3\u7801\u65F6\uFF0C\u521B\u5EFA WebSocket \u5B9E\u4F8B\uFF0C\u5E76\u6CE8\u518C\u76D1\u542C</li><li>\u5F53\u88AB\u8BF7\u6C42\u6587\u4EF6\u4E2D\u6709i<wbr>mport.meta.hot.accept\u65F6\uFF0C\u5411\u8BE5\u6587\u4EF6\u6CE8\u5165i<wbr>mport.meta.hot.accept\u5B9A\u4E49</li><li>\u5F53\u6587\u4EF6\u66F4\u65B0\u65F6\uFF0C\u89E6\u53D1\u6587\u4EF6\u4FEE\u6539\u7684\u56DE\u8C03\u3002</li><li>\u5982\u679C\u662F\u914D\u7F6E\u6587\u4EF6\u3001\u81EA\u5B9A\u4E49\u63D2\u4EF6\u3001.env\u6587\u4EF6\u4FEE\u6539\u76F4\u63A5\u91CD\u542F\u670D\u52A1\u5668</li><li>\u53CD\u4E4B\uFF0C\u6839\u636E\u6A21\u5757\u8DEF\u5F84\u5411\u4E0A\u67E5\u627E\uFF1B\u6536\u96C6\u63A5\u53D7\u5F53\u524D\u4F9D\u8D56\u9879\u66F4\u65B0\u7684\u6A21\u5757\uFF0C\u5E76\u5224\u65AD\u662F\u5426\u662F\u5237\u65B0\u9875\u9762</li><li>\u5982\u679C\u662F\u5237\u65B0\u9875\u9762\uFF0C\u5411\u5BA2\u6237\u7AEF\u53D1\u9001\u5237\u65B0\u9875\u9762\u7684\u6D88\u606F\uFF0C\u53CD\u4E4B\u53D1\u9001\u66F4\u65B0\u6D88\u606F\uFF0C\u5E76\u5C06\u63A5\u53D7\u5F53\u524D\u4F9D\u8D56\u9879\u66F4\u65B0\u7684\u6A21\u5757\u4E00\u8D77\u53D1\u9001\u7ED9\u5BA2\u6237\u7AEF</li><li>\u5BA2\u6237\u7AEF\u63A5\u6536\u5230\u4E4B\u540E\uFF0C\u83B7\u53D6\u8981\u66F4\u65B0\u7684\u6A21\u5757\u8DEF\u5F84\u548C\u70ED\u66F4\u65B0\u56DE\u8C03\uFF0C\u901A\u8FC7import()\u8BF7\u6C42\u8981\u66F4\u65B0\u6A21\u5757\u7684\u8DEF\u5F84\uFF0C\u5E76\u5728 URL \u6302\u4E0Aimport\u548C\u65F6\u95F4\u6233\uFF1B\u5E76\u5728\u4E0B\u4E00\u4EFB\u52A1\u961F\u5217\u4E2D\u89E6\u53D1\u70ED\u66F4\u65B0\u56DE\u8C03\u3002</li>",8),f=e("h2",{id:"\u53C2\u8003",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u53C2\u8003","aria-hidden":"true"},"#"),a(" \u53C2\u8003")],-1),g={href:"https://webpack.docschina.org/configuration/cache/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://cn.vitejs.dev/guide/dep-pre-bundling.html#caching",target:"_blank",rel:"noopener noreferrer"},x={href:"https://zhuanlan.zhihu.com/p/363928061",target:"_blank",rel:"noopener noreferrer"},j={href:"http://webpack.wuhaolin.cn/",target:"_blank",rel:"noopener noreferrer"},S={href:"https://zhuanlan.zhihu.com/p/30669007",target:"_blank",rel:"noopener noreferrer"},V={href:"https://zhuanlan.zhihu.com/p/410510492",target:"_blank",rel:"noopener noreferrer"},M={href:"http://www.icodebang.com/article/283616",target:"_blank",rel:"noopener noreferrer"},C={href:"https://www.npmjs.com/package/chokidar",target:"_blank",rel:"noopener noreferrer"},W={href:"https://www.zhihu.com/question/477139054/answer/2156019180",target:"_blank",rel:"noopener noreferrer"},z={href:"https://www.bilibili.com/video/BV1Rr4y1L7r3?share_source=copy_web&vd_source=9283e7aefc23b98d417bbc93b42bcf05&t=1412",target:"_blank",rel:"noopener noreferrer"};function H(R,T){const i=t("MTA"),o=t("ClientOnly"),s=t("ExternalLinkIcon");return c(),p("div",null,[u,n(o,null,{default:d(()=>[n(i)]),_:1}),k,e("ul",null,[e("li",null,[e("a",b,[a("webpack-dev-middleware package.json"),n(s)])]),e("li",null,[e("a",v,[a("webpack-dev-server package.json"),n(s)])])]),w,e("ol",null,[e("li",null,[a("\u670D\u52A1\u5668\u542F\u52A8\u65F6\u521B\u5EFA WebSocket \u5B9E\u4F8B\u3001\u901A\u8FC7 "),e("a",m,[a("chokidar(\u662F\u5C01\u88C5 Node.js \u76D1\u63A7\u6587\u4EF6\u7CFB\u7EDF\u6587\u4EF6\u53D8\u5316\u529F\u80FD\u7684\u5E93\uFF0C\u5B83\u89E3\u51B3\u4E86\u539F\u751Ffs.watch\u3001fs.watchFile\u7684\u95EE\u9898)"),n(s)]),a(" \u76D1\u542C\u6587\u4EF6\u4FEE\u6539")]),_]),f,e("ul",null,[e("li",null,[e("p",null,[e("a",g,[a("webpack \u5B98\u7F51 Cache\u90E8\u5206"),n(s)])])]),e("li",null,[e("p",null,[e("a",y,[a("vite \u5B98\u7F51 \u4F9D\u8D56\u9884\u6784\u5EFA"),n(s)])])]),e("li",null,[e("p",null,[e("a",x,[a("\u5403\u900F Webpack \u6838\u5FC3\u539F\u7406"),n(s)])])]),e("li",null,[e("p",null,[e("a",j,[a("\u300A\u6DF1\u5165\u6D45\u51FAwebpack\u300B\u5728\u7EBF\u4E66\u7C4D"),n(s)])])]),e("li",null,[e("p",null,[e("a",S,[a("Webpack HMR \u539F\u7406\u89E3\u6790"),n(s)])])]),e("li",null,[e("p",null,[e("a",V,[a("HMR \u539F\u7406\u5168\u89E3\u6790"),n(s)])])]),e("li",null,[e("p",null,[e("a",M,[a("vite \u70ED\u66F4\u65B0\u539F\u7406"),n(s)])])]),e("li",null,[e("p",null,[e("a",C,[a("chokidar(\u662F\u5C01\u88C5 Node.js \u76D1\u63A7\u6587\u4EF6\u7CFB\u7EDF\u6587\u4EF6\u53D8\u5316\u529F\u80FD\u7684\u5E93\uFF0C\u5B83\u89E3\u51B3\u4E86\u539F\u751Ffs.watch\u3001fs.watchFile\u7684\u95EE\u9898)"),n(s)])])]),e("li",null,[e("p",null,[e("a",W,[a("vite\u591A\u4E45\u540E\u80FD\u5E72\u6389webpack\uFF1F - \u5C24\u96E8\u6EAA\u7684\u56DE\u7B54 - \u77E5\u4E4E"),n(s)])])]),e("li",null,[e("p",null,[e("a",z,[a("\u3010\u5C24\u96E8\u6EAA\u524D\u7AEF\u8D8B\u52BF2022 \u7684\u4E3B\u9898\u6F14\u8BB2\u3011\u3010\u7CBE\u51C6\u7A7A\u964D\u5230 23:32\u3011"),n(s)])])])])])}const E=r(h,[["render",H],["__file","webpack2.html.vue"]]);export{E as default};