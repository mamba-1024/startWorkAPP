import { Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import './index.scss';

export default () => {
  const handleLogin = (e) => {
    console.log(e)
    // Taro.login({
    //   success: function (res) {
    //     console.log('res: ', res);
    //     if (res.code) {
    //       //发起网络请求
    //       console.log('发起网络请求');
    //       // Taro.request({
    //       //   url: 'https://test.com/onLogin',
    //       //   data: {
    //       //     code: res.code
    //       //   }
    //       // })
    //     } else {
    //       console.log('登录失败！' + res.errMsg);
    //     }
    //   },
    // });
  };

  const handleGetInfo = (e) => {
    console.log(e)
    return
    Taro.getUserInfo({
      success: function (res) {
        console.log('getUserInfo: ', res)
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
        <Button type="primary" openType='getPhoneNumber' className="btn" onGetPhoneNumber={handleLogin}>
          用户一键登录
        </Button>
      </div>
      <div className="index">
        <Button type="primary" openType='getUserInfo' className="btn" onGetUserInfo={handleGetInfo}>
          获取用户信息
        </Button>
      </div>
      <div className="index">
        <Button className='btn' openType='openSetting'>打开授权设置页</Button>
      </div>
      <div className="index">
        <Button className='btn' openType='share'>分享给好友</Button>
      </div>
    </div>
  );
};
