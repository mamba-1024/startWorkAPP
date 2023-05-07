import { useState } from 'react';
import { Avatar, CellGroup, Cell, Icon } from '@nutui/nutui-react-taro';
import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import './style.scss';

export interface InfoProps {
  nickname?: string | undefined;
  avatarUrl?: string | undefined;
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
        url: '/pages/my/info/index',
      });
    }
  };

  const handleLevel = () => {
    if (userInfo) {
      Taro.navigateTo({
        url: `/pages/my/level/index?level=${userInfo?.level}`,
      });
    }
  };

  const handleVerify = () => {
    Taro.navigateTo({
      url: `/pages/my/verify/index?verified=${userInfo?.verified}`,
      // url: `/pages/my/verify/index?verified=${false}`
    });
  };

  const handleAttendanceRecord = () => {
    if (userInfo) {
      Taro.navigateTo({
        url: '/pages/my/attendanceRecord/index',
      });
    }
  };

  return (
    <div>
      <div className='bg-gradient-to-br from-blue-300 from-10% via-blue-400 via-40% to-blue-200 to-90%'>
        <div className="h-120px w-full"></div>
        <div className="h-100px mb-6px">
          <div
            className="flex flex-row items-center pl-40px"
            onClick={handleClick}
          >
            <div>
              <Avatar
                className="overflow-hidden"
                shape="square"
                size="large"
                icon={userInfo?.avatarUrl || 'my'}
              />
            </div>
            <div className="flex flex-col ml-20px">
              <div className="flex flex-row items-center mb-6px">
                <span className="text-22px mr-10px">
                  {userInfo ? userInfo.nickname : '去登录'}
                </span>
                {userInfo ? (
                  <span className="text-16px">{userInfo.level} 星</span>
                ) : null}
              </div>
              {userInfo ? (
                <span className="text-16px text-text">
                  {userInfo.phoneNumber}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Cell
        iconSlot={<Icon name="locationg3" color='#1677ff'></Icon>}
        title="本月打卡（时）"
        desc={userInfo?.checkInTime}
        className='text-18px'
      />

      <CellGroup>
        <Cell
          title="累计积分"
          iconSlot={<Icon name="notice" color="#64b578"></Icon>}
          subTitle={userInfo?.accumulatedPoints.toString()}
          isLink
          onClick={handleLevel}
          className='text-18px'
        />
        <Cell
          title="实名认证"
          iconSlot={<Icon name="my" color="#fa2c19"></Icon>}
          subTitle={userInfo?.verified ? '已认证' : '未认证'}
          isLink
          onClick={handleVerify}
          className='text-18px'
        />
      </CellGroup>
      <Cell
        title="考勤记录"
        iconSlot={<Icon name="footprint" color='#f3812e'></Icon>}
        isLink
        onClick={handleAttendanceRecord}
        className='text-18px'
      />
    </div>
  );
};
