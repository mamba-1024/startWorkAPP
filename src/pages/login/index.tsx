// import { Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { Button } from '@tarojs/components';
import './index.scss';
import Api from '@/api';
import { setToken } from '@/utils';

export default () => {
  const onGetPhoneNumber = ({ detail }) => {
    if (detail.errMsg === 'getPhoneNumber:ok') {
      Taro.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            const params = {
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              code: res.code,
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
          } else {
            console.log('登录失败！' + res.errMsg);
          }
        },
      });
    }
  };

  return (
    <div className="nutui-react-demo">
      <div className="index">
        <Button
          type="primary"
          openType="getPhoneNumber"
          className="btn"
          onGetPhoneNumber={onGetPhoneNumber}
        >
          手机号授权登录
        </Button>
      </div>
    </div>
  );
};
