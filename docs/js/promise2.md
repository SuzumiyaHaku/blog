# Promise--下

<ClientOnly>
  <MTA/>
</ClientOnly>


## 分析一道promise打印顺序的题
:::: code-group
::: code-group-item promise
```js
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
```
:::

::: code-group-item  / PromiseA+ 
```js
// 用上文里实现的promiseA.js
var PromiseA = require('./PromiseA.js');
// 增加一个resolve的实现
PromiseA.resolve = function(v) {
  return new PromiseA((resolve, reject) => resolve(v))
}

PromiseA.resolve().then(() => {
  console.log(0);
  return PromiseA.resolve(4);
}).then((res) => {
  console.log(res)
})

PromiseA.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
```
:::

::: code-group-item  / PromisePolyfill
```js
var PromisePolyfill = require('promise-polyfill');
PromisePolyfill.resolve().then(() => {
    console.log(0);
    return PromisePolyfill.resolve(4);
}).then((res) => {
    console.log(res)
})

PromisePolyfill.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
```
:::


::::

| - | 结果 | 第几次打印 |
| -- | -- | -- |
| promise | 0, 1, 2, 3, `4`, 5, 6 | 第 5 次打印 |
| promiseA+ | 0, 1, 2, `4`, 3, 5, 6 | 第 4 次打印 |
| promisePolyfill | 0, 1, `4`, 2, 3, 5, 6 | 第 3 次打印 |

他们都可以通过promises-aplus-tests的测试。但是得到了不一样的结果。

1. 第一次执行
```js
Promise.resolve().then(() => {
  console.log(0)
  // ...
})
```
2. 根据Promise规范2.2.4条：onFulfilled 和 onRejected 只有在[执行上下文](https://es5.github.io/#x10.3)堆栈仅包含平台代码时才可被调用 [注3.1]。 此时的then里的是onFulfilled函数，所以要等和then同级别的函数先执行。
3. 所以接下来执行如下的部分。
```js
Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
```
理论上第三次执行是要执行的如下代码里面的 Promise.resolve(4)打印的部分
```js
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((res) => {
  console.log(res)
})
```

- 原生promise延迟了两次后才打印
- 按照规范写的promiseA延迟了一次
- 只有promisePolyfill刚好在第3次打印了Promise.resolve(4)的结果。

后面的执行结果都一样

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