import * as user from './user'
import * as attendance from './attendance'
import * as home from './home'


export const Api = {
  ...user,
  ...attendance,
  ...home
}
// 导出所有接口
export default Api