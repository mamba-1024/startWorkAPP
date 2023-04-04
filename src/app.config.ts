export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/company/index',
    'pages/info/index',
    'pages/login/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#707070',
    selectedColor: "#fa2c19",
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/image/home-bar.png',
        selectedIconPath: './assets/image/home-bar-selected.png'
      },
      {
        pagePath: 'pages/company/index',
        text: '公司',
        iconPath: './assets/image/company-bar.png',
        selectedIconPath: './assets/image/company-bar-selected.png'
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/image/my-bar.png',
        selectedIconPath: './assets/image/my-bar-selected.png'
      }
    ]
  }
})
