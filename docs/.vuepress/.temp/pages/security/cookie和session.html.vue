<template><div><h1 id="cookie-和-session" tabindex="-1"><a class="header-anchor" href="#cookie-和-session" aria-hidden="true">#</a> cookie 和 session</h1>
<ClientOnly>
  <MTA/>
</ClientOnly>
<h2 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> cookie</h2>
<p>cookie两类：会话cookie和持久cookie。用户退出浏览器，会话cookie就被删除。持久cookie生存时间长一些，它们存在硬盘。两者唯一的区别就是它们的过期时间。
cookie本质就是一种有过期时间的存储方式，一个cookie只能存4kb。</p>
<h3 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h3>
<blockquote>
<p>Cookie: ab_sr=hZ72Jc7DmjhMMEpYLtAqP0dYwNWjNtH7W66CANifyf4
JavaScript 可以使用 document.cookie 属性来创建 、读取、及删除 cookie。</p>
</blockquote>
<div class="custom-container danger"><p class="custom-container-title">HttpOnly</p>
<p>document.cookie只能获取非 HttpOnly 类型的cookie</p>
</div>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>cookie<span class="token operator">=</span><span class="token string">"username=John Doe"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>您还可以为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>cookie<span class="token operator">=</span><span class="token string">"username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>cookie<span class="token operator">=</span><span class="token string">"username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 JavaScript 中，修改 cookie 类似于创建 cookie，如下所示</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>cookie<span class="token operator">=</span><span class="token string">"username=John Smith; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>javascript删除 cookie 非常简单。您只需要设置 expires 参数为以前的时间即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>cookie <span class="token operator">=</span> <span class="token string">"username=; expires=Thu, 01 Jan 1970 00:00:00 GMT"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="关键字" tabindex="-1"><a class="header-anchor" href="#关键字" aria-hidden="true">#</a> 关键字</h3>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>Set-Cookie: "name=value;domain=.domain.com;path=/;expires=Sat, 11 Jun 2016 11:29:42 GMT;HttpOnly;secure"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中name=value是必选项，其它都是可选项。Cookie的主要构成如下：</p>
<ol>
<li><code v-pre>name</code>: 一个唯一确定的cookie名称。通常来讲cookie的名称是不区分大小写的。</li>
<li><code v-pre>value</code>: 存储在cookie中的字符串值。最好为cookie的name和value进行url编码</li>
<li><code v-pre>domain</code>: cookie对于哪个域是有效的。所有向该域发送的请求中都会包含这个cookie信息。这个值可以包含子域(如：
yq.aliyun.com)，也可以不包含它(如：.aliyun.com，则对于aliyun.com的所有子域都有效).</li>
<li><code v-pre>path</code>: 表示这个cookie影响到的路径，浏览器跟会根据这项配置，像指定域中匹配的路径发送cookie。</li>
<li><code v-pre>expires</code>:失效时间，表示cookie何时应该被删除的时间戳(也就是，何时应该停止向服务器发送这个cookie)。如果不设置这个时间戳，浏览器会在页面关闭时即将删除所有cookie；不过也可以自己设置删除时间。这个值是GMT时间格式，如果客户端和服务器端时间不一致，使用expires就会存在偏差。</li>
<li><code v-pre>max-age</code>: 与expires作用相同，用来告诉浏览器此cookie多久过期（单位是秒），而不是一个固定的时间点。正常情况下，max-age的优先级高于expires。</li>
<li><code v-pre>HttpOnly</code>: 告知浏览器不允许通过脚本document.cookie去更改这个值，同样这个值在document.cookie中也不可见。但在http请求张仍然会携带这个cookie。注意这个值虽然在脚本中不可获取，但仍然在浏览器安装目录中以文件形式存在。这项设置通常在服务器端设置。</li>
<li><code v-pre>secure</code>: 安全标志，指定后，只有在使用SSL链接时候才能发送到服务器，如果是http链接则不会传递该信息。就算设置了secure 属性也并不代表他人不能看到你机器本地保存的 cookie 信息，所以不要把重要信息放cookie就对了服务器端设置</li>
</ol>
<h3 id="samesite" tabindex="-1"><a class="header-anchor" href="#samesite" aria-hidden="true">#</a> SameSite</h3>
<p>限制cookie的一种策略。也是防止CSRF攻击的一种方式。
谷歌浏览器在 version 80 默认开启该特性，将SameSite的默认值设为Lax，火狐浏览器 69 可以再about:config中设置network.cookie.sameSite.laxByDefault来体验该特性。Edge 浏览器计划将该特性设为默认。</p>
<h4 id="samesite-strict" tabindex="-1"><a class="header-anchor" href="#samesite-strict" aria-hidden="true">#</a> SameSite=Strict</h4>
<p>严格模式，表明这个 cookie 在任何情况下都不可能作为第三方 cookie，绝无例外。比如说假如 b.com 设置了如下 cookie：</p>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>Set-Cookie: foo=1; SameSite=Strict
Set-Cookie: bar=2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 a.com 下发起的对 b.com 的任意请求中，foo 这个 cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 cookie 被设置成了 SameSite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 cookie，其它网站发起的对淘宝的任意请求都不会带上那个 cookie。</p>
<h4 id="samesite-lax" tabindex="-1"><a class="header-anchor" href="#samesite-lax" aria-hidden="true">#</a> SameSite=Lax</h4>
<p>宽松模式，比 Strict 放宽了点限制：假如这个请求是我上面总结的那种同步请求（改变了当前页面或者打开了新页面）且同时是个 GET 请求（因为从语义上说 GET 是读取操作，比 POST 更安全），则这个 cookie 可以作为第三方 cookie。比如说假如 b.com 设置了如下 cookie：</p>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>Set-Cookie: foo=1; SameSite=Strict
Set-Cookie: bar=2; SameSite=Lax
Set-Cookie: baz=3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当用户从 a.com 点击链接进入 b.com 时，foo 这个 cookie 不会被包含在 Cookie 请求头中，但 bar 和 baz 会，也就是说用户在不同网站之间通过链接跳转是不受影响了。但假如这个请求是从 a.com 发起的对 b.com 的异步请求，或者页面跳转是通过表单的 post 提交触发的，则 bar 也不会发送。</p>
<h4 id="samesite-none-secure" tabindex="-1"><a class="header-anchor" href="#samesite-none-secure" aria-hidden="true">#</a> SameSite=None; Secure</h4>
<p>将SameSite设置为None意味着，你明确的表示，在 third-party 发送请求时使用 cookie。意思csrf又在向你招手了。</p>
<h2 id="session" tabindex="-1"><a class="header-anchor" href="#session" aria-hidden="true">#</a> session</h2>
<p>session更准确的是一个概念，是服务端会话的技术。
session是基于cookie实现的。
获取的对象有唯一的标识id的，tomcat把session的id当成cookie发送给浏览器，tomcat在响应是会加上set-cookie这个响应头JSESSIONID=值存储到浏览器内存中，第二次获取时就会去内存中寻找有无id为之前的，有就直接用那数据，没有就创建。</p>
<p>在java里创建一个session</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServlet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpSession</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SessionServlet</span> <span class="token keyword">extends</span> <span class="token class-name">HttpServlet</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doGet</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> req<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> resp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        
        <span class="token comment">// 获取session对象</span>
        <span class="token class-name">HttpSession</span> session <span class="token operator">=</span> req<span class="token punctuation">.</span><span class="token function">getSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// req.getSession()来设置cookie，那么cookie的名字为JSESSIONID，值为会话id,也就是session id。</span>

        <span class="token comment">//存储数据</span>
        session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span><span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写了HttpSession session = req.getSession(); 一行代码。tomcat容器就会为我们</p>
<ol>
<li>建立一个新的HttpSession对象</li>
<li>生成唯一的会话ID</li>
<li>建立新的Cookie对象</li>
<li>把会话Id放到cookie中</li>
<li>在响应中设置cookie</li>
</ol>
<p>tomcat是用如下结构来保存session的。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Session</span><span class="token punctuation">></span></span> sessions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHasMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Session</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


