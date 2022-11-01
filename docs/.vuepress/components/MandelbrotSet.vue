<template>
  <canvas
    ref="canvas"
    :width="WIDTH"
    :height="HEIGHT"
    style="background: rgba(0, 0, 0, 0)"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
let canvas = ref<null | HTMLCanvasElement>(null);
interface Point1 {   
  cX: number;
  cY: number;
  x: number;
  y: number;
  r: number;
};
interface Point2 {
  x: number;
  y: number;
  Tr: number | null;
  Ti: number | null;
  color: string;
}
const WIDTH = 500 * 1.2;
const HEIGHT = 300 * 1.2;

var xRange = [-2.2, 1.5];
var yRange = [-1.2, 1.2];
// var xRange = [-.5, .1];
// var yRange = [-1, -.5];

var xStep = (xRange[1] - xRange[0]) / WIDTH;
var yStep = (yRange[1] - yRange[0]) / HEIGHT;

let arr: Point1[] = [];
let cX = xRange[0];
for (let i = 0; i < WIDTH; i++) {
  let cY = yRange[0];
  for (let j = 0; j < HEIGHT; j++) {
    arr.push({
      cX,
      cY,
      x: i,
      y: j,
      r: 0,
    });
    cY += yStep;
  }
  cX += xStep;
}
// Z_{n+1} = Z_{n}^2 + C
// function iterateEquation(cX, cY) {
//   let Z = 0;
//   let Zi = 0;
//   let sqrt = Math.sqrt;
//   var i = 0
//   for (; i < 255; i++) {
//     if(2 < Z){
//       return [i]
//     }

//     Z = Z ** 2 + sqrt(cX**2 + cY**2)
//   }
//   return [i, null]
// }

function iterateEquation(Cr, Ci) {
  let Zr = 0;
  let Zi = 0;
  let Tr = 0;
  let Ti = 0;

  for (var n = 0; n < 20; ++n) {
    if (2 < Zr) {
      return [null, Tr, Ti];
    }
    Zi = 2 * Zr * Zi + Ci;
    Zr = Tr - Ti + Cr;
    Tr = Zr ** 2;
    Ti = Zi ** 2;
  }
  return [n, Tr, Ti];
}

function getColor(Tr1, Tr2, Ti1, Ti2) {
  // console.log(Tr1, Tr2, Ti1, Ti2)

  return `rgba(${~~(Math.abs(Tr1 * 100 - Tr2 * 100) % 255)},0,0, 1)`;
}

let pointerArr: Point2[] = [];
for (let i = 0; i < arr.length; i++) {
  let prev = i > 0 ? pointerArr[pointerArr.length - 1] : null;
  let curr = arr[i];
  let [n, Tr, Ti] = iterateEquation(curr.cX, curr.cY);
  if (n) {
    pointerArr.push({
      x: curr.x,
      y: curr.y,
      Tr,
      Ti,
      color: prev ? getColor(prev.Tr, Tr, prev.Ti, Ti) : `rgba(0,0,0,1)`,
    });
  }
}
function render() {
  let mycanvas = (canvas.value) as HTMLCanvasElement;
  mycanvas.width = WIDTH;
  mycanvas.height = HEIGHT;
  let ctx = mycanvas.getContext("2d");
  if (!ctx) {
    throw Error(`mycanvas.getContext("2d") is null`);
  }
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  let i = 0;
  let len = pointerArr.length;
  let speed = 250;
  let id: number;
  let draw = () => {
    for (let j = 1; j <= speed && i + j < len; j++) {
      let curr = pointerArr[i + j];
      ctx!.fillStyle = curr.color;
      ctx!.fillRect(curr.x, curr.y, 1, 1);
    }
    if (i < len) {
      id = window.requestAnimationFrame(draw);
    } else {
      window.cancelAnimationFrame(id);
    }
    i += speed;
  };
  draw();
}
onMounted(() => {
  render();
});
</script>
