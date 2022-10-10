# Promise--上

<ClientOnly>
  <MTA/>
</ClientOnly>


## PromiseA+
[PromiseA+英文规范](https://promisesaplus.com/)
下面是中文的翻译:

Promise 表示一个异步操作的最终结果，与之进行交互的方式主要是 then 方法，该方法注册了两个回调函数，用于接收 promise 的终值或本 promise 不能执行的原因。

本规范详细列出了 then 方法的执行过程，所有遵循 Promises/A+ 规范实现的 promise 均可以本标准作为参照基础来实施 then 方法。因而本规范是十分稳定的。尽管 Promise/A+ 组织有时可能会修订本规范，但主要是为了处理一些特殊的边界情况，且这些改动都是微小且向下兼容的。如果我们要进行大规模不兼容的更新，我们一定会在事先进行谨慎地考虑、详尽的探讨和严格的测试。

从历史上说，本规范实际上是把之前 Promise/A 规范 中的建议明确成为了行为标准：我们一方面扩展了原有规范约定俗成的行为，一方面删减了原规范的一些特例情况和有问题的部分。

最后，核心的 Promises/A+ 规范不设计如何创建、解决和拒绝 promise，而是专注于提供一个通用的 then 方法。上述对于 promises 的操作方法将来在其他规范中可能会提及。
### 1. 术语
- `解决（fulfill）`：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 fulfill 来表示解决，但在后世的 promise 实现多以 resolve 来指代之。
- `拒绝（reject）`：指一个 promise 失败时进行的一系列操作。
- `终值（eventual value）`：所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。
- `拒因（reason）`：也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值。

### 2. 要求

#### 2.1. Promise状态
一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。
- `2.1.1` 处于等待态时，promise 需满足以下条件：
    - `2.1.1.1` 可以迁移至执行态或拒绝态
- `2.1.2` 处于执行态时，promise 需满足以下条件：
    - `2.1.2.1` 不能迁移至其他任何状态
    - `2.1.2.2` 必须拥有一个不可变的终值
- `2.1.3` 处于拒绝态时，promise 需满足以下条件：
    - `2.1.3.1` 不能迁移至其他任何状态
    - `2.1.3.2` 必须拥有一个不可变的拒因
这里的不可变指的是恒等（即可用 === 判断相等），而不是意味着更深层次的不可变（**译者注：**盖指当 value 或 reason 不是基本值时，只要求其引用地址相等，但属性值可被更改）。
#### 2.2. then方法
一个 promise 必须提供一个 then 方法以访问其当前值、终值和拒因。
promise 的 then 方法接受两个参数：
```js
promise.then(onFulfilled, onRejected)
```

- `2.2.1.` onFulfilled 和 onRejected 都是可选参数。
    - `2.2.1.1` 如果 onFulfilled 不是函数，其必须被忽略
    - `2.2.1.2` 如果 onRejected 不是函数，其必须被忽略
- `2.2.2.` 如果 onFulfilled 是函数：
    - `2.2.2.1` 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
    - `2.2.2.2` 在 promise 执行结束前其不可被调用
    - `2.2.2.3` 其调用次数不可超过一次
- `2.2.3.` 如果 onRejected 是函数：
    - `2.2.3.1` 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
    - `2.2.3.2` 在 promise 执行结束前其不可被调用
    - `2.2.3.3` 其调用次数不可超过一次

调用时机:
- `2.2.4.` onFulfilled 和 onRejected 只有在[执行上下文](https://es5.github.io/#x10.3)堆栈仅包含平台代码时才可被调用 [注3.1]

调用要求:
- `2.2.5.` onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）[注3.2]

- `2.2.6` then 方法可以被同一个 promise 调用多次
    - `2.2.6.1` 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
    - `2.2.6.2` 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

- `2.2.7` then 方法必须返回一个 promise 对象 [注3.3] :
-  > promise2 = promise1.then(onFulfilled, onRejected);
    - `2.2.7.1` 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
    - `2.2.7.2` 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
    - `2.2.7.3` 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
    - `2.2.7.4` 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的拒因

**译者注：**理解上面的“返回”部分非常重要，即：不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected。

#### 2.3. Promise 解决过程
Promise 解决过程 是一个抽象的操作，其需输入一个 promise 和一个值，我们表示为 [[Resolve]](promise, x)，如果 x 有 then 方法且看上去像一个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其用 x 的值来执行 promise 。

这种 thenable 的特性使得 Promise 的实现更具有通用性：只要其暴露出一个遵循 Promise/A+ 协议的 then 方法即可；这同时也使遵循 Promise/A+ 规范的实现可以与那些不太规范但可用的实现能良好共存。

运行 [[Resolve]](promise, x) 需遵循以下步骤：

- `2.3.1.` x 与 promise 相等
    - `2.3.1.1` 如果 promise 和 x 指向同一对象，以 TypeError 为拒因拒绝执行 promise
- `2.3.2` 如果 x 为 Promise ，则使 promise 接受 x 的状态 [注：3.4]
    - `2.3.2.1` 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    - `2.3.2.2` 如果 x 处于执行态，用相同的值执行 promise
    - `2.3.2.3` 如果 x 处于拒绝态，用相同的拒因拒绝 promise
- `2.3.3` 如果 x 为对象或者函数:
    - `2.3.3.1` 把 x.then 赋值给 then[注：3.5]
    - `2.3.3.2` 如果取 x.then 的值时抛出错误 e ，则以 e 为拒因拒绝 promise
    - `2.3.3.3` 如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
        - `2.3.3.3.1` 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
        - `2.3.3.3.2` 如果 rejectPromise 以拒因 r 为参数被调用，则以拒因 r 拒绝 promise
        - `2.3.3.3.3` 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
        - `2.3.3.3.4` 如果调用 then 方法抛出了异常 e：
            - `2.3.3.3.4.1` 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
            - `2.3.3.3.4.2` 否则以 e 为拒因拒绝 promise
    - `2.3.3.4` 如果 then 不是函数，以 x 为参数执行 promise
- `2.3.4` 如果 x 不为对象或者函数，以 x 为参数执行 promise

如果一个 promise 被一个循环的 thenable 链中的对象解决，而 [[Resolve]](promise, thenable) 的递归性质又使得其被再次调用，根据上述的算法将会陷入无限递归之中。算法虽不强制要求，但也鼓励施者检测这样的递归是否存在，若检测到存在则以一个可识别的 TypeError 为拒因来拒绝 promise [注3.6]。

#### 注：
- `3.1` 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现。由于 promise 的实施代码本身就是平台代码（**译者注：**即都是 JavaScript），故代码自身在处理在处理程序时可能已经包含一个任务调度队列。

- `3.2` 也就是说在**严格模式（strict）**中，函数 this 的值为 undefined ；在非严格模式中其为全局对象。
- `3.3` 代码实现在满足所有要求的情况下可以允许 promise2 === promise1 。每个实现都要文档说明其是否允许以及在何种条件下允许 promise2 === promise1 。
- `3.4` 总体来说，如果 x 符合当前实现，我们才认为它是真正的 promise 。这一规则允许那些特例实现接受符合已知要求的 Promises 状态。

- `3.5` 这步我们先是存储了一个指向 x.then 的引用，然后测试并调用该引用，以避免多次访问 x.then 属性。这种预防措施确保了该属性的一致性，因为其值可能在检索调用时被改变。

- `3.5` 实现不应该对 thenable 链的深度设限，并假定超出本限制的递归就是无限循环。只有真正的循环递归才应能导致 TypeError 异常；如果一条无限长的链上 thenable 均不相同，那么递归下去永远是正确的行为。

### 对照规范实现PromiseA+
下面的代码，加上中英文注释特别长，如果想搞懂，需要动手写。
:::: code-group
::: code-group-item PromiseA.js
```js
// A promise must be in one of three states: pending, fulfilled, or rejected.
// 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、执行态（Fulfilled）
// 和拒绝态（Rejected）。
const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'
function PromiseA(func) {
  this.status = PENDING
  this.res = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []
  try {
    func(this.resolve.bind(this), this.reject.bind(this))
  } catch(e) {
    this.reject(e)
  }
}


PromiseA.prototype.resolve = function(v) {

// 2.1.1 When pending, a promise:
//      2.1.1.1 may transition to either the fulfilled or rejected state.

// 2.1.1 处于pending状态，一个promise满足：
//      2.1.1.1 可以迁移至执行态或拒绝态
  
  if (this.status === PENDING) {
    this.res = v
    // 2.2.4 onFulfilled or onRejected must not be called until the execution 
    //       context stack contains only platform code.[3.1].
    // execution context： https://es5.github.io/#x10.3

    // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里
    //       的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled
    //       和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执
    //       行栈中执行。这个事件队列可以采用“宏任务macro-task”机制或者“微任务micro-task”
    //       机制来实现）。
    // 执行上下文 ：https://es5.github.io/#x10.3
    setTimeout(() => {
      this.status = FULFILLED
      this.onFulfilledCallbacks.forEach(fn => fn())
    }, 0)
    
  }
  
}
PromiseA.prototype.reject = function(reason) {

// 2.1.1 When pending, a promise:
//      2.1.1.1 may transition to either the fulfilled or rejected state.

// 2.1.1 处于pending状态，一个promise满足：
//      2.1.1.1 可以迁移至执行态或拒绝态
  if (this.status === PENDING) {
    this.res = reason

    // 2.2.4 onFulfilled or onRejected must not be called until the execution 
    //       context stack contains only platform code.[3.1].
    // execution context： https://es5.github.io/#x10.3

    // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用（这里
    //       的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled
    //       和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执
    //       行栈中执行。这个事件队列可以采用“宏任务macro-task”机制或者“微任务micro-task”
    //       机制来实现）。
    // 执行上下文 ：https://es5.github.io/#x10.3
    setTimeout(() => {
      this.status = REJECTED
      this.onRejectedCallbacks.forEach(fn => fn())
    }, 0)
    
  }
}

// A promise must provide a then method to access its current or eventual value
//  or reason.
// A promise’s then method accepts two arguments:
// promise.then(onFulfilled, onRejected)

// 一个 promise 必须提供一个 then 方法以访问其当前值、终值和拒因(也就是拒绝原因，指在
//  promise 被拒绝时传递给拒绝回调的值）
// promise 的 then 方法接受两个参数：
// promise.then(onFulfilled, onRejected)
PromiseA.prototype.then = function(onFulfilled, onRejected) {
  var that = this

  // 2.2.2.1 If onFulfilled is not a function, it must be ignored.

  // 2.2.2.1 如果 onFulfilled 不是函数，其必须被忽略
  var onFulfilled = typeof onFulfilled === 'function'
    ? onFulfilled : function(value) { return value };

  // 2.2.2.2 If onRejected is not a function, it must be ignored.

  // 2.2.2.2 如果 onRejected 不是函数，其必须被忽略
  var onRejected = typeof onRejected === 'function'
    ? onRejected : function(reason) { throw reason;}


  // 2.2.7 then must return a promise [3.3].
  // promise2 = promise1.then(onFulfilled, onRejected);

  // 2.2.7 then方法必须返回一个promise对象[注3.3]
  // promise2 = promise1.then(onFulfilled, onRejected);
  var promise2 = new PromiseA((resolve, reject) => {

    function foo1() {
      try {
        // 2.2.2 If onFulfilled is a function:
        //      2.2.2.1 it must be called after promise is fulfilled, with
        //              promise’s value as its first argument.

        // 2.2.2 如果 onFulfilled 是函数
        //      2.2.2.1 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
        var x = onFulfilled(that.res)

        // 2.2.7.1 If either onFulfilled or onRejected returns a value x, run
        //         the Promise Resolution Procedure [[Resolve]](promise2, x).

        // 2.2.7.1 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的
        //         Promise 解决过程：[[Resolve]](promise2, x)
        resolvePromise(promise2, x, resolve, reject)

      } catch (e) {
        // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, 
        //         promise2 must be rejected with e as the reason.

        // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，
        // 并返回拒因 e
        reject(e)
      }
    }
    function foo2() {
      try {
        // 2.2.3 If onRejected is a function:
        //      2.2.3.1 it must be called after promise is rejected, with 
        //              promise’s reason as its first argument.

        // 2.2.3 如果 onRejected 是函数：
        //      2.2.3.1 当 promise 被拒绝执行后其必须被调用，其第一个参数为promise的拒因。
        var x = onRejected(that.res)
        
        // 2.2.7.1 If either onFulfilled or onRejected returns a value x, 
        //         run the Promise Resolution Procedure [[Resolve]](promise2, x).

        // 2.2.7.1 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的
        //         Promise 解决过程：[[Resolve]](promise2, x)
        resolvePromise(promise2, x, resolve, reject)
      } catch (e) {

        // 2.2.7.2 If either onFulfilled or onRejected throws an exception e, 
        //         promise2 must be rejected with e as the reason.
        reject(e)
      }
    }

    // 2.2.2 If onFulfilled is a function:
    //      2.2.2.2 it must not be called before promise is fulfilled.
    if (that.status === FULFILLED) { 
      // 2.2.4 onFulfilled or onRejected must not be called until the execution 
      //       context stack contains only platform code.[3.1].
      // execution context: https://es5.github.io/#x10.3

      // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
      //      （这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 
      //       onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮
      //       事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制
      //       或者“微任务（micro-task）”机制来实现）。
      // 执行上下文 ：https://es5.github.io/#x10.3
      setTimeout(foo1, 0)

      // 2.2.3 If onRejected is a function:
      //      2.2.3.2 it must not be called before promise is rejected

      // 2.2.3 如果 onRejected 是函数
      //      2.2.3.2 在 promise 被拒绝执行前其不可被调用
    } else if (that.status === REJECTED) {
      // 2.2.4 onFulfilled or onRejected must not be called until the execution
      //       context stack contains only platform code.[3.1].
      // execution context: https://es5.github.io/#x10.3

      // 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
      //      （这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 
      //       onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮
      //       事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制
      //       或者“微任务（micro-task）”机制来实现）
      // 执行上下文 ：https://es5.github.io/#x10.3
      setTimeout(foo2, 0)
      
    } else if (that.status === PENDING) {
      // 2.2.6 then may be called multiple times on the same promise.
      // 2.2.6 then 方法可以被同一个 promise 调用多次

      //      2.2.6.1 If/when promise is fulfilled, all respective onFulfilled 
      //              callbacks must execute in the order of their originating
      //              calls to then.
      //      2.2.6.1 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
      that.onFulfilledCallbacks.push(foo1)

      //      2.2.6.2 If/when promise is rejected, all respective onRejected
      //              callbacks must execute in the order of their originating
      //              calls to then.
      //      2.2.6.2 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调
      that.onRejectedCallbacks.push(foo2)
    }
   })
  
  return promise2
}


function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 If promise and x refer to the same object, reject promise with
  //       a TypeError as the reason.
  // 2.3.1 如果 promise 和 x 指向同一对象，以 TypeError 为拒因拒绝执行 promise
  if (x === promise2) {
    reject(new TypeError('Chaining cycle detected for promise'));

  // 2.3.2 If x is a promise, adopt its state[3.4].

  // 2.3.2 如果 x 为 Promise ，则使 promise 接受 x 的状态 [注3.4]
  } else if (x instanceof PromiseA) {
    
    // 2.3.2.1 If x is pending, promise must remain pending until x is 
    //         fulfilled or rejected
    // 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject);

    // 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value

    // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
    } else if (x.status === FULFILLED) {
      resolve(x.res)

    // 2.3.2.3 If/when x is rejected, reject promise with the same reason.
    // 如果 x 处于拒绝态，用相同的拒因拒绝 promise
    } else if (x.status === REJECTED) {
      reject(x.res)
    }

  // 2.3.3 Otherwise, if x is an object or function;

  // 2.3.3 否则，如果 x 为对象或者函数：
 } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {

    // 2.3.3.2 If retrieving the property x.then results in a thrown 
    //         exception e, reject promise with e as the reason.

    // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为拒因拒绝 promise
    try {
      var then = x.then
      if(typeof then === 'function') {
        var isCalled = false;
        
        // 2.3.3.3.4 If calling then throws an exception e.

        // 2.3.3.3.4 如果调用 then 方法抛出了异常 e：
        try {
          // 2.3.3.3 If then is a function, call it with x as this, 
          //         first argument resolvePromise, and second argument
          //         rejectPromise, where:
          
          // 2.3.3.3  如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递
          //          两个回调函数作为参数，第一个参数叫做 resolvePromise ，第
          //          二个参数叫做 rejectPromise:
          then.call(x, function(y) {
  
            // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, 
            //           or multiple calls to the same argument are made, the 
            //           first call takes precedence, and any further calls
            //           are ignored

            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一
            //           参数调用了多次，则优先采用首次调用并忽略剩下的调用
            if (isCalled) return
            isCalled = true
  
            resolvePromise(promise2, y, resolve, reject)
          }, function(r) {
  
            // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, 
            //           or multiple calls to the same argument are made, the
            //           first call takes precedence, and any further calls
            //           are ignored

            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一
            //           参数调用了多次，则优先采用首次调用并忽略剩下的调用
            if (isCalled) return
            isCalled = true
  
            reject(r)
          })
        } catch(e) {
          // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, 
          //           or multiple calls to the same argument are made, the
          //           first call takes precedence, and any further calls
          //           are ignored

          // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一
          //           参数调用了多次，则优先采用首次调用并忽略剩下的调用
          if (isCalled) return
          isCalled = true
          reject(e)
        }
      
      // 2.3.3.4 If then is not a function, fulfill promise with x

      // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
      } else {
        resolve(x)
      }
    } catch(e) {
      reject(e)
    }

  // 2.3.4 If x is not an object or function, fulfill promise with x

  // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
  } else {
    resolve(x)
  }
}

// 测试要加的代码
PromiseA.deferred = function() {
  let obj = {}
  obj.promise = new PromiseA((resolve, reject) => {
    obj.resolve = resolve
    obj.reject = reject
  })
  return obj
}

module.exports = PromiseA
```
:::
::::
### 测试
安装promises-aplus-tests
> npm install -g promises-aplus-tests
在package.json里添加
```json
{
  "scripts": {
    "test": "promises-aplus-tests ./PromiseA.js",
  }
}
```
在你写的PromiseA.js添加如下几段代码，用于测试
```js
// 测试要加的代码
PromiseA.deferred = function() {
  let obj = {}
  obj.promise = new PromiseA((resolve, reject) => {
    obj.resolve = resolve
    obj.reject = reject
  })
  return obj
}
```
运行
> npm run test

## 参考
- [【翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566)
- [Promise/A+规范英文文档](https://promisesaplus.com/)
- [手写一个Promise/A+,完美通过官方872个测试用例](https://www.cnblogs.com/dennisj/p/12660388.html)
