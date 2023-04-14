import { useState, useEffect } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import { ActionSheet, Cell, Icon, CountDown } from '@nutui/nutui-react-taro';
import { formatTime } from '@/utils/formatTime';

interface ItemType {
  name?: string;
  [key: string]: any;
}

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const [val, setVal] = useState<ItemType | null>(null); // 班次
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  useDidShow(() => {
    Api.getAttendanceApi().then((res) => {
      console.log('attendance: ', res);
      setMenuItems(
        res.data?.workShifts?.map((ele) => ({ name: ele.shiftName, ...ele })) ||
          []
      );
      setVal(res.data?.workShifts[0]);
    });
  });

  const chooseItem = (itemParams: any) => {
    console.log(itemParams, 'itemParams');
    setIsVisible(false);
    setVal(itemParams);
  };

  const handleClick = () => {
    Taro.showToast({
      title: '打卡',
      icon: 'none'
    })
  }

  return (
    <div>
      <ActionSheet
        visible={isVisible}
        menuItems={menuItems}
        onChoose={chooseItem}
        onCancel={() => setIsVisible(false)}
      />
      <Cell
        className="justify-between items-center"
        isLink
        onClick={() => setIsVisible(!isVisible)}
      >
        <span className="flex">
          <Icon name="clock"></Icon>
          <span className="ml-5px">班次</span>
        </span>
        <div className="text-right">
          <span>当前班次 {formatTime(new Date(), 'yyyy-MM-dd')}</span>
          <div>
            {val?.shiftName} {val?.startTime} - {val?.endTime}
          </div>
        </div>
      </Cell>
      <Cell className="h-200px justify-center items-center">
        <div onClick={handleClick} className="h-120px w-120px bg-blue-500 rounded-full flex  flex-col justify-center items-center text-white">
          <span>{val?.shiftName}</span>
          <span>{`${hours}:${minutes}:${seconds}`}</span>
        </div>
      </Cell>
      <div className="px-10px">
        <span className="text-16px mb-8px">打卡说明：</span>
        <div>
          1.普通班次07:00-17:00，早于7:00打卡，按照7:00开始计算，晚于17:00打卡，按照17:00计算。午饭时间0.5h，则普通班次一天打卡最多9.5h。
        </div>
        <div>
          2.加班班次17:30-20:00，早于17:30打卡，按照17:30开始计算，晚于20:00打卡，按照20:00计算，加班班次一天最多打卡2.5h。
        </div>
      </div>
    </div>
  );
};
