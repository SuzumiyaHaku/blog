# new

<ClientOnly>
  <MTA/>
</ClientOnly>


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
边界条件增加 判断是不是对象或者函数
```js
function mynew() {
  var obj = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  var f = {};
  obj.apply(f, args);
  f.__proto__ = obj.prototype;
  return f;
}
mynew(Foo)
```