// 引入封装后的请求方法
import request from '@/service'

/**
* 登录
* @param params
* @returns
*/
export const loginApi = (url: string, data: any) => {
  return request.post(url, data)
}

/**
 * 获取用户信息
 */
export const getUserInfoApi = (url: string, data?: any) => {
  return request.post(url, data)
}