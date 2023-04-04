import { Button, Toast } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

export default () => {
  const handleClick = () => {
    Taro.navigateTo({
      url: '/pages/login/index',
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>跳转到登录页面</Button>
    </div>
  );
};
