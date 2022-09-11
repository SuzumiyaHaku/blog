<template><div><h1 id="跨域请求" tabindex="-1"><a class="header-anchor" href="#跨域请求" aria-hidden="true">#</a> 跨域请求</h1>
<h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述" aria-hidden="true">#</a> 描述</h2>
<p>CORS是一个W3C标准，全称是&quot;跨域资源共享&quot;（Cross-origin resource sharing）。是浏览器的资源策略之一。主要是以下的http请求头和响应头字段</p>
<ol>
<li><code v-pre>Access-Control-Allow-Origin：* </code> 该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。</li>
<li><code v-pre>Access-Control-Allow-Credentials: true</code> 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。前端需要在js中写</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span>withCredentials <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。</p>
<ol start="3">
<li>
<p><code v-pre>Access-Control-Expose-Headers: xxx</code> 该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。</p>
</li>
<li>
<p><code v-pre>Access-Control-Request-Method: POST</code> 该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，如POST</p>
</li>
<li>
<p><code v-pre>Access-Control-Request-Headers: token</code> 该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，比如提交token</p>
</li>
<li>
<p><code v-pre>Access-Control-Allow-Methods:</code> 该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次&quot;预检&quot;请求。</p>
</li>
<li>
<p><code v-pre>Access-Control-Allow-Headers</code> 如果前端的请求提交了 <code v-pre>Access-Control-Request-Headers: token</code>，那么就要返回<code v-pre>Access-Control-Allow-Headers: token</code>回去，但是不限于只返回'token'</p>
</li>
<li>
<p><code v-pre>Access-Control-Max-Age: 86400</code> 数字单位是秒，代表多少时间内，不用再发OPTIONS请求，google浏览器最大是600秒。Firefox最大是86400</p>
</li>
</ol>
<p>详细查看<a href="https://www.ruanyifeng.com/blog/2016/04/cors.html" target="_blank" rel="noopener noreferrer">跨域资源共享 CORS 详解 阮一峰<ExternalLinkIcon/></a></p>
<h2 id="解决跨域" tabindex="-1"><a class="header-anchor" href="#解决跨域" aria-hidden="true">#</a> 解决跨域</h2>
<p>用webpack配置proxy解决跨域，详细查看<a href="https://www.webpackjs.com/configuration/dev-server/#devserver-proxy" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></p>
<h3 id="java-springboot后端解决跨域" tabindex="-1"><a class="header-anchor" href="#java-springboot后端解决跨域" aria-hidden="true">#</a> java Springboot后端解决跨域</h3>
<p>后端设置响应头解决跨域</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CORSInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">HandlerInterceptor</span> <span class="token punctuation">{</span>
  
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Origin"</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Credentials"</span><span class="token punctuation">,</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Methods"</span><span class="token punctuation">,</span> <span class="token string">"GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Max-Age"</span><span class="token punctuation">,</span> <span class="token string">"86400"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"Access-Control-Allow-Headers"</span><span class="token punctuation">,</span> <span class="token string">"Authorization,Content-Type,content-type"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 如果是OPTIONS则结束请求</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">OPTIONS</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">HttpStatus</span><span class="token punctuation">.</span><span class="token constant">NO_CONTENT</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx解决跨域" tabindex="-1"><a class="header-anchor" href="#nginx解决跨域" aria-hidden="true">#</a> nginx解决跨域</h3>
<p>nginx设置响应头解决跨域</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>server <span class="token punctuation">{</span>
        listen <span class="token number">3639</span><span class="token punctuation">;</span>
	      server_name www.aaa.com<span class="token punctuation">;</span>

        location / <span class="token punctuation">{</span>
                proxy_redirect off<span class="token punctuation">;</span>
                proxy_set_header Host <span class="token variable">$host</span><span class="token punctuation">;</span>
                proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
                proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>

                add_header Access-Control-Allow-Origin * always<span class="token punctuation">;</span>
                add_header Access-Control-Allow-Credentials <span class="token boolean">true</span><span class="token punctuation">;</span>
                add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS<span class="token punctuation">;</span>
		add_header Access-Control-Max-Age <span class="token number">86400</span><span class="token punctuation">;</span>		

                proxy_pass http://127.0.0.1:3636<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="浏览器安装插件解决跨域" tabindex="-1"><a class="header-anchor" href="#浏览器安装插件解决跨域" aria-hidden="true">#</a> 浏览器安装插件解决跨域</h3>
<p>火狐安装CORS Everywhere</p>
</div></template>


