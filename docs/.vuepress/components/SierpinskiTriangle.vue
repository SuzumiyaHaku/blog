<template>
    <canvas ref="mycanvas" :style="`background:rgba(0,0,0,1);width:${props.width}px;height:${props.width}px;`"></canvas>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
let mycanvas = (ref<null | HTMLElement>(null))
const props = defineProps({
    width: { type: Number, default: 100 },
    speed: { type: Boolean, default: false }
})
onMounted(() => {
  mycanvas = mycanvas.value;
  const WIDTH = props.width;
  const PADDING = 10;
  const scale =  window.devicePixelRatio
  mycanvas.width = scale * WIDTH;
  mycanvas.height = scale * WIDTH;
  var ctx = mycanvas.getContext("2d");
  var pointObj = {
    point1: {
      x: ((WIDTH - PADDING) / 2) * scale,
      y: PADDING * scale,
    },
    point2: {
      x: PADDING * scale,
      y: (WIDTH - PADDING) * scale,
    },
    point3: {
      x: (WIDTH - PADDING) * scale,
      y: (WIDTH - PADDING) * scale,
    },
    beginPoint: {
      x: 50,
      y: 50,
    },
  };
//   ctx.fillStyle = "red";
//   for (var item in pointObj) {
//     ctx.fillRect(pointObj[item].x, pointObj[item].y, 5, 5);
//   }
  ctx.fillStyle = "aqua";
  function setPoint(point) {
    pointObj.beginPoint.x = pointObj.beginPoint.x / 2 + point.x / 2;
    pointObj.beginPoint.y = pointObj.beginPoint.y / 2 + point.y / 2;
  }

  var i = 0;
  function draw() {
    i++
    var randomNum = Math.random().toFixed(2) * 100;

    if (randomNum < 33) setPoint(pointObj.point1);
    else if (randomNum >= 33 && randomNum < 66) setPoint(pointObj.point2);
    else setPoint(pointObj.point3);
    ctx.fillRect(pointObj.beginPoint.x, pointObj.beginPoint.y, 1, 1);
    if(props.speed) return
    if (i < 20000) {
      window.requestAnimationFrame(draw);
    } else {
      window.cancelAnimationFrame(draw);
    }
  }
  
  if(props.speed) {
    while(i < 10000) {
        draw()
    }
  } else {
    window.requestAnimationFrame(draw);
  }
});
</script>
