# call、apply

<ClientOnly>
  <MTA/>
</ClientOnly>

## call
### call的模拟实现
基本用法
```js
var foo = {
  value: 1
};
function bar() {
  console.log(this.value);
}
bar.call(foo); // 1
```

```js
Function.prototype.myCall = function (context) {
  var context = Object(context) || window;
  context.fn = this;
  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  var result = eval('context.fn(' + args +')');  // context.fn(arguments[1],arguments[2])
  delete context.fn
  return result;
}
```

### call的es规范
[20.2.3.3 Function.prototype.call ( thisArg, ...args )](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.call)

This method performs the following steps when called:
> 此方法在调用时执行以下步骤：

1. Let `func` be the `this` value.
> 设置`func`为`this`值
2. If `IsCallable(func)` is `false`, throw a `TypeError` exception.
> 如果 `IsCallable(func)` 是 `false`，抛出一个`TypeError`的异常。
3. Perform `PrepareForTailCall()`.
> 执行 `PrepareForTailCall()`.
4. Return ? `Call(func, thisArg, args)`.
> 返回`Call(func, thisArg, args)`的结果

::: tip NOTE 1
The thisArg value is passed without modification as the this value. This is a change from Edition 3, where an undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value. Even though the thisArg is passed without modification, non-strict functions still perform these transformations upon entry to the function.
> thisArg值作为this值传递而不进行修改。这是版本3的一个变化，在版本3中，未定义或空的thisArg被替换为全局对象，ToObject应用于所有其他值，结果作为This值传递。即使传递了thisArg而没有修改，非严格函数仍然在进入函数时执行这些转换。
:::

::: tip NOTE 2
If func is an arrow function or a bound function exotic object then the thisArg will be ignored by the function [[Call]] in step 4.
> 如果func是箭头函数或绑定函数外来对象，则步骤4中的函数[[Call]]将忽略thisArg。
:::

[7.2.3 IsCallable ( argument )](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iscallable)

The abstract operation IsCallable takes argument argument (an ECMAScript language value) and returns a Boolean. It determines if argument is a callable function with a [[Call]] internal method. It performs the following steps when called:
> 抽象操作IsCallable接受参数（js语言类型的值）并返回布尔值。它确定参数是否是具有[[Call]]内部方法的可调用函数。调用时，它执行以下步骤：

1. If `argument` is not an `Object`, return `false`.
>  如果`argument`不是Object, 返回false
2. If `argument` has a [[Call]] internal method, return `true`.
> 如果`argument`有[[Call]]内部可调用的方法，返回`true`
3. Return `false`.
> 返回false

## apply
### apply的实现
```js
Function.prototype.myApply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')') // context.fn(arr[0],arr[1])
  }

  delete context.fn
  return result;
}
```
### apply的es规范
[20.2.3.1 Function.prototype.apply ( thisArg, argArray )](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.apply)

This method performs the following steps when called:
> 此方法在调用时执行以下步骤：
1. Let `func` be the `this` value.
> 设置`func`为`this`值
2. If `IsCallable(func)` is `false`, throw a `TypeError` exception.
> 如果 `IsCallable(func)` 是 `false`，抛出一个`TypeError`的异常。
3. If `argArray` is `undefined` or `null`, then
> 如果 `argArray` 是`undefined`或者`null`, 则
    1. Perform `PrepareForTailCall()`.
    > 执行 `PrepareForTailCall()`
    2. Return ? `Call(func, thisArg)`.
    > 返回`Call(func, thisArg)`的结果
4. Let `argList` be ? `CreateListFromArrayLike(argArray)`.
> `argList`为`CreateListFromArrayLike(argArray)`（CreateListFromArrayLike函数可以返回一个列表值，其元素由obj的索引提供）
5. Perform `PrepareForTailCall()`.
> 执行 `PrepareForTailCall()`
6. Return ? `Call(func, thisArg, argList)`.
> 返回`Call(func, thisArg, args)`的结果

::: tip NOTE 1
The thisArg value is passed without modification as the this value. This is a change from Edition 3, where an undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value. Even though the thisArg is passed without modification, non-strict functions still perform these transformations upon entry to the function.
> thisArg值作为this值传递而不进行修改。这是版本3的一个变化，在版本3中，未定义或空的thisArg被替换为全局对象，ToObject应用于所有其他值，结果作为This值传递。即使传递了thisArg而没有修改，非严格函数仍然在进入函数时执行这些转换。
:::

::: tip NOTE 2
If func is an arrow function or a bound function exotic object then the thisArg will be ignored by the function [[Call]] in step 6.
> 如果func是箭头函数或绑定函数外来对象，则步骤6中的函数[[Call]]将忽略thisArg。
:::