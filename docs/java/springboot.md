# springboot

## 项目结构
```java
./
├── java
│   └── com
│       └── example
│           └── erciyuan
│               ├── ErciyuanApplication.java
│               ├── bean
│               ├── common
│               ├── config
│               ├── controller
│               ├── mapper
│               ├── service
│               │   ├── UserService.java
│               │   └── impl
│               │       └── UserServiceImpl.java
│               └── utils
│                   └── CORSInterceptor.java
└── resources
    ├── application.properties
    ├── application.yml
    ├── mybatis
    │   ├── mapper
    │   │   └── UserMapper.xml
    │   └── mybatis-config.xml
    ├── static
    │   └── test.html
    └── templates
        └── index.html
```
## pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.6.6</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>erciyuan</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>erciyuan</name>
	<description>"erciyuan" project for Spring Boot</description>
	<properties>
		<java.version>11</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jdbc</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-redis</artifactId>
			<!--requirepass wangpaifeixinyuan123! -->
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>

		<dependency>
			<groupId>org.mariadb.jdbc</groupId>
			<artifactId>mariadb-java-client</artifactId>
			<version>3.0.4</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter -->
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid-spring-boot-starter</artifactId>
			<version>1.2.9</version>
		</dependency>
		<!-- https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>2.2.2</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper-spring-boot-starter -->
		<!--springboot项目里要配合pagehelper-spring-boot-autoconfigure使用-->
		<dependency>
			<groupId>com.github.pagehelper</groupId>
			<artifactId>pagehelper-spring-boot-starter</artifactId>
			<version>1.4.2</version>
		</dependency>
		<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper-spring-boot-autoconfigure -->
		<dependency>
			<groupId>com.github.pagehelper</groupId>
			<artifactId>pagehelper-spring-boot-autoconfigure</artifactId>
			<version>1.4.2</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/com.auth0/java-jwt -->
		<dependency>
			<groupId>com.auth0</groupId>
			<artifactId>java-jwt</artifactId>
			<version>3.19.1</version>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<configuration>
					<excludes>
						<exclude>
							<groupId>org.projectlombok</groupId>
							<artifactId>lombok</artifactId>
						</exclude>
					</excludes>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>

```

application.yml
``` yml
server:
  port: 3636
spring:
  mvc:
    hiddenmethod:
      filter:
        enabled: true
  jackson:
    ##date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    serialization:
      write-dates-as-timestamps: true
    
  datasource:
    driver-class-name: org.mariadb.jdbc.Driver
    url: jdbc:mariadb://192.168.1.233:23333/qaq?serverTimezone=UTC&useUnicode=true&characterEncoding=UTF-8
    username: user
    password: 123456

    druid:
      # 指明是否在从池中取出连接前进行检验,如果检验失败, 则从池中去除连接并尝试取出另一个，
      #注意: 设置为true后如果要生效,validationQuery参数必须设置为非空字符串
      test-on-borrow: false
      # 指明连接是否被空闲连接回收器(如果有)进行检验.如果检测失败,则连接将被从池中去除. 
      #注意: 设置为true后如果要生效,validationQuery参数必须设置为非空字符串
      test-while-idle: false
      # 指明是否在归还到池中前进行检验，注意: 设置为true后如果要生效,
      #validationQuery参数必须设置为非空字符串
      test-on-return: false
      # SQL查询,用来验证从连接池取出的连接,在将连接返回给调用者之前.
      #如果指定,则查询必须是一个SQL SELECT并且必须返回至少一行记录
      #validation-query: select 1
      stat-view-servlet:
        enabled: true
        url-pattern: /druid/*
        login-username: user
        login-password: 123456
      filters: stat,wall,slf4j
      filter:
        stat:
          slow-sql-millis: 1000 # 慢查询监控开启
          log-slow-sql: true
      aop-patterns: com.example.erciyuan.*
      web-stat-filter:
        enabled: true
        url-pattern: /*
        exclusions: ‘*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*’
  jdbc:
    template:
      query-timeout: 1000 
  redis:
    database: 0
    host: 192.168.2.233
    port: 6379
    password: 123456
    lettuce:
      pool:
        max-active: -1

management:
  endpoints:
    enabled-by-default: true
    web:
      exposure:
        include: '*'

mybatis: 
  mapper-locations: classpath:mybatis/mapper/*.xml
  configuration:
    map-underscore-to-camel-case: true
  # 分页配置参数
pagehelper:
  page-size-zero: true
  helper-dialect: mariadb
  reasonable: true
  support-methods-arguments: true
  params: count=countSql
```


## 参考
- [mybatis-plus官网](https://baomidou.com/)
- [Druid数据库连接池](https://github.com/alibaba/druid/wiki/常见问题)
- [Springboot官网](https://spring.io/projects/spring-boot/)
- [mybatis官网](https://mybatis.org/mybatis-3/)
- [一个开源监控平台](https://hertzbeat.com/docs/)
- [springboot自动配置原理](https://www.yuque.com/atguigu/springboot/qb7hy2)
- [springboot官方的spring-boot-starter-*](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters)