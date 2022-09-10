<template><div><h1 id="commonjs、amd、cmd、esm、umd" tabindex="-1"><a class="header-anchor" href="#commonjs、amd、cmd、esm、umd" aria-hidden="true">#</a> CommonJS、AMD、CMD、ESM、UMD</h1>
<p>《深入浅出node.js》模块机制部分的阅读笔记</p>
<h2 id="commonjs" tabindex="-1"><a class="header-anchor" href="#commonjs" aria-hidden="true">#</a> CommonJS</h2>
<p>在模块中，上下文提供require()方法来引入外部模块。对应引入的功能，上下文提供了
exports对象用于导出当前模块的方法或者变量，并且它是唯导出的出口。在模块中，还存在
一个module对象，它代表模块自身，而exports是module的属性。在Node中，一个文件就是一个模块，将方法挂载在exports对象上作为属性即可定义导出的方式：</p>
<p>math.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>exports<span class="token punctuation">.</span><span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> math <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'math'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解析该模块node做什么" tabindex="-1"><a class="header-anchor" href="#解析该模块node做什么" aria-hidden="true">#</a> 解析该模块node做什么</h3>
<p>在node里，模块分为两类，一类是node提供的模块，称为核心模块。另一类是用户编写的模块，称为文件模块。</p>
<ul>
<li>核心模块部分在Node源代码编译的过程中，编译进了二进制文件。在Node进程启动时，部分核心模块就直接加载进内存，所以这部分核心模块引入时，文件定位和编译这两个步骤可以省略掉，并且在路径分析中优先判断，所以加载速度是最快的</li>
<li>文件模块则是在运动时动态加载，需要完整的路径分析、文件定位、编译执行的过程，速度比核心模块慢。</li>
</ul>
<p>与前端浏览器会缓存静态脚本文件以提高性能一样，Node对引入过的模块都会进行缓存，以减少二次引入时的开销。不同的地方在于，浏览器仅仅缓存文件，而Node缓存的是编译和执行之后的对象。</p>
<p>不论是核心模块还是文件模块,reauire(方法对相同模块的二次加载都一律采用缓存优先的
方式，这是第一优先级的。不同之处在于核心模块的缓存检查先于文件模块的缓存检查。</p>
<h4 id="_1-路径分析、-文件定位" tabindex="-1"><a class="header-anchor" href="#_1-路径分析、-文件定位" aria-hidden="true">#</a> 1. 路径分析、 文件定位</h4>
<h5 id="模块标识符分析" tabindex="-1"><a class="header-anchor" href="#模块标识符分析" aria-hidden="true">#</a> 模块标识符分析</h5>
<p>模块标识符在Node中主要分为以下几类</p>
<ul>
<li>核心模块，如http、fs、path等</li>
<li><code v-pre>.</code>或<code v-pre>..</code>，开始的相对路径文件模块。</li>
<li>以<code v-pre>/</code>开始的绝对路径文件模块。</li>
<li>非路径形式的文件模块，如自定义的connect模块。</li>
</ul>
<ol>
<li>
<p>核心模块
核心模块的优先级仅次于缓存加载，它在Node的源代码编译过程中已经编译为二进制代码，
其加臷过程最快。如果试图加载一个与核心模块标识符相同的自定义模块，那是不会成功的。如果自己编写了
一个http用户模块，想要加载成功，必须选择一个不同的标识符或者换用路径的方式。</p>
</li>
<li>
<p>路径形式的文件模块
以<code v-pre>.</code>、<code v-pre>..</code>和<code v-pre>/</code>开始的标识符，这里都被当做文件模块来处理。在分析路径模块时，requireO方
法会将路径转为真实路径，并以真实路径作为素引，将编译执行后的结果存放到缓存中，以使二
次加载时更快。
由于文件模块给Node指明了确切的文件位置，所以在查找过程中可以节约大量时间</p>
</li>
<li>
<p>自定义模块
自定义模块式，非上面两种，它可能是一个文件或者包的形式，这类模块查找是最慢的。
它的模块的路径是生成的，它类似于js的原型原型链的查找。文件夹路径越深，模块查找耗时会越多。</p>
</li>
</ol>
<h5 id="目录的分析和包" tabindex="-1"><a class="header-anchor" href="#目录的分析和包" aria-hidden="true">#</a> 目录的分析和包</h5>
<p>在分析标识符的过程中，require()通过分析文件扩展名之后，可能没有查我到对应文件，但
却得到一个目录，这在引入自定义模块和逐个模块路径进行查找时经常会出现，此时Node会将目
录当做一个包来处理。</p>
<p>在这个过程中，Node对CommonJS包规范进行了一定程度的支持。首先，Node在当前目录下
查找package.json（CoramonJs包规范定义的包描述文件)，通过〕SON.parse()解析出包描述对象，
从中取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将会进入扩展名分析的步骤。</p>
<p>而如果main属性指定的文件名错误，或者压根没有packagejson文件，Node会将index当做默
认文件名，然后依次查找indexjs、indexjson、index.node。</p>
<p>如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查
找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会拋出查找失败的异常。</p>
<h4 id="_2-模块编译" tabindex="-1"><a class="header-anchor" href="#_2-模块编译" aria-hidden="true">#</a> 2. 模块编译</h4>
<p>编译和执行是引入文件模块的最后一个阶段。定位到具体的文件后，Node会新建一个模块对
象，然后根据路径载入并编译。对于不同的文件扩展名，其载入方法也有所不同，具体如下所示。</p>
<ul>
<li>.js文件。通过fs模块同步读取文件后编译执行</li>
<li>node文件。这是用C/C++编写的扩展文件，通过dlopen（方法加载最后编译生成的文件。</li>
<li>json文件。通过fs模块同步读取文件后，用JSON.parse()解析返回结果。</li>
<li>其余扩展名文件。它们都被当做.js文件载入。</li>
</ul>
<p>每一个编译成功的模块都会将其文件路径作为索引缓存在Module.cache对象上，以提高二
次引入的性能。
根据不同的文件扩展名，Node会调用不同的读取方式，如json文件的调用如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Native extension for .json</span>
Module<span class="token punctuation">.</span>_extensions<span class="token punctuation">[</span><span class="token string">'.json'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>module，filename）<span class="token punctuation">{</span>
<span class="token keyword">var</span> content <span class="token operator">=</span> NativeModule<span class="token punctuation">.</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token function">stripBOM</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  err<span class="token punctuation">.</span>message <span class="token operator">=</span> filename <span class="token operator">+</span> <span class="token string">':'</span> <span class="token operator">+</span> err<span class="token punctuation">.</span>message<span class="token punctuation">;</span>
  <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，Module.extensions会被赋值给require（的extensions属性，所以通过在代码中访问require.extensions可以知道系统中已有的扩展加载方式。编写如下代码测试一下：</p>
<blockquote>
<p>console.log(require.extensions)
得到结果：</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>Object<span class="token operator">:</span> <span class="token keyword">null</span> prototype<span class="token punctuation">]</span> <span class="token punctuation">{</span>
  <span class="token string-property property">'.js'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">Function</span> <span class="token punctuation">(</span>anonymous<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">'.json'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">Function</span> <span class="token punctuation">(</span>anonymous<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">'.node'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">Function</span> <span class="token punctuation">(</span>anonymous<span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="commonjs模块里require、exports、module从哪来的-还有-filename、-dirname呢" tabindex="-1"><a class="header-anchor" href="#commonjs模块里require、exports、module从哪来的-还有-filename、-dirname呢" aria-hidden="true">#</a> CommonJS模块里require、exports、module从哪来的，还有__filename、__dirname呢？</h5>
<p>事实上，在编译的过程中，Node对获取的JavaScript文件内容进行了头尾包装。在头部添加
了 (function (exports, require, module,__filename,__dirname）{\n，在尾部添加了\n});
一个正常的JavaScript文件会被包装成如下的样子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> require<span class="token punctuation">,</span> module<span class="token punctuation">,</span> __filename<span class="token punctuation">,</span> __dirname</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> math <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'math'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  exports<span class="token punctuation">.</span><span class="token function-variable function">area</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">radius</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> radius<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样每个模块文件之间都进行了作用域隔离。包装之后的代码会通过vm原生模块的
IunInThisContext（方法执行（类似eval，只是具有明确上下文，不污染全局），返回一个具体的function对象。最后，将当前模块对象的exports属性、require(方法、module（模块对象自身），以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个function(执行。</p>
<p>这就是这些变量并没有定义在每个模块文件中却存在的原因。在执行之后，模块的exports
属性被返回给了调用方。exports属性上的任何方法和属性都可以被外部调用到，但是模块中的
其余变量或属性则不可直接被调用。</p>
<p>为何存在exports的情况下，还存在module.exports。理想情况下，只要赋值给exports即可:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// My Class</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是通常都会得到一个失败的结果。其原因在于，exports对象是通过形参的方式传人的，
直接赋值形参会改变形参的引用，但并不能改变作用域外的值。</p>
<p>如果要达到require引人一个类的效果，请赋值给module.exports对象。这个迁回的方案不改
变形参的引用。</p>
<h2 id="amd" tabindex="-1"><a class="header-anchor" href="#amd" aria-hidden="true">#</a> AMD</h2>
<p>AMD规范是CommonJs模块规范的一个延伸，它的模块定义如下:</p>
<blockquote>
<p>define (id?, dependencies?, factory);
它的模块id和依赖是可选的，与Node模块相似的地方在于factory的内容就是实际代码的内
容。下面的代码定义了一个简单的模块：</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">define</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> exports <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  exports<span class="token punctuation">.</span><span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>'Hello from module<span class="token operator">:</span> <span class="token operator">+</span> module<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> exports<span class="token punctuation">;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同之处在于AMD模块需要用define来明确定义一个模块，而在Node实现中是隐式包装的，
它们的目的是进行作用域隔离，仅在需要的时候被引人，避免掉过去那种通过全局变量或者全局
命名空间的方式，以免变量污染和不小心被修改。另一个区别则是内容需要通过返回的方式实现
导出。</p>
<h2 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> CMD</h2>
<p>CMD规范由国内的玉伯提出，与AMD规范的主要区别在于定义模块和依赖引人的部分。
AMD需要在声明模块的时候指定所有的依赖，通过形参传递依赖到模块内容中:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'dep1'</span><span class="token punctuation">,</span> <span class="token string">'dep2'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">dep1<span class="token punctuation">,</span> dep2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与AMD模块规范相比，CMD模块更接近于Node对CommonJS规范的定义：</p>
<blockquote>
<p>define(factory);
在依赖部分，CMD支持动态引入，示例如下：</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">///</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>require、exports和module通过形参传递给模块，在需要依赖模块时，随时调用requireo引入即可。</p>
<h3 id="umd" tabindex="-1"><a class="header-anchor" href="#umd" aria-hidden="true">#</a> UMD</h3>
<p>UMD就是兼容上述CommonJS、CMD、AMD模块的，兼容代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> factory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">'function'</span> <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">.</span>amd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// AMD/CMD</span>
        <span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'jquery'</span><span class="token punctuation">,</span> <span class="token string">'underscore'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Node, CommonJS之类的</span>
        module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'jquery'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'underscore'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 浏览器全局变量(root 即 window)</span>
        root<span class="token punctuation">.</span>returnExports <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>jQuery<span class="token punctuation">,</span> root<span class="token punctuation">.</span>_<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">$<span class="token punctuation">,</span> _</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 假装这是一个模块</span>
    <span class="token comment">// 暴露的属性</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="esm" tabindex="-1"><a class="header-anchor" href="#esm" aria-hidden="true">#</a> ESM</h3>
<p>es6的新语法，也是Tree Shaking的基础。也是目前前端写代码最常接触的。关于基础语法可以看<a href="https://es6.ruanyifeng.com/#docs/module" target="_blank" rel="noopener noreferrer">ECMAScript6入门  阮一峰  Module的语法<ExternalLinkIcon/></a>。
需要注意的点是ES Module导出的是一份值的引用，CommonJS则是一份值的拷贝。</p>
<p>对于模块相互引用的情况。CommonJS和ES Module都对循环引入做了处理不会进入死循环：</p>
<ul>
<li>CommonJS借助模块缓存，遇到require函数会先检查是否有缓存，已经有的则不会进入执行，在模块缓存中还记录着导出的变量的拷贝值；</li>
<li>ES Module借助模块地图，已经进入过的模块标注为获取中，遇到import语句会去检查这个地图，已经标注为获取中的则不会进入，地图中的每一个节点是一个模块记录，上面有导出变量的内存地址，导入时会做一个连接——即指向同一块内存。</li>
</ul>
<h3 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读" aria-hidden="true">#</a> 推荐阅读</h3>
<ul>
<li><a href="https://juejin.cn/post/6865557155102064648" target="_blank" rel="noopener noreferrer">【译】Node 模块之战：为什么 CommonJS 和 ES Module 不能共存<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/7110813179432665101" target="_blank" rel="noopener noreferrer">为什么模块依赖会导致死循环<ExternalLinkIcon/></a></li>
<li><a href="https://es6.ruanyifeng.com/#docs/module" target="_blank" rel="noopener noreferrer">ECMAScript6入门  阮一峰  Module的语法<ExternalLinkIcon/></a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import" target="_blank" rel="noopener noreferrer">MDN import<ExternalLinkIcon/></a></li>
</ul>
</div></template>


