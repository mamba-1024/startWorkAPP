import { useState } from 'react';
import { Avatar, Grid, GridItem, Icon } from '@nutui/nutui-react-taro';
import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import './style.scss';

export interface InfoProps {
  nickname: string;
  avatarUrl: string;
  accumulatedPoints: number; // 累计积分
  checkInTime: string; // 本月打卡时长
  level: string; // 等级
  phoneNumber: string; // 手机号
  verified: boolean; // 实名
}

export default () => {
  const [userInfo, setUserInfo] = useState<InfoProps | null>(null);

  // 获取用户信息
  useDidShow(() => {
    Api.getUserInfoApi().then((res) => {
      console.log(res);
      setUserInfo(res.data);
    });
  });

  const handleClick = () => {
    if (!userInfo) {
      Taro.navigateTo({
        url: '/pages/login/index',
      });
    } else {
      Taro.navigateTo({
        url: '/pages/info/index',
      });
    }
  };

  const handleLevel = () => {
    if(userInfo) {
      Taro.navigateTo({
        url: `/pages/level/index?level=${userInfo?.level}`
      })
    }
  }

  const handleVerify = () => {
    Taro.navigateTo({
      // url: `/pages/verify/index?verified=${userInfo?.verified}`
      url: `/pages/verify/index?verified=${false}`
    })
  }

  return (
    <div className='bg-slate-50'>
      <div className="h-100px pt-60px bg-gradient-to-b from-green-400 to-green-50">
        <div className="flex flex-row items-center pl-12px mt-10px">
          <div onClick={handleClick}>
            <Avatar size="large" icon={userInfo?.avatarUrl || 'my'} />
          </div>
          <div className="flex flex-col ml-10px">
            <div className="flex flex-row items-center">
              <span className="text-18px mr-10px">
                {userInfo ? userInfo.nickname : '去登录'}
              </span>
              {userInfo ? <span>{userInfo.level} 星</span> : null}
            </div>
            {userInfo ? <span>{userInfo.phoneNumber}</span> : null}
          </div>
        </div>
      </div>
      <Grid columnNum={2} className="w-3/4 mx-auto mt-20px rounded-xl overflow-hidden">
        <GridItem>
          <span>{userInfo?.checkInTime}</span>
          <span>本月打卡（时）</span>
        </GridItem>
        <GridItem onClick={handleLevel}>
          <span>{userInfo?.accumulatedPoints}</span>
          <span>累计积分</span>
        </GridItem>
      </Grid>
      <Grid columnNum={2} className="w-3/4 mx-auto mt-10px rounded-xl overflow-hidden">
        <GridItem onClick={handleVerify}>
          <span>
            <Icon name="Check"></Icon>
          </span>
          <span>实名认证</span>
          {userInfo?.verified ? null : <span>（未认证）</span>}
        </GridItem>
        <GridItem>
          <span>
            <Icon name="refresh"></Icon>
          </span>
          <span>考勤记录</span>
        </GridItem>
      </Grid>
    </div>
  );
};
