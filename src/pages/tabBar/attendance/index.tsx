import { useState, useEffect } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import {
  ActionSheet,
  Cell,
  Icon,
  Popup,
  Button,
  Dialog,
  CellGroup,
} from '@nutui/nutui-react-taro';
import { ScrollView } from '@tarojs/components';
import { formatTime, formatTimeIOS } from '@/utils/formatTime';

interface ItemType {
  id?: number;
  name?: string;
  [key: string]: any;
}

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<ItemType[]>([]);
  // 班次
  const [workShift, setWorkShift] = useState<ItemType | null>(null);
  const [time, setTime] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  // 安全须知倒计时弹窗
  const [showBottom, setShowBottom] = useState<boolean>(false);
  // 已经确认了安全须知
  const [canCheckIn, setCanCheckIn] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number>(6);
  const [visible, setVisible] = useState<boolean>(false);
  const [seasonalName, setSeasonalName] = useState<string>('');

  // 倒计时6秒钟
  useEffect(() => {
    let timer: any = null;
    if (showBottom) {
      timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
      if (countDown === 0) {
        clearInterval(timer);
        // 倒计时结束后方可以点击打卡
        setCanCheckIn(true);
      }
    }
    return () => clearInterval(timer);
  }, [showBottom, countDown]);

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
      if (!workShift) {
        setWorkShift(res.data?.workShifts[0]);
      }
      setSeasonalName(res.data?.seasonalName);
    });
  }

  useDidShow(() => {
    gitInit();
  });

  const chooseItem = (itemParams: any) => {
    setIsVisible(false);
    setWorkShift(itemParams);
  };

  // 打卡
  const attendanceAction = () => {
    console.log('打开逻辑请求');
    const params = {
      attendanceTime: formatTime(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      punchType: renderBtn(attendanceRecords, workShift).punchType, // 0 上班；1 下班
      workShiftId: workShift?.id,
    };

    Api.doAttendanceApi(params).then(() => {
      Taro.showToast({
        title: '打卡成功',
        icon: 'none',
      });
      // 刷新数据
      gitInit();
      setCanCheckIn(false);
    });
  };

  const handleClick = () => {
    console.log('点击打卡');
    // 如果已经打卡下班，不能重复打卡
    const punchType = renderBtn(attendanceRecords, workShift).punchType;
    if (punchType === 2) {
      Taro.showToast({
        title: '已打卡',
        icon: 'success',
      });
      return;
    }

    // 普通班次上班打卡需要弹窗
    if (
      (workShift?.id === 1 || workShift?.id === 3) &&
      punchType === 0 &&
      !canCheckIn
    ) {
      setShowBottom(true);
      return;
    }
    // 当前的下班打卡是否小于约定的下班时间
    if (renderBtn(attendanceRecords, workShift).punchType === 1) {
      console.log('提前打卡判断逻辑');
      // 截止时间
      const endTime =
        formatTime(new Date(), 'yyyy-MM-dd') + ' ' + workShift?.endTime;
      if (new Date().valueOf() < new Date(formatTimeIOS(endTime)).valueOf()) {
        // 早退打卡确认
        setVisible(true);
        return;
      }
    }

    attendanceAction();
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
    // 是否下班打卡
    const hasEnd = currentWorkShift.some((ele) => ele.punchType === 1);

    if (hasStart && hasEnd) {
      return { name: '已打卡', punchType: 2 };
    }

    if (hasStart) {
      return { name: '下班打卡', punchType: 1 };
    } else {
      return { name: '上班打卡', punchType: 0 };
    }
  }

  // 早退打卡确认
  const onOk = () => {
    attendanceAction();
    setVisible(false);
  };

  return (
    <div className="flex flex-col items-center h-full">
      <ActionSheet
        visible={isVisible}
        menuItems={menuItems}
        onChoose={chooseItem}
        onCancel={() => setIsVisible(false)}
        cancelTxt="取消"
      />
      <CellGroup className="w-full">
        <Cell className="flex-1 justify-between items-center">
          <span className="flex">
            <Icon name="notice" color="#4096ff"></Icon>
            <span className="ml-5px">打卡时令</span>
          </span>
          <div className="text-right">
            <span>{seasonalName}</span>
          </div>
        </Cell>
        <Cell className="flex-1 justify-between items-center">
          <span className="flex">
            <Icon name="date" color="#4096ff"></Icon>
            <span className="ml-5px">日期</span>
          </span>
          <div className="text-right">
            <span>{formatTime(new Date(), 'yyyy-MM-dd')}</span>
          </div>
        </Cell>
      </CellGroup>
      <Cell
        title="班次"
        isLink
        onClick={() => setIsVisible(!isVisible)}
        iconSlot={<Icon name="clock" color="#4096ff"></Icon>}
        linkSlot={
          <div className="flex flex-row justify-end items-center">
            <div>
              {workShift?.shiftName} {workShift?.startTime} -{' '}
              {workShift?.endTime}
            </div>
            <Icon name="right"></Icon>
          </div>
        }
      ></Cell>
      <div className="w-full flex flex-col flex-1">
        <Cell className="justify-center items-center flex-1">
          <div
            onClick={handleClick}
            className="h-140px w-140px bg-blue-500 rounded-full flex  flex-col justify-center items-center text-white"
          >
            <span>{renderBtn(attendanceRecords, workShift).name}</span>
            <span>{`${hours}:${minutes}:${seconds}`}</span>
          </div>
        </Cell>
        <div className="px-10px mt-20px pb-10px">
          <span className="text-16px mb-8px">{seasonalName}打卡说明：</span>
          <div className="text-text">
            {seasonalName === '冬令时'
              ? '1.普通班次：7:00-17:00，当天6:00开始可以打卡，6:00-7:00打卡均按7:00开始计算工时，11:30-12:00为午餐时间不计入工时，17:00后可以进行下班打卡，均按17:00下班统计工时，请假或提前下班会二次确认是否早退，一旦确认无法更改。当天下班未打卡工时计算为0，需联系人工补卡。'
              : '1.普通班次：7:00-17:30，当天6:00开始可以打卡，6:00-7:00打卡均按7:00开始计算工时，11:30-12:30为午餐时间不计入工时，17:30后可以进行下班打卡，均按17:30下班统计工时，请假或提前下班会二次确认是否早退，一旦确认无法更改。当天下班未打卡工时计算为0，需联系人工补卡'}
          </div>
          <div className="text-text">
            {seasonalName === '冬令时'
              ? '2.加班班次：17:30-20:00，当天17:00后可以进行打卡（需普通班次下班完成后），均按17:30开始计算，20:00后可以进行下班打卡，均按20:00下班统计工时，20:00前下班打卡按照打卡时间计算工时。如有超过2.5小时加班的按带队计算为准。'
              : '2.加班班次：18:00-20:30，当天17:30后可以进行打卡（须普通班次下班完成后），均按18：00开始计算，20:30后可以进行下班打卡，均按20:30下班统计工时，20:30前下班打卡按照打卡时间计算工时。如有超过2.5小时加班的按带队计算为准。'}
          </div>
        </div>
      </div>
      <Popup
        visible={showBottom}
        style={{ height: '80%', paddingTop: '20px', paddingBottom: '20px' }}
        position="bottom"
        round={true}
        closeOnClickOverlay={false}
      >
        <div className="h-full flex flex-col justify-between items-center px-12px">
          <ScrollView
            scrollY
            scrollWithAnimation
            className="flex-1"
            style={{ height: '80%' }}
          >
            <div className="text-18px text-center">入厂安全须知</div>
            <div>
              <div>尊敬的工友：</div>
              <div>
                <div>
                  &ensp;&ensp;&ensp;&ensp;欢迎来到杭州南方化工设备有限公司工作，为保证你及他人的安全和健康，预防发生安全事故，请你熟知并遵守如下要求：
                </div>
                <div>
                  1、新工人进入施工现场前，必须接受安全教育，未经安全教育和培训考试合格的，不得进入施工现场操作。
                </div>
                <div>
                  2、进入施工现场，必须穿戴安全帽、防护鞋等防护用品。高空、临边作业必须系好安全带。电焊、气焊作业必须佩戴护目镜、面罩、防护手套、高帮鞋。电气作业必须戴橡胶手套或带胶底的绝缘鞋。施工现场禁止穿硬底、易滑、高跟、带钉的鞋。
                </div>
                <div>
                  3、吊装施工前必须确保环境安全，规范施工。塔内作业必须强制通风，规范使用安全行灯，严禁单独作业。起重作业必须确认场地平整、安全，操作平稳和缓，严禁猛操作或带载伸缩，严禁超载作业。
                </div>
                <div>
                  4、施工现场应确保使用标识明确、有效的起重机具，每次施工前应进行检查确保安全性能，排除隐患，严禁使用不符合技术要求的设备。
                </div>
                <div>
                  5、高空作业必须规范搭建脚手架或其他防护措施，必须设安全通道，必须用绳索传递物件，严禁直接上下投掷材料或工具。
                </div>
                <div>6、有限空间作业必须提前申请，未经审批，不得独自施工。</div>
                <div>
                  7、危险化学品要存放稳妥，远离火源、远离电源、远离水源，严禁混合堆放。领料、使用应注意安全，必须穿戴劳保用品，严禁地面滚桶、抛掷、摩擦撞击等操作。
                </div>
                <div>
                  8、施工环境和作业对象情况不清，施工前无安全措施或作业安全交8、底不清的，不盲目操作。
                </div>
                <div>
                  9、设备连接、管道碰头、带电作业、高空作业、动火作业等危险作业的，必须设置安全防护设施和明显标志，符合安全操作规程，不得盲目操作。
                </div>
                <div>
                  10、施工现场的井、沟、坑、电气设备及气、液排放点等危险点，应设置危险警示标志和防护措施。施工现场的安全防护设施拆除或者变动的，必须设置临时安全防护设施和安全标志，夜间要设置警示灯。施工结束后，必须立即恢复原状。
                </div>
                <div>
                  11、施工现场拆下的零部件及堆放的材料、设备、工具等，应及时联系有关部门运走。
                </div>
                <div>
                  12、遇有6级以上的大风及暴雨、打雷、大雾等恶劣天气，应停止一切高空作业。
                </div>
                <div>
                  13、施工现场内，严禁人员在吊装物下、起重臂下站立，严禁非施工人员进入高空作业区。
                </div>
                <div>
                  14、从事高空作业的人员，必须身体健康。患有精神病、癫痫病、高血压、心脏病以及其他不宜从事高空作业病症的人员，不得从事高空作业。严禁在酒后或精神不振的情况下进行任何施工操作。
                </div>
                <div className="text-right mt-20px">
                  杭州南方化工设备有限公司
                </div>
              </div>
            </div>
          </ScrollView>

          <Button
            style={{ marginTop: 8 }}
            className="w-3/5"
            type="primary"
            onClick={() => {
              setShowBottom(false);
              setCanCheckIn(true);
            }}
            disabled={countDown !== 0}
          >
            我已知晓 {countDown}
          </Button>
        </div>
      </Popup>
      <Dialog
        title="确认下班打卡"
        visible={visible}
        onOk={onOk}
        onCancel={() => setVisible(false)}
      >
        还没有到下班时间，确定要早退吗？
      </Dialog>
    </div>
  );
};
