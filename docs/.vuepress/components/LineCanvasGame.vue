<template>
  <button style="width: 100px; height: 40px" @click="reset">重置</button>
  <button style="width: 100px; height: 40px" @click="slicing">切割</button>
  <canvas
    ref="canvas"
    style="background: rgba(0, 0, 0, 1); width: 500px; height: 500px"
  ></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
let canvas = ref<null | HTMLCanvasElement>(null);
let reset = () => {};
let slicing = () => {}


onMounted(() => {
  let mycanvas = canvas.value as HTMLCanvasElement;
  mycanvas.width =
    parseInt(getComputedStyle(mycanvas, null)["width"]) * devicePixelRatio;
  mycanvas.height =
    parseInt(getComputedStyle(mycanvas, null)["height"]) * devicePixelRatio;
  var ctx = mycanvas.getContext("2d")!;
  ctx.strokeStyle = "aqua";
  ctx.beginPath();
  let offset = {
    x: 600,
    y: 400,
  };
  let cube = {
    width: 100,
    height: 300,
  };
  const p1 = { x: 0 + offset.x, y: 0 + offset.y };
  const p2 = { x: cube.width + offset.x, y: 0 + offset.y };
  const p3 = { x: cube.width + offset.x, y: cube.height + offset.y };
  const p4 = { x: 0 + offset.x, y: cube.height + offset.y };
  const points = [p1, p2, p3, p4];

  const draw = (points) => {
    ctx.strokeStyle = "aqua";
    ctx.lineWidth = 1;
    ctx.beginPath();
    points.forEach((p, index) => {
      if (index === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 255, 255, 0.7)'
    ctx.fill();
  };
  

  // sence
  const drawSence = () => {
    ctx.beginPath();
    ctx.moveTo(0, 0 + offset.y + cube.height);
    ctx.lineTo(mycanvas.width, 0 + offset.y + cube.height - 1);
    ctx.stroke();
  };

  // cut
  const cut = () => {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 0 + offset.y + cube.height / 2);
    ctx.lineTo(mycanvas.width, 0 + offset.y + cube.height / 4);
    ctx.stroke();
  };

  
  reset = () => {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height)
    draw(points);
    drawSence();
    console.log('233??')
  }

  reset()


  slicing = () => {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height)
    cut();
    draw([
      { ...p1, y: p1.y - 30 },
      { ...p2, y: p2.y - 30 },
      { x: p2.x, y: p2.y + 85 },
      { x: p1.x, y: p2.y + 95 },
    ]);
    draw([{ x: p2.x, y: p2.y + 110 }, { x: p1.x, y: p2.y + 120 }, p4, p3]);
    drawSence();
  };
});
</script>
