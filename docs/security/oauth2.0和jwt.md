# OAuth2.0和JWT

<ClientOnly>
  <MTA/>
</ClientOnly>


## OAuth2.0
是目前最流行的第三方应用登录授权机制。


OAuth2.0标准定义四种角色：

- 客户端（Client）
- 资源所有者（Resource Owner）
- 资源服务器（Resource Server）
- 授权服务器（Authorization Server）

OAuth2.0标准定义四种授权模式：

- 授权码模式（authorization code）
- 简化模式（implicit）
- 密码模式（password）
- 客户端模式（client credentials）

### 场景
- 原生app授权：app登录请求后台接口，为了安全认证，所有请求都带token信息，如果登录验证、 请求后台数据。
- 前后端分离单页面应用：前后端分离框架，前端请求后台数据，需要进行oauth2安全认证
第三方应用授权登录，比如QQ，微博，微信的授权登录。

### OAuth2.0协议流程
```txt
  +--------+                               +---------------+
  |        |--(A)- Authorization Request ->|   Resource    |
  |        |                               |     Owner     |
  |        |<-(B)-- Authorization Grant ---|               |
  |        |                               +---------------+
  |        |
  |        |                               +---------------+
  |        |--(C)-- Authorization Grant -->| Authorization |
  | Client |                               |     Server    |
  |        |<-(D)----- Access Token -------|               |
  |        |                               +---------------+
  |        |
  |        |                               +---------------+
  |        |--(E)----- Access Token ------>|    Resource   |
  |        |                               |     Server    |
  |        |<-(F)--- Protected Resource ---|               |
  +--------+                               +---------------+
```
上图表示的步骤。
1. 用户打开客户端以后，客户端要求用户给予授权。
2. 用户同意给予客户端授权。
3. 客户端使用上一步获得的授权，向认证服务器申请令牌。
4. 认证服务器对客户端进行认证以后，确认无误，同意发放令牌。
5. 客户端使用令牌，向资源服务器申请获取资源。
6. 资源服务器确认令牌无误，同意向客户端开放资源。

这些步骤里关键的是第二个步骤。有了这个授权以后，客户端就可以获取令牌，进而凭令牌获取资源。

- 授权码模式（authorization code）
功能最完整、流程最严密的授权模式。它的特点就是通过客户端的后台服务器，与"服务提供商"的认证服务器进行互动。
- 简化模式（implicit）
不通过第三方应用程序的服务器，直接在浏览器中向认证服务器申请令牌，跳过了"授权码"这个步骤，因此得名。所有步骤在浏览器中完成，令牌对访问者是可见的，且客户端不需要认证。
- 密码模式（password）
用户向客户端提供自己的用户名和密码。客户端使用这些信息，向"服务商提供商"索要授权。在这种模式中，用户必须把自己的密码给客户端，但是客户端不得储存密码。这通常用在用户对客户端高度信任的情况下，比如客户端是操作系统的一部分，或者由一个著名公司出品。而认证服务器只有在其他授权模式无法执行的情况下，才能考虑使用这种模式。
- 客户端模式（client credentials）
指客户端以自己的名义，而不是以用户的名义，向"服务提供商"进行认证。严格地说，客户端模式并不属于OAuth框架所要解决的问题。在这种模式中，用户直接向客户端注册，客户端以自己的名义要求"服务提供商"提供服务，其实不存在授权问题。

## JWT是什么
[JSON Web Token（JWT）](https://jwt.io/)是一个开放的行业标准（RFC 7519），它定义了一种简介的、自包含的协议格式，用于在通信双方传递json对象，传递的信息经过数字签名可以被验证和信任。JWT可以使用HS256算法或使用RSA的公钥/私钥对来签名，防止被篡改。

当用户使用其凭证成功登录后，一个 ID 令牌会被返回。按照 OpenID Connect (OIDC) 规范，该 ID 令牌就是一个JWT。也就是JWT在上述OAuth2.0的作用之一。

### JWT的组成
一个JWT实际上就是一个字符串，它由三部分组成，头部（header）、载荷（payload）与签名（signature）。以点为分隔三部分字符串构成了如下的JWT：

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

1. 头部（header）
头部用于描述关于该JWT的最基本的信息：类型（即JWT）以及签名所用的算法（如HMAC、RSA、SHA、HS256）等。
- alg: 签名此令牌的算法（algorithm），如 HMAC、RSA、SHA
- typ: 令牌类型（type），值为 JWT
表示为JSON对象为 
```json
{ 
  "alg": "HS512",
  "typ": "JWT"
}
```
然后将这个json转base64得到JWT第一部分的字符串

2. 载荷(payload)
存放有效信息的部分

- iss: jwt签发者
- sub: jwt所面向的用户，值必须要么是全局唯一的，要么在发行人上下文范围内局部唯一
- aud: 接收jwt的一方
- exp: jwt的过期时间，这个过期时间必须要大于签发时间
- nbf: 定义在什么时间之前，该jwt都是不可用的
- iat: jwt的签发时间，用的时间戳
- jti: jwt的唯一身份标识，主要用来作为一次性token。
```json
{
  "sub": "2323233",
  "name": "dasdadd",
  "iat": 1516239022
}
```
然后将这个json转base64得到JWT第二部分的字符串

3. 签名（signature）
签名先是通过对头部和负载 Base64 编码而生成，其后会与一个密钥联合，最好被头部中指定的算法签名。
- header (base64后的)
- payload (base64后的)
- secret(盐，一定要保密）
签名被用于校验 JWT 的发送者是否名实相符，以及信息在传送过程中是否被更改。比如，如果创建了一个使用 HMAC SHA256 算法之令牌的签名，会像下面这样做：
```java
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```


### Springboot添加JWT

pom.xml添加
```xml
<!-- https://mvnrepository.com/artifact/com.auth0/java-jwt -->
  <dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.19.1</version>
  </dependency>
```
```java
package com.example.erciyuan.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.erciyuan.common.ApiException;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * JwtToken生成的工具类
 * JWT token的格式：header.payload.signature
 * header的格式（算法、token的类型）,默认：{"alg": "HS512","typ": "JWT"}
 * payload的格式 设置：（用户信息、创建时间、生成时间）
 * signature的生成算法：
 * HMACSHA512(base64UrlEncode(header) + "." +base64UrlEncode(payload),secret)
 */

@Component
@ConfigurationProperties(prefix = "jwt")
public class JWTUtils {

  // 定义token返回头部
  public static String header = "Authorization";

  // token前缀
  public static String tokenPrefix = "token ";

  // 签名密钥
  public static String secret = "wakaka!";

  // 有效期 token有效时间 建议一小时以上
  public static long expireTime = 24 * 60 * 1000; // 单位毫秒

  // 存进客户端的token的key名
  public static final String USER_LOGIN_TOKEN = "USER_LOGIN_TOKEN";

  public void setHeader(String header) {
    JWTUtils.header = header;
  }

  public void setTokenPrefix(String tokenPrefix) {
    JWTUtils.tokenPrefix = tokenPrefix;
  }

  public void setSecret(String secret) {
    JWTUtils.secret = secret;
  }

  public void setExpireTime(int expireTimeInt) {
    JWTUtils.expireTime = expireTimeInt * 1000L * 60;
  }

  /**
   * 创建TOKEN
   * 
   * @param sub - 比如userID之类的
   * @return
   */
  public static String createToken(String sub) {
    return tokenPrefix + JWT.create()
        .withSubject(sub)
        .withExpiresAt(new Date(System.currentTimeMillis() + expireTime))
        .sign(Algorithm.HMAC512(secret));
  }

  /**
   * 验证token
   * 
   * @param token
   * @throws ApiException
   */
  public static String validateToken(String token) throws ApiException {
    try {
      return JWT.require(Algorithm.HMAC512(secret))
          .build()
          .verify(token.replace(tokenPrefix, ""))
          .getSubject();
    } catch (TokenExpiredException e) {
      throw new ApiException("token已经过期");
    } catch (Exception e) {
      throw new ApiException("token验证失败");
    }
  }

  /**
   * 检查token是否需要更新
   * 
   * @param token
   * @return
   * @throws ApiException
   */
  public static boolean isNeedUpdate(String token) throws ApiException {
    // 获取token过期时间
    Date expiresAt = null;
    try {
      expiresAt = JWT.require(Algorithm.HMAC512(secret))
          .build()
          .verify(token.replace(tokenPrefix, ""))
          .getExpiresAt();
    } catch (TokenExpiredException e) {
      return true;
    } catch (Exception e) {
      throw new ApiException("token验证失败");
    }
    // 如果剩余过期时间少于过期时常的一般时 需要更新
    return (expiresAt.getTime() - System.currentTimeMillis()) < (expireTime >> 1);
  }
}

```





## 参考
- [OAuth2.0规范的地址](https://www.rfc-editor.org/rfc/rfc6749)
- [OAuth2.0 详解](https://zhuanlan.zhihu.com/p/509212673)
- [OAuth2.0 四种授权模式（图解）](https://blog.csdn.net/weixin_45525272/article/details/125920928)
- [JSON Web Token（JWT） 官网](https://jwt.io/)