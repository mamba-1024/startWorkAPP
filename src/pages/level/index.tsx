import { useDidShow } from '@tarojs/taro';


export default () => {

  return (
    <div>
      <div className='w-3/4'>0</div>
      <div className='w-3/4'>1</div>
      <div className='w-3/4'>2</div>
      <div className='w-3/4'>3</div>
      <span>
        备注：到达3星可以获得年终奖，积分每年会清零，次年重新计算
      </span>
    </div>
  )
}