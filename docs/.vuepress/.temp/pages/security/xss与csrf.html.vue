<template><div><h1 id="xss和csrf" tabindex="-1"><a class="header-anchor" href="#xss和csrf" aria-hidden="true">#</a> XSS和CSRF</h1>
<h2 id="xss" tabindex="-1"><a class="header-anchor" href="#xss" aria-hidden="true">#</a> XSS</h2>
<h3 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h3>
<p>跨站脚本攻击，英文全称是Cross Site Script，本来缩写是CSS，但是为了和层叠样式表
(CascadingStyleSheet,CSS）有所区别，所以在安全领域叫做“XSS”。
XSS攻击，通常指黑客通过“HTML注入”篡改了网页，插入了恶意的脚本，从而在用户
测览网页时，控制用户浏览器的一种攻击。在一开始，这种攻击的演示案例是跨域的，所以叫
做“跨站脚本”。但是发展到今天，由于Javascript的强大功能以及网站前端应用的复杂化，是
否跨域己经不再重要。但是由于历史原因，XSS这个名字却一直保留下来。</p>
<h3 id="xss漏洞产生的原因" tabindex="-1"><a class="header-anchor" href="#xss漏洞产生的原因" aria-hidden="true">#</a> XSS漏洞产生的原因</h3>
<p>XSS漏洞通常产生在前端js代码的漏洞。所以会和前端环境（如浏览器内核版本）有关。</p>
<h3 id="分类与示例" tabindex="-1"><a class="header-anchor" href="#分类与示例" aria-hidden="true">#</a> 分类与示例</h3>
<h4 id="反射型xss" tabindex="-1"><a class="header-anchor" href="#反射型xss" aria-hidden="true">#</a> 反射型XSS</h4>
<p>反射型XSSS只是简单地把用户输入的数据“反射”给浏览器。也就是说，黑客往往需要
诱使用户“点击”一个恶意链接，才能攻击成功。反射型XSS也叫做“非持久型XSS”(Non-persistent XSS)。
攻击者发现 http://weibo.com/pub/star/g/xyyyd 这个 URL 的内容未经过滤直接输出到 HTML 中。
于是攻击者构建出一个 URL，然后诱导用户去点击：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>http://weibo.com/pub/star/g/xyyyd"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>//xxxx.cn/image/t.js</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用户点击这个 URL 时，服务端取出请求 URL，拼接到 HTML 响应中：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://weibo.com/pub/star/g/xyyyd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>//xxxx.cn/image/t.js</span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>">按分类检索<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>浏览器解析html就会执行这段script代码。如果这段script代码包含一个模拟当前用户的操作，比如发帖子，关注之类的代码。这样就完成了一次xss攻击。</p>
<h4 id="存储型xss" tabindex="-1"><a class="header-anchor" href="#存储型xss" aria-hidden="true">#</a> 存储型XSS</h4>
<p>存储型XSS会把用户输入的数据“存储”在服务器端。这种XSS具有很强的稳定性。</p>
<ol>
<li>攻击者在一个表单输入描述的input输入了一串js代码如下：</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">></span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>提交保存后，该代码存到了服务器。当有管理员会查看用户提交的内容时。
页面会加载该数据。本来页面加载输入的描述是文字。正常加载看起来是这样的</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>描述：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>这是一段描述<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是由于输入的是script所以就变成了</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>描述：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器就会执行这段script代码。如果这段script代码包含一个获取当前页面信息的脚本，并发送给了黑客的服务器，黑客就拿到了比如cookie登录。这样就完成了一次xss攻击。</p>
<p>存储型XSS会持续攻击，因为存储在服务端，只要有人查看有那段js的代码的页面。就会一直发起攻击。</p>
<h4 id="dom型xss" tabindex="-1"><a class="header-anchor" href="#dom型xss" aria-hidden="true">#</a> DOM型XSS</h4>
<p>这种类型的XSS并非按照“数据是否保存在服务器端”来划分，DOM型
从效果上来说也是反射型XSS。单独划分出来，是因为DOM型的形成原因比较特别，
发现它的安全专家专门提出了这种类型的XSS。出于历史原因，也就把它单独作为一个分类了。
本质也是js脚本的实现，但是这个的情况是，比如我有一个输入框input，用来填充输入的url然后构建一个跳转的a标签。如下代码所示。</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>aa<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">let</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"text"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"aa"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;a herf="</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>input<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">">点我&lt;/html></span><span class="token template-punctuation string">`</span></span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候。我不输入url了。我输入：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>javascript:void 0;" onclick="(function(){alert(233)})()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让innerHTML的结果为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"aa"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;a herf="javascript:void 0;" onclick="(function foo(){alert(233)})()">1aaa&lt;/a></span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样用户点击就可以执行onclick里的函数，又是一次XSS攻击了。</p>
<h2 id="防御xss" tabindex="-1"><a class="header-anchor" href="#防御xss" aria-hidden="true">#</a> 防御XSS</h2>
<p>web前端的话，可以下载<a href="https://github.com/leizongmin/js-xss" target="_blank" rel="noopener noreferrer">xss 的npm包<ExternalLinkIcon/></a></p>
<blockquote>
<p>npm install xss</p>
</blockquote>
<p>主要要处理好input、富文本输入、输出的检查。上面仅仅是XSS攻击的一种实现。但是原理是类似的。</p>
<h2 id="csrf" tabindex="-1"><a class="header-anchor" href="#csrf" aria-hidden="true">#</a> CSRF</h2>
<p>CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的(如修改操作、删除操作等)。主要就是cookie的锅,不过目前新版浏览器大多已经关闭第三方Cookie了。</p>
<h3 id="特征" tabindex="-1"><a class="header-anchor" href="#特征" aria-hidden="true">#</a> 特征</h3>
<p>一个典型的CSRF攻击有着如下的流程：</p>
<ol>
<li>用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；</li>
<li>在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；</li>
<li>用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；</li>
<li>网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；</li>
<li>浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。</li>
</ol>
<p>CSRF的两个特点：</p>
<ul>
<li>CSRF（通常）发生在第三方域名。</li>
<li>CSRF攻击者不能获取到Cookie等信息，只是使用。
该图是一个银行转账的csrf攻击图
<img src="@source/assets/csrf.png" alt="image"></li>
</ul>
<p>理解CSRF攻击最主要的核心在于，cookie的发送这个知识点。意思浏览器新打开的tab页面B发起对页面A域名地址的请求。浏览器会把A页面得到的cookie，加在这个请求上(这个请求其实和A页面的请求代码一样的请求地址，只不过代码写在B页面上)。对于服务器来讲cookie是身份识别，都是一样的所以会允许通过。但是http的头Referer字段会显示来源是B的地址。</p>
<h3 id="csrf-防御" tabindex="-1"><a class="header-anchor" href="#csrf-防御" aria-hidden="true">#</a> CSRF 防御</h3>
<ul>
<li>可以用验证码的方式，很好的抑制CSRF攻击。但是并不是万能的。出于用户体验考虑。网站不能给所有操作都加上验证。</li>
<li>还可以设置随机token。</li>
<li>重要操作要求输入原始密码，或者发送手机验证。</li>
<li>设置cookie SameSite也可以避免一些问题</li>
<li>验证Referer头</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>《白帽子讲web安全》</li>
<li><a href="https://juejin.cn/post/6844903685122703367" target="_blank" rel="noopener noreferrer">前端安全系列（一）：如何防止XSS攻击？<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903689702866952" target="_blank" rel="noopener noreferrer">前端安全系列之二：如何防止CSRF攻击？<ExternalLinkIcon/></a></li>
<li><a href="https://jsxss.com/zh/index.html" target="_blank" rel="noopener noreferrer">xss的npm官网<ExternalLinkIcon/></a></li>
</ul>
</div></template>


