<template>
  <canvas ref="canvas" width="600" height="300" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
const canvas = ref<HTMLCanvasElement>();
const center = [300, 100]; // 中心
const scale = 30; // 放大缩小
// 极坐标方程 r = a(1 + sinθ) <- 原公式是 r = a(1 - sinθ)
const ρθ = (x: number) => {
  const a = 3;
  return a * (1 + Math.sin(x));
};
// 极坐标转直角坐标
// x = ρcosθ
const fx = (ρ: number, θ: number) => {
  return ρ * Math.cos(θ);
};
// y = ρsinθ
const fy = (ρ: number, θ: number) => {
  return ρ * Math.sin(θ);
};
onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  distinct(canvas.value, ctx);
  ctx.strokeStyle = "pink";
  ctx.lineWidth = 1; //设置线条的宽度；不能加单位

  const arr: number[][] = [];
  for (let i = -2 * Math.PI; i <= 2 * Math.PI; i += 0.01) {
    const ρ = ρθ(i);
    const x = fx(ρ, i);
    const y = fy(ρ, i);
    ctx.lineTo(x * scale + center[0], y * scale + center[1]);
    arr.push([x, y]);
    console.count();
  }
  console.log(arr);

  ctx.stroke();
});

const distinct = function (canvas: any, ctx: any) { // 处理canvas绘制不清晰的问题
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
