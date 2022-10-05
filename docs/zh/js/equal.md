# 隐式转换 == 和 ===

## 对比
### 对比组件
<Equal/>

### vue组件的代码
```vue
<template>
  <div class="equal">
    <div class="container">
      <div class="row">
        <span class="row-label-2" v-for="(item, index) in keyStr" :key="index">
          {{ item }}
        </span>
      </div>
      <div class="row" v-for="(item, index) in data" :key="index">
        <span class="row-label-1">{{ keyStr[index] }}</span>
        <span
          class="club"
          @mouseenter="mouseEvent(child)"
          @mouselevel="mouseEvent"
          @click.stop="handler(child.key)"
          :class="`${child.style} ${current.key === child.key ? 'on' : ''}`"
          v-for="(child, childKey) in item"
          :key="childKey"
        >
        </span>
      </div>
    </div>
    <div class="legend">
      <span
        class="legend-item"
        v-for="(item, index) in ['===', '==', '>= && <=', '>=', '<=', 'else']"
      >
        <span class="legend-club" :class="`legend-club-${index + 1}`"></span>
        <span>{{ item }}</span>
      </span>
    </div>
    <div class="equal-condition">
      <ul v-if="current.show" v-for="(item, index) in current.show">
        <li>
          <span class="if">if (</span>{{ item.template
          }}<span class="if">)</span> <span class="res"> // {{ item.res }}</span
          ><br />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onUnmounted } from "vue";

// 要比较的值
const keyVal = [
  null,
  undefined,
  false,
  "false",
  Boolean(false),
  [],
  [[]],
  "",
  String(""),
  0,
  Number(0),
  "0",
  String("0"),
  [0],
  true,
  "true",
  Boolean(true),
  1,
  Number(1),
  "1",
  String("1"),
  [1],
  -1,
  Number(-1),
  "-1",
  String("-1"),
  [-1],
  Infinity,
  -Infinity,
  Object(),
  NaN,
];

// 比较的值对应的字符串，显示用
const keyStr = [
  `null`,
  `undefined`,
  `false`,
  `"false"`,
  `Boolean(false)`,
  `[]`,
  `[[]]`,
  `""`,
  `String("")`,
  `0`,
  `Number(0)`,
  "0",
  `String("0")`,
  `[0]`,
  `true`,
  `"true"`,
  `Boolean(true)`,
  `1`,
  `Number(1)`,
  `"1"`,
  `String("1")`,
  `[1]`,
  `-1`,
  `Number(-1)`,
  `"-1"`,
  `String("-1")`,
  `[-1]`,
  `Infinity`,
  `-Infinity`,
  `Object()`,
  `NaN`,
];

// 根据传入的值，按===、==、>= && <= 、 >=、<=的优先级比较，得到样式名
const getStyle = (value1, value2) => {
  if (value1 === value2) {
    return "club-1";
  } else if (value1 == value2) {
    return "club-2";
  } else if (value1 >= value2 && value1 <= value2) {
    return "club-3";
  } else if (value1 >= value2) {
    return "club-4";
  } else if (value1 <= value2) {
    return "club-5";
  } else {
    return "";
  }
};

// 初始化每个方块的数据
const data = reactive(
  keyVal.map((v1, k1) =>
  keyVal.map((v2, k2) => {
      let temp = structuredClone(v2);
      let leftStr = keyStr[k1];
      let rightStr = keyStr[k2];
      return {
        key: `${k1}-${k2}`,
        style: getStyle(v1, temp),
        show: [
          {
            template: `${leftStr} === ${rightStr}`,
            res: v1 === temp,
          },
          {
            template: `${leftStr} == ${rightStr}`,
            res: v1 == temp,
          },
          {
            template: `${leftStr} >= ${rightStr} && ${leftStr} <= ${rightStr}`,
            res: v1 >= temp && v1 <= temp,
          },
          {
            template: `${leftStr} >= ${rightStr}`,
            res: v1 >= temp,
          },
          {
            template: `${leftStr} <= ${rightStr}`,
            res: v1 <= temp,
          },
        ],
      };
    })
  )
);
const ctrl = ref(true); // 控制点击后，移动鼠标不改变current选中的值。默认移动可改current
const current = ref(data[0][0]); // 默认选中

const mouseEvent = (item) => {
  // 鼠标移入/移出事件，有值为移入
  if (ctrl.value) {
    current.value = item || data[0][0];
  }
};
const handler = (key) => {
  // 方块点击事件
  if (current.value.key === key) {
    ctrl.value = !ctrl.value;
  }
};

const bodyListenerHandler = () => {
  ctrl.value = true;
};
document.body.addEventListener("click", bodyListenerHandler);
onUnmounted(() => {
  document.body.removeEventListener("click", bodyListenerHandler);
});
</script>
<style lang="less" scoped>
@clubWdith: 18px;
@clubOpacity: 0.7;

li,
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.theme() {
  background-color: rgba(185, 193, 194, @clubOpacity);
  &-1 {
    background-color: rgba(150, 41, 32, @clubOpacity);
  }
  &-2 {
    background-color: rgba(228, 112, 98, @clubOpacity);
  }
  &-3 {
    background-color: rgba(244, 199, 23, @clubOpacity);
  }
  &-4 {
    background-color: rgba(49, 202, 113, @clubOpacity);
  }
  &-5 {
    background-color: rgba(52, 153, 219, @clubOpacity);
  }
}

.equal {
  position: relative;
  overflow: hidden;
  .container {
    display: grid;
    grid-row-gap: 1px;

    .row {
      display: flex;
      .row-label-1 {
        width: 100px;
        padding-right: 5px;
        text-align: right;
      }
      .row-label-2 {
        width: @clubWdith;
        text-align: left;
        writing-mode: vertical-lr;
        transform: rotate3d(0, 0, 1, 180deg);
        padding: 5px 0 2px 1px;
        &:first-child {
          margin-left: 104px;
        }
      }
      .club {
        width: @clubWdith;
        height: @clubWdith;
        margin-right: 1px;
        .theme();

        @keyframes animation1 {
          from {
          }
          to {
            background-color: white;
          }
        }
        @keyframes animation2 {
          from {
          }
          to {
            outline-color: rgba(200, 200, 200, 1);
          }
        }

        &.on {
          position: relative;
          animation: animation1 1s infinite alternate;
          cursor: pointer;

          &::before,
          &::after {
            position: absolute;
            outline: 1px solid rgb(30, 30, 30);
            content: " ";
            pointer-events: none;
            animation: animation2 1s infinite alternate;
          }

          &::before {
            left: -800px + @clubWdith;
            width: 800px;
            height: @clubWdith;
          }
          &::after {
            top: -800px + @clubWdith;
            width: @clubWdith;
            height: 800px;
          }
        }
      }
    }
  }

  .legend {
    padding: 20px 0 0 104px;
    .legend-item {
      display: inline-flex;
      align-items: center;
      margin-right: 40px;
      .legend-club {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        .theme();
      }
    }
  }

  .equal-condition {
    padding: 20px 0 0 100px;
    .if {
      padding: 0 5px;
      color: rgb(182, 59, 177);
    }
    .res {
      padding-left: 20px;
      color: green;
    }
  }
}
</style>

```


## ES6规范
### ==比较 
[7.2.12 Abstract Equality Comparison](https://262.ecma-international.org/6.0/#sec-abstract-equality-comparison)

The comparison x == y, where x and y are values, produces true or false. Such a comparison is performed as follows:
> 比较x == y，返回true或false，比较分别如下所示：

1. `ReturnIfAbrupt(x)`.
2. `ReturnIfAbrupt(y)`.
> 执行ReturnIfAbrupt(x/y)。这是一个判断值是否正常的函数，x或y的值非法的话就抛出异常。

3. If `Type(x)` is the same as `Type(y)`, then Return the result of performing Strict Equality Comparison x === y.
> 如果`Type(x)`和`Type(y)`相同，执行严格相等运算x === y。

4. If x is `null` and y is `undefined`, return `true`.
> 如果x是`null`, y是 `undefined`，返回 `true`

5. If x is `undefined` and y is `null`, return `true`.
> 如果x是`undefined`, y是 `null`，返回 `true`

6. If `Type(x)` is `Number` and `Type(y)` is `String`, return the result of the comparison x == ToNumber(y).
> 如果`Type(x)` 是 `Number`, `Type(y)`是 `String`, 返回 x == `ToNumber(y)`的结果。

7. If `Type(x)` is `String` and `Type(y)` is `Number`,return the result of the comparison `ToNumber(x)` == y.
> 如果`Type(x)` 是 `String`, `Type(y)`是 `Number`, 返回 `ToNumber(x)` == y的结果。

8. If `Type(x)` is `Boolean`, return the result of the comparison `ToNumber(x)` == y.
> 如果`Type(x)` 是`Boolean`, 返回 `ToNumber(x)` == y的结果。

9. If `Type(y)` is `Boolean`, return the result of the comparison x == `ToNumber(y)`.
> 如果`Type(y)` 是`Boolean`, 返回 x == `ToNumber(y)`的结果。

10. If `Type(x)` is either `String`, `Number`, or `Symbol` and `Type(y)` is `Object`, then return the result of the comparison x == `ToPrimitive(y)`.
> 如果`Type(x)` 是 `String`、`Number`、`Symbol`，`Type(y)`是`Object`，返回 x == `ToPrimitive(y)`的结果。(`ToPrimitive`是`Object`转化为引擎内部原始值的方法)

11. If `Type(x)` is `Object` and `Type(y)` is either `String`, `Number`, or `Symbol`, then return the result of the comparison `ToPrimitive(x)` == y.
> 如果`Type(x)` 是 `Object`, `Type(y)`是 `String`、`Number`、`Symbol`，返回`ToPrimitive(x)` == y的结果。

12. Return `false`.
> 0 == null 就由这返回false，因为null的类型是`Null`，0的类型是`Number`

### ===比较
[7.2.13 Strict Equality Comparison](https://262.ecma-international.org/6.0/#sec-strict-equality-comparison)

The comparison x === y, where x and y are values, produces true or false. Such a comparison is performed as follows:
> 比较x === y，返回true或false，比较分别如下所示：

- If `Type(x)` is different from `Type(y)`, return `false`.
- If `Type(x)` is `Undefined`, return `true`.
- If `Type(x)` is `Null`, return `true`.
- If `Type(x)` is `Number`, then
    - If x is `NaN`, return `false`.
    - If y is `NaN`, return `false`.
    - If x is the same `Number` value as y, return `true`.
    - If x is `+0` and y is `−0`, return `true`.
    - If x is `−0` and y is `+0`, return `true`.
    - Return `false`.
- If `Type(x)` is `String`, then
    - If x and y are exactly the same sequence of code units (same length and same code units at corresponding indices), return `true`.(如果x和y是完全相同的代码单元，（一样的长度和一样的代码单元，索引是相对应的))
    - Else, return `false`.
- If `Type(x)` is `Boolean`, then
    - If x and y are both `true` or both `false`, return `true`.
    - Else, return `false`.
- If x and y are the same `Symbol` value, return `true`.
- If x and y are the same `Object` value, return `true`.
- Return `false`.

:::tip 注：
This algorithm differs from the SameValue Algorithm (7.2.9) in its treatment of signed zeroes and `NaNs`.
> 该算法与[SameValue算法（7.2.9）](https://262.ecma-international.org/6.0/#sec-samevalue)在处理有符号零和`NaNs`方面有所不同。
:::