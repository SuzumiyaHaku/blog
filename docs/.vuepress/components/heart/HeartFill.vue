<template>
  <div>
    <br/>
    <button @click="a += 0.1"> 加+ </button>
    <input v-model="a" type="number" step="0.1" @change="draw" />
    <button @click="a -= 0.1"> 减- </button>
    a = {{ a }}
    <canvas
      ref="canvas"
      width="600"
      height="300"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
const isInit = ref<boolean>(true);
const a = ref<number>(5.5);
const canvas = ref<HTMLCanvasElement>();
const context = ref<CanvasRenderingContext2D | null | undefined>();
const center = [300, 150]; // 中心
const scale = 30; // 放大缩小

// f(x, t) = x^(2/3) + 0.9 * (π^2 - x^2)^(1/2) * sin(txπ), x ∈ [-2π，2π]，a ∈ R
const fx = (x: number) => {
  const m = Math.pow(Math.abs(x), 2 / 3);
  const n = 0.9 * Math.pow(Math.abs(10 - x ** 2), 0.5);
  return m + n * Math.sin(a.value * Math.PI * x);
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
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1; //设置线条的宽度；不能加单位
  ctx.beginPath();
  const arr: number[][] = [];
  for (let i = -3.2; i <= 3.2; i += 0.01) {
    let x = i;
    let y = -fx(x);
    ctx.lineTo(x * scale + center[0], y * scale + center[1]);
    arr.push([x, y]);
  }
  console.log(arr);

  ctx.stroke();
};
watch(a, draw)
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
