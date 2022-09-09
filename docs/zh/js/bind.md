# bind
## js模拟实现bind
基本的bind用法
```js
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}

// 返回了一个函数
var bindFoo = bar.bind(foo); 

bindFoo(); // 1
```

```js
Function.prototype.mybind = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

## es6规范
[20.2.3.2 Function.prototype.bind ( thisArg, ...args )](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function.prototype.bind)
This method performs the following steps when called:

1. Let `Target` be the this value.
2. If `IsCallable(Target)` is false, throw a TypeError exception.
3. Let `F` be ? `BoundFunctionCreate(Target, thisArg, args)`.
4. Let `L` be 0.
5. Let `targetHasLength` be ? `HasOwnProperty(Target, "length")`.
6. If `targetHasLength` is `true`, then
    1. Let `targetLen` be ? `Get(Target, "length")`.
    2. If `targetLen` is a Number, then
        1. If `targetLen` is +∞𝔽, set `L` to +∞.
        2. Else if `targetLen` is -∞𝔽, set `L` to 0.
        3. Else,
            1. Let `targetLenAsInt` be ! `ToIntegerOrInfinity(targetLen)`.
            2. Assert: `targetLenAsInt` is finite.
            3. Let `argCount` be the number of elements in args.
            4. Set `L` to `max(targetLenAsInt - argCount, 0)`.
7. Perform `SetFunctionLength(F, L)`.
8. Let `targetName` be ? `Get(Target, "name")`.
9. If `targetName` is not a String, set `targetName` to the empty String.
10. Perform `SetFunctionName(F, targetName, "bound")`.
11. Return F.

## polyfill的bind实现
Function.prototype.bind 的 polyfill的实现[core-js](https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/function-bind.js)
```js
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var isObject = require('../internals/is-object');
var hasOwn = require('../internals/has-own-property');
var arraySlice = require('../internals/array-slice');
var NATIVE_BIND = require('../internals/function-bind-native');

var $Function = Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};
```
## v8引擎的实现
v8/src/builtins/function.tq
```c
// Copyright 2020 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

namespace function {

extern macro OrdinaryHasInstance(Context, Object, Object): JSAny;

// ES6 section 19.2.3.6 Function.prototype[@@hasInstance]
javascript builtin FunctionPrototypeHasInstance(
    js-implicit context: NativeContext, receiver: JSAny)(value: JSAny): JSAny {
  return OrdinaryHasInstance(context, receiver, value);
}

extern transitioning builtin
FunctionPrototypeBind(implicit context: Context)(
    JSFunction, JSAny, int32): JSAny;

const kLengthDescriptorIndex: constexpr int32
    generates 'JSFunctionOrBoundFunctionOrWrappedFunction::kLengthDescriptorIndex'
    ;
const kNameDescriptorIndex: constexpr int32
    generates 'JSFunctionOrBoundFunctionOrWrappedFunction::kNameDescriptorIndex'
    ;
const kMinDescriptorsForFastBindAndWrap: constexpr int31
    generates 'JSFunction::kMinDescriptorsForFastBindAndWrap';

macro CheckAccessor(implicit context: Context)(
    array: DescriptorArray, index: constexpr int32,
    name: Name): void labels Slow {
  const descriptor: DescriptorEntry = array.descriptors[index];
  const key: Name|Undefined = descriptor.key;
  if (!TaggedEqual(key, name)) goto Slow;

  // The descriptor value must be an AccessorInfo.
  Cast<AccessorInfo>(descriptor.value) otherwise goto Slow;
}

// ES6 section 19.2.3.2 Function.prototype.bind
transitioning javascript builtin
FastFunctionPrototypeBind(
    js-implicit context: NativeContext, receiver: JSAny, newTarget: JSAny,
    target: JSFunction)(...arguments): JSAny {
  const argc: intptr = arguments.actual_count;
  try {
    typeswitch (receiver) {
      case (fn: JSFunction|JSBoundFunction|JSWrappedFunction): {
        // Disallow binding of slow-mode functions. We need to figure out
        // whether the length and name property are in the original state.
        Comment('Disallow binding of slow-mode functions');
        if (IsDictionaryMap(fn.map)) goto Slow;

        // Check whether the length and name properties are still present as
        // AccessorInfo objects. If so, their value can be recomputed even if
        // the actual value on the object changes.

        if (fn.map.bit_field3.number_of_own_descriptors <
            kMinDescriptorsForFastBindAndWrap) {
          goto Slow;
        }

        const descriptors: DescriptorArray = fn.map.instance_descriptors;
        CheckAccessor(
            descriptors, kLengthDescriptorIndex, LengthStringConstant())
            otherwise Slow;
        CheckAccessor(descriptors, kNameDescriptorIndex, NameStringConstant())
            otherwise Slow;

        // Choose the right bound function map based on whether the target is
        // constructable.

        const boundFunctionMap: Map =
            IsConstructor(fn) ?
            *NativeContextSlot(
                ContextSlot::BOUND_FUNCTION_WITH_CONSTRUCTOR_MAP_INDEX) :
            *NativeContextSlot(ContextSlot::
                                    BOUND_FUNCTION_WITHOUT_CONSTRUCTOR_MAP_INDEX);

        // Verify that prototype matches that of the target bound function.

        if (fn.map.prototype != boundFunctionMap.prototype) goto Slow;

        // Allocate the arguments array.

        const argumentsArray = arguments.length <= 1 ?
            kEmptyFixedArray :
            NewFixedArray(
                arguments.length - 1, ArgumentsIterator{arguments, current: 1});

        const boundReceiver: JSAny = arguments[0];

        const result = new JSBoundFunction{
          map: boundFunctionMap,
          properties_or_hash: kEmptyFixedArray,
          elements: kEmptyFixedArray,
          bound_target_function: fn,
          bound_this: boundReceiver,
          bound_arguments: argumentsArray
        };
        return result;
      }

      case (JSAny): {
        goto Slow;
      }
    }
  } label Slow {
    tail FunctionPrototypeBind(
        LoadTargetFromFrame(), newTarget, Convert<int32>(argc));
  }
}
}  // namespace function

```
