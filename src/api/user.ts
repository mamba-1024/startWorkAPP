// 引入封装后的请求方法
import request from '@/service'

/**
* 登录
* '/wechat/login'
* @returns
*/
export const loginApi = (data: any) => {
  return request.post('/wechat/login', data)
}
/**
* 一键获取手机号登录
* /wechat/getPhoneNum
* @returns
*/
export const loginByPhoneApi = (data: any) => {
  return request.post('/wechat/getPhoneNum', data)
}

/**
 * 获取用户信息
 * /employee/getUserInfo
 */
export const getUserInfoApi = () => {
  return request.get('/employee/getUserInfo')
}