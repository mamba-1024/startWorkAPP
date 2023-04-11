import { useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import { ActionSheet, Cell, Icon } from '@nutui/nutui-react-taro';
import { formatTime } from '@/utils/formatTime';

interface ItemType {
  name?: string;
  [key: string]: any;
}

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const [val, setVal] = useState<ItemType | null>(null); // 班次

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
      <Cell className='h-200px justify-center items-center'>
        <div className='h-120px w-120px bg-blue-500 rounded-full flex justify-center items-center text-white'>
          {val?.shiftName}
        </div>
      </Cell>
    </div>
  );
};
