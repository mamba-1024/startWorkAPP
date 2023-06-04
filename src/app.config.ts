export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/tabBar/home/index',
    'pages/tabBar/attendance/index',
    'pages/tabBar/my/index',
    'pages/login/index',
    'pages/agreement/index',
    'pages/privacy/index'
  ],
  subPackages: [
    {
      root: 'pages/home/',
      pages: [
        'products/index',
        'companyNews/index',
        'aboutUs/index',
        'productsDetail/index'
      ],
    },
    // {
    //   root: 'pages/attendance/',
    //   pages: [
    //     
    //   ],
    // },
    {
      root: 'pages/my/',
      pages: [
        'level/index',
        'info/index',
        'verify/index',
        'attendanceRecord/index',
        'question/index'
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#60A5FA',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#707070',
    selectedColor: '#1677ff',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/tabBar/home/index',
        text: '首页',
        iconPath: './assets/image/home-bar.png',
        selectedIconPath: './assets/image/home-bar-selected2.png'
      },
      {
        pagePath: 'pages/tabBar/attendance/index',
        text: '打卡',
        iconPath: './assets/image/attendance-bar.png',
        selectedIconPath: './assets/image/attendance-bar-selected2.png'
      },
      {
        pagePath: 'pages/tabBar/my/index',
        text: '我的',
        iconPath: './assets/image/my-bar.png',
        selectedIconPath: './assets/image/my-bar-selected2.png'
      }
    ]
  }
})
