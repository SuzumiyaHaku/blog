# 心形图形
<ClientOnly>
  <MTA/>
</ClientOnly>

## r = a(1 - sinθ)
<HeartBase/>

关键代码如下
```vue
<template>
  <canvas ref="canvas" width="600" height="600" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
const canvas = ref<HTMLCanvasElement>();
const center = [300, 100]; // 中心
const scale = 50; // 放大缩小
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
// 记得处理canvas不清晰的问题！。
</script>
```

## 线条组成的心
### 1、线条填充
<HeartFill />

$\\f{(x, a)} = x^{\frac{2}{3}} + 0.9 * (π^2 - x^2)^{\frac{1}{2}} * sin(axπ)$<br/> x ∈ [-2π，2π]<br/>a ∈ R
```javascript
const fx = (x: number) => {
  const m = Math.pow(Math.abs(x), 2 / 3);
  const n = 0.9 * Math.pow(Math.abs(10 - x ** 2), 0.5);
  return m + n * Math.sin(5.5 * Math.PI * x);
};
```

### 2、轮廓构成

$\\f(x) = 16sin^3(t)$<br/>
$\\f(y) = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)$
<HeartLine />

```javascript
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
```

### 心跳
<Heartbeat/>