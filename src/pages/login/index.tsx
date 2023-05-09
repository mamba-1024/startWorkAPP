// import { Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { Button } from '@tarojs/components';
import './index.scss';
import Api from '@/api';
import { setToken } from '@/utils';
import './index.scss'

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
        <div className='title'>
        尊敬的用户，您还没有登陆，无法访问私有数据，建议您:
        </div>
        <Button
          openType="getPhoneNumber"
          className="btn h5-button nut-button nut-button--primary nut-button--normal nut-button--round nut-button--block"
          onGetPhoneNumber={onGetPhoneNumber}
        >
          手机号授权登录
        </Button>
      </div>
    </div>
  );
};
