# typescript基础
## 参考
- [ts官方文档 英文](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
## 分配率
发生在exends表达式里，传入的联合类型(union type)的时候
```ts
type ToArray<T> = T extends any ? T[] : never
type D5 = ToArray<string | number> // string[] | number[]
type D6 = ToArray<string & number> // never

type D7 = ToArray<never> // never
```
### 去掉分配律的方式
```js
type toArray2<T> = [T] extends [any] ? T[] : never
type D55 = toArray2<string | number> // (string | number)[]
```

## 递归
递归深度最大不超过1000

实现输入数字，返回一个数组用0填充。（类似Array(3).fill(0)的功能）
```ts
type Tupler<N, Arr extends Array<number> = []> = Arr['length'] extends N ? Arr : Tupler<N, [...Arr, 0]>
```

实现一个把数组里的类型，按照如果是number转为'yes'字符串否则就转为'no'的type。
```ts
type T1 = [string, number, boolean, void, Function]
type T2<key> = key extends number ? 'yes' : 'no'

type T3<T1, C extends string[] = []> = T1 extends [infer M, ...infer N] ? 
  N extends [] ? 
      [...C, T2<M>]
      : 
      T3<N, [...C, T2<M>]>
    : 
    never

type T4 = T3<T1>

```

## 笛卡尔积
使用联合类型（union type）在字符串模板合并会发生笛卡尔积的现象
```ts
type A1 = 'a' | 'b'
type A2 = 'd' | 'e'

type S = `${A1}${A2}` // "ad" | "ae" | "bd" | "be"
```

## 枚举类型
```ts
enum Color { Red = 1, Green, Black };

console.log(Color.Red) // 1
console.log(Color.Green) // 2

console.log(Color[1]) // 'Red'

```
## 函数重载
和java的函数重载不一样
:::: code-group
::: code-group-item typescript
```ts
function foo(a: string): any
function foo(a: number, b: number): any
function foo(a: number | string, b?: number | string, c?: string): any {
  
}
```
:::

::: code-group-item java
>

重载(overloading) 是在一个类里面，方法名字相同，而参数不同。返回类型可以相同也可以不同。

每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。

最常用的地方就是构造器的重载。

重载规则:

- 被重载的方法必须改变参数列表(参数个数或类型不一样)；
- 被重载的方法可以改变返回类型；
- 被重载的方法可以改变访问修饰符；
- 被重载的方法可以声明新的或更广的检查异常；
- 方法能够在同一个类中或者在一个子类中被重载。
- 无法以返回值类型作为重载函数的区分标准。
```java
public class Overloading {
  public int test(){
    System.out.println("test1");
    return 1;
  }

  public void test(int a){
    System.out.println("test2");
  }   
 
  //以下两个参数类型顺序不同
  public String test(int a, String s){
      System.out.println("test3");
      return "returntest3";
  }   

  public String test(String s,int a){
      System.out.println("test4");
      return "returntest4";
  }   

  public static void main(String[] args){
      Overloading o = new Overloading();
      System.out.println(o.test());
      o.test(1);
      System.out.println(o.test(1,"test3"));
      System.out.println(o.test("test4",1));
  }
}
```
:::

::::

## Never类型
代表没有返回的类型如报错
```ts
function foo(): never {
  throw Error("233");
}
```
或者无限的while(true)循环
```ts
function foo(): never {
  while(true){

  }
}
```
当有个"兜底"的情况。
```ts
interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

type All = Foo | Bar
```
在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：
```ts
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```
## unknown
[https://github.com/Microsoft/TypeScript/pull/24439](https://github.com/Microsoft/TypeScript/pull/24439)
```js
// In an intersection everything absorbs unknown

type T00 = unknown & null;  // null
type T01 = unknown & undefined;  // undefined
type T02 = unknown & null & undefined;  // null & undefined (which becomes never in union)
type T03 = unknown & string;  // string
type T04 = unknown & string[];  // string[]
type T05 = unknown & unknown;  // unknown
type T06 = unknown & any;  // any

// In a union an unknown absorbs everything

type T10 = unknown | null;  // unknown
type T11 = unknown | undefined;  // unknown
type T12 = unknown | null | undefined;  // unknown
type T13 = unknown | string;  // unknown
type T14 = unknown | string[];  // unknown
type T15 = unknown | unknown;  // unknown
type T16 = unknown | any;  // any

// Type variable and unknown in union and intersection

type T20<T> = T & {};  // T & {}
type T21<T> = T | {};  // T | {}
type T22<T> = T & unknown;  // T
type T23<T> = T | unknown;  // unknown

// unknown in conditional types

type T30<T> = unknown extends T ? true : false;  // Deferred
type T31<T> = T extends unknown ? true : false;  // Deferred (so it distributes)
type T32<T> = never extends T ? true : false;  // true
type T33<T> = T extends never ? true : false;  // Deferred

// keyof unknown

type T40 = keyof any;  // string | number | symbol
type T41 = keyof unknown;  // never

// Only equality operators are allowed with unknown

function f10(x: unknown) {
    x == 5;
    x !== 10;
    x >= 0;  // Error
    x + 1;  // Error
    x * 2;  // Error
    -x;  // Error
    +x;  // Error
}

// No property accesses, element accesses, or function calls

function f11(x: unknown) {
    x.foo;  // Error
    x[5];  // Error
    x();  // Error
    new x();  // Error
}

// typeof, instanceof, and user defined type predicates

declare function isFunction(x: unknown): x is Function;

function f20(x: unknown) {
    if (typeof x === "string" || typeof x === "number") {
        x;  // string | number
    }
    if (x instanceof Error) {
        x;  // Error
    }
    if (isFunction(x)) {
        x;  // Function
    }
}

// Homomorphic mapped type over unknown

type T50<T> = { [P in keyof T]: number };
type T51 = T50<any>;  // { [x: string]: number }
type T52 = T50<unknown>;  // {}

// Anything is assignable to unknown

function f21<T>(pAny: any, pNever: never, pT: T) {
    let x: unknown;
    x = 123;
    x = "hello";
    x = [1, 2, 3];
    x = new Error();
    x = x;
    x = pAny;
    x = pNever;
    x = pT;
}

// unknown assignable only to itself and any

function f22(x: unknown) {
    let v1: any = x;
    let v2: unknown = x;
    let v3: object = x;  // Error
    let v4: string = x;  // Error
    let v5: string[] = x;  // Error
    let v6: {} = x;  // Error
    let v7: {} | null | undefined = x;  // Error
}

// Type parameter 'T extends unknown' not related to object

function f23<T extends unknown>(x: T) {
    let y: object = x;  // Error
}

// Anything but primitive assignable to { [x: string]: unknown }

function f24(x: { [x: string]: unknown }) {
    x = {};
    x = { a: 5 };
    x = [1, 2, 3];
    x = 123;  // Error
}

// Locals of type unknown always considered initialized

function f25() {
    let x: unknown;
    let y = x;
}

// Spread of unknown causes result to be unknown

function f26(x: {}, y: unknown, z: any) {
    let o1 = { a: 42, ...x };  // { a: number }
    let o2 = { a: 42, ...x, ...y };  // unknown
    let o3 = { a: 42, ...x, ...y, ...z };  // any
}

// Functions with unknown return type don't need return expressions

function f27(): unknown {
}

// Rest type cannot be created from unknown

function f28(x: unknown) {
    let { ...a } = x;  // Error
}

// Class properties of type unknown don't need definite assignment

class C1 {
    a: string;  // Error
    b: unknown;
    c: any;
}
```

## 元组
定义一个数组里每项的类型
```ts
type tuple = [number, string]
let arr: Array<tuple> = []
arr.push([1, 's'])

let a: tuple = [233, 'tom']
```

## 泛型
当一个函数，我们想传 number、string、或者你自己定义的类型。那么就需要写成泛型，意思代表传入时，我们先标记（声明）好类型。传参就要按照我们标记（声明）的类型传。
```ts
function foo1<T, U>(a: T, b: U): T & U{
  return {
    ...a,
    ...b
  }
}

foo1<string, number>("4", 2);// 标记(声明)foo1传入的两个参数的类型，第一个为string，第二个是number。
```
```ts
let map: Map<number, string> = new Map<number, string>();
map.set(1, 2) // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```
```ts
class ArrayList<T> extends Array<T> {
  constructor() { // 可省略，es6默认不写就是这串代码
    super()
  }
}

let list = new ArrayList<number>();
list.push('23') // Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(list)
```
## in

如下代码里 keyof User得到的就是 name | age

```ts
interface User {
  name?: string
  readonly age: number
}

type User1 = {
  +readonly [key in keyof User]+?: User[key]
}
type User2 = {
  -readonly [key in keyof User]-?: User[key]
}

type User3 = {
  [key in keyof User2 as `get${Capitalize<string & key>}`]: () => {}
}
```

## infer
类似于变量占位的感觉。
```ts
type Arr = [1, 2, 3, 4]

type R1 = Arr extends [infer M, ...infer N] ? M : never // 1

type R2<T extends unknown[]> = T extends (infer U)[] ? U : never

type R3 = R2<string[]> // string

type R4<T extends Function> = T extends (...args: any) => infer R ? R : never;

type R5 = R4<() => boolean> // boolean
// 等同于type R5 = ReturnType<() => boolean>


type R = Arr extends [infer M, ...infer N] ? M : N 
```

## extends

```ts
interface A1 {
  name: string
}

interface A2 {
  age: number
}

interface B1 {
  name: string
  age: number
}

type D1 = B1 extends A1 ? 'yes' : 'no' // yes
type D2 = A1 extends B1 ? 'yes' : 'no' // no

type D3 = (A1 & A2) extends B1 ? 'yes' : 'no' // yes
type D4 = number & string extends number ? 'yes' : 'no' // yes
type D5 = number | string extends number ? 'yes' : 'no' // no
type D6 = number extends number | string ? 'yes' : 'no' // yes 

type B = 2 extends 0 ? true : false // false  这里意思就是值比较是否相等
```


## ThisType
需要在tsconfig.json开启noImplicitThis: true

给this加上属性
```ts
interface Aa {
  a: string
  b: number
  foo: (...args: any) => any
}

let opt: Aa & ThisType<{ cc: 'string'}> = {
  a: '1',
  b: 2,
  foo() {
    this.cc = 'string'
  }
}
```
## 单词字符大小写操作
### Uppercase
把字符串所有字母都转大写
```ts
type Greeting = "hello, world"
type ShoutyGreeting = Uppercase<Greeting> // "HELLO, WORLD"
```

### lowercase
把字符串所有字母都转小写
```ts
type Greeting = "HELLO, WORLD"
type QuietGreeting = Lowercase<Greeting> // "hello, world"
```
### Capitalize
字符串第一个字母转大写
```ts
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>; // "Hello, world"
```

### Uncapitalize
字符串第一个字母转小写
```ts
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>; // hELLO WORLD
```