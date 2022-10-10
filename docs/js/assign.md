# Object.assign和...（展开运算符/扩展运算符）的区别 [已发帖]

<ClientOnly>
  <MTA/>
</ClientOnly>


## 1、基础
"..."叫展开运算符（扩展运算符）的时候，大部分情况下： 
1、{...obj} 同 Object.assign({}, obj)  
2、{...obj, a: 1} 同 Object.assign(obj, { a: 1});
基本使用形式如下：
```javascript
const obj = { a: 'a', b: 'b', c: 'c' };
let a = {...obj, a: 233}; // { a: 233, b: 'b', c: 'c' }
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
let b = [...arr1, ...arr2] // [1,2,3,4,5,6]
```
[...arr, a: 1]的性能比[a: 1, ...arr]的高、用在对象上的时候也是放在前面比放在后面性能高。放在后面的时候，还出现测试执行时间不稳定的情况。

## 2、性能测试：
#### 1、对象合并测试
```javascript
    const count = 10000;

    function foo1() {
      console.time('Object.assign对象合并使用耗时');
      let obj = {};
      for (let i = 0; i < count; i++) {
        obj = Object.assign(obj, { ['key' + i]: i });
      }
      console.timeEnd('Object.assign对象合并使用耗时');
    }

    function foo2() {
      console.time('展开运算符对象合并使用耗时');
      let obj = {};
      for (let i = 0; i < count; i++) {
        obj = { ...obj, ['key' + i]: i };
      }
      console.timeEnd('展开运算符对象合并使用耗时');
    }
```

#### 2、数组合并测试代码：
多次循环合并的测试：
```javascript
    const count = 10000;
    function foo3() {
      console.time('展开运算符数组合并使用耗时');
      let arr = [];
      for (let i = 0; i < count; i++) {
        arr = [...arr, i];
      }
      console.timeEnd('展开运算符数组合并使用耗时');
    }
    function foo4() {
      console.time('使用push方法使用耗时');
      let arr = [];
      for (let i = 0; i < count; i++) {
        arr.push(i);
      }
      console.timeEnd('使用push方法使用耗时');
    }
    function foo5() {
      console.time('使用concat方法使用耗时');
      let arr = [];
      for (let i = 0; i < count; i++) {
        arr.concat([i]);
      }
      console.timeEnd('使用concat方法使用耗时');
    }
```

两个大数组合并
```javascript
    const count = 10000;
    function foo6() {
      let testArr1 = [];
      let testArr2 = [];
      for (let i = 0; i < count * 100; i++) {
        testArr1.push(i);
        testArr2.push(count * 100 - i);
      }
      console.time('展开运算符数组合并使用耗时');
      let arr = [];
      arr = [...testArr1, ...testArr2];
      console.timeEnd('展开运算符数组合并使用耗时');
    }

    function foo7() {
      let testArr1 = [];
      let testArr2 = [];
      for (let i = 0; i < count * 100; i++) {
        testArr1.push(i);
        testArr2.push(count * 100 - i);
      }
      console.time('使用concat方法使用耗时');
      testArr2.concat(testArr1);
      console.timeEnd('使用concat方法使用耗时');
    }
```

>提示：chrome console.time打印的时间比Performance里的更精确、Firefox的console.time打印没有性能分析里的精确。firefox查看更加精确的时间 打开F12开发web开发者工具面板、点击性能记录好后，从瀑布图找到DOM事件、点击对应的DOM事件选项字样，右边就有时间了
火狐截图
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d9a886ec44441b69301e0763cb08126~tplv-k3u1fbpfcp-watermark.image?)
谷歌浏览器截图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6053ee1d3314c7e8628262567d8fd2e~tplv-k3u1fbpfcp-watermark.image?)

#### 3、测试结果列表： 
|  测试条件  | Chrome`版本94.0.4606.81`  | Firefox`版本93.0 (64 位)`|
|  ----  | ----  |  ----  |
| Object.assign`对象`合并  | 14.07080078125 ms | 12.11 ms |
| 展开运算符`对象`合并  | 18201.126953125 ms | 7424.69 ms |
| 展开运算符`数组加单个`  | 42.848876953125 ms | 877.14 ms |
| push方法`数组加单个`  |  0.489013671875 ms | 0.89 ms |
| concat方法`数组加单个`  | 0.6640625 ms | 2.40 ms |
| 展开运算符`两个大数组合并`  | 38.1337890625 ms | 43.64 ms |
| concat方法`两个大数组合并`  | 4.3740234375 ms | 31.28 ms |

#### 4、性能测试结论
在循环比较多或者操作的数组长度比较大的情况下：
- 1、Object.assign多数情况下性能比展开运算符(...)的性能高
- 2、数组自带的方法connat、push性能比展开运算符(...)的性能高
那么问题来了，是不是有上面的结果，我们就不能使用...运算符了呢？我觉得不一定：
- 理由1：一般情况我们没那么多超级大的对象，超级大的数组这样给你搞。
- 理由2：...的写法比Object.assign更加优雅;
- 理由3：比如我们想数组去重 let arr = [1, 1, 2]; 用的 [...new Set(arr)]呢;
- 理由4：说不定后面浏览器会优化这个玩意儿呢？
> 内心：编不下去了。好吧，偷偷把之前写的...换了算了。

可能有人会想，使用babel这些来进行编译，下面是es6转es5的示例，这里只是一部分，各个版本的babel转换可能还不太一样。但是有一点就是增加了一大堆代码。明显没有我们手动优化来的完美。

如下es6源代码：
```javascript
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [...arr1, ...arr2]
let arr4 = [7, ...arr1]
let arr5 = [...arr1, 8]

let obj1 = { a: 1, b: 2 }
let obj2 = {
  ...obj1, 
  c: 3
}
let obj3 = {
  d: 4, 
  ...obj1 
}
```
使用typescript的tsc编译（tsc版本是4.6.4）
```javascript
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = __spreadArray(__spreadArray([], arr1, true), arr2, true);
var arr4 = __spreadArray([7], arr1, true);
var arr5 = __spreadArray(__spreadArray([], arr1, true), [8], false);
var obj1 = { a: 1, b: 2 };
var obj2 = __assign(__assign({}, obj1), { c: 3 });
var obj3 = __assign({ d: 4 }, obj1);

```
使用@babel/preset-env编译（版本是7.17.10）
```javascript
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [].concat(arr1, arr2);
var arr4 = [7].concat(arr1);
var arr5 = [].concat(arr1, [8]);
var obj1 = {
  a: 1,
  b: 2
};

var obj2 = _objectSpread(_objectSpread({}, obj1), {}, {
  c: 3
});

var obj3 = _objectSpread({
  d: 4
}, obj1);

```
## 3、Object.definedProperty对比
#### 展开运算符
```javascript
    let obj = {
      a: 1,
    }
    Object.keys(obj).forEach((key) => {
      let internalValue = obj[key];
      Object.defineProperty(obj, key, {
        get() {
          console.log(`getting key "${key}": ${JSON.stringify(internalValue)}`)
          return internalValue;
        },
        set(newValue) {
          console.log(`setting key "${key}": ${JSON.stringify(newValue)}`)
          internalValue = newValue
        }
      })
    })
    let cc = {...obj, a: '555' }
    cc.a = 666
 ```
 控制台结果：  
 > getting key "a": 1
 `只是触发get 1次，并且打印的值为 1`
 
 #### Object.assign
 ```javascript
    let obj = {
      a: 1,
    }
    Object.keys(obj).forEach((key) => {
      let internalValue = obj[key];
      Object.defineProperty(obj, key, {
        get() {
          console.log(`getting key "${key}": ${JSON.stringify(internalValue)}`)
          return internalValue;
        },
        set(newValue) {
          console.log(`setting key "${key}": ${JSON.stringify(newValue)}`)
          internalValue = newValue
        }
      })
    })
    let cc = Object.assign(obj, { a: '555' })
    cc.a = 666
 ```
  控制台结果：  
 > setting key "a": "555"  
 > setting key "a": 666
 `触发了两次set`
## 4、Proxy的结果和上面的definedProperty结果一样
 ```javascript
    let obj = {
      a: 1,
    }
    obj = new Proxy(obj, {
        get: function (o, sKey) {
          console.log(`getting key "${sKey}": ${JSON.stringify(o[sKey])}`)
          return o[sKey];
        },
        set: function (o, sKey, vValue) {
          console.log(`setting key "${sKey}": ${JSON.stringify(vValue)}`)
          o[sKey] = vValue;
          return true;
        }}
    )

    let cc = {...obj, a: '555' }
    // let cc = Object.assign(obj, { a: '555' })
    cc.a = 666
 ```
 
 ## 5、不定参数“`...`”
 ```javascript  
    // 不定参数限制：每个函数最多只能申明一个不定参数，而且一定要放到参数末尾
    // 错误：function foo(object, ...keys, last) { } // Uncaught SyntaxError: parameter after rest parameter
    function foo(object, ...keys) {
      console.log(object, keys);
    }
    let arr = [1, 2, 3, 4]
    foo({}, ...arr) // {}, [1, 2, 3, 4]
    foo(...arr) // 1, [2, 3, 4]
    
 ```
 ```javascript
    let obj = {a: 1, b: 2, c: 3}; 
    let { a, ...o} = obj; 
    // a = 1
    // o = { b: 2, c: 3 }
 ```
 ```javascript
    let arr = [1, 2, 3, 4];
    let [a, ...o] = arr;
    // a = 1
    // o = [2, 3, 4]
 ```
 
 ## 6、小结
 在Chrome`版本94.0.4606.81` 、 Firefox`版本93.0 (64 位)`的浏览器下
 - 对象合并，数组合并，Object.assign、connat的性能会比展开运算符“...”的性能高
 - Object.assign会触发Proxy/Object.definedProperty的set方法，展开运算符“...”不会触发
 - 它两都是浅拷贝
 - 合并对象、数组的时候，展开运算符放在前面的性能比放在后面的性能高
 - 不定参数的时候，有自己的使用方式
