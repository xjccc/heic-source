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
export default new CallApp(option)