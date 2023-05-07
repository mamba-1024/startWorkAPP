// windi.config.js

const primaryColor = '#1677ff'


export default {
  prefixer: false,
  extract: {
    // 忽略部分文件夹
    exclude: ['node_modules', '.git', 'dist', 'types', 'config', '.swc']
  },
  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false
  },
  theme: {
    extend: {
      textColor: {
        primary: primaryColor,
        title: '#1a1a1a',
        text: '#808080',
      },
      backgroundColor: {
        primary: primaryColor
      }
    }
  }
}