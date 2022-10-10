# 工具类的模拟实现

<ClientOnly>
  <MTA/>
</ClientOnly>


## Partial<Type\>
功能：把属性的必选改为`?`
```ts
type MyPartial<T> = {[key in keyof T]?: T[key] | undefined}
type Test3 = {
  name: 1
  age: 2
}
type NewTest2 = MyPartial<Test3> // { name?: 1; age?: 2; }
type NewTest3 = Partial<Test3> // { name?: 1; age?: 2; }
```
## Required<Type\>
功能：把属性为`?`的，去掉这个`?`
```ts
type MyRequired<T> = { [P in keyof T]-?: T[P]; }
type Test3 = {
  name?: 1
  age?: 2
}
type NewTest2 = MyRequired<Test3> // { name: 1; age: 2; }
type NewTest3 = Required<Test3> // { name: 1; age: 2; }
```
## Readonly<Type\>
把属性变为只读readonly
```ts
type MyReadonly<T> = { readonly [key in keyof T]: T[key] }

let o1 = {
  a: 1,
  b: 2
}

let obj1: MyReadonly<typeof o1> = o1

obj1.a = 233 //错误 ： Cannot assign to 'a' because it is a read-only property.

let o2 = [1, 2, 3]
let obj2: MyReadonly<typeof o2> = o2
obj2.push // 错误 ：Property 'push' does not exist on type 'readonly number[]'.
```
## Record<Keys, Type\>
功能：让一个对象的key指定为Record传进来的Keys的集合之一，值为Type类型
```ts
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```
```js
type MyRecord<T extends string | number | symbol, U> = { [key in T]: U }

```
## Pick<Type, Keys\>
采取对象上key属于Keys的属性，返回对象。
```ts
type MyPick<T, U extends keyof T> = { [key in U]: T[key] }
interface User4 {
  name: '1'
  age: 233
}

type B5 = MyPick<User4, 'name'> // { name: '1' }
type B6 = Pick<User4, 'name'> // { name: '1' }

```
## Omit<Type, Keys\>
排除，对象的Keys属性
```ts
// type MyOmit<T, K extends keyof T> = { [U in Exclude<keyof T, K>]:T[U] }
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> // 排除K需要分配律，所以需要写Exclude单独的函数

interface User5 {
  name: 'sdsd'
  age: 233
}

type R11 = MyOmit<User5, 'name'> // { age: 233 }
type R12 = Omit<User5, 'name'> // { age: 233 }
```
## Exclude<UnionType, ExcludedMembers\>
踢除掉UnionType里的，某个类型。
```ts
type MyExclude<T, U> = T extends U ? never : T;

type A = number | string | boolean

type R9 = MyExclude<A, string> // number | boolean
type R10 = Exclude<A, string> // number | boolean
```
## Extract<Type, Union\>
只提取某些类型
```ts
type MyExtract<T, U> = T extends U ? T : never;

type R13 = MyExtract<1 | 2 | 3, 3> // 3

type R14 = Extract<1 | 2 | 3, 3> // 3
```
## NonNullable<Type\>
踢除 null undefined类型
```ts
type MyNonNullable<T> = T extends null | undefined ? never : T

type R15 = MyNonNullable<string | null | undefined> // string
type R16 = NonNullable<string | null | undefined> // string
```
## Parameters<Type\>
获取函数声明里的参数类型，返回的是参数构成的元组
```ts
type MyParameters<T> = T extends (...args: infer R) => any ? R : never

declare function foo(a: string, b: number): any

type R17 = MyParameters<typeof foo> // [a: string, b: number]
type R18 = Parameters<typeof foo> // [a: string, b: number]
```
## ConstructorParameters<Type\>
提取构造函数的参数类型，返回的是参数构成的元组
```ts
type T0 = ConstructorParameters<ErrorConstructor>;

type MyConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer R) => any ? R : never

let a: ErrorConstructor = Error

let b: ArrayConstructor = Array

type R21 = MyConstructorParameters<ErrorConstructor> // [message?: string]
```

## ReturnType<Type\>
获取函数的返回类型
```ts
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
type Test1 = MyReturnType<() => boolean> // true
type Test2 = ReturnType<() => boolean> // true
```

## Readonly<Type\>
属性都改为只读
```ts
type MyReadonly<T> = { readonly [key in keyof T]: T[key] }

let o1 = {
  a: 1,
  b: 2
}

let obj1: MyReadonly<typeof o1> = o1

obj1.a = 233 //错误 ： Cannot assign to 'a' because it is a read-only property.

let o2 = [1, 2, 3]
let obj2: MyReadonly<typeof o2> = o2
obj2.push // 错误 ：Property 'push' does not exist on type 'readonly number[]'.
```