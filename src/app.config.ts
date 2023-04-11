export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/attendance/index',
    'pages/info/index',
    'pages/login/index',
    'pages/level/index',
    'pages/verify/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#707070',
    selectedColor: "#16a34a",
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/image/home-bar.png',
        selectedIconPath: './assets/image/home-bar-selected2.png'
      },
      {
        pagePath: 'pages/attendance/index',
        text: '打卡',
        iconPath: './assets/image/attendance-bar.png',
        selectedIconPath: './assets/image/attendance-bar-selected2.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/image/my-bar.png',
        selectedIconPath: './assets/image/my-bar-selected2.png'
      }
    ]
  }
})
