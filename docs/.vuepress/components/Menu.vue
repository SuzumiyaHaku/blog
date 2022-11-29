<template>
  <div class="iphone">
    <div class="menu">
      <div class="item-wrapper">
        <div class="add"><span>+</span></div>
        <div class="item"><span>主页</span></div>
        <div class="item"><span>我的</span></div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
.iphone {
  position: relative;
  width: 375px;
  height: 300px;
  // background: #ede9ed;
  

  .menu {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    filter: contrast(20);
    background-color: #fff;
    .item-wrapper {
      display: flex;
      justify-content: space-around;
      // background: #fffdff;
      filter: blur(6px);
      background-color: #fff;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
      }
    }
    .add {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // background: #fe5f51;
      background-color: aqua;
      color: #fff;
      font-size: 1.5rem;
      margin-top: -10px;
      filter: blur(6px);
    }
  }
}
</style>
