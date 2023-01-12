<script setup lang="ts">
import { onMounted } from 'vue';
import CallApp from "callapp-lib"
const option = {
  scheme: {
    protocol: 'thfuse'
  },
  wxAppid: 'wx3cc08b56b3f3077c',
  appstore:
    'https://apps.apple.com/app/apple-store/id653300680?pt=986281&ct=MDiversion&mt=8',
  yingyongbao: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.truckhome.bbs',
  fallback: 'https://www.baidu.com/',
  timeout: 2000,
  logFunc: function (status, data) {
    console.log(status, data)
  }
}
const lib = new CallApp(option)
console.log(lib, 'test');

onMounted(() => {
  lib.setDomConfig({
    id: 'open-app1',
    path: 'chefuse.com',
    height: 40,
    param: {
      type: 'article',
      id: 1232324324
    }
  })
})


</script>
<template>
   我是test页面 
   <div class="open">
    测试打开111
    <div id="open-app1"></div>
   </div>
</template>
<style lang="less">
.open {
  position: relative;
  width: 140px;
  height: 40px;
  .open-app {
    width: 140px;
    height: 40px;
    font-size: 12px;
    color: red;
  }
  #open-app1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>