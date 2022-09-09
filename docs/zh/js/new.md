# new
## 模拟实现
先看看new是做了什么
```js
function Foo() {
  this.name = "aaa"
  this.age = 233
}
Foo.prototype.say = function() {
  console.log(this.name, this.age)
}
var o = new Foo()
console.log(o.name)
console.log(o.age)
```
因为 new 的结果是一个新对象，所以在模拟实现的时候，我们也要建立一个新对象，假设这个对象叫 obj，因为 obj 会具有 Foo 构造函数里的属性，想想经典继承的例子，我们可以使用 Foo.apply(obj, arguments)来给 obj 添加新的属性。
```js
function objectFactory() {
  var obj = new Object(); // 从Object.prototype上克隆一个对象

  var Constructor = [].shift.call(arguments); // 取得外部传入的构造器（构造函数）

  var F = function(){};
  F.prototype = Constructor.prototype;
  obj = new F();//指向正确的原型

  var ret = Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性
  return typeof ret === 'object' ? ret : obj;//确保构造器总是返回一个对象
};
```