import Taro from "@tarojs/taro";

// 用户登录token标识
const key = 'token'

// 设置token
export function setToken(data: any): void {
  try {
    Taro.setStorageSync(key, data)
  } catch (e) { }
}


// 获取token
export const getToken: () => string = () => {
  try {
    var value = Taro.getStorageSync(key)
    return value;
  } catch (e) {
    // Do something when catch error
  }
}

// 清除token
export const removeToken: () => void = () => {
  try {
    Taro.removeStorageSync(key)
  } catch (e) {
    // Do something when catch error
  }
}