import Api from '@/api';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';

export default () => {
  const [list, setList] = useState<any[]>([]);

  useLoad(() => {
    Api.getActionApi().then((res) => {
      setList(res.data);
    });
  });

  const handleDetail = (id) => {
    if(id) {
      Taro.navigateTo({
        url: `/pages/home/productsDetail/index?id=${id}`
      })
    }
  }

  return (
    <div className="h-screen bg-white px-12px pt-10px">
      {list?.map((item) => (
        <div
          key={item.id}
          className="rounded-6px border-solid border-gray-300 border mb-10px"
          onClick={() => handleDetail(item.id)}
        >
          <img
            className="w-full h-148px"
            src={item.actionMainUrl}
          />
          <div className="p-20px text-gray-700	text-13px leading-20px">
            {item.shortDesc}
          </div>
        </div>
      ))}
     
    </div>
  );
};
