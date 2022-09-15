# vue3
## 模块
带有-browser字样的esm资源是直接给<script type ="module"\>使用的
带有-bundler是给打包工具使用的
## Tree-Shaking副作用移除注释
```js
import { foo } from './utils'
/*#__PURE__*/ foo()
```
注释代码告诉rollup.js、webpack、压缩的terser。 对于foo函数的调用不会产生副作用，可以摇掉。
## 特性开关
```js
if (__FEATURE_OPTIONS_API__) {
  //...
}
```
“当 Vue.js 构建资源时，如果构建的资源是供打包工具使用的（即带有 -bundler 字样的资源），那么上面的代码在资源中会变成”
```js
if (__VUE_OPTIONS_API__) {
}
```
__VUE_OPTIONS_API__是一个特性开关
可以在，webpack.DefinePlugin开启特性
```js
new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: JSON.stringify(true)
})
```

## 错误处理
```js
“// utils.js
 export default {
   foo(fn) {
     callWithErrorHandling(fn)
   },
   bar(fn) {
     callWithErrorHandling(fn)
   },
 }
 function callWithErrorHandling(fn) {
   try {
     fn && fn()
   } catch (e) {
     console.log(e)
   }
 }
```