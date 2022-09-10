<template><div><h1 id="跨域请求" tabindex="-1"><a class="header-anchor" href="#跨域请求" aria-hidden="true">#</a> 跨域请求</h1>
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


