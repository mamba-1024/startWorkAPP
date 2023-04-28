import { useState, useMemo } from 'react';
import { useDidShow } from '@tarojs/taro';
import Api from '@/api';
import { Skeleton, Cell, Icon, DatePicker } from '@nutui/nutui-react-taro';
import { formatTime } from '@/utils/formatTime';
import Calendar from '@/components/calendar/index';

interface RecordProps {
  shiftDurationMap: any;
  attendanceDayInfoDTOS: any[];
}

function getWeekChinese(num: number) {
  var week = ['六', '日', '一', '二', '三', '四', '五'];
  if (num < 0 || num > 7) return '非法数据';
  return '星期' + week[num];
}

export default () => {
  const modelValue = new Date();
  // 月份
  const [currentMonth, setCurrentMonth] = useState<string>(formatTime(modelValue, 'yyyy-MM'));
  const [show, setShow] = useState(false);
  const [attendanceRecord, setAttendanceRecord] = useState<RecordProps | null>(
    null
  );
  const [activeDate, setActiveDate] = useState<string>(
    formatTime(modelValue, 'yyyy-MM-dd')
  );

  const attendanceDayDetailInfos = useMemo(() => {
    return (
      attendanceRecord?.attendanceDayInfoDTOS?.find(
        (ele) => activeDate.endsWith(ele.localDate)
      )?.attendanceDayDetailInfos || []
    );
  }, [attendanceRecord, activeDate]);

  const fetchAttendanceRecord = (date) => {
    Api.postAttendanceRecord({
      queryMonth: date,
      loading: true,
    }).then((res) => {
      setAttendanceRecord(res.data);
    });
  };

  useDidShow(() => {
    const queryMonth = formatTime(modelValue, 'yyyy-MM-dd');
    fetchAttendanceRecord(queryMonth);
  });

  const confirm = (values: (string | number)[]) => {
    const date = values.join('-')
    setCurrentMonth(date);
    setShow(false);
    setActiveDate(`${values[1]}-01`)
    fetchAttendanceRecord(`${date}-01`)
  };

  const minDate = new Date('2022');
  const maxDate = new Date();

  const week = getWeekChinese(new Date(activeDate).getDay())

  return (
    <div>
      <Cell className="justify-end items-center">
        <span className="flex" onClick={() => setShow(true)}>
          <Icon name="clock"></Icon>
          <span className="ml-5px">{currentMonth}</span>
        </span>
        <DatePicker
          modelValue={modelValue}
          title="日期选择"
          visible={show}
          isShowChinese
          minDate={minDate}
          maxDate={maxDate}
          type="year-month"
          onCloseDatePicker={() => setShow(false)}
          onConfirmDatePicker={(values) => confirm(values)}
        />
      </Cell>
      {attendanceRecord?.shiftDurationMap && Object.keys(attendanceRecord?.shiftDurationMap).map((ele) => (
        <Cell className="justify-between items-center">
          <span>{ele}累计时长</span>
          <span>{attendanceRecord?.shiftDurationMap?.[ele]}</span>
        </Cell>
      ))}
      <div>
        {attendanceRecord?.attendanceDayInfoDTOS ? (
          <Calendar
            queryMonth={currentMonth}
            list={attendanceRecord?.attendanceDayInfoDTOS || []}
            setActiveDate={setActiveDate}
            activeDate={activeDate}
          />
        ) : (
          <Skeleton width="250px" height="15px" animated />
        )}
      </div>
      <Cell>
        <span className="text-16px mb-8px">
          {activeDate} {week}
        </span>
      </Cell>
      <Cell className="flex flex-col">
        {attendanceDayDetailInfos?.map((info) => (
          <div className="w-full">
            <div className="text-16px text-black mb-6px">{info?.shiftName}</div>
            <div className="flex justify-between items-center">
              <span>时长</span>
              <span>{info?.duration}</span>
            </div>
            <div className="flex justify-between items-center my-6px">
              <span>时间</span>
              <span>{info?.showTime}</span>
            </div>
          </div>
        ))}
      </Cell>
    </div>
  );
};
