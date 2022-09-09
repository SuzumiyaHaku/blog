# 深入Promise--下

## Promise的缺点
- promise一旦新建就会立即执行，中途无法取消
- 当处于pending状态时，无法得知当前出于那一个状态，是刚开始还是刚结束
- 如果不设置回调函数，promise内部的错误就无法反映到外部

## try...catch不能捕获Promise的error

捕获失败：
```js
function foo() {
  try {
    new Promise(function fn2(resolve, reject) {
        throw 2334;
    })
    
  } catch(e) {
    console.log('捕获：', e);
  }
}
foo() 
// Uncaught (in promise) 2334
```
增加async和await捕获成功：
```js
async function foo() {
  try {
    await new Promise(function fn2(resolve, reject) {
        throw 2334;
    })
    
  } catch(e) {
    console.log('捕获：', e);
  }
}
foo()
// 捕获： 2334 
```

捕获失败
```js
try {
    (async () => {
    	throw 123;
		})()
 } catch(e) {
    console.log('捕获：', e);
 }
// VM6159:3 Uncaught (in promise) 123
```
把的try catch包裹在正确的时机、才能捕获到错误，学习《深入浅出Nodejs》时，在第四章 - 异步编程中作者朴灵曾提到，异步编程的难点之一是异常处理，书中描述" 尝试对异步方法进行try/catch操作只能捕获当次事件循环内的异常，对callback执行时抛出的异常将无能为力 "。

## async/await 与promise
async/await这玩意儿是es7即es2018的内容。

::: tip
es7的async / await 是yield + promise语法糖，
:::
第一个，把如下代码转es5
```js
async function foo() {
  let r = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(233)
    }, 1000)
  })
  console.log(r)
}
foo()
```
得到
```js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        let r = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(233);
            }, 1000);
        });
        console.log(r);
    });
}
foo();

```
第二个，是t39的提案里面提的https://github.com/tc39/proposal-async-await   建议使用生成器去实现
> This proposal is implemented in a regenerator which can compile ES5 code containing async and await down to vanilla ES5 to run in existing browsers and runtimes.

第三个，是你不知道的JavaScript下卷 8.8小结提到：
- async function 是建立在生成器 ＋ promise 模式（参见第 4 章）之上的强大的语法糖。

## 参考
- 《深入浅出nodejs》
- [Promise.prototype.then()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- [Async Functions for ECMAScript](https://github.com/tc39/proposal-async-await)
- [你不知道的JavaScript下卷 8.8小结]