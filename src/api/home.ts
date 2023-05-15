// 引入封装后的请求方法
import request from '@/service'


/**
* 首页信息
* /index/info
* @returns
*/
export const getHomeInfoApi = () => {
  return request.get('/index/info')
}
/**
* 产品
* /index/product
* @returns
*/
export const getProductApi = () => {
  return request.get('/index/product')
}
/**
* 产品详情
* /index/product/${id}
* @returns
*/
export const getProductByIdApi = (id) => {
  return request.get(`/index/product/${id}`)
}
/**
* 企业动态
* /index/action
* @returns
*/
export const getActionApi = () => {
  return request.get('/index/action')
}
/**
* 查看企业动态详情
* /index/action/{id}
* @returns
*/
export const getActionByIdApi = (id) => {
  return request.get(`/index/action/${id}`)
}
