# 洋葱模型
## 输出1 2 3 4 5 6
```js
async function A(next) {
  console.log(1)
  await next()
  console.log(6)
}
async function B(next) {
  console.log(2)
  await next()
  console.log(5)
}
async function C(next) {
  console.log(3)
  await next()
  console.log(4)
}
let fnArr = [A, B, C]


function dispatch(i) {
  if(i < fnArr.length) {
    i++
    let next = () => {
      dispatch(i)
    }
    i < fnArr.length && fnArr[i](next)
  }
}
dispatch(-1) 

```
// 本质，利用A的next回调执行B函数，利用B的next执行C函数，
// 执行A函数遇见next回调就等B函数执行
// 执行B函数遇见next回调就等C函数执行
```js
async function A(next) {
  console.log(1)
  await (async function B(next) {
    console.log(2)
    await (async function C(next) {
      console.log(3)
      await next()
      console.log(4)
    })()
    console.log(5)
  })()
  console.log(6)
}
```

## koa
```js
const Koa2 = require('koa2');
const app = new Koa2();

app.use(async (ctx, next) => {
  console.log('第一层洋葱 - 开始')
  await next();
  console.log('第一层洋葱 - 结束')
});

app.use(async (ctx, next) => {
  console.log('第二层洋葱 - 开始')
  const start = Date.now();
  await next();
  console.log('第二层洋葱 - 结束')
});

app.use(async ctx => {
  console.log('第三层洋葱 - 开始')
  ctx.body = 'Hello World';
  console.log('第三层洋葱 - 结束')
});

app.listen(8000);
```

## redux
```js
const fn1 = (next) => {
  return ()=>{
    console.log(1)
    next()
    console.log(2)
  }
}

const fn2 = (next) => {
  return ()=>{
    console.log(3)
    next()
    console.log(4)
  }
}

const fn3 = (next) => {
  return ()=>{
    console.log(5)
    next()
    console.log(6)
  }
}

function compose(middleware) {
  return middleware.reduce((total, next) => (...args) => total(next(...args)));
}
const dispatch2 = compose([fn1,fn2,fn3])(()=> console.log("dispatch2"));
```