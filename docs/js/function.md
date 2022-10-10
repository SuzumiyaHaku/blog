# 函数

<ClientOnly>
  <MTA/>
</ClientOnly>


## 为啥需要箭头函数
var self = this 这种解决方案圆满解决了理解和正确使用this绑定的问题，并且没有把问题过于复杂化，它使用的是我们非常熟悉的工具：词法作用域。self 只是一个key通过此法总由于和闭包进行引用 的标识符，不关心this绑定过程中发生了什么。
 人们不喜欢写冗长的东西，尤其是一遍又一遍地写。因此 ES6 的一个初衷就是帮助人们减 少重复的场景，事实上包括修复某些习惯用法的问题，this 就是其中一个。

## 箭头函数和普通函数有什么区别

箭头函数不能用来定义生成器函数。

箭头函数没有arguments
```js
function foo(a, b, c) {
  console.log(arguments) // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
foo(1, 2, 3)
```
但是箭头函数有es6的语法可以替代
```js
function foo(...args) {
  console.log(args) // [1, 2, 3]
}
foo(1, 2, 3)
```

虽然可以在箭头函数上调用call(), apply(), bind()的方法，但是箭头函数中的this却不会受到影响。
```js
var foo = () => {
  console.log(this === window)
}
var obj = { a: 'obj' }
foo.call(obj) // true
foo.apply(obj) // true

let fn = foo.bind(obj)
fn() // true
```

```js
var foo = function () {
  console.log(this === window)
}
var obj = { a: 'obj' }
foo.call(obj) // false
foo.apply(obj) // false

let fn = foo.bind(obj)
fn() // false
```

ECMAScript 中的函数始终可以作为构造函数实例化一个新对象，也可以作为普通函数被调用。
ECMAScript 6 新增了检测函数是否使用 new 关键字调用的 new.target 属性。如果函数是正常调用的，则 new.target 的值是 undefined；如果是使用 new 关键字调用的，则 new.target 将引用被调用的构造函数。

```js
function Foo() {
 if (!new.target) {
  throw '没有用new调用'
 }
 console.log('正常的使用了new调用');
}
new Foo(); // 正常的使用了new调用
Foo();  // Uncaught 没有用new调用
```

箭头函数虽然语法简洁，但也有很多场合不适用。箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。

## 尾递归调用
在ECMAScript5的引擎中，尾调用的实现与其他函数调用的实现类似，创建一个新的栈帧（stack frame），将其推入调用栈来表示函数调用。也就是说，再循环调用中，每一个未完成的栈帧都会被保存在内存中，当调用栈变得过大时，会造成程序问题。

ECMAScript 6缩减了严格模式下尾调用栈的大小（非严格模式下不受影响），如果满足以下条件，尾调用不在创建新的栈帧，而是清除并重用当前栈帧：
1. 代码在严格模式下执行
2. 尾调用不妨问当前栈帧的变量（也就是说函数不是一个闭包）。
3. 在函数内部，尾调用是最后一条语句。
4. 尾调用的结果作为函数值返回，并且不需要执行额外的逻辑。

```js
// 无优化：尾调用没有返回
function outerFunction() {
 innerFunction();
}
// 无优化：尾调用没有直接返回
function outerFunction() {
 let innerFunctionResult = innerFunction();
 return innerFunctionResult;
}
// 无优化：尾调用返回后必须转型为字符串
function outerFunction() {
 return innerFunction().toString();
}
// 无优化：尾调用是一个闭包
function outerFunction() {
 let foo = 'bar';
 function innerFunction() { return foo; }
 return innerFunction();
} 
```

```js
"use strict";
// 有优化：栈帧销毁前执行参数计算
function outerFunction(a, b) {
 return innerFunction(a + b);
}
// 有优化：初始返回值不涉及栈帧
function outerFunction(a, b) {
 if (a < b) {
  return a;
 }
 return innerFunction(a + b);
}
// 有优化：两个内部函数都在尾部
function outerFunction(condition) {
 return condition ? innerFunctionA() : innerFunctionB();
} 
```
如果利用尾递归调用优化
实际上，尾调用的优化发生在引擎背后，除非你尝试优化一个函数，否则无需思考此类问题。递归函数是其最主要的应用场景，此时尾调用优化的效果最显著。请看下面这个阶乘函数：
```js
function factorial(n) {
	if(n <= 1) {
    return 1;
  } else {
  	// 无法优化，必须在返回后执行乘法操作
    return n * factorial(n - 1);
  }
}
```
由于在递归调用前，执行了乘法操作，因而当前版本的阶乘函数无法被引擎优化。如果n是一个非常大的数，则调用栈的尺寸就会不断增长并存在，最终导致栈溢出的潜在风险。
优化这个函数，首先要确保乘法不会再函数调用后执行，你可以通过默认参数来将乘法操作移出return语句，结果函数可以携带临时结果进入到下一个迭代中。以下这段新代码具有相同的行为，但可以被ECMAScript 6引擎优化:
```js
function factorial(n, p = 1) {
	if (n <= 1) {
  	return 1 * p;
  } else {
  	let result = n * p;
    return factorial(n - 1, result);
  }
}
```
在这个重写后的factorial()函数中，第二个参数p的默认值为1，我们用它保存乘法结果，下一次迭代中可以取出用于计算，不再需要额外的函数调用。当n大于1时，先执行一轮乘法计算，然后将结果传给第二次factorial()调用的参数。现在，ECMAScript 6引擎就可以优化递归调用了。
当你写递归函数的时候，记得使用尾递归优化的特性，如果递归函数的计算量足够大，则尾递归优化可以大幅度提升程序的性能。
## 参考
- 《你不知道的javascript上卷》
- 《javascript高级编程第4版》
- 《深入理解ES6》