import { useState, useEffect } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import {
  ActionSheet,
  Cell,
  Icon,
  Popup,
  Button,
} from '@nutui/nutui-react-taro';
import { formatTime } from '@/utils/formatTime';

interface ItemType {
  id?: number;
  name?: string;
  [key: string]: any;
}

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const [val, setVal] = useState<ItemType | null>(null); // 班次
  const [time, setTime] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [showBottom, setShowBottom] = useState<boolean>(false);
  const [canCheckIn, setCanCheckIn] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  function gitInit() {
    Api.getAttendanceApi().then((res) => {
      setMenuItems(
        res.data?.workShifts?.map((ele) => ({ name: ele.shiftName, ...ele })) ||
          []
      );
      setAttendanceRecords(res?.data?.attendanceRecords || []);
      if (!val) {
        setVal(res.data?.workShifts[0]);
      }
    });
  }

  useDidShow(() => {
    gitInit();
  });

  const chooseItem = (itemParams: any) => {
    setIsVisible(false);
    setVal(itemParams);
  };

  const handleClick = () => {
    if(!canCheckIn) {
      setShowBottom(true)
      return
    }
    const params = {
      attendanceTime: formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      punchType: renderBtn(attendanceRecords, val).punchType, // 0 上班；1 下班
      workShiftId: val?.id,
    };

    Api.doAttendanceApi(params).then(() => {
      Taro.showToast({
        title: '打卡成功',
        icon: 'none',
      });
      // 刷新数据
      gitInit();
      setCanCheckIn(false)
    });
  };

  // 判断是上班打卡还是下班打卡
  function renderBtn(records, workShift) {
    const workShiftId = workShift?.id;
    // 当前班次的打卡记录
    const currentWorkShift = records.filter(
      (ele) => ele.workShiftId === workShiftId
    );
    if (!currentWorkShift || currentWorkShift.length === 0) {
      return { name: '上班打卡', punchType: 0 };
    }
    // 是否上班打卡
    const hasStart = currentWorkShift.some((ele) => ele.punchType === 0);

    if (hasStart) {
      return { name: '下班打卡', punchType: 1 };
    } else {
      return { name: '上班打卡', punchType: 0 };
    }
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
        <div
          onClick={handleClick}
          className="h-120px w-120px bg-blue-500 rounded-full flex  flex-col justify-center items-center text-white"
        >
          <span>{renderBtn(attendanceRecords, val).name}</span>
          <span>{`${hours}:${minutes}:${seconds}`}</span>
        </div>
      </Cell>
      <div className="px-10px">
        <span className="text-16px mb-8px">打卡说明：</span>
        <div className='text-text'>
          1.普通班次07:00-17:00，早于7:00打卡，按照7:00开始计算，晚于17:00打卡，按照17:00计算。午饭时间0.5h，则普通班次一天打卡最多9.5h。
        </div>
        <div className='text-text'>
          2.加班班次17:30-20:00，早于17:30打卡，按照17:30开始计算，晚于20:00打卡，按照20:00计算，加班班次一天最多打卡2.5h。
        </div>
      </div>
      <Popup
        visible={showBottom}
        style={{ height: '70%', paddingTop: '20px', paddingBottom: '20px' }}
        position="bottom"
        round={true}
        closeOnClickOverlay={false}
      >
        <div className='h-full flex flex-col justify-between items-center'>
          <div>
          <h2>安全须知</h2>
          <div >
            <div>内容 ......</div>
            <div>内容 ......</div>
          </div>

          </div>

        <Button className='w-3/5' type="primary" onClick={() => {setShowBottom(false); setCanCheckIn(true)}}>我已知晓</Button>
        </div>
      </Popup>
    </div>
  );
};
