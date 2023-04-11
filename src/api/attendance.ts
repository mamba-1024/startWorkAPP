// 引入封装后的请求方法
import request from '@/service'


/**
* 初始化打卡信息
* /attendance/init
* @returns
*/
export const getAttendanceApi = () => {
  return request.get('/attendance/init')
}