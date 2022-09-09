# 类

## es6 class
es6定义类两种方式：类声明和类表达式。
```js
// 类声明
class Person {}
// 类表达式
const Animal = class {}; 
```
与函数表达式类似，类表达式在它们被求值前也不能引用。不过，与函数定义不同的是，虽然函数
声明可以提升，但类定义不能：
```js
console.log(FunctionExpression); // undefined
var FunctionExpression = function() {};
console.log(FunctionExpression); // function() {}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
function FunctionDeclaration() {}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
console.log(ClassExpression); // undefined
var ClassExpression = class {};
console.log(ClassExpression); // class {}
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {}
console.log(ClassDeclaration); // class ClassDeclaration {}
```
另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受块作用域限制：
```js
{
 function FunctionDeclaration() {}
 class ClassDeclaration {}
}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
```
默认情况下，类构造函数会在执行之后返回 this 对象。构造函数返回的对象会被用作实例化的对象，如果没有什么引用新创建的 this 对象，那么这个对象会被销毁。

类构造函数与构造函数的主要区别是，调用类构造函数必须使用 new 操作符。而普通构造函数如果不使用 new 调用，那么就会以全局的 this（通常是 window）作为内部对象。调用类构造函数时如果忘了使用 new 则会抛出错误：
```js
function Person() {}
class Animal {}
// 把 window 作为 this 来构建实例
let p = Person();
let a = Animal();
// TypeError: class constructor Animal cannot be invoked without 'new' 
```

类构造函数没有什么特殊之处，实例化之后，它会成为普通的实例方法（但作为类构造函数，仍然
要使用 new 调用）。因此，实例化之后可以在实例上引用它：
```js
class Person {}
// 使用类创建一个新实例
let p1 = new Person();
p1.constructor();
// TypeError: Class constructor Person cannot be invoked without 'new'
// 使用对类构造函数的引用创建一个新实例
let p2 = new p1.constructor(); 
```

## es6 的继承
ECMAScript 6 新增特性中最出色的一个就是原生支持了类继承机制。虽然类继承使用的是新语法，但背后依旧使用的是原型链。
### super
派生类的方法可以通过 super 关键字引用它们的原型。这个关键字只能在派生类中使用，而且仅
限于类构造函数、实例方法和静态方法内部。在类构造函数中使用 super 可以调用父类构造函数。
```js
class Vehicle {
 constructor() {
 this.hasEngine = true;
 }
}
class Bus extends Vehicle {
 constructor() {
 // 不要在调用 super()之前引用 this，否则会抛出 ReferenceError
 super(); // 相当于 super.constructor()
 console.log(this instanceof Vehicle); // true
 console.log(this); // Bus { hasEngine: true }
 }
}
new Bus();
```
在静态方法中可以通过 super 调用继承的类上定义的静态方法：
```js
class Vehicle {
 static identify() {
 console.log('vehicle');
 }
}
class Bus extends Vehicle {
 static identify() {
 super.identify();
 }
}
Bus.identify(); // vehicle
```
ES6 给类构造函数和静态方法添加了内部特性[[HomeObject]]，这个特性是一个
指针，指向定义该方法的对象。这个指针是自动赋值的，而且只能在 JavaScript 引擎内部
访问。super 始终会定义为[[HomeObject]]的原型。
在使用 super 时要注意几个问题。
1. super 只能在派生类构造函数和静态方法中使用。
```js
class Vehicle {
 constructor() {
 super();
 // SyntaxError: 'super' keyword unexpected
 }
}
```
2. 不能单独引用 super 关键字，要么用它调用构造函数，要么用它引用静态方法。
```js
class Vehicle {}
class Bus extends Vehicle {
 constructor() {
 console.log(super);
 // SyntaxError: 'super' keyword unexpected here
 }
} 
```
3. 调用 super()会调用父类构造函数，并将返回的实例赋值给 this
```js
class Vehicle {}
class Bus extends Vehicle {
 constructor() {
 super();
 console.log(this instanceof Vehicle);
 }
}
new Bus(); // true
```
4. super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。
```js
class Vehicle {
 constructor(licensePlate) {
 this.licensePlate = licensePlate;
 }
}
class Bus extends Vehicle {
 constructor(licensePlate) {
 super(licensePlate);
 }
}
console.log(new Bus('1337H4X')); // Bus { licensePlate: '1337H4X' }
```
5. 如果没有定义类构造函数，在实例化派生类时会调用 super()，而且会传入所有传给派生类的参数。
```js
class Vehicle {
 constructor(licensePlate) {
 this.licensePlate = licensePlate;
 }
}
class Bus extends Vehicle {}
console.log(new Bus('1337H4X')); // Bus { licensePlate: '1337H4X' }
```
6. 在类构造函数中，不能在调用 super()之前引用 this。
```js
class Vehicle {}
class Bus extends Vehicle {
 constructor() {
 console.log(this);
 }
}
new Bus();
// ReferenceError: Must call super constructor in derived class
// before accessing 'this' or returning from derived constructor
```
7. 如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回一个对象。(不返回会报错：Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor)
```js
class Vehicle {}
class Car extends Vehicle {}
class Bus extends Vehicle {
 constructor() {
  super();
 }
}
class Van extends Vehicle {
 constructor() {
  return {};
 }
}
console.log(new Car()); // Car {}
console.log(new Bus()); // Bus {}
console.log(new Van()); // {}
```

## 理解js没有类而是委托！
javascript没有类！javascript一直在模仿类，让自己看起来和高级语言的类一样。
js的类本质还是基于原型链，功能的`委托`。继承意味着复制操作，JavaScript（默认）并不会复制对象属性。相反，JavaScript 会在两 个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数。


## es5的继承
es5有几种继承：原型继承、盗用构造函数继承（经典继承）、原型式继承、寄生式继承、寄生组合式继承，详细看JavaScript高级编程地8章继承。因为现在已经是es6的时代，没必要研究这些写法，因为我们有babel这些工具会为我们转成es5