# 跨域请求

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