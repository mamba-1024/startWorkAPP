import * as user from './user'
import * as attendance from './attendance'


export const Api = {
  ...user,
  ...attendance
}
// 导出所有接口
export default Api