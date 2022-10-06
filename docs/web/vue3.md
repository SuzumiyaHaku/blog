# vue3源码[未完...]

《vue.js设计与实现》
## 模块
带有-browser字样的esm资源是直接给<script type ="module"\>使用的
带有-bundler是给打包工具使用的
## Tree-Shaking副作用移除注释
```js
import { foo } from './utils'
/*#__PURE__*/ foo()
```
注释代码告诉rollup.js、webpack、压缩的terser。 对于foo函数的调用不会产生副作用，可以摇掉。
## 特性开关
```js
if (__FEATURE_OPTIONS_API__) {
  //...
}
```
“当 Vue.js 构建资源时，如果构建的资源是供打包工具使用的（即带有 -bundler 字样的资源），那么上面的代码在资源中会变成”
```js
if (__VUE_OPTIONS_API__) {
}
```
__VUE_OPTIONS_API__是一个特性开关
可以在，webpack.DefinePlugin开启特性
```js
new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: JSON.stringify(true)
})
```

## 错误处理
```js
// 源码vue3/core/packages/runtime-core/src/errorHandling.ts
export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}
```

## 响应式系统
依赖绑定原理，利用Proxy劫持对象的属性，当对象有读/写的时候，触发依赖绑定的副作用函数
```js{9,14}
let obj = {
  a: 1
};

const bucket = new Set();

const p = new Proxy(obj, {
  get(target, prototype, receiver) {
    bucket.add(effect)
    return target[prototype]
  },
  set(target, prototype, newVal, receiver) {
    target[prototype] = newVal;
    bucket.forEach(fn => fn());
  }
})

function effect() {
  document.body.innerText = p.a
}
effect()
setTimeout(() => {
  p.a = 233
}, 1000)
```
1. 增加多个effect的依赖
得到如下模型
```txt
target1 ---------- WeakMap1
  prototype1 ----- Map1
  prototype2 ----- Map2
    effect   ----- Set1
    effect   ----- Set1

target2 ---------- WeakMap1
  prototype3 ----- Map3
    effect   ----- Set2
```

```js{10-19,24-26}
let obj = {
  a: 1
};

let activeEffect;
const bucket = new WeakMap();

const p = new Proxy(obj, {
  get(target, prototype, receiver) {
    if (!activeEffect) return target[prototype]
    let depsMap = bucket.get(target)
    if (!depsMap) {
      bucket.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(prototype);
    if (!deps) {
      depsMap.set(prototype, deps = new Set())
    }
    deps.add(activeEffect) // 根据prototype绑定对应的effect函数
    return target[prototype]
  },
  set(target, prototype, newValue, receiver) {
    target[prototype] = newValue
    let m = bucket.get(target)
    let set = m.get(prototype)
    set && set.forEach(fn => fn()) // 改变变量后执行对应的副作用函数
  },

})


function effect(fn) {
  activeEffect = fn // 存储副作用函数的引用，相比较之前就可以不关心函数的名称了
  fn()
}


effect(() => {
  console.log('effect run')
  document.body.innerText = p.a
})

effect(() => {
  console.log('p.c 1: ', p.c)
})
effect(() => {
  console.log('p.c 2: ', p.c)
})

setTimeout(() => {
  p.c = 233
}, 1000)
```
2. 增加副作用依赖记录，并且每次执行结束副作用函数要清除副作用函数
```js{21,34-39,43}
let obj = {
  a: 1,
  c: 233,
};

let activeEffect;
const bucket = new WeakMap();

const p = new Proxy(obj, {
  get(target, prototype, receiver) {
    if (!activeEffect) return target[prototype];
    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(prototype);
    if (!deps) {
      depsMap.set(prototype, (deps = new Set()));
    }
    deps.add(activeEffect);
    activeEffect.deps.push(deps); // 存储依赖的set
    return target[prototype];
  },
  set(target, prototype, newValue, receiver) {
    target[prototype] = newValue;
    let m = bucket.get(target);
    let set = new Set(m.get(prototype)); // 重新new set避免，fn函数里执行了删除set里元素导致无限循环的问题。
    set && set.forEach((fn) => fn()); // 改变变量后执行对应的副作用函数
  },
});

function effect(fn) {
  let effectFn = () => {
    for (let i = 0; i < effectFn.deps.length; i++) {
      // 从记录依赖的set移除副作用函数
      let v = effectFn.deps[i];
      v.delete(fn);
    }
    effectFn.deps.length = 0;
    activeEffect = effectFn; // 存储副作用函数的引用，相比较之前就可以不关心函数的名称了
    fn();
  };
  effectFn.deps = [];
  effectFn();
}

effect(() => {
  console.log("effect run");
  document.body.innerText = p.a == 1 ? `p.a=${p.a}` : `p.c=${p.c}`;
});

setTimeout(() => {
  p.a = 233;
}, 1000);
```
3. 增加嵌套effect的能力
```js{28-32,36,46,48-49}
let obj = {
  a: 1,
  c: 233,
};

let activeEffect;
const bucket = new WeakMap();

const p = new Proxy(obj, {
  get(target, prototype, receiver) {
    if (!activeEffect) return target[prototype];
    let depsMap = bucket.get(target);
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(prototype);
    if (!deps) {
      depsMap.set(prototype, (deps = new Set()));
    }
    deps.add(activeEffect);
    activeEffect.deps.push(deps); // 存储依赖的set
    return target[prototype];
  },
  set(target, prototype, newValue, receiver) {
    target[prototype] = newValue;
    let m = bucket.get(target);
    let set = new Set(m.get(prototype)); // 重新new set避免，fn函数里执行了删除set里元素导致无限循环的问题。
    set && set.forEach((fn) => {
      if (activeEffect != fn){ // 避免 p.a = p.a + 1的get和set同时触发导致死循环的问题
        fn()
      }
    }); // 改变变量后执行对应的副作用函数
  },
});

let effectStack = []
function effect(fn) {
  let effectFn = () => {
    for (let i = 0; i < effectFn.deps.length; i++) {
      // 从记录依赖的set移除副作用函数
      let v = effectFn.deps[i];
      v.delete(fn);
    }
    effectFn.deps.length = 0;
    activeEffect = effectFn; // 存储副作用函数的引用，相比较之前就可以不关心函数的名称了
    effectStack.push(effectFn)
    fn();
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1] // 嵌套情况，activeEffect的值会被覆盖，所以执行完毕fn后要重置为之前的值
  };
  effectFn.deps = [];
  effectFn();
}

effect(() => {
  console.log("effect 1");
  effect(() => {
    console.log("effect 2");
    let temp = p.c
  });
  let temp = p.a
});
p.a = 233
```

## ref和reactive的区别

::: tip 提示
ref是基于reactive的
:::
### 需要ref的原因
因为js存在`Boolean、Number、BigInt、String、Symbol、undefined 和 null 等`类型的值。这些值不是`引用类型`。基于proxy做响应式的条件是，传入的对象为一个`引用类型`。

### reactive源码

vue3/core/packages/reactivity/src/reactive.ts
```ts{15,16}
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}
export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value
```

### ref的源码
`const count = ref(0)`会经历如下步骤
1. 执行ref函数，ref API会直接执行源码里的createRef函数。
2. 判断非`Ref`类型，则用RefImpl类进行包装，
3. RefImpl类包装时，在其不是`shallowRef`时初始化的时候会调用上面reactive源码中的`toReactive`
4. 执行的`toReactive`里会判断是一个Object对象时调用`reactive`API。

vue3/core/packages/reactivity/src/ref.ts
```ts{10}
class RefImpl<T> {
  private _value: T
  private _rawValue: T

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value() {
    trackRefValue(this)
    return this._value
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal)
      triggerRefValue(this, newVal)
    }
  }
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}

export function ref(value?: unknown) {
  return createRef(value, false)
}
```


## computed
```js
let plusOne = computed(() => count.value + 1)
```
computed的本质是可控effect。其副作用函数`() => count.value + 1`执行时间为在读取`plusOne.value`的时候触发得到结果

vue3/core/packages/reactivity/src/computed.ts
```ts{20-25,31-40,77,84}
export class ComputedRefImpl<T> {
  public dep?: Dep = undefined

  private _value!: T // 缓存上一次计算的属性
  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false

  public _dirty = true “// 用来标识是否需要重新计算值，为 true 则意味着“脏”，需要计算”

  public _cacheable: boolean

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean,
    isSSR: boolean
  ) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
    this.effect.active = this._cacheable = !isSSR
    this[ReactiveFlags.IS_READONLY] = isReadonly
  }

  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    const self = toRaw(this)
    trackRefValue(self)
    if (self._dirty || !self._cacheable) {
      self._dirty = false
      self._value = self.effect.run()!
    }
    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}


export function computed<T>(
  getter: ComputedGetter<T>,
  debugOptions?: DebuggerOptions
): ComputedRef<T>
export function computed<T>(
  options: WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): WritableComputedRef<T>
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions,
  isSSR = false
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>

  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)

  if (__DEV__ && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack
    cRef.effect.onTrigger = debugOptions.onTrigger
  }

  return cRef as any
}
```
vue3/core/packages/reactivity/src/effect.ts
```js{36,58}
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined

  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean
  /**
   * @internal
   */
  private deferStop?: boolean

  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }

  run() {
    if (!this.active) {
      return this.fn()
    }
    let parent: ReactiveEffect | undefined = activeEffect
    let lastShouldTrack = shouldTrack
    while (parent) {
      if (parent === this) {
        return
      }
      parent = parent.parent
    }
    try {
      this.parent = activeEffect
      activeEffect = this
      shouldTrack = true

      trackOpBit = 1 << ++effectTrackDepth

      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this)
      } else {
        cleanupEffect(this)
      }
      return this.fn()
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this)
      }

      trackOpBit = 1 << --effectTrackDepth

      activeEffect = this.parent
      shouldTrack = lastShouldTrack
      this.parent = undefined

      if (this.deferStop) {
        this.stop()
      }
    }
  }

  stop() {
    // stopped while running itself - defer the cleanup
    if (activeEffect === this) {
      this.deferStop = true
    } else if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}
```

## watch
```js
const count = ref(0);
watch(count, () => {
  console.log("count:", count.value);
});
count.value++
```
watch 的实现本质上就是利用了 effect 以及 options.scheduler 选项。当`count.value++`执行的时候，就会触发回调函数

vue3/core/packages/runtime-core/src/apiWatch.ts
```ts{53,236,243-257}
// overload: array of multiple sources + cb
export function watch<
  T extends MultiWatchSources,
  Immediate extends Readonly<boolean> = false
>(
  sources: [...T],
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// overload: multiple sources w/ `as const`
// watch([foo, bar] as const, () => {})
// somehow [...T] breaks when the type is readonly
export function watch<
  T extends Readonly<MultiWatchSources>,
  Immediate extends Readonly<boolean> = false
>(
  source: T,
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// overload: single source + cb
export function watch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// overload: watching reactive object w/ cb
export function watch<
  T extends object,
  Immediate extends Readonly<boolean> = false
>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// implementation
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  if (__DEV__ && !isFunction(cb)) {
    warn(
      `\`watch(fn, options?)\` signature has been moved to a separate API. ` +
        `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
        `supports \`watch(source, cb, options?) signature.`
    )
  }
  return doWatch(source as any, cb, options)
}

function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): WatchStopHandle {
  if (__DEV__ && !cb) {
    if (immediate !== undefined) {
      warn(
        `watch() "immediate" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
    if (deep !== undefined) {
      warn(
        `watch() "deep" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
  }

  const warnInvalidSource = (s: unknown) => {
    warn(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, ` +
        `a reactive object, or an array of these types.`
    )
  }

  const instance = currentInstance
  let getter: () => any
  let forceTrigger = false
  let isMultiSource = false

  if (isRef(source)) {
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    getter = () => source
    deep = true
  } else if (isArray(source)) {
    isMultiSource = true
    forceTrigger = source.some(s => isReactive(s) || isShallow(s))
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          return traverse(s)
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER)
        } else {
          __DEV__ && warnInvalidSource(s)
        }
      })
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = () =>
        callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER)
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup()
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          ErrorCodes.WATCH_CALLBACK,
          [onCleanup]
        )
      }
    }
  } else {
    getter = NOOP
    __DEV__ && warnInvalidSource(source)
  }

  // 2.x array mutation watch compat
  if (__COMPAT__ && cb && !deep) {
    const baseGetter = getter
    getter = () => {
      const val = baseGetter()
      if (
        isArray(val) &&
        checkCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance)
      ) {
        traverse(val)
      }
      return val
    }
  }

  if (cb && deep) {
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }

  let cleanup: () => void
  let onCleanup: OnCleanup = (fn: () => void) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, ErrorCodes.WATCH_CLEANUP)
    }
  }

  // in SSR there is no need to setup an actual effect, and it should be noop
  // unless it's eager
  if (__SSR__ && isInSSRComponentSetup) {
    // we will also not call the invalidate callback (+ runner is not set up)
    onCleanup = NOOP
    if (!cb) {
      getter()
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
        getter(),
        isMultiSource ? [] : undefined,
        onCleanup
      ])
    }
    return NOOP
  }

  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE
  const job: SchedulerJob = () => {
    if (!effect.active) {
      return
    }
    if (cb) {
      // watch(source, cb)
      const newValue = effect.run()
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? (newValue as any[]).some((v, i) =>
              hasChanged(v, (oldValue as any[])[i])
            )
          : hasChanged(newValue, oldValue)) ||
        (__COMPAT__ &&
          isArray(newValue) &&
          isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance))
      ) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup()
        }
        callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
          onCleanup
        ])
        oldValue = newValue
      }
    } else {
      // watchEffect
      effect.run()
    }
  }

  // important: mark the job as a watcher callback so that scheduler knows
  // it is allowed to self-trigger (#1727)
  job.allowRecurse = !!cb

  let scheduler: EffectScheduler
  if (flush === 'sync') {
    scheduler = job as any // the scheduler function gets called directly
  } else if (flush === 'post') {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense)
  } else {
    // default: 'pre'
    job.pre = true
    if (instance) job.id = instance.uid
    scheduler = () => queueJob(job)
  }

  const effect = new ReactiveEffect(getter, scheduler)

  if (__DEV__) {
    effect.onTrack = onTrack
    effect.onTrigger = onTrigger
  }

  // initial run
  if (cb) {
    if (immediate) {
      job()
    } else {
      oldValue = effect.run()
    }
  } else if (flush === 'post') {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    )
  } else {
    effect.run()
  }

  return () => {
    effect.stop()
    if (instance && instance.scope) {
      remove(instance.scope.effects!, effect)
    }
  }
}
```
## diff算法

### 简单比较
### 双端比较
### 最长递增子序列
vue3/core/packages/runtime-core/src/renderer.ts
```ts
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

```