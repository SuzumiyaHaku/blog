# ts类型体操训练

## 切割字符串
### 题目
给定一个字符串，实现类似 "ABC".split("")的功能
```ts
type MySplit<T extends string, R = null> = T extends ""
  ? R
  : T extends `${infer A}${infer B}`
    ? MySplit<B, A | R>
    : R

type R = MySplit<"物语系列">
```

## 加法
### 题目
实现一个n + m，m，n都是正整数, 且m，n小于1000。
### 提示
1. 先实现一个数字转数组，然后拼接两个数组，返回数组的length属性
```ts
type ToTuple<T, U extends number[] = []> = U['length'] extends T ? U : ToTuple<T, [...U, 0]>

type Add<M extends number, N extends number> = [...ToTuple<M>, ...ToTuple<N>]['length']
```

## 减法
### 题目
实现一个n - m，n和m都是整数，且n > m
### 提示
1. 先实现一个数字转数组，然后有如下办法，可得出数组的相差部分的集合。
```ts

type S = [0, 0, 0] extends [0, ...infer A] ? A : -1 // [0, 0]
```

```ts
type ToTuple<T, U extends number[] = []> = U['length'] extends T ? U : ToTuple<T, [...U, 0]>

type Sub<M extends number, N extends number> = ToTuple<M> extends [...ToTuple<N>, ...infer A] ? A['length'] : -1
```

## 两数和
### 题目描述
给定一个数字n，和一个数字的集合，判断集合内是否有两个数相加等于n
### 提示
先用js实现一个可以给TS翻译的写法。
```js
function twoSum2(a: number[], t: number, set: Set<number>): boolean {
  if (a.length === 0) return false;
  let delta = t - a[0]
  return set.has(delta) || twoSum2(a.slice(1), t, new Set([...set, a[0]]))
}
```

```ts
type ToTuple<T, U extends number[] = []> = U['length'] extends T ? U : ToTuple<T, [...U, 0]>

// 加法
type Add<M extends number, N extends number> = [...ToTuple<M>, ...ToTuple<N>]['length']
// 减法
type Sub<M extends number, N extends number> = ToTuple<M> extends [...ToTuple<N>, ...infer A] ? A['length'] : -1


type Tail<T> = T extends [any, ...infer R] ? R : []
type TwoSum<T extends number[], U extends number, R = any> = T['length'] extends 0
  ? false
  : Sub<U, T[0]> extends R
    ? true
    : TwoSum<Tail<T>, U, R | T[0]>

  

type R23 = TwoSum<[1, 2, 3, 4], 6>
```

## 转驼峰
### 题目描述
把 AAA转为BBB的驼峰

```ts
type AAA = {
  aa: string;
  Bb: Array<'aaa_bbb' | 'ccc_ddd_eee'>;
  cc_Dd: {
    eee_fff_ggg: string;
  };
  ff_ii_jj: string;
}

type BBB = {
  aa: string;
  bb: ("aaaBbb" | "cccDddEee")[];
  ccDd: {
    eeeFffGgg: string;
  };
  ffIiJj: string;
}

type Case<T> = T extends any ? {
  [key in keyof T as Uncapitalize<CamelCase<key & string>>]: 
    T[key] extends Array<infer R> ? (CamelCase<R>)[] : 
      T[key] extends Record<string, string> ?
        Case<T[key]>
        : T[key]
} : never

type CamelCase<K> = K extends `${infer A}_${infer B}` ? 
`${A}${Capitalize<CamelCase<B>>}`: K

type res = Case<AAA>

```