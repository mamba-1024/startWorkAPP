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
export const getUserInfoApi = (data?: any) => {
  return request.get('/employee/getUserInfo', data)
}

/**
 * 获取登记
 * /employee/levelInfo
 */
export const getLevelInfo = (data?: any) => {
  return request.get('/employee/levelInfo', data)
}

/**
 * 获取实名认证信息
 *  /employee/userDetail
 */
export const getUserDetail = (data?:any) => {
  return request.get('/employee/userDetail', data)
}

/**
 * 实名认证
 * /employee/verifyUser
 */
export const postVerifyUser = (data: any) => {
  return request.post('/employee/verifyUser', data)
}