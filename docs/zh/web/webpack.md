# webpack
## 常用loader
- `babel-loader` 语法转换
- `sass-loader` sass转css
- `less-loader` less转css
- `css-loader` 加载 CSS，支持模块化、压缩、文件导入等特性
- `style-loader` 把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- `postcss-loader` 扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', "css-loader", {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "autoprefixer",
                ],
              ],
            },
          }
        }],
      },
    ],
  },
}
```
- `vue-loader` vue文件解析
- `eslint-loader` eslint检查
- `tslint-loader` tslint检查
- `mocha-loader` 加载 Mocha 测试用例的代码
- [`assets通用资源类型`](https://webpack.docschina.org/guides/asset-modules/#general-asset-type) webpack5用来替代image-loader/url-loader/file-loader
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg|gif|webp|)/,
        type: 'asset',
       parser: {
         dataUrlCondition: {
           maxSize: 4 * 1024 // 4kb
         }
       }
      }
    ]
  },
}
```

## 常用plugin
- `html-webpack-plugin` html文件的创建
- `copy-webpack-plugin` 文件拷贝
- `mini-css-extract-plugin`
    - webpack4.0通常使用mini-css-extract-plugin 提取css
    - webpack3.0 使用 extract-text-webpack-plugin提取css

- `uglifyjs-webpack-plugin` js压缩 不支持 ES6 压缩 (Webpack4 以前)
- `terser-webpack-plugin` js压缩 支持压缩 ES6
- `optimize-css-assets-webpack-plugin ` css压缩 webpack5以前
- `css-minimizer-webpack-plugin` css压缩
```js
// webpack5使用css-minimizer-webpack-plugin（需要注意使用TerserWebpackPlugin来压缩js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports {
    optimization: {
      minimize: true,
      minimizer: [ // 配置了该选项，则认为开发者自定义压缩
        new TerserWebpackPlugin({ test: /\.js(\?.*)?$/i }), // 压缩js
        new CssMinimizerPlugin(),
      ],
  },
}
```
- [`eslint-webpack-plugin`](https://github.com/webpack-contrib/eslint-webpack-plugin/blob/master/README.md)在 webpack 4 中，ESLint 是通过 loader 的方式集成到 webpack 中的。在 webpack 5 中，是通过 plugins（插件）的形式进行集成
```js
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  plugins: [new ESLintPlugin({ fix: true/* 自动修改不合法的写法 */ })]
}
```
- `clean-webpack-plugin` 目录清理 webpack5已内置可配置output.clean: true开启，具体查看https://webpack.js.org/configuration/output/#outputclean
- `speed-measure-webpack-plugin` 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
- `webpack-merge` 配置合并
- `compression-webpack-plugin` gzip压缩
- `webpack-bundle-analyzer` 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

## loader的原理
loader本质是一个JavaScript模块，用来处理传入的内容然后返回。
### 实现一个最简单的loader
```js
module.exports = function(source) {
  // source 为 compiler 传递给 Loader 的一个文件的原内容
  // 直接把原内容返回了，相当于该 Loader 没有做任何转换
  return source;
};
```

```js
module.exports = function(source) {
  // 通过 this.callback 告诉 Webpack 返回的结果
  this.callback(null, source, sourceMaps);
  // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
  // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 
  return;
};
```
其中的 this.callback 是 Webpack 给 Loader 注入的 API，以方便 Loader 和 Webpack 之间通信。 this.callback 的详细使用方法如下
```js
this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);
```
Webpack 提供了loader-utils工具为我们读取下图里loader的配置
```js
module.exports = {
  module: {
      rules: [
          {
              test: /\.js$/,
              use: [
                  {
                      loader: 'my-loader',
                      options: {
                          flag: true,
                      },
                  },
              ],
          },
      ],
  },
}
```
使用：
```js
const loaderUtils = require('loader-utils')
module.exports = function (content) {
  const options = loaderUtils.getOptions(this)
  console.log('options', options)
  return content
}
```
让loader缓存处理结果也就是没有依赖变化的话，就直接读缓存的，这样可以加快webpack的构建速度。
```js
module.exports = function (content) {
  // 开始缓存
  this.cacheable && this.cacheable(); // 传入false关闭缓存
  return content
}
```
异步loader
```js
module.exports = function(source) {    
    // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
    var callback = this.async()

    setTimeout(source, function (err, result, sourceMaps, ast) {
      // 通过 callback 返回异步执行后的结果
      callback(err, result, sourceMaps, ast)
    }, 1000)
};
```

## plugin的原理
每一个 plugin 都是一个类（因为js的类本质也可以是一个函数，所以也能写成函数），主要关注这个类的两个方法，一个是构造函数 constructor ，还有一个是 apply 方法。在 constructor 中可以获得配置 plugin 时传入的参数，而 apply 方法则是 webpack 会调用的方法。每个插件都有两个重要的钩子，一个是compiler钩子，还有一个是compilation钩子。

compiler是webpack构建启动[plugin].apply(compiler)传进来的。
具体可以找到[webpack源码 main/lib/webpack.js](https://github.com/webpack/webpack/blob/main/lib/webpack.js#L70_L74)里
```js
  // ...
	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				plugin.call(compiler, compiler);
			} else {
				plugin.apply(compiler);
			}
		}
	}
  // ...
```
### 实现一个最简单的plugin

```js
// 异步plugin
class HelloAsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'HelloAsyncPlugin',
      (compilation, callback) => {
        // 执行某些异步操作...
        setTimeout(function () {
          console.log('异步任务完成...');
          callback();
        }, 1000);
      }
    );
  }
}

module.exports = HelloAsyncPlugin;
```

```js
//异步promise
class HelloAsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapPromise('HelloAsyncPlugin', (compilation) => {
      // 返回一个 pormise ，异步任务完成后 resolve
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          console.log('异步任务完成...');
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = HelloAsyncPlugin;
```


## webpack5的对比4的新特性

## webpack性能优化
可能升级版本就是最大的优化。
### terser-webpack-plugin 优化代码的流程主要体现在这几个方面：
1. 异步注册 compilation.hooks.optimizeChunkAssets
2. 在回调中调用 plugin 实例的 optimise 方法
3. 并行模式：创建 Worker 进行多线程编译
4. minify 过程调用 terser 库对代码进行处理

### gzip进行压缩
> pnpm add compression-webpack-plugin --save-dev
```js
module.exports = {
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
    }),
  ]
}
```
压缩后得到，.gz的文件。在nginx配置里配置gzip有静态和动态的， 两个的区别，就是静态Gzip是直接用已经存在的.gz文件进行加载，而动态Gzip则是实时加载（CPU负载高）。
```shell
    gzip_static on;
    gzip_proxied expired no-cache no-store private auth;
    gzip on;
    gzip_min_length 1k;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
```

## webpack和vite
### vite
#### 浏览器缓存
源码模块的请求会根据304 not Modified进行协商缓存，而依赖模块则会通过Cache-Control：max-age=3253600,immutable进行强制缓存，一旦被缓存它们将不再需要再次请求。
#### 文件系统缓存
Vite会将预构建的依赖缓存到node_modules/.vite。它根据几个源来决定是否需要重新运行预构建步骤：
- package.json中的dependencies列表。
- 包管理器的 lockfile，例如 package-lock.json, yarn.lock，或者 pnpm-lock.yaml。
- 可能在 vite.config.js 相关字段中配置过的。

只有在上述其中一项发生更改时，才需要重新运行预构建。

如果出于某些原因，你想要强制 Vite 重新构建依赖，你可以用 --force 命令行选项启动开发服务器，或者手动删除 node_modules/.vite 目录。



## HMR 热更新原理
### webpack热更新
1. webpack-dev-middleware 是一个容器(wrapper), 它可以把 webpack 处理后的文件传递给一个服务器(server). webpack-dev-server 在内部使用了它。
2. 浏览器加载页面后，与 webpack-dev-server 建立 WebSocket 连接
3. Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 hash 事件
4. 浏览器接收到 hash 事件后，请求 manifest 资源文件，确认增量变更范围
5. 浏览器加载发生变更的增量模块
6. Webpack 运行时触发变更模块的 module.hot.accept 回调，执行代码变更逻辑

webpack启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改
> webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
webpack.config.js
```js
module.exports = {
  //...
  watch: true,
};
```
### vite 热更新
1. 服务器启动时创建 WebSocket 实例、通过 [chokidar(是封装 Node.js 监控文件系统文件变化功能的库，它解决了原生fs.watch、fs.watchFile的问题)](https://www.npmjs.com/package/chokidar) 监听文件修改
2. 对请求的 HTML 文件注入客户端热更新代码
3. 加载客户端热更新代码时，创建 WebSocket 实例，并注册监听
4. 当被请求文件中有import.meta.hot.accept时，向该文件注入import.meta.hot.accept定义
5. 当文件更新时，触发文件修改的回调。
6. 如果是配置文件、自定义插件、.env文件修改直接重启服务器
7. 反之，根据模块路径向上查找；收集接受当前依赖项更新的模块，并判断是否是刷新页面
8. 如果是刷新页面，向客户端发送刷新页面的消息，反之发送更新消息，并将接受当前依赖项更新的模块一起发送给客户端
9. 客户端接收到之后，获取要更新的模块路径和热更新回调，通过import()请求要更新模块的路径，并在 URL 挂上import和时间戳；并在下一任务队列中触发热更新回调。

## 参考
- [webpack5 官网英文 配置部分](https://webpack.js.org/configuration/)
- [webpack5 官网中文 loader](https://www.webpackjs.com/loaders/url-loader/)
- [webpack 官网 手写Plugin](https://webpack.docschina.org/contribute/writing-a-plugin/)
- [webpack 官网 编写loader](https://webpack.docschina.org/contribute/writing-a-loader/)
- [webpack 官网 Tree Shaking](https://webpack.docschina.org/guides/tree-shaking/)
- [吃透 Webpack 核心原理](https://zhuanlan.zhihu.com/p/363928061)
- [loader-runner —— loader的执行库](https://github.com/webpack-contrib/url-loader/blob/master/src/index.js)
- [多图详解，一次性搞懂Webpack Loader](https://juejin.cn/post/6992754161221632030#heading-5)
- [《深入浅出webpack》在线书籍](http://webpack.wuhaolin.cn/)
- [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
- [HMR 原理全解析](https://zhuanlan.zhihu.com/p/410510492)
- [在淘宝优化了一个大型项目，分享一些干货（Webpack，SplitChunk代码实例，图文结合）](https://juejin.cn/post/6844904183917871117)
- [妈妈再也不用担心我的优化｜Webpack系列（二）：SplitChunksPlugin源码讲解](https://juejin.cn/post/6844904196790026253)

- [Tree-Shaking 实现原理](https://mp.weixin.qq.com/s/McigcfZyIuuA-vfOu3F7VQ)
- [vite 热更新原理](http://www.icodebang.com/article/283616)
- [chokidar(是封装 Node.js 监控文件系统文件变化功能的库，它解决了原生fs.watch、fs.watchFile的问题)](https://www.npmjs.com/package/chokidar)
- [基于 Webpack Module Federation，这可能是一个比较优雅的微前端解决方案](https://zhuanlan.zhihu.com/p/422460780)