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
import { cloneDeep } from "lodash-es";

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
      let temp = cloneDeep(v2); // structuredClone(v2);
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
