import Taro, { useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import { Button } from '@tarojs/components';
import { Checkbox, Dialog } from '@nutui/nutui-react-taro';
import './index.scss';
import Api from '@/api';
import { setToken } from '@/utils';
import './index.scss';

export default () => {
  const [code, setCode] = useState<any>();
  const [auth, setAuth] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

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
            Taro.navigateBack()
            // Taro.switchTab({
            //   url: '/pages/tabBar/home/index',
            // });
          });
        },
      });
    }
  };

  return (
    <div className="nutui-react-demo">
      <div className="index">
        <div className="h-260px flex flex-col justify-center items-center">
          <img
            src="https://hznfsb.oss-cn-hangzhou.aliyuncs.com/d07b8464802353195f8b908c29cda40f.jpg"
            className="w-60px h-60px rounded-full"
          />
          <div>南方化工</div>
        </div>
        <Button
          openType={auth ? 'getPhoneNumber' : undefined}
          className={
            'login-btn h5-button nut-button nut-button--primary nut-button--normal nut-button--round nut-button--block'
          }
          // type="primary"
          onGetPhoneNumber={onGetPhoneNumber}
          onClick={() => {
            if (!auth) {
              // setVisible(true);
              Taro.showToast({
                icon: 'none',
                title: `请先阅读并勾选底部的协议政策`
              });
            }
          }}
        >
          微信账号快捷登录
        </Button>
      </div>
      <div className="flex flex-row justify-center items-center font-14px mb-20px">
        <Checkbox checked={auth} onChange={(e) => setAuth(e)}>
          <text>已阅读并同意</text>
        </Checkbox>
        <text
          className="text-primary"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/agreement/index',
            });
          }}
        >
          《用户服务协议》
        </text>
        <text>与</text>
        <text
          className="text-primary"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/privacy/index',
            });
          }}
        >
          《隐私政策》
        </text>
      </div>
      <Dialog
        visible={visible}
        onOk={() => {
          setVisible(false);
          setAuth(true);
        }}
        onCancel={() => setVisible(false)}
      >
        <div className="flex flex-row justify-start flex-wrap font-14px mb-20px leading-24px font-14px">
          <text>您是否同意</text>
          <text
            className="text-primary"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/agreement/index',
              });
            }}
          >
            《南方用户服务协议》
          </text>
          <text>与</text>
          <text
            className="text-primary"
            onClick={() => {
              Taro.navigateTo({
                url: '/pages/privacy/index',
              });
            }}
          >
            《南方化工隐私政策》
          </text>
        </div>
      </Dialog>
    </div>
  );
};
