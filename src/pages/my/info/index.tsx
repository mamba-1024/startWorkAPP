import { useState } from 'react';
import { Button as NTButton } from '@nutui/nutui-react-taro';
import Taro, { useLoad } from '@tarojs/taro';
import Api from '@/api';
import { InfoProps } from '@/pages/tabBar/my';
import { Button, Input, Form } from '@tarojs/components';

const defaultAvatar =
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

export default () => {
  const [userInfo, setUserInfo] = useState<InfoProps | null>(null);
  // 获取用户信息
  function getInfo() {
    Api.getUserInfoApi().then((res) => {
      setUserInfo(res.data);
    });
  }

  useLoad(() => {
    getInfo();
  });

  const onChooseAvatar = (event) => {
    if(event?.detail?.avatarUrl) {
      setUserInfo({
        ...userInfo as InfoProps,
        avatarUrl: event.detail.avatarUrl
      })
    }
  };

  const formSubmit = (e) => {
    const avatarUrl = userInfo?.avatarUrl
    // if(!avatarUrl) {
    //   Taro.showToast({
    //     title: '请设置头像',
    //     icon: 'error'
    //   })
    //   return
    // }
    const { nickname } = e.detail.value
    if(!nickname) {
      Taro.showToast({
        title: '请输入昵称',
        icon: 'error'
      })
      return
    }
    const params = {
      nickname: nickname,
      avatarUrl: avatarUrl,
      loading: true,
    };
    
    Api.postUpdateUser(params).then((res) => {
      if(res.data) {
        Taro.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000,
          success: () => {
            Taro.navigateBack()
          }
        })
      }
    });
  };

  return (
    <Form onSubmit={formSubmit}>
      <div className="pt-10px">
        <Button
          open-type="chooseAvatar"
          onChooseAvatar={onChooseAvatar}
          className="h-56px w-56px p-0 my-20px"
        >
          <img
            className="block h-56px w-56px"
            src={userInfo?.avatarUrl || defaultAvatar}
          ></img>
        </Button>
        {/* <div className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-200 border-solid h-50px">
      </div> */}
        <div className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-200 border-solid h-50px">
          <span>昵称</span>
          {/* <span>{userInfo?.nickname}</span> */}
          <span>
            <Input
              type="nickname"
              placeholder="请输入昵称"
              className="text-right"
              name='nickname'
              value={userInfo?.nickname}
            />
          </span>
        </div>
        <div className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-200 border-solid h-50px">
          <span>手机号</span>
          <span>{userInfo?.phoneNumber}</span>
        </div>
        <div className="text-center mt-20px">
          <NTButton className="w-4/5" type="primary" formType="submit">
            提交
          </NTButton>
        </div>
      </div>
    </Form>
  );
};
