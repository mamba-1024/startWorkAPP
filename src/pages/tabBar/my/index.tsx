import { useState } from 'react';
import { Avatar, CellGroup, Cell, Icon, Rate } from '@nutui/nutui-react-taro';
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
    <div className="my-page">
      <div className="bg-gradient-to-b from-blue-400 from-10% to-blue-200">
        <div className="h-40px w-full"></div>
        <div className="h-100px mb-6px">
          <div className="flex flex-row items-center pl-30px">
            <div onClick={handleClick}>
              <Avatar
                className="overflow-hidden"
                size="large"
                icon={userInfo?.avatarUrl || 'my'}
              />
            </div>
            <div className="flex flex-col ml-20px">
              <div className="flex flex-row items-center mb-10px">
                <span className="text-22px mr-10px" onClick={handleClick}>
                  {userInfo ? userInfo.nickname : '点击登录'}
                </span>
                {userInfo ? (
                  <div className="star-wrap">
                    <Rate
                      activeColor="#FFC800"
                      modelValue={userInfo?.level}
                      iconSize="16"
                      count={3}
                      spacing={6}
                      readonly
                    />
                    <div className="start-modal" onClick={handleLevel}></div>
                  </div>
                ) : null}
              </div>
              {userInfo ? (
                <span className="text-16px">
                  手机号：{userInfo.phoneNumber}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <CellGroup>
        <Cell
          iconSlot={
            <Icon name="locationg3" color="#1677ff" className="mr-10px"></Icon>
          }
          title="本月打卡（时）"
          desc={userInfo?.checkInTime}
          className="text-18px"
        />
        <Cell
          title="累计积分"
          iconSlot={
            <Icon name="notice" color="#64b578" className="mr-10px"></Icon>
          }
          desc={userInfo?.accumulatedPoints.toString()}
          className="text-18px"
        />
      </CellGroup>
      <Cell
        title="实名认证"
        iconSlot={<Icon name="my" color="#52c41a" className="mr-10px"></Icon>}
        isLink
        onClick={handleVerify}
        className="text-18px"
      />
      <Cell
        title="考勤记录"
        iconSlot={
          <Icon name="footprint" color="#f3812e" className="mr-10px"></Icon>
        }
        isLink
        onClick={handleAttendanceRecord}
        className="text-18px"
      />
      <CellGroup>
        <Cell
          title="联系管理员"
          iconSlot={
            <Icon name="message" color="#ffc069" className="mr-10px"></Icon>
          }
          // subTitle={userInfo?.accumulatedPoints.toString()}
          linkSlot={<span className='text-12px text-text text-center h-26px leading-26px'>18969043989（微信同号）</span>}
          // isLink
          // onClick={() => {
          //   Taro.navigateTo({ url: '/pages/home/aboutUs/index' });
          // }}
          className="text-18px"
        />
        <Cell
          title="常见问题"
          iconSlot={
            <Icon name="ask2" color="#f5222d" className="mr-10px"></Icon>
          }
          // subTitle={userInfo?.verified ? '已认证' : '未认证'}
          isLink
          onClick={() => {
            Taro.navigateTo({ url: '/pages/my/question/index' });
          }}
          className="text-18px"
        />
      </CellGroup>
    </div>
  );
};
