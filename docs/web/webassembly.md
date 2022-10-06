# 快速入门WebAssembly/wasm

## 简介
WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 Rust/ C / C ++ / Go等语言提供一个编译目标，以便它们可以在 Web 上运行。它也被设计为可以与 JavaScript 共存，允许两者一起工作。

本篇文章，会讲述如何创建一个webAssembly的npm包和如何在项目中使用*.wasm文件。

## 配置rust镜像
要是没翻墙，容易下载包之类的失败。所以要配置镜像

将下面的内容复制保存成config（无后缀） 放在.cargo文件夹下面，或者在项目文件夹与.toml文件同级目录里新建一个.cargo文件夹，放在里面

:::: code-group
::: code-group-item config文件

```shell
[source.crates-io]
registry="https://github.com/rust-lang/crates.io-index"
#指定镜像
#如：tuna、sjtu、ustc，或者 rustcc
replace-with='tuna'

#注：以下源配置一个即可，无需全部

#中国科学技术大学
[source.ustc]
registry="https://mirrors.ustc.edu.cn/crates.io-index"

#上海交通大学
[source.sjtu]
registry="https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index/"

#清华大学
[source.tuna]
registry="https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

#rustcc社区
[source.rustcc]
registry="https://code.aliyun.com/rustcc/crates.io-index.git"
```
:::
::::

我的是在
```shell
qaq@MacBook-Pro tree -L 1
.
├── bin
├── config    <----- 创建这么一个文件
├── env
├── git
└── registry
qaq@MacBook-Pro .cargo % pwd
/Users/qaq/.cargo
```
## 创建项目
目标是实现一个wasm版本的，斐波那契数列的第n项。（递归方式实现！）
```js
function foo(i) {
  if (i === 0) return 0;
  if (i === 1) return 1;
  return foo(i - 1) + foo(i - 2)
}
foo(43) // 返回第43个斐波那契数列的值
```

运行rust的cargo
> cargo install wasm-pack

> cargo new --lib web-fib

创建完成后的项目结构
```txt
.
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── target
```


在Cargo.toml里添加如下高亮的代码块。
:::: code-group
::: code-group-item Cargo.toml

```toml{6,7,12}
[package]
name = "web-fib"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
wasm-bindgen = "0.2.63"
```
:::
::::

修改src下的lib.rs为：
:::: code-group
::: code-group-item lib.rs

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fib(v: u32) -> u32 { // rust递归实现斐波那契数列第n项
    match v {
        1 => 1,
        2 => 1,
        _ => fib(v - 1) + fib(v - 2)
    }
}
```
:::
::::
然后运行
> warm-pack build

这时候就会多一个目录pkg，这个pkg就是我们的npm包
```txt{4-10}
.
├── Cargo.lock
├── Cargo.toml
├── pkg
│   ├── package.json
│   ├── web_fib.d.ts
│   ├── web_fib.js
│   ├── web_fib_bg.js
│   ├── web_fib_bg.wasm
│   └── web_fib_bg.wasm.d.ts
├── src
│   └── lib.rs
└── target
    ├── CACHEDIR.TAG
    ├── debug
    ├── release
    └── wasm32-unknown-unknown
```

## 使用wasm
### 以npm包的方式使用
我们在package.json里添加npm包。(这里是npm引入未发布的本地npm的包，可以直接用路径)。
```json{14}
{
  "name": "wasm-test",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "web-fib": "file:/Users/dragon/workspace/rust/work/web-ffmpeg/pkg"
  },
  "devDependencies": {
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "@vitejs/plugin-react": "^2.1.0",
    "typescript": "^4.6.4",
    "vite": "^3.1.0"
  }
}
```
然后执行
> npm install


### wasm的npm包使用

vite中使用
```js
import init from "../node_modules/web-fib/web_fib_bg.wasm?init";

init({}).then((instance) => {
  console.time();
  console.log('通过调用wasm计算fib(43)', instance.exports.fib(43))
  console.timeEnd();
})
```

webpack5中使用


```js
import * as wasm from "web-fib";

console.time();
console.log('通过调用wasm计算fib(43)', wasm.fib(43))
console.timeEnd();
```
::: danger 提示
这样使用的话，需要配置webpack5，这是个实验性功能。或者可以使用wasm-loader，或者参考[以http的方式直接引入](#以http的方式直接引入)的js
```js
module.exports = {
  experiments: {
    asyncWebAssembly: true,
  }
}
```
:::



### 以http的方式直接引入
先把pkg/web_fib_bg.wasm放到服务器上，给到一个http://xxx.xxx.xxx/web_fib_bg.wasm的连接

test.html的代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebAssembly</title>
</head>
<body>
<script>
function loadWebAssembly(fileName) {
  return fetch(fileName, { mode: 'cors' })
    .then(response => response.arrayBuffer()) //加载字节码
    .then(bits => WebAssembly.compile(bits)) //编译字节码
    .then(module => {
    return new WebAssembly.Instance(module)
  });//实例化
};
loadWebAssembly('http://xxx.xxx.xxx/web_fib_bg.wasm') // 你的web_fib_bg.wasm的文件地址
  .then(instance => {
  this.$wasmModule = instance.exports; //将instanc暴露在全局变量中以供js调用
  fib = instance.exports.fib;
  console.time();
  console.log('通过调用wasm计算fib(43)', fib(43))
  console.timeEnd();
});
</script>
</body>
</html>
```


## 参考
- [WebAssembly 官网](https://webassembly.org/)
- [WebAssembly MDN](https://developer.mozilla.org/zh-CN/docs/WebAssembly)
- [The Rust Programming Language](https://doc.rust-lang.org/book/title-page.html)
- [The Rust Reference](https://doc.rust-lang.org/stable/reference/introduction.html)
- [关于wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/)