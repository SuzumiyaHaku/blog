<template><div><h1 id="oauth2-0和jwt" tabindex="-1"><a class="header-anchor" href="#oauth2-0和jwt" aria-hidden="true">#</a> OAuth2.0和JWT</h1>
<h2 id="oauth2-0" tabindex="-1"><a class="header-anchor" href="#oauth2-0" aria-hidden="true">#</a> OAuth2.0</h2>
<p>是目前最流行的第三方应用登录授权机制。</p>
<p>OAuth2.0标准定义四种角色：</p>
<ul>
<li>客户端（Client）</li>
<li>资源所有者（Resource Owner）</li>
<li>资源服务器（Resource Server）</li>
<li>授权服务器（Authorization Server）</li>
</ul>
<p>OAuth2.0标准定义四种授权模式：</p>
<ul>
<li>授权码模式（authorization code）</li>
<li>简化模式（implicit）</li>
<li>密码模式（password）</li>
<li>客户端模式（client credentials）</li>
</ul>
<h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h3>
<ul>
<li>原生app授权：app登录请求后台接口，为了安全认证，所有请求都带token信息，如果登录验证、 请求后台数据。</li>
<li>前后端分离单页面应用：前后端分离框架，前端请求后台数据，需要进行oauth2安全认证
第三方应用授权登录，比如QQ，微博，微信的授权登录。</li>
</ul>
<h3 id="oauth2-0协议流程" tabindex="-1"><a class="header-anchor" href="#oauth2-0协议流程" aria-hidden="true">#</a> OAuth2.0协议流程</h3>
<div class="language-txt ext-txt line-numbers-mode"><pre v-pre class="language-txt"><code>  +--------+                               +---------------+
  |        |--(A)- Authorization Request ->|   Resource    |
  |        |                               |     Owner     |
  |        |&lt;-(B)-- Authorization Grant ---|               |
  |        |                               +---------------+
  |        |
  |        |                               +---------------+
  |        |--(C)-- Authorization Grant -->| Authorization |
  | Client |                               |     Server    |
  |        |&lt;-(D)----- Access Token -------|               |
  |        |                               +---------------+
  |        |
  |        |                               +---------------+
  |        |--(E)----- Access Token ------>|    Resource   |
  |        |                               |     Server    |
  |        |&lt;-(F)--- Protected Resource ---|               |
  +--------+                               +---------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上图表示的步骤。</p>
<ol>
<li>用户打开客户端以后，客户端要求用户给予授权。</li>
<li>用户同意给予客户端授权。</li>
<li>客户端使用上一步获得的授权，向认证服务器申请令牌。</li>
<li>认证服务器对客户端进行认证以后，确认无误，同意发放令牌。</li>
<li>客户端使用令牌，向资源服务器申请获取资源。</li>
<li>资源服务器确认令牌无误，同意向客户端开放资源。</li>
</ol>
<p>这些步骤里关键的是第二个步骤。有了这个授权以后，客户端就可以获取令牌，进而凭令牌获取资源。</p>
<ul>
<li>授权码模式（authorization code）
功能最完整、流程最严密的授权模式。它的特点就是通过客户端的后台服务器，与&quot;服务提供商&quot;的认证服务器进行互动。</li>
<li>简化模式（implicit）
不通过第三方应用程序的服务器，直接在浏览器中向认证服务器申请令牌，跳过了&quot;授权码&quot;这个步骤，因此得名。所有步骤在浏览器中完成，令牌对访问者是可见的，且客户端不需要认证。</li>
<li>密码模式（password）
用户向客户端提供自己的用户名和密码。客户端使用这些信息，向&quot;服务商提供商&quot;索要授权。在这种模式中，用户必须把自己的密码给客户端，但是客户端不得储存密码。这通常用在用户对客户端高度信任的情况下，比如客户端是操作系统的一部分，或者由一个著名公司出品。而认证服务器只有在其他授权模式无法执行的情况下，才能考虑使用这种模式。</li>
<li>客户端模式（client credentials）
指客户端以自己的名义，而不是以用户的名义，向&quot;服务提供商&quot;进行认证。严格地说，客户端模式并不属于OAuth框架所要解决的问题。在这种模式中，用户直接向客户端注册，客户端以自己的名义要求&quot;服务提供商&quot;提供服务，其实不存在授权问题。</li>
</ul>
<h2 id="jwt是什么" tabindex="-1"><a class="header-anchor" href="#jwt是什么" aria-hidden="true">#</a> JWT是什么</h2>
<p><a href="https://jwt.io/" target="_blank" rel="noopener noreferrer">JSON Web Token（JWT）<ExternalLinkIcon/></a>是一个开放的行业标准（RFC 7519），它定义了一种简介的、自包含的协议格式，用于在通信双方传递json对象，传递的信息经过数字签名可以被验证和信任。JWT可以使用HS256算法或使用RSA的公钥/私钥对来签名，防止被篡改。</p>
<p>当用户使用其凭证成功登录后，一个 ID 令牌会被返回。按照 OpenID Connect (OIDC) 规范，该 ID 令牌就是一个JWT。也就是JWT在上述OAuth2.0的作用之一。</p>
<h3 id="jwt的组成" tabindex="-1"><a class="header-anchor" href="#jwt的组成" aria-hidden="true">#</a> JWT的组成</h3>
<p>一个JWT实际上就是一个字符串，它由三部分组成，头部（header）、载荷（payload）与签名（signature）。以点为分隔三部分字符串构成了如下的JWT：</p>
<p><code v-pre>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></p>
<ol>
<li>头部（header）
头部用于描述关于该JWT的最基本的信息：类型（即JWT）以及签名所用的算法（如HMAC、RSA、SHA、HS256）等。</li>
</ol>
<ul>
<li>alg: 签名此令牌的算法（algorithm），如 HMAC、RSA、SHA</li>
<li>typ: 令牌类型（type），值为 JWT
表示为JSON对象为</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> 
  <span class="token property">"alg"</span><span class="token operator">:</span> <span class="token string">"HS512"</span><span class="token punctuation">,</span>
  <span class="token property">"typ"</span><span class="token operator">:</span> <span class="token string">"JWT"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将这个json转base64得到JWT第一部分的字符串</p>
<ol start="2">
<li>载荷(payload)
存放有效信息的部分</li>
</ol>
<ul>
<li>iss: jwt签发者</li>
<li>sub: jwt所面向的用户，值必须要么是全局唯一的，要么在发行人上下文范围内局部唯一</li>
<li>aud: 接收jwt的一方</li>
<li>exp: jwt的过期时间，这个过期时间必须要大于签发时间</li>
<li>nbf: 定义在什么时间之前，该jwt都是不可用的</li>
<li>iat: jwt的签发时间，用的时间戳</li>
<li>jti: jwt的唯一身份标识，主要用来作为一次性token。</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"sub"</span><span class="token operator">:</span> <span class="token string">"2323233"</span><span class="token punctuation">,</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"dasdadd"</span><span class="token punctuation">,</span>
  <span class="token property">"iat"</span><span class="token operator">:</span> <span class="token number">1516239022</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将这个json转base64得到JWT第二部分的字符串</p>
<ol start="3">
<li>签名（signature）
签名先是通过对头部和负载 Base64 编码而生成，其后会与一个密钥联合，最好被头部中指定的算法签名。</li>
</ol>
<ul>
<li>header (base64后的)</li>
<li>payload (base64后的)</li>
<li>secret(盐，一定要保密）
签名被用于校验 JWT 的发送者是否名实相符，以及信息在传送过程中是否被更改。比如，如果创建了一个使用 HMAC SHA256 算法之令牌的签名，会像下面这样做：</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token function">HMACSHA256</span><span class="token punctuation">(</span><span class="token function">base64UrlEncode</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span> <span class="token function">base64UrlEncode</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span><span class="token punctuation">,</span> secret<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="springboot添加jwt" tabindex="-1"><a class="header-anchor" href="#springboot添加jwt" aria-hidden="true">#</a> Springboot添加JWT</h3>
<p>pom.xml添加</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/com.auth0/java-jwt --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.auth0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>java-jwt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.19.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>erciyuan<span class="token punctuation">.</span>utils</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>auth0<span class="token punctuation">.</span>jwt<span class="token punctuation">.</span></span><span class="token class-name">JWT</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>auth0<span class="token punctuation">.</span>jwt<span class="token punctuation">.</span>algorithms<span class="token punctuation">.</span></span><span class="token class-name">Algorithm</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>auth0<span class="token punctuation">.</span>jwt<span class="token punctuation">.</span>exceptions<span class="token punctuation">.</span></span><span class="token class-name">TokenExpiredException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>erciyuan<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">ApiException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * JwtToken生成的工具类
 * JWT token的格式：header.payload.signature
 * header的格式（算法、token的类型）,默认：<span class="token punctuation">{</span>"alg": "HS512","typ": "JWT"<span class="token punctuation">}</span>
 * payload的格式 设置：（用户信息、创建时间、生成时间）
 * signature的生成算法：
 * HMACSHA512(base64UrlEncode(header) + "." +base64UrlEncode(payload),secret)
 */</span>

<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"jwt"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JWTUtils</span> <span class="token punctuation">{</span>

  <span class="token comment">// 定义token返回头部</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> header <span class="token operator">=</span> <span class="token string">"Authorization"</span><span class="token punctuation">;</span>

  <span class="token comment">// token前缀</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> tokenPrefix <span class="token operator">=</span> <span class="token string">"token "</span><span class="token punctuation">;</span>

  <span class="token comment">// 签名密钥</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> secret <span class="token operator">=</span> <span class="token string">"wakaka!"</span><span class="token punctuation">;</span>

  <span class="token comment">// 有效期 token有效时间 建议一小时以上</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">long</span> expireTime <span class="token operator">=</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">;</span> <span class="token comment">// 单位毫秒</span>

  <span class="token comment">// 存进客户端的token的key名</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">USER_LOGIN_TOKEN</span> <span class="token operator">=</span> <span class="token string">"USER_LOGIN_TOKEN"</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token class-name">String</span> header<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JWTUtils</span><span class="token punctuation">.</span>header <span class="token operator">=</span> header<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setTokenPrefix</span><span class="token punctuation">(</span><span class="token class-name">String</span> tokenPrefix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JWTUtils</span><span class="token punctuation">.</span>tokenPrefix <span class="token operator">=</span> tokenPrefix<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setSecret</span><span class="token punctuation">(</span><span class="token class-name">String</span> secret<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JWTUtils</span><span class="token punctuation">.</span>secret <span class="token operator">=</span> secret<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setExpireTime</span><span class="token punctuation">(</span><span class="token keyword">int</span> expireTimeInt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">JWTUtils</span><span class="token punctuation">.</span>expireTime <span class="token operator">=</span> expireTimeInt <span class="token operator">*</span> <span class="token number">1000L</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 创建TOKEN
   * 
   * <span class="token keyword">@param</span> <span class="token parameter">sub</span> - 比如userID之类的
   * <span class="token keyword">@return</span>
   */</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">createToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> sub<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> tokenPrefix <span class="token operator">+</span> <span class="token constant">JWT</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">withSubject</span><span class="token punctuation">(</span>sub<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">withExpiresAt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> expireTime<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token class-name">Algorithm</span><span class="token punctuation">.</span><span class="token function">HMAC512</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 验证token
   * 
   * <span class="token keyword">@param</span> <span class="token parameter">token</span>
   * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">ApiException</span></span>
   */</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">validateToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ApiException</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token constant">JWT</span><span class="token punctuation">.</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token class-name">Algorithm</span><span class="token punctuation">.</span><span class="token function">HMAC512</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>tokenPrefix<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">getSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">TokenExpiredException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ApiException</span><span class="token punctuation">(</span><span class="token string">"token已经过期"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ApiException</span><span class="token punctuation">(</span><span class="token string">"token验证失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 检查token是否需要更新
   * 
   * <span class="token keyword">@param</span> <span class="token parameter">token</span>
   * <span class="token keyword">@return</span>
   * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">ApiException</span></span>
   */</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isNeedUpdate</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ApiException</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取token过期时间</span>
    <span class="token class-name">Date</span> expiresAt <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      expiresAt <span class="token operator">=</span> <span class="token constant">JWT</span><span class="token punctuation">.</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token class-name">Algorithm</span><span class="token punctuation">.</span><span class="token function">HMAC512</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>tokenPrefix<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">getExpiresAt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">TokenExpiredException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ApiException</span><span class="token punctuation">(</span><span class="token string">"token验证失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 如果剩余过期时间少于过期时常的一般时 需要更新</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>expiresAt<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token punctuation">(</span>expireTime <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li><a href="https://www.rfc-editor.org/rfc/rfc6749" target="_blank" rel="noopener noreferrer">OAuth2.0规范的地址<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/509212673" target="_blank" rel="noopener noreferrer">OAuth2.0 详解<ExternalLinkIcon/></a></li>
<li><a href="https://blog.csdn.net/weixin_45525272/article/details/125920928" target="_blank" rel="noopener noreferrer">OAuth2.0 四种授权模式（图解）<ExternalLinkIcon/></a></li>
<li><a href="https://jwt.io/" target="_blank" rel="noopener noreferrer">JSON Web Token（JWT） 官网<ExternalLinkIcon/></a></li>
</ul>
</div></template>


