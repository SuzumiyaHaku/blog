# 跨域请求

<ClientOnly>
  <MTA/>
</ClientOnly>


## 描述
CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。是浏览器的资源策略之一。主要是以下的http请求头和响应头字段
1. `Access-Control-Allow-Origin：* ` 该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
2. `Access-Control-Allow-Credentials: true` 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。前端需要在js中写
```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```
需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。

3. `Access-Control-Expose-Headers: xxx` 该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。

4. `Access-Control-Request-Method: POST` 该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，如POST

5. `Access-Control-Request-Headers: token` 该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，比如提交token

6. `Access-Control-Allow-Methods:` 该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

7. `Access-Control-Allow-Headers` 如果前端的请求提交了 `Access-Control-Request-Headers: token`，那么就要返回`Access-Control-Allow-Headers: token`回去，但是不限于只返回'token'


8. `Access-Control-Max-Age: 86400` 数字单位是秒，代表多少时间内，不用再发OPTIONS请求，google浏览器最大是600秒。Firefox最大是86400

详细查看[跨域资源共享 CORS 详解 阮一峰](https://www.ruanyifeng.com/blog/2016/04/cors.html)
## 解决跨域
用webpack配置proxy解决跨域，详细查看[官网](https://www.webpackjs.com/configuration/dev-server/#devserver-proxy)
### java Springboot后端解决跨域
后端设置响应头解决跨域
```java
@Component
public class CORSInterceptor implements HandlerInterceptor {
  
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS");
    response.setHeader("Access-Control-Max-Age", "86400");
    response.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type,content-type");
    
    // 如果是OPTIONS则结束请求
    if (HttpMethod.OPTIONS.toString().equals(request.getMethod())) {
        response.setStatus(HttpStatus.NO_CONTENT.value());
        return false;
    }
    return true;
  }
}
```
### nginx解决跨域
nginx设置响应头解决跨域
```shell
server {
        listen 3639;
	      server_name www.aaa.com;

        location / {
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

                add_header Access-Control-Allow-Origin * always;
                add_header Access-Control-Allow-Credentials true;
                add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
		add_header Access-Control-Max-Age 86400;		

                proxy_pass http://127.0.0.1:3636;
        }
}
```

### 浏览器安装插件解决跨域
火狐安装CORS Everywhere