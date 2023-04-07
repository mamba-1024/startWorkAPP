import { useState } from 'react';
import { Avatar } from '@nutui/nutui-react-taro';
import { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import { InfoProps } from '@/pages/my';

export default () => {
  const [userInfo, setUserInfo] = useState<InfoProps | null>(null);
  // 获取用户信息
  function getInfo() {
    Api.getUserInfoApi().then((res) => {
      console.log(res);
      setUserInfo(res.data);
    });
  }

  useDidShow(() => {
    getInfo()
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-300 border-solid h-50px" >
        <span>头像</span>
        <Avatar size="normal" icon={userInfo?.avatarUrl || 'my'} />
      </div>
      <div className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-300 border-solid h-50px">
        <span>姓名</span>
        <span>{userInfo?.nickname}</span>
      </div>
      <div className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-300 border-solid h-50px">
        <span>手机号</span>
        <span>{userInfo?.phoneNumber}</span>
      </div>
    </div>
  );
};
