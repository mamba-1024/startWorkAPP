import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import { useState } from 'react';
import { Image } from '@tarojs/components';

interface LevelProps {
  levelList: { name: string; desc: string }[];
  remark: string;
}

const currentBg =
  'https://hznfsb.oss-cn-hangzhou.aliyuncs.com/cd630795-65dd-489c-99cb-2e1f9b2fbb3a-f4SmiSTQkLhm5dfac4df7e93324efa0cc2815e3d7d5c.jpg';

const bg =
  'https://hznfsb.oss-cn-hangzhou.aliyuncs.com/a1bdfd97-98f6-442c-bf46-1871819ea9bb-MnUzWAcjiJnVe426d1d7cab6eaaebcfc67e79279f47d.png';

const start =
  'https://hznfsb.oss-cn-hangzhou.aliyuncs.com/e2b447a7-9ec5-45ae-a835-87bfbdf4eecc-StmO9gRxAbuSaab1fc7f1867efa0f8808f3969ea0b9a.webp';

export default () => {
  const params: any = Taro.getCurrentInstance().router?.params || {};
  const [levelInfo, setLevelInfo] = useState<LevelProps>({
    levelList: [],
    remark: '',
  });

  useDidShow(() => {
    Api.getLevelInfo({ loading: true }).then((res) => {
      setLevelInfo(res.data);
    });
  });

  return (
    <div>
      <div className="flex flex-col justify-start items-center">
        {levelInfo?.levelList.map((ele) => (
          <div className={`w-3/4 h-100px my-10px rounded-8px relative`}>
            <Image
              src={ele.name.includes(params.level) ? currentBg : bg}
              className='rounded-8px'
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: ele.name.includes(params.level)
                  ? ''
                  : '#FFBB7F',
              }}
            />
            <Image
              style={{
                position: 'absolute',
                top: '18px',
                left: '20px',
                height: '26px',
                width: '26px',
              }}
              src={start}
            />
            <span
              style={{
                position: 'absolute',
                top: '14px',
                left: '50px',
                fontSize: '24px',
                color: '#fff',
              }}
            >
              {ele.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
