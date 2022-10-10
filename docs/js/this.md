# this

<ClientOnly>
  <MTA/>
</ClientOnly>


## 摘要
this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调
用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文)。这个记录会包
含函数在哪里被调用（调用栈)、函数的调用方法、传人的参数等信息。this 就是记录的
其中一个属性，会在函数执行的过程中用到。

## this的四种绑定规则
### 1.默认绑定

默认指向window，严格模式指向undefined
```js
function foo() {
  console.log(this.a) // 2
}
var a = 2;
foo()
```
```js
"use strict"
function foo() {
  console.log(this.a) // Uncaught TypeError
}
var a = 2;
foo()
```
### 2.隐式绑定
指向调用了foo的对象

```js
function foo() {
  console.log(this, this === window)
}
foo() // window, true
```

```js
function foo() {
  console.log(this, this === window)
}
var bar = {
  aa: foo
}
bar.aa() // { aa: ƒ }, false
```

```js
function foo() {
  console.log(this, this === window)
}
var bar = {
  aa: foo
}
var zz = bar.aa
zz() // window, true
```

### 3.显式绑定
使用call、apply、bind，this指向你传入的对象
::: danger 警告
如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值
在调用时会被忽略，实际应用的是默认绑定规则
:::

```js
function foo() {
  console.log(this.msg)
}
var b = {
  msg: '我是b对象'
}
foo.call(b)
//foo.apply(b)
// 打印：我是b对象
```

### 4.new绑定
```js
function Foo() {
  this.a = "测试"
}
var qaq = new Foo()
console.log(window.a) // undefined
console.log(qaq.a) // "测试"
```

## 优先级
1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。

2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是
指定的对象。

3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上
下文对象。

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到
全局对象。


## 小结
- this的四种绑定规则，默认、显式、隐式、new绑定
- 四种优先级：new绑定 > 显式 > 隐式 > 默认
- 注意隐式绑定把 null 或者 undefined 作为 this 的绑定对象传入，会走默认规则

## 参考
- 你不知道的javascript上卷