# CommonJS、AMD、CMD、ESM、UMD

<ClientOnly>
  <MTA/>
</ClientOnly>


《深入浅出node.js》模块机制部分的阅读笔记
## CommonJS
在模块中，上下文提供require()方法来引入外部模块。对应引入的功能，上下文提供了
exports对象用于导出当前模块的方法或者变量，并且它是唯导出的出口。在模块中，还存在
一个module对象，它代表模块自身，而exports是module的属性。在Node中，一个文件就是一个模块，将方法挂载在exports对象上作为属性即可定义导出的方式：

math.js
```js
exports.add = function(a, b) {
  return a + b
}
```
```js
var math = require('math')
console.log(math.add(1, 2))
```
### 解析该模块node做什么
在node里，模块分为两类，一类是node提供的模块，称为核心模块。另一类是用户编写的模块，称为文件模块。
- 核心模块部分在Node源代码编译的过程中，编译进了二进制文件。在Node进程启动时，部分核心模块就直接加载进内存，所以这部分核心模块引入时，文件定位和编译这两个步骤可以省略掉，并且在路径分析中优先判断，所以加载速度是最快的
- 文件模块则是在运动时动态加载，需要完整的路径分析、文件定位、编译执行的过程，速度比核心模块慢。

与前端浏览器会缓存静态脚本文件以提高性能一样，Node对引入过的模块都会进行缓存，以减少二次引入时的开销。不同的地方在于，浏览器仅仅缓存文件，而Node缓存的是编译和执行之后的对象。

不论是核心模块还是文件模块,reauire(方法对相同模块的二次加载都一律采用缓存优先的
方式，这是第一优先级的。不同之处在于核心模块的缓存检查先于文件模块的缓存检查。

#### 1. 路径分析、 文件定位
##### 模块标识符分析
模块标识符在Node中主要分为以下几类
- 核心模块，如http、fs、path等
- `.`或`..`，开始的相对路径文件模块。
- 以`/`开始的绝对路径文件模块。
- 非路径形式的文件模块，如自定义的connect模块。

1. 核心模块
核心模块的优先级仅次于缓存加载，它在Node的源代码编译过程中已经编译为二进制代码，
其加臷过程最快。如果试图加载一个与核心模块标识符相同的自定义模块，那是不会成功的。如果自己编写了
一个http用户模块，想要加载成功，必须选择一个不同的标识符或者换用路径的方式。

2. 路径形式的文件模块
以`.`、`..`和`/`开始的标识符，这里都被当做文件模块来处理。在分析路径模块时，requireO方
法会将路径转为真实路径，并以真实路径作为素引，将编译执行后的结果存放到缓存中，以使二
次加载时更快。
由于文件模块给Node指明了确切的文件位置，所以在查找过程中可以节约大量时间

3. 自定义模块
自定义模块式，非上面两种，它可能是一个文件或者包的形式，这类模块查找是最慢的。
它的模块的路径是生成的，它类似于js的原型原型链的查找。文件夹路径越深，模块查找耗时会越多。

##### 目录的分析和包

在分析标识符的过程中，require()通过分析文件扩展名之后，可能没有查我到对应文件，但
却得到一个目录，这在引入自定义模块和逐个模块路径进行查找时经常会出现，此时Node会将目
录当做一个包来处理。

在这个过程中，Node对CommonJS包规范进行了一定程度的支持。首先，Node在当前目录下
查找package.json（CoramonJs包规范定义的包描述文件)，通过〕SON.parse()解析出包描述对象，
从中取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将会进入扩展名分析的步骤。

而如果main属性指定的文件名错误，或者压根没有packagejson文件，Node会将index当做默
认文件名，然后依次查找indexjs、indexjson、index.node。

如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查
找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会拋出查找失败的异常。

#### 2. 模块编译
编译和执行是引入文件模块的最后一个阶段。定位到具体的文件后，Node会新建一个模块对
象，然后根据路径载入并编译。对于不同的文件扩展名，其载入方法也有所不同，具体如下所示。
- .js文件。通过fs模块同步读取文件后编译执行
- node文件。这是用C/C++编写的扩展文件，通过dlopen（方法加载最后编译生成的文件。
- json文件。通过fs模块同步读取文件后，用JSON.parse()解析返回结果。
- 其余扩展名文件。它们都被当做.js文件载入。

每一个编译成功的模块都会将其文件路径作为索引缓存在Module.cache对象上，以提高二
次引入的性能。
根据不同的文件扩展名，Node会调用不同的读取方式，如json文件的调用如下：

```js
// Native extension for .json
Module._extensions['.json'] = function(module，filename）{
var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
try {
  module.exports = JSON.parse(stripBOM(content));
} catch (err) {
  err.message = filename + ':' + err.message;
  throw err;
}
```
其中，Module.extensions会被赋值给require（的extensions属性，所以通过在代码中访问require.extensions可以知道系统中已有的扩展加载方式。编写如下代码测试一下：
> console.log(require.extensions)
得到结果：
```js
[Object: null prototype] {
  '.js': [Function (anonymous)],
  '.json': [Function (anonymous)],
  '.node': [Function (anonymous)]
}
```

##### CommonJS模块里require、exports、module从哪来的，还有__filename、__dirname呢？

事实上，在编译的过程中，Node对获取的JavaScript文件内容进行了头尾包装。在头部添加
了 (function (exports, require, module,__filename,__dirname）{\n，在尾部添加了\n});
一个正常的JavaScript文件会被包装成如下的样子：
```js
(function (exports, require, module, __filename, __dirname) {
  var math = require('math');
  exports.area = function (radius) {
    return Math.PI * radius;
  };
});
```
这样每个模块文件之间都进行了作用域隔离。包装之后的代码会通过vm原生模块的
IunInThisContext（方法执行（类似eval，只是具有明确上下文，不污染全局），返回一个具体的function对象。最后，将当前模块对象的exports属性、require(方法、module（模块对象自身），以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个function(执行。

这就是这些变量并没有定义在每个模块文件中却存在的原因。在执行之后，模块的exports
属性被返回给了调用方。exports属性上的任何方法和属性都可以被外部调用到，但是模块中的
其余变量或属性则不可直接被调用。

为何存在exports的情况下，还存在module.exports。理想情况下，只要赋值给exports即可:
```js
exports = function() {
  // My Class
}
```
但是通常都会得到一个失败的结果。其原因在于，exports对象是通过形参的方式传人的，
直接赋值形参会改变形参的引用，但并不能改变作用域外的值。

如果要达到require引人一个类的效果，请赋值给module.exports对象。这个迁回的方案不改
变形参的引用。

## AMD

AMD规范是CommonJs模块规范的一个延伸，它的模块定义如下:
> define (id?, dependencies?, factory);
它的模块id和依赖是可选的，与Node模块相似的地方在于factory的内容就是实际代码的内
容。下面的代码定义了一个简单的模块：
```js
define (function() {
  var exports = {};
  exports.sayHello = function() {
    alert('Hello from module: + module.id);
  }
  return exports;
);
```
不同之处在于AMD模块需要用define来明确定义一个模块，而在Node实现中是隐式包装的，
它们的目的是进行作用域隔离，仅在需要的时候被引人，避免掉过去那种通过全局变量或者全局
命名空间的方式，以免变量污染和不小心被修改。另一个区别则是内容需要通过返回的方式实现
导出。

## CMD
CMD规范由国内的玉伯提出，与AMD规范的主要区别在于定义模块和依赖引人的部分。
AMD需要在声明模块的时候指定所有的依赖，通过形参传递依赖到模块内容中:
```js
define(['dep1', 'dep2'], function(dep1, dep2) {
  return function () {};
})
```
与AMD模块规范相比，CMD模块更接近于Node对CommonJS规范的定义：
> define(factory);
在依赖部分，CMD支持动态引入，示例如下：
```js
define(function(require, exports, module) {
  ///
})
```
require、exports和module通过形参传递给模块，在需要依赖模块时，随时调用requireo引入即可。

### UMD
UMD就是兼容上述CommonJS、CMD、AMD模块的，兼容代码
```js
 (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD/CMD
        define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) { // 假装这是一个模块
    // 暴露的属性
    return {}
}));
```

### ESM
es6的新语法，也是Tree Shaking的基础。也是目前前端写代码最常接触的。关于基础语法可以看[ECMAScript6入门  阮一峰  Module的语法](https://es6.ruanyifeng.com/#docs/module)。
需要注意的点是ES Module导出的是一份值的引用，CommonJS则是一份值的拷贝。

对于模块相互引用的情况。CommonJS和ES Module都对循环引入做了处理不会进入死循环：
- CommonJS借助模块缓存，遇到require函数会先检查是否有缓存，已经有的则不会进入执行，在模块缓存中还记录着导出的变量的拷贝值；
- ES Module借助模块地图，已经进入过的模块标注为获取中，遇到import语句会去检查这个地图，已经标注为获取中的则不会进入，地图中的每一个节点是一个模块记录，上面有导出变量的内存地址，导入时会做一个连接——即指向同一块内存。

### 推荐阅读
- [【译】Node 模块之战：为什么 CommonJS 和 ES Module 不能共存](https://juejin.cn/post/6865557155102064648)
- [为什么模块依赖会导致死循环](https://juejin.cn/post/7110813179432665101)
- [ECMAScript6入门  阮一峰  Module的语法](https://es6.ruanyifeng.com/#docs/module)
- [MDN import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)