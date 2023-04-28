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

/**
 * 打卡
 * /attendance/doAttendance
 */
export const doAttendanceApi = (data: any) => {
  return request.post('/attendance/doAttendance', data)
}

/**
 * 考勤记录
 * /attendance/attendanceRecord
 */
export const postAttendanceRecord = (data: any) => {
  return request.post('/attendance/attendanceRecord', data)
}