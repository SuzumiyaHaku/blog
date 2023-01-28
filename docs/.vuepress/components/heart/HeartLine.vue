<template>
  <div>
    <canvas
      ref="canvas"
      width="600"
      height="300"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
const isInit = ref<boolean>(true);
const canvas = ref<HTMLCanvasElement>();
const context = ref<CanvasRenderingContext2D | null | undefined>();
const center = [300, 150]; // 中心
const scale = 5; // 放大缩小

const fx = (t: number) => {
  return 16 * Math.sin(t) ** 3;
};
const fy = (t: number) => {
  return (
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  );
};

onMounted(() => {
  const v = canvas.value?.getContext("2d");
  context.value = v;
  draw();
  isInit.value = false;
});

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
  for (let i = -3.2; i <= 3.2; i += 0.01) {
    let x = fx(i);
    let y = -fy(i);
    x = x * scale + center[0];
    y = y * scale + center[1];
    ctx.fillRect(x, y, 1, 1);
    arr.push([x, y]);
  }
  console.log(arr);

  ctx.stroke();
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
