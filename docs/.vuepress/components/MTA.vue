<template>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  // if(import.meta.env.DEV) return;
  let { origin, pathname } = window.location
  let key = btoa(window.location.pathname)
  let value = sessionStorage.getItem(key)
  if (value) {
    if (new Date().getTime() - Number(value) > (1000 * 60)) {
      sessionStorage.removeItem(key)
    }
  } else {
    sessionStorage.setItem(key, new Date().getTime())
    fetch(`//www.suzumiya.club:6935/mta/setCount?origin=${origin}&pathname=${pathname}`)
  }
})
</script>