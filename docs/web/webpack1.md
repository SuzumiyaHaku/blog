# webpack

<ClientOnly>
  <MTA/>
</ClientOnly>


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
- `IgnorePlugin` 忽略某些文件，比如去掉moment.js时间库里的非中文的语言，大大减少包的体积
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

1. 打包缓存

在4.x版本中需要使用cache-loader来对打包结果进行缓存。在5.x版本中，无需再次安装cache-loader，如果没有做任何配置，默认就开启了打包缓存，不过是缓存到内存(memory)中，内存的空间多么宝贵啊，有些时候内存可能还不够用，我们就可以对cache配置，将缓存结果缓存到硬盘(filesystem)中。同时也可以指定缓存文件被保存的位置。
配置webpack.config.js的cache.type 设置为 'filesystem'时，编译的缓存默认在 node_modules/.cache/webpack里

```js
module.exports = {
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    buildDependencies: {
      config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    compression: 'gzip', // 配置项仅在 cache.type 设为 'filesystem' 时可用。用于缓存文件的压缩类型。development 模式下默认为 false，production 模式下默认为 'gzip'。
  },
}
```
2. 模块联邦

在webpack.config.js中增加模块联邦配置。其实就是一个plugins插件，它的位置在webpack/lib/container/ModuleFederationPlugin，我们只需要引入即可。
```js
// paas项目的 webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    plugins: [
        new ModuleFederationPlugin({
            name: "paas",
            filename: "paas-file-entry.js",
            exposes: {
                "./paasComp": "./src/paasComp.js"
            }
        })
    ],
}
// 1. name 当前应用名称，需要全局唯一。
// 2. remotes 可以将其他项目的 name 映射到当前项目中。
// 3. filename 构建后的chunk名称
// 4. exposes 表示导出的模块，用于暴露对外提供的modules模块。只有在此申明的模块才可以作为远程依赖被使用。
// 5. shared 声明共享的第三方资源。例如可以让远程加载的模块对应依赖改为使用本地项目的 React 或 ReactDOM。
```
3. 加强了tree shaking 优化
还需要在加强！
## webpack性能优化
性能优化，要不就是打包优化，要不就是运行优化。可能升级版本就是最大的优化。
webpack官网已经给出了一些优化建议[构建性能](https://www.webpackjs.com/guides/build-performance/)

### terser-webpack-plugin 优化代码的流程主要体现在这几个方面
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

- [在淘宝优化了一个大型项目，分享一些干货（Webpack，SplitChunk代码实例，图文结合）](https://juejin.cn/post/6844904183917871117)
- [妈妈再也不用担心我的优化｜Webpack系列（二）：SplitChunksPlugin源码讲解](https://juejin.cn/post/6844904196790026253)

- [Tree-Shaking 实现原理](https://mp.weixin.qq.com/s/McigcfZyIuuA-vfOu3F7VQ)
- [基于 Webpack Module Federation，这可能是一个比较优雅的微前端解决方案](https://zhuanlan.zhihu.com/p/422460780)
