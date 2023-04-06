import { Button, Toast, Avatar } from '@nutui/nutui-react-taro';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import './style.scss';
import Api from '@/api';

const mockIcon =
  'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png';

export default () => {
  const [userInfo, setUserInfo] = useState<{ [key: string]: any } | null>(null);

  // 获取用户信息
  useEffect(() => {
    Taro.showToast({
      title: '获取用户信息',
      icon: 'none',
      duration: 2000,
    });

    // Api.getUserInfoApi('', {})
  }, []);

  const handleClick = () => {
    if (!userInfo) {
      Taro.navigateTo({
        url: '/pages/login/index',
      });
    }
  };

  return (
    <div>
      <div className='h-150px pt-60px bg-gradient-to-b from-red-500 to-red-100'>
        <div className="flex flex-row items-center pl-12px mt-10px">
          <div>
            <Avatar size="large" icon={mockIcon} />
          </div>
          <div className="flex flex-col ml-10px" onClick={handleClick}>
            <div className="flex flex-row items-center">
              <span className="text-18px mr-10px">
                {userInfo ? userInfo.name : '去登录'}
              </span>
              {userInfo ? <span>积分100</span> : null}
            </div>
            {userInfo ? <span>1800000000</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
