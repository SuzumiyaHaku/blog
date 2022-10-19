<template>
  <canvas
    ref="mycanvas"
    width="200px"
    height="350px"
    style="background-color: rgba(0,0,0,0)"
  ></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
let mycanvas = (ref<null | HTMLElement>(null))
onMounted(() => {
  mycanvas = mycanvas.value;
  mycanvas.width = 200;
  mycanvas.height = 350;
  let ctx = mycanvas.getContext("2d");
  ctx.clearRect(0, 0, 200, 350);
  ctx.fillStyle = "#00ff00";
  //把每个方程用立即执行函数表达式（先不执行）存放到一个数组，在把这四组放到pwowq的数组
  let pwowq = {
    F1: [
      function (x, y) {
        return 0;
      },
      function (x, y) {
        return 0.16 * y;
      },
    ],
    F2: [
      function (x, y) {
        return 0.2 * x - 0.26 * y;
      },
      function (x, y) {
        return 0.23 * x + 0.22 * y + 1.6;
      },
    ],
    F3: [
      function (x, y) {
        return -0.15 * x + 0.28 * y;
      },
      function (x, y) {
        return 0.26 * x + 0.24 * y + 0.44;
      },
    ],
    F4: [
      function (x, y) {
        return 0.85 * x + 0.04 * y;
      },
      function (x, y) {
        return -0.04 * x + 0.85 * y + 1.6;
      },
    ],
  };

  //  按1% 7% 7% 85%的比例放到newArr数组
  let newArr = [];

  for (let i = 0; i < 1; i++) {
    newArr.push(pwowq.F1);
  }
  for (let ii = 0; ii < 7; ii++) {
    newArr.push(pwowq.F2);
  }
  for (let iii = 0; iii < 7; iii++) {
    newArr.push(pwowq.F3);
  }
  for (let iiii = 0; iiii < 85; iiii++) {
    newArr.push(pwowq.F4);
  }

  let count = 0;
  let render = function () {
    let QAQ;
    let f;
    let x = Math.random();
    let y = Math.random();
    // for (let i = 0;i<10000 ;i++) {
    for (let jj = 0; jj < 20; jj++) {
      /*这里就是传入两随机数x0,y0, 在随机抽取式子，迭代20次*/
      f = newArr[~~(Math.random() * 100)]; //或者f = parseInt(Math.random()*100)
      QAQ = [f[0](x, y), f[1](x, y)];
      x = QAQ[0];
      y = QAQ[1];
    }
    ctx.fillRect(x * 30 + 100, -y * 30 + 320, 1, 1); /*渲染点*/
    if (count < 10000) {
      window.requestAnimationFrame(render); //js的做动画的一种方式
      // window.requestAnimationFrame(render)//取消注释以双倍的速度渲染
      count++;
    }
    // }
  };
  //render()
  window.requestAnimationFrame(render);
});
</script>
