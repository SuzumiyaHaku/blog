# 作用域
关于活动对象AO(activation object)和变量对象VO（variables object）看我这篇文章
[es3的Scope chain的翻译](https://www.cnblogs.com/ruoyin/p/9034294.html)

JavaScript高级编程第四版：

> 上下文中的代码在执行的时候，会创建变量对象的一个作用域链（scope chain）。这个作用域链决定
了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域
链的最前端。如果上下文是函数，则其`活动对象（activation object）`用作变量对象。活动对象最初只有
一个定义变量：arguments。（全局上下文中没有这个变量。）作用域链中的下一个变量对象来自包含上
下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；全局上下文的变量对象始终
是作用域链的最后一个变量对象。


在 ES5 及之后的 ES 版本，已经不存在活跃对象（AO）及一系列周边内容的概念了（意思已经不是原来那个活跃对象了）。取而代之，是一个叫词法环境（Lexical Environments）的定义。
我们现在再聊起活跃对象时，应该知道它只是广义的抽象，而不再是狭义的定义了。广义的活跃对象在不同的场景下也可以有不同的名字，如活跃记录（Activation Record）、栈帧（Stack Frame）等。
每当函数被调用的时候，其都会创建一个活跃对象。该对象对开发者不可见，是一个隐藏的数据结构，其中包含了一些函数在执行时必要的信息和绑定，以及返回值的地址等等。
[参见es5](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/)
## 参考
- [JavaScript 中的活跃对象（AO）浅谈及导读 - 知乎：死月絲卡蕾特](https://zhuanlan.zhihu.com/p/372895529)
- [ECMA-262-3 in detail. Chapter 4. Scope chain.](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/)
- [ECMA-262-5 in detail. Chapter 3.2. Lexical environments: ECMAScript implementation.](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/)
- javascript高级编程第4版