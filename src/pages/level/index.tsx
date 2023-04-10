import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import { Row, Col } from '@nutui/nutui-react-taro';
import { useState } from 'react';


interface LevelProps {
  levelList: { name: string; desc: string }[];
  remark: string;
}

export default () => {
  const params: any = Taro.getCurrentInstance().router?.params || {}
  const [levelInfo, setLevelInfo] = useState<LevelProps>({ levelList: [], remark: '' });

  useDidShow(() => {
    Api.getLevelInfo({ loading: true }).then((res) => {
      console.log(res);
      setLevelInfo(res.data);
    });
  });

  return (
    <div>
      <div>
      {levelInfo?.levelList.map((ele) => (
        <div className={`w-3/4 mx-auto text-center my-30px ${ele.name.includes(params.level) ? 'bg-yellow-200' : 'bg-green-200'} rounded-xl py-15px`}>
          <span className='mb-6px'>{ele.name}</span>
          <span>{ele.desc}</span>
        </div>
      ))}
      </div>

      <span className='px-6px'>备注：{levelInfo?.remark}</span>
    </div>
  );
};
