import Taro, { useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import { Button } from '@tarojs/components';
import './index.scss';
import Api from '@/api';
import { setToken } from '@/utils';
import './index.scss';

export default () => {
  const [code, setCode] = useState<any>();

  useDidShow(() => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          setCode(res.code);
        }
      },
    });
  });

  const onGetPhoneNumber = ({ detail }) => {
    if (detail.errMsg === 'getPhoneNumber:ok') {
      Taro.checkSession({
        success: function () {},
        fail: function () {
          Taro.login({
            success: function (res) {
              if (res.code) {
                setCode(res.code);
              }
            },
          });
        },
        complete() {
          const params = {
            encryptedData: detail.encryptedData,
            iv: detail.iv,
            code: code || detail.code,
            loading: true,
          };
          Api.loginByPhoneApi(params).then((res) => {
            // setToken(res?.data?.token);
            setToken(res?.data);
            // 完成登录，跳转到首页
            // Taro.navigateBack()
            Taro.switchTab({
              url: '/pages/tabBar/home/index',
            });
          });
        },
      });

      // Taro.login({
      //   success: function (res) {
      //     if (res.code) {
      //       //发起网络请求
      //       const params = {
      //         encryptedData: detail.encryptedData,
      //         iv: detail.iv,
      //         code: res.code,
      //         loading: true,
      //       };
      //       Api.loginByPhoneApi(params).then((res) => {
      //         // setToken(res?.data?.token);
      //         setToken(res?.data);
      //         // 完成登录，跳转到首页
      //         // Taro.navigateBack()
      //         Taro.switchTab({
      //           url: '/pages/tabBar/home/index',
      //         });
      //       });
      //     } else {
      //       console.log('登录失败！' + res.errMsg);
      //     }
      //   },
      // });
    }
  };

  return (
    <div className="nutui-react-demo">
      <div className="index">
        <div className="h-260px flex flex-col justify-center items-center">
          <img
            src="https://hznfsb.oss-cn-hangzhou.aliyuncs.com/d07b8464802353195f8b908c29cda40f.jpg"
            className='w-60px h-60px rounded-full'
          />
          <div>南方化工</div>
        </div>
        <Button
          openType="getPhoneNumber"
          className="login-btn h5-button nut-button nut-button--primary nut-button--normal nut-button--round nut-button--block"
          // type="primary"
          onGetPhoneNumber={onGetPhoneNumber}
        >
          微信账号快捷登录
        </Button>
      </div>
    </div>
  );
};
