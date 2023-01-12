<script setup lang="ts">
import { onMounted, ref } from 'vue'
import heic2any from 'heic2any'
import axios from 'axios'
import { CreateLucky } from '@truckhome/lucky-plate'
import '@truckhome/lucky-plate/dist/index.css'
// import { GlobalPosition, translatePoint } from '@truckhome/global-position'
import {GlobalPosition} from '@truckhome/global-position'
import { useRoute, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const list = [
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142525-4741.png',
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142513-8117.png',
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142459-1375.png',
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142437-8856.png',
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142427-8191.png',
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142412-2401.png',
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142359-7538.png',
  'https://img8.kcimg.cn/HW_Image/Turntable/2022/0325/20220325142459-1375.png'
].map((item, index) => ({ id: index + 1, img: item }))
let num = 1

let lucky: CreateLucky

const g = GlobalPosition({
  success: (data, point) => {
    console.log(data, point)
  }
})

onMounted(() => {
  var vConsole = new VConsole()
  lucky = new CreateLucky({
    container: '#lucky_wheel',
    data: list,
    options: {
      start: getAsync,
      callback: () => {
        console.log(111)
      }
    }
  })
  function changeBase64 (url: string) {
    var image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url + '&v=' + Math.random()
    image.onerror = () => {
      console.log('error')
    }
    image.onload = () => {
      console.log(11111)

      var canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      var ctx = canvas.getContext('2d')
      ctx!.drawImage(image, 0, 0, image.width, image.height)
      var ext = image.src
        .substring(image.src.lastIndexOf('.') + 1)
        .toLowerCase()
      var dataUrl = canvas.toDataURL('image/' + ext)
      var base64 = JSON.parse(JSON.stringify(dataUrl)) // 这里就是转化成的编码
      console.log(base64)
    }
  }
  changeBase64(
    'file:///private/var/folders/dy/8h49c99s1hd0tcd64xxzw64h0000gn/T/com.kingsoft.wpsoffice.mac/wps-xjccc/ksohtml//wps2.png'
  )
})
async function getAsync () {
  const id: number = await getId()
  console.log(id)
  lucky.setLuckyId(id)
}
async function getId (): Promise<number> {
  num++
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num)
    }, 2000)
  })
}
const fileValue = ref('')
const src = ref('')
const onChange = async (e: any) => {
  const file = e.target.files[0]
  const url = await file2Blob(file)
  console.log(url)

  console.log(file)
}

const getFileType = (reader: any) => {
  const bufferInt = new Uint8Array(reader.result)
  const arr = bufferInt.slice(0, 4) // 通用格式图片
  const headerArr = bufferInt.slice(0, 16) // heic格式图片
  let header = ''
  let allHeader = ''
  let realMimeType

  for (let i = 0; i < arr.length; i++) {
    header += arr[i].toString(16) // 转成16进制的buffer
  }

  for (let i = 0; i < headerArr.length; i++) {
    allHeader += headerArr[i].toString(16)
  }
  // magic numbers: http://www.garykessler.net/library/file_sigs.html
  switch (header) {
    case '89504e47':
      realMimeType = 'image/png'
      break
    case '47494638':
      realMimeType = 'image/gif'
      break
    case 'ffd8ffDB':
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      realMimeType = 'image/jpeg'
      break
    case '00020': // heic开头前4位可能是00020也可能是00018，其实这里应该是判断头尾000的，可以自己改下
    case '00018':
      allHeader.lastIndexOf('68656963') === 13 ||
      allHeader.lastIndexOf('68656966') === 13
        ? (realMimeType = 'image/heic')
        : (realMimeType = 'unknown')
      break
    default:
      realMimeType = 'unknown'
      break
  }
  return realMimeType
}

const file2Blob = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const type = getFileType(reader)
      console.log(type)

      // heic2any({
      //   blob: file,
      //   toType: 'image/png',
      //   quality: 0.5
      // }).then(conversionResult => {
      //   console.log(conversionResult)
      //   src.value = URL.createObjectURL(conversionResult as Blob)
      //   resolve(src.value)
      // })
      // // const blob = new Blob([e.target!.result!])
    }
    reader.readAsArrayBuffer(file)
  })
}
const router = useRouter()
const route = useRoute()
const changeBtn = () => {
  const path = route.path === '/' ? '/test' : '/'
  router.push(path)
}

wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
  appId: '123123', // 公众号唯一标识
  timestamp: '213123213123', // 生成签名的时间戳
  nonceStr: 1, // 生成签名的随机串（注意大小写问题，接口返的都是小写）
  signature: 1, // 签名
  jsApiList: ['hideAllNonBaseMenuItem'],
  openTagList: ['wx-open-launch-app'] // 需要使用的开放标签列表
})
wx.ready(function () {
  wx.hideAllNonBaseMenuItem()
  console.log(11111)
})
wx.error(() => {
  console.log(222)
})
console.log('test')

const test = ref(1)

setTimeout(() => {
  test.value = 2
}, 5000)
</script>

<template>
  <div id="lucky_wheel"></div>
  <img
    style="width: 200px;height: 200px"
    crossorigin="anonymous"
    src="file:///private/var/folders/dy/8h49c99s1hd0tcd64xxzw64h0000gn/T/com.kingsoft.wpsoffice.mac/wps-xjccc/ksohtml//wps2.png"
  />
  <img
    alt="Vue logo"
    :sensors-click-data="JSON.stringify({ test, li: 'aa' })"
    :src="src"
  />
  <input :value="fileValue" @change="onChange" type="file" />
  <div @click="changeBtn">点击切换</div>
  <router-view></router-view>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
  #open-app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
