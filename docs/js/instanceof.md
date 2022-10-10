# instanceof [已发帖]

<ClientOnly>
  <MTA/>
</ClientOnly>


## 1、`instanceof`操作符可以用来确定一个对象实例的原型链上是否有原型XX。
``` javascript
function Foo () {
}
let f = new Foo();
console.log(f instanceof Foo); // true
```
``` javascript
var a = "abc";
var b = new String(a);
var c = Object(a);

console.log(typeof a); // "string"
console.log(typeof b); // "object"
console.log(typeof c); // "object"

console.log(b instanceof String); // true
console.log(c instanceof String); // true
```

``` javascript
[] instanceof Array; // true
[] instanceof Object; // true
Array instanceof Object; // true
Object instanceof Array; // false

Object instanceof Object; // true
Number instanceof Number; // false
Array instanceof Array; // false

Function instanceof Object; // true
Object instanceof Function; // true
Object instanceof Object; // true
Function instanceof Function; // true
String instanceof Function; // true
Array instanceof Function; // true
Number instanceof Function; // true

"" instanceof String; // false
1 instanceof Number; // false
false instanceof Boolean; // false
```

错误使用的报错 如：
``` javascript
Array instanceof [];
// Uncaught TypeError: Right-hand side of 'instanceof' is not callable
{} instanceof Object;
// VM91:1 Uncaught SyntaxError: Unexpected token 'instanceof'
```

## 2、`instanceof` 的原理
#### **`__proto__`和`prototype`的区别:**

prototype 只在 Function 中有（是函数对象的属性），而 \_\_proto__ 则在Function和Object中都有。
***
\_\_proto__ is the actual object that is used in the lookup chain to resolve methods, etc. prototype is the > object that is used to build \_\_proto__ when you create an object with new:    
**大致意思是： \_\_proto__ 是真正用来查找原型链去获取方法的对象。prototype是在用new创建对象时用来构建 \_\_proto__ 的对象**

``` javascript
( new Foo ).__proto__ === Foo.prototype;
( new Foo ).prototype === undefined;
```
> 摘自于Stack Overflow  [\_\_proto__ VS. prototype in JavaScript](https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)

***
**理解原型**  
* 无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 `prototype` 属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构造函数。对前面的例子而言，Person.prototype.constructor 指向 Person。然后，因构造函数而异，可能会给原型对象添加其他属性和方法。  
	
* 在自定义构造函数时，原型对象默认只会获得 constructor 属性，其他的所有方法都继承自 Object。每次调用构造函数创建一个新实例，这个实例的内部[[Prototype]]指针就会被赋值为构造函数的原型对象。脚本中没有访问这个[[Prototype]]特性的标准方式， 但 Firefox、Safari和 Chrome 会在每个对象上暴露__proto__属性，通过这个属性可以访问对象的原型。在其他实现中，这个特性完全被隐藏了。关键在于理解这一点：实例与构造函数原型之间有直接的联系，但实例与构造函数之间没有。 
>摘自于《JavaScript高级程序设计 第四版》 第八章 8.2.4 原型模式
***

也就有这样的结论
``` javascript
Array.prototype === [].__proto__ // true
Object.prototype === [].__proto__.__proto__ // true
```
#### 模拟实现
``` javascript
function instance_of(L, R) { //L 表示左边的object，R 表示右边的constructor
 const R_P = R.prototype;
 L = L.__proto__;
 while (true) { 
   if (L === null) 
     return false; 
   if (R_P === L)
     return true; 
   L = L.__proto__; 
 } 
}
```
所以可以这样 （平常不要这样干！）
``` javascript
let arr = []; 
arr.__proto__ = Number.prototype; 
console.log(arr instanceof Number) // true
```
``` javascript
let arr = []; 
arr.__proto__ = String.prototype;
console.log(arr instanceof String) // true
```
《你不知道的JavaScript上卷》有这么一段
> ._\_proto__ 看起来很像一个属性，但是实际上它更像一个 getter/setter。  .\_\_proto__ 的实现大致上是这样的：
> ``` javascript
> Object.defineProperty( Object.prototype, "__proto__", {
>   get: function() {
>     return Object.getPrototypeOf( this );
>   },
>   set: function(o) {
>     // ES6 中的 setPrototypeOf(..)
>     Object.setPrototypeOf( this, o );
>     return o;
>   }
> });
> ```
日常开发中要注意__proto__这个非标准属性，尽量不要去使用它，从下面的代码可以不难发现上面的instance_of的模拟实现，之所以叫模拟的原因。
``` javascript
let origin = Object.create(null);
origin.a = 1;
let obj = {
  b: 2
}
// obj.__proto__ = origin;
Object.setPrototypeOf(obj, origin)
console.log(obj.__proto__) // undefined
console.log(Object.getPrototypeOf(obj) === origin) // true
console.log(obj.__proto__ === origin) // false
```
要修改原型尽量使用Object.setPrototypeOf()方法，但是JavaScript高级编程第四版，第八章中有这么一段警告和描述：
> `警告：Object.setPrototypeOf()可能会严重影响代码性能。Mozilla文档说的很清楚：
> “在所有浏览器和JavaScript引擎中，修改继承关系的影响都是微妙且深远的。这种影响并不仅是执行
> Object.setPrototypeOf()语句那么简单，而是会涉及所有访问了那些修改过[[Prototype]]的对象的代码。”`  
> 为了避免使用Object.setPrototypeOf()可能造成的性能下降，可以通过Object.create()来创建一个新对象，同时为其指定原型
> ```javascript
> let biped = {
>  numLegs: 2
> };
> let person = Object.create(biped);
> person.name = 'Matt';
> console.log(person.name); // Matt
> console.log(person.numLegs); // 2
> console.log(Object.getPrototypeOf(person) === biped); // true 
>  ```
#### ES6中Symbol.hasInstance
对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。比如，`foo instanceof Foo`在语言内部，实际调用的是`Foo[Symbol.hasInstance](foo)`（instanceof操作符优先使用该Symbol对应的属性）。[参考链接](https://github.com/ruanyf/es6tutorial/search?utf8=%E2%9C%93&q=instanceof)  
MDN上的解释： `Symbol.hasInstance`用于判断某对象是否为某构造器的实例。因此你可以用它自定义 instanceof 操作符在某个类上的行为。  
大多数 class 没有 `Symbol.hasInstance`。在这种情况下，是使用 obj instanceof Class 检查 Class.prototype 是否等于 obj 的原型链中的原型之一

1、
```javascript
class myArr {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof myArr); // true
```
2、
``` javascript
class MyArr extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

var a = new MyArr(1, 2, 3);
console.log(a.map(v => v) instanceof MyArr);     // false;
console.log(a.map(v => v) instanceof Array);     // true;
```
3、
``` javascript
Function[Symbol.hasInstance](Function); // true
Function[Symbol.hasInstance](String); // true
Function[Symbol.hasInstance](Array); // true
Function[Symbol.hasInstance](Number); // true

Array[Symbol.hasInstance]([]); // true
Number[Symbol.hasInstance](1); // false
```

## 3、一些用法
1、
``` javascript
function Foo() {} 
let f = new Foo(); 
console.log(Foo[Symbol.hasInstance](f)); // true
console.log(f instanceof Foo); // true
```

***
#### 2、检测Symbol
``` javascript
var sym = Symbol("test");
console.log(sym instanceof Symbol); // false

var symObj = Object(sym); // 需要使用封装对象形式的symObj，而不是原生形式的sym的情况很少
console.log(symObj instanceof Symbol); // true
console.log(symObj.valueOf() === sym); // true
```
***
3、
``` javascript
try {
  fun();
} catch (error) {
  if (error instanceof TypeError) {
  
  } else if (error instanceof ReferenceError) {
  	
  }
}
```
***
4、
``` javascript
function A () {};
var a = new A;
console.log(a instanceof A); // true

Object.defineProperty(A, Symbol.hasInstance, {
    value: function () { return false; }
})
console.log(a instanceof A) // false
```
#### 5、关于是否是`Promise`  
instanceof 不足以检查 Promise，Promise 值可能是从其他浏览器窗口接收到的，然而接收到的 Promise 可能和当前窗口的框架不同，因此不能识别 Promise 实例。
库或者框架可能会实现自己的 Promise ，不是使用 原生 ES6 Promise 实现，所以无法检查。下面的代码看起来是可行的。
``` javascript
let a = Promise.resolve(1); 
a instanceof Promise; // true
```
参考`is-promise`  [npm地址](https://www.npmjs.com/package/is-promise)  [github地址](https://github.com/then/is-promise)  
源码里面是这样的

``` javascript
function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
```
***

## 4、小结
- instanceof操作符可以用来确定一个对象实例的原型链上是否有原型XX  
- instanceof的实现，是通过对象上的一层一层的__proto__去查找最后一个指向的原型对象是啥。es6中是优先使用Symbol.hasInstance去判断某对象是否是构造器的实例。不要随便使用__proto__非标准属性。要操作原型请使用es6提供的方法。使用Object.setPrototypeOf()修改继承关系需要谨慎。
## 5、参考链接  
- [Symbol.hasInstance](https://joshmiller.cc/symbol-hasinstance/)  
- [ECMA](https://262.ecma-international.org/6.0/#sec-function.prototype-@@hasinstance)  
- [segmentfault ECMAScript7规范中的instanceof操作符](https://segmentfault.com/a/1190000037689078)  
- [MDN Symbol.hasInstance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance) 
