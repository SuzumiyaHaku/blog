<template><div><h1 id="写一个webassembly-wasm包" tabindex="-1"><a class="header-anchor" href="#写一个webassembly-wasm包" aria-hidden="true">#</a> 写一个WebAssembly/wasm包</h1>
<ClientOnly>
  <MTA/>
</ClientOnly>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 Rust/ C / C ++ / Go等语言提供一个编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。</p>
<p>本篇文章，会讲述如何创建一个webAssembly的npm包和如何在项目中使用*.wasm文件。</p>
<h2 id="配置rust镜像" tabindex="-1"><a class="header-anchor" href="#配置rust镜像" aria-hidden="true">#</a> 配置rust镜像</h2>
<p>要是没翻墙，容易下载包之类的失败。所以要配置镜像</p>
<p>将下面的内容复制保存成config（无后缀） 放在.cargo文件夹下面，或者在项目文件夹与.toml文件同级目录里新建一个.cargo文件夹，放在里面</p>
<CodeGroup>
<CodeGroupItem title="config文件">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>source.crates-io<span class="token punctuation">]</span>
<span class="token assign-left variable">registry</span><span class="token operator">=</span><span class="token string">"https://github.com/rust-lang/crates.io-index"</span>
<span class="token comment">#指定镜像</span>
<span class="token comment">#如：tuna、sjtu、ustc，或者 rustcc</span>
replace-with<span class="token operator">=</span><span class="token string">'tuna'</span>

<span class="token comment">#注：以下源配置一个即可，无需全部</span>

<span class="token comment">#中国科学技术大学</span>
<span class="token punctuation">[</span>source.ustc<span class="token punctuation">]</span>
<span class="token assign-left variable">registry</span><span class="token operator">=</span><span class="token string">"https://mirrors.ustc.edu.cn/crates.io-index"</span>

<span class="token comment">#上海交通大学</span>
<span class="token punctuation">[</span>source.sjtu<span class="token punctuation">]</span>
<span class="token assign-left variable">registry</span><span class="token operator">=</span><span class="token string">"https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index/"</span>

<span class="token comment">#清华大学</span>
<span class="token punctuation">[</span>source.tuna<span class="token punctuation">]</span>
<span class="token assign-left variable">registry</span><span class="token operator">=</span><span class="token string">"https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"</span>

<span class="token comment">#rustcc社区</span>
<span class="token punctuation">[</span>source.rustcc<span class="token punctuation">]</span>
<span class="token assign-left variable">registry</span><span class="token operator">=</span><span class="token string">"https://code.aliyun.com/rustcc/crates.io-index.git"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<p>我的是在</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>qaq@MacBook-Pro tree <span class="token parameter variable">-L</span> <span class="token number">1</span>
<span class="token builtin class-name">.</span>
├── bin
├── config    <span class="token operator">&lt;</span>----- 创建这么一个文件
├── <span class="token function">env</span>
├── <span class="token function">git</span>
└── registry
qaq@MacBook-Pro .cargo % <span class="token builtin class-name">pwd</span>
/Users/qaq/.cargo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2>
<p>目标是实现一个wasm版本的，斐波那契数列的第n项。（递归方式实现！）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token function">foo</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">foo</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">43</span><span class="token punctuation">)</span> <span class="token comment">// 返回第43个斐波那契数列的值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行rust的cargo</p>
<blockquote>
<p>cargo install wasm-pack</p>
</blockquote>
<blockquote>
<p>cargo new --lib web-fib</p>
</blockquote>
<p>创建完成后的项目结构</p>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>.
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Cargo.toml里添加如下高亮的代码块。</p>
<CodeGroup>
<CodeGroupItem title="Cargo.toml">
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">package</span><span class="token punctuation">]</span>
<span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"web-fib"</span>
<span class="token key property">version</span> <span class="token punctuation">=</span> <span class="token string">"0.1.0"</span>
<span class="token key property">edition</span> <span class="token punctuation">=</span> <span class="token string">"2021"</span>

<span class="token punctuation">[</span><span class="token table class-name">lib</span><span class="token punctuation">]</span>
<span class="token key property">crate-type</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">"cdylib"</span><span class="token punctuation">,</span> <span class="token string">"rlib"</span><span class="token punctuation">]</span>

<span class="token comment"># See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html</span>

<span class="token punctuation">[</span><span class="token table class-name">dependencies</span><span class="token punctuation">]</span>
<span class="token key property">wasm-bindgen</span> <span class="token punctuation">=</span> <span class="token string">"0.2.63"</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<p>修改src下的lib.rs为：</p>
<CodeGroup>
<CodeGroupItem title="lib.rs">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">use</span> <span class="token namespace">wasm_bindgen<span class="token punctuation">::</span>prelude<span class="token punctuation">::</span></span><span class="token operator">*</span><span class="token punctuation">;</span>

<span class="token attribute attr-name">#[wasm_bindgen]</span>
<span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">fib</span><span class="token punctuation">(</span>v<span class="token punctuation">:</span> <span class="token keyword">u32</span><span class="token punctuation">)</span> <span class="token punctuation">-></span> <span class="token keyword">u32</span> <span class="token punctuation">{</span> <span class="token comment">// rust递归实现斐波那契数列第n项</span>
    <span class="token keyword">match</span> v <span class="token punctuation">{</span>
        <span class="token number">1</span> <span class="token operator">=></span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token number">2</span> <span class="token operator">=></span> <span class="token number">1</span><span class="token punctuation">,</span>
        _ <span class="token operator">=></span> <span class="token function">fib</span><span class="token punctuation">(</span>v <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fib</span><span class="token punctuation">(</span>v <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<p>然后运行</p>
<blockquote>
<p>warm-pack build</p>
</blockquote>
<p>这时候就会多一个目录pkg，这个pkg就是我们的npm包</p>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>.
├── Cargo.lock
├── Cargo.toml
├── pkg
│   ├── package.json
│   ├── web_fib.d.ts
│   ├── web_fib.js
│   ├── web_fib_bg.js
│   ├── web_fib_bg.wasm
│   └── web_fib_bg.wasm.d.ts
├── src
│   └── lib.rs
└── target
    ├── CACHEDIR.TAG
    ├── debug
    ├── release
    └── wasm32-unknown-unknown
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wasm文件在浏览器的preview</p>
<div class="language-wasm ext-wasm line-numbers-mode"><pre v-pre class="language-wasm"><code><span class="token punctuation">(</span><span class="token keyword">module</span>
  <span class="token punctuation">(</span><span class="token keyword">memory</span> $<span class="token keyword">memory</span> <span class="token comment">(;0;)</span> <span class="token punctuation">(</span><span class="token keyword">export</span> <span class="token string">"memory"</span><span class="token punctuation">)</span> <span class="token number">17</span><span class="token punctuation">)</span>
  <span class="token punctuation">(</span><span class="token keyword">func</span> <span class="token variable">$func0</span> <span class="token punctuation">(</span><span class="token keyword">param</span> <span class="token variable">$var0</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">result</span> <span class="token keyword">i32</span><span class="token punctuation">)</span>
    <span class="token punctuation">(</span><span class="token keyword">local</span> <span class="token variable">$var1</span> <span class="token keyword">i32</span><span class="token punctuation">)</span>
    <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">1</span>
    <span class="token keyword">local</span>.set <span class="token variable">$var1</span>
    <span class="token keyword">local</span>.get <span class="token variable">$var0</span>
    <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">-1</span>
    <span class="token keyword">i32<span class="token punctuation">.</span>add</span>
    <span class="token keyword">local</span>.tee <span class="token variable">$var0</span>
    <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">2</span>
    <span class="token keyword">i32<span class="token punctuation">.</span>ge_u</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">result</span> <span class="token keyword">i32</span><span class="token punctuation">)</span>
      <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">0</span>
      <span class="token keyword">local</span>.set <span class="token variable">$var1</span>
      <span class="token keyword">loop</span> <span class="token variable">$label0</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var0</span>
        <span class="token keyword">call</span> <span class="token variable">$func0</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var1</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>add</span>
        <span class="token keyword">local</span>.set <span class="token variable">$var1</span>
        <span class="token keyword">local</span>.get <span class="token variable">$var0</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">-2</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>add</span>
        <span class="token keyword">local</span>.tee <span class="token variable">$var0</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">1</span>
        <span class="token keyword">i32<span class="token punctuation">.</span>gt_u</span>
        <span class="token keyword">br_if</span> <span class="token variable">$label0</span>
      <span class="token keyword">end</span> <span class="token variable">$label0</span>
      <span class="token keyword">local</span>.get <span class="token variable">$var1</span>
      <span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">1</span>
      <span class="token keyword">i32<span class="token punctuation">.</span>add</span>
    <span class="token keyword">else</span>
      <span class="token keyword">local</span>.get <span class="token variable">$var1</span>
    <span class="token keyword">end</span>
  <span class="token punctuation">)</span>
  <span class="token punctuation">(</span><span class="token keyword">func</span> <span class="token variable">$fib</span> <span class="token comment">(;1;)</span> <span class="token punctuation">(</span><span class="token keyword">export</span> <span class="token string">"fib"</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">param</span> <span class="token variable">$var0</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">result</span> <span class="token keyword">i32</span><span class="token punctuation">)</span>
    <span class="token keyword">local</span>.get <span class="token variable">$var0</span>
    <span class="token keyword">call</span> <span class="token variable">$func0</span>
  <span class="token punctuation">)</span>
  <span class="token punctuation">(</span><span class="token keyword">data</span> <span class="token punctuation">(</span><span class="token keyword">i32<span class="token punctuation">.</span>const</span> <span class="token number">1048576</span><span class="token punctuation">)</span> <span class="token string">"\04"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用wasm" tabindex="-1"><a class="header-anchor" href="#使用wasm" aria-hidden="true">#</a> 使用wasm</h2>
<h3 id="以npm包的方式使用" tabindex="-1"><a class="header-anchor" href="#以npm包的方式使用" aria-hidden="true">#</a> 以npm包的方式使用</h3>
<p>我们在package.json里添加npm包。(这里是npm引入未发布的本地npm的包，可以直接用路径)。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"wasm-test"</span><span class="token punctuation">,</span>
  <span class="token property">"private"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.0.0"</span><span class="token punctuation">,</span>
  <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"module"</span><span class="token punctuation">,</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"vite"</span><span class="token punctuation">,</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"tsc &amp;&amp; vite build"</span><span class="token punctuation">,</span>
    <span class="token property">"preview"</span><span class="token operator">:</span> <span class="token string">"vite preview"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"react"</span><span class="token operator">:</span> <span class="token string">"^18.2.0"</span><span class="token punctuation">,</span>
    <span class="token property">"react-dom"</span><span class="token operator">:</span> <span class="token string">"^18.2.0"</span><span class="token punctuation">,</span>
    <span class="token property">"web-fib"</span><span class="token operator">:</span> <span class="token string">"file:/Users/dragon/workspace/rust/work/web-ffmpeg/pkg"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"@types/react"</span><span class="token operator">:</span> <span class="token string">"^18.0.17"</span><span class="token punctuation">,</span>
    <span class="token property">"@types/react-dom"</span><span class="token operator">:</span> <span class="token string">"^18.0.6"</span><span class="token punctuation">,</span>
    <span class="token property">"@vitejs/plugin-react"</span><span class="token operator">:</span> <span class="token string">"^2.1.0"</span><span class="token punctuation">,</span>
    <span class="token property">"typescript"</span><span class="token operator">:</span> <span class="token string">"^4.6.4"</span><span class="token punctuation">,</span>
    <span class="token property">"vite"</span><span class="token operator">:</span> <span class="token string">"^3.1.0"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行</p>
<blockquote>
<p>npm install</p>
</blockquote>
<h3 id="wasm的npm包使用" tabindex="-1"><a class="header-anchor" href="#wasm的npm包使用" aria-hidden="true">#</a> wasm的npm包使用</h3>
<p>vite中使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> init <span class="token keyword">from</span> <span class="token string">"../node_modules/web-fib/web_fib_bg.wasm?init"</span><span class="token punctuation">;</span>

<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">instance</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'通过调用wasm计算fib(43)'</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">fib</span><span class="token punctuation">(</span><span class="token number">43</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>webpack5中使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> wasm <span class="token keyword">from</span> <span class="token string">"web-fib"</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'通过调用wasm计算fib(43)'</span><span class="token punctuation">,</span> wasm<span class="token punctuation">.</span><span class="token function">fib</span><span class="token punctuation">(</span><span class="token number">43</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">提示</p>
<p>这样使用的话，需要配置webpack5，这是个实验性功能。或者可以使用wasm-loader，或者参考<a href="#%E4%BB%A5http%E7%9A%84%E6%96%B9%E5%BC%8F%E7%9B%B4%E6%8E%A5%E5%BC%95%E5%85%A5">以http的方式直接引入</a>的js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">experiments</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">asyncWebAssembly</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h3 id="以http的方式直接引入" tabindex="-1"><a class="header-anchor" href="#以http的方式直接引入" aria-hidden="true">#</a> 以http的方式直接引入</h3>
<p>先把pkg/web_fib_bg.wasm放到服务器上，给到一个http://xxx.xxx.xxx/web_fib_bg.wasm的连接</p>
<p>test.html的代码</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>WebAssembly<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">function</span> <span class="token function">loadWebAssembly</span><span class="token punctuation">(</span><span class="token parameter">fileName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span>fileName<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">'cors'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">arrayBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//加载字节码</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">bits</span> <span class="token operator">=></span> WebAssembly<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>bits<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//编译字节码</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">module</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">WebAssembly<span class="token punctuation">.</span>Instance</span><span class="token punctuation">(</span>module<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//实例化</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">loadWebAssembly</span><span class="token punctuation">(</span><span class="token string">'http://xxx.xxx.xxx/web_fib_bg.wasm'</span><span class="token punctuation">)</span> <span class="token comment">// 你的web_fib_bg.wasm的文件地址</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">instance</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>$wasmModule <span class="token operator">=</span> instance<span class="token punctuation">.</span>exports<span class="token punctuation">;</span> <span class="token comment">//将instanc暴露在全局变量中以供js调用</span>
  fib <span class="token operator">=</span> instance<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>fib<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'通过调用wasm计算fib(43)'</span><span class="token punctuation">,</span> <span class="token function">fib</span><span class="token punctuation">(</span><span class="token number">43</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="把c编译为wasm" tabindex="-1"><a class="header-anchor" href="#把c编译为wasm" aria-hidden="true">#</a> 把c编译为wasm</h3>
<p>创建如下内容的文件</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">fib</span> <span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token function">fib</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fib</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装<a href="https://github.com/emscripten-core/emscripten" target="_blank" rel="noopener noreferrer">emscripten<ExternalLinkIcon/></a>然后运行</p>
<blockquote>
<p>emcc --no-entry  fib.c  -s EXPORTED_FUNCTIONS='[&quot;_fib&quot;]' -o fib.wasm
得到fib.wasm就可以如上一样使用</p>
</blockquote>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://webassembly.org/" target="_blank" rel="noopener noreferrer">WebAssembly 官网<ExternalLinkIcon/></a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/WebAssembly" target="_blank" rel="noopener noreferrer">WebAssembly MDN<ExternalLinkIcon/></a></li>
<li><a href="https://doc.rust-lang.org/book/title-page.html" target="_blank" rel="noopener noreferrer">The Rust Programming Language<ExternalLinkIcon/></a></li>
<li><a href="https://doc.rust-lang.org/stable/reference/introduction.html" target="_blank" rel="noopener noreferrer">The Rust Reference<ExternalLinkIcon/></a></li>
<li><a href="https://rustwasm.github.io/docs/wasm-bindgen/" target="_blank" rel="noopener noreferrer">关于wasm-bindgen<ExternalLinkIcon/></a></li>
</ul>
</div></template>


