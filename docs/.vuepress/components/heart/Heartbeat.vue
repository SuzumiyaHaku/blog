<template>
  <div>
    <br/>
    <div>heartWidth: {{ heartWidth }}</div>
    <div>heartHeight: {{ heartHeight }}</div>
    <div>param3: {{ param3 }}</div>
    <div>param4: {{ param4 }}</div>

    <canvas
      ref="canvas"
      width="600"
      height="300"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
const isInit = ref<boolean>(true);
const scale = ref<number>(5); // 放大缩小
const canvas = ref<HTMLCanvasElement>();
const context = ref<CanvasRenderingContext2D | null | undefined>();

const CENTER_X = 300;
const CENTER_Y = 150;

const heartWidth = ref<number>(1);
const heartHeight = ref<number>(1); // 高度的缩放
const param3 = ref<number>(1);
const param4 = ref<number>(1);

const isPlay = ref<boolean>(true);
const isClose = ref<boolean>(false);

// const fx = (t: number) => {
//   return 16 * Math.sin(t) ** 3;
// };
// const fy = (t: number) => {
//   return (
//     13 * Math.cos(t) -
//     5 * Math.cos(2 * t) -
//     2 * Math.cos(3 * t) -
//     Math.cos(4 * t)
//   );
// };
const fx = (t: number) => {
  return 16 * heartWidth.value * Math.sin(t * 1) ** 3;
};
const fy = (t: number) => {
  return (
    13 * heartHeight.value * Math.cos(t) -
    5 * param3.value * Math.cos(2 * t) -
    2 * param4.value * Math.cos(3 * t) -
    Math.cos(4 * t)
  );
};

const scatterInside = (x: number, y: number, beta = 0.5) => {
  const ratiox = - beta * Math.log(Math.random());
  const ratioy = - beta * Math.log(Math.random());
  const dx = ratiox * (x - CENTER_X);
  const dy = ratioy * (y - CENTER_Y);
  return [x - dx, y - dy];
};
const scatterInside2 = (x: number, y: number, beta = 0.5) => {
  const ratiox = -Math.log(Math.random()) * beta;
  const ratioy = -Math.log(Math.random()) * beta;
  const dx = ratiox * (x - CENTER_X);
  const dy = ratioy * (y - CENTER_Y);
  return [x + dx, y + dy * 0.1];
};

onMounted(() => {
  const v = canvas.value?.getContext("2d");
  context.value = v;
  window.requestAnimationFrame(init);
  isInit.value = false;
});

onUnmounted(() => {
  isClose.value = true;
})

const speed = 0.005;

const dWidth = 0.2;
const dHeight = 0.2;
const dParam3 = 0.1;
const dParam4 = 0.5;

const dHeightMax = 1.5;

const wSpeed = dWidth / (dHeight / speed);

const p3Speed = dParam3 / (dHeight / speed);
const p4Speed = dParam4 / (dHeight / speed);

const init = () => {
  if (isPlay.value) {
    if (heartHeight.value >= dHeightMax) {
      isPlay.value = false;
    } else {
      heartWidth.value += wSpeed;
      heartHeight.value += speed;
      param3.value += p3Speed;
      param4.value += p4Speed;
    }
  } else {
    if (heartHeight.value <= dHeightMax - dHeight) {
      isPlay.value = true;
    } else {
      heartWidth.value -= wSpeed;
      heartHeight.value -= speed;
      param3.value -= p3Speed;
      param4.value -= p4Speed;
    }
  }
  draw();
};

const draw = () => {
  const ctx = context.value;
  if (!ctx) return;
  if (isInit.value) {
    distinct(canvas.value, ctx);
  }
  ctx.clearRect(0, 0, 1200, 600);
  ctx.fillStyle = "red";
  ctx.lineWidth = 1; //设置线条的宽度；不能加单位
  ctx.beginPath();
  const arr: number[][] = [];
  for (let i = -5; i <= 5; i += 0.01) {
    let x = fx(i);
    let y = -fy(i);
    x = x * scale.value + CENTER_X;
    y = y * scale.value + CENTER_Y;
    // ctx.fillRect(x, y, 1, 1);
    for (let j = 0; j < 10; j++) {
      ctx.fillStyle = "#FF0033";
      const [xx, yy] = scatterInside(x, y, 0.13);
      ctx.fillRect(xx, yy, 1, 1);
    }

    ctx.fillStyle = "#FF3333";
    const [xx, yy] = scatterInside2(x, y, heartHeight.value * 0.1);
    ctx.fillRect(xx, yy, 1, 1);

    arr.push([x, y]);
  }
  console.log(arr);

  ctx.stroke();
  !isClose.value && window.requestAnimationFrame(init);
};

const distinct = function (canvas: any, ctx: any) {
  // 处理canvas绘制不清晰的问题
  const backingStore =
    ctx.backingStorePixelRatio ||
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;
  const ratio = (window.devicePixelRatio || 1) / backingStore;
  // 3、将 Canvas 宽高进行放大，要设置canvas的画布大小，使用的是 canvas.width 和 canvas.height；
  const oldWidth = canvas.width;
  const oldHeight = canvas.height;
  canvas.width = oldWidth * ratio;
  canvas.height = oldHeight * ratio;
  // 4、要设置画布的实际渲染大小，使用的 style 属性或CSS设置的 width 和 height，只是简单的对画布进行缩放。
  canvas.style.width = oldWidth + "px";
  canvas.style.height = oldHeight + "px";
  // 5、放大倍数：由于 Canvas 放大后，相应的绘制图片时也要放大，可以直接使用 scale 方法
  ctx.scale(ratio, ratio);
};
</script>
