// import { Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { Button } from '@tarojs/components';
import './index.scss';
import Api from '@/api';
import { setToken } from '@/utils'

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
              setToken(res.data)
              Taro.navigateBack()
            });
          } else {
            console.log('登录失败！' + res.errMsg);
          }
        },
      });
    }
  };

  const handleGetInfo = (e) => {
    console.log(e);

    Taro.getUserInfo({
      success: function (res) {
        console.log('getUserInfo: ', res);
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;
      },
    });
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
          用户一键登录
        </Button>
      </div>
      {/* <div className="index">
        <Button type="primary" openType='getUserInfo' className="btn" onGetUserInfo={handleGetInfo}>
          获取用户信息
        </Button>
      </div>
      <div className="index">
        <Button className='btn' openType='openSetting'>打开授权设置页</Button>
      </div>
      <div className="index">
        <Button className='btn' openType='share'>分享给好友</Button>
      </div> */}
    </div>
  );
};
