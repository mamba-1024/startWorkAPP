
interface Props {
  list: any[];
  queryMonth: string;
  setActiveDate: (time: string) => void;
  activeDate: string;
}

function Calendar(props: Props) {
  const { list = [], queryMonth, setActiveDate, activeDate } = props;

  const date = new Date(queryMonth);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  // 0 表示星期天，1 表示星期一，依次类推
  const getLastDayOfMonth = (d) => {
    const date = new Date(d);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDayOfMonth.getDay();
  };

  function getDaysList() {
    const days = daysInMonth(date);
    const startDay = firstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);
    let startList: any = [];
    let endList: any = [];
    if (startDay > 0) {
      startList = Array.from(new Array(startDay));
    }
    if (lastDay >= 0) {
      endList = Array.from(new Array(6 - lastDay));
    }
    // 年份、月份
    // const month = queryMonth.split('-')[1];
    const [year, month] = queryMonth.split('-')
    const currentMonth = Array.from(new Array(days).keys()).map((ele) => {
      const localDate = `${year}-${month}-${(ele + 1).toString().padStart(2, '0')}`;
      const record = list?.find((ele) => localDate.endsWith(ele.localDate)) || {};
      return { localDate, duration: record?.duration, num: ele + 1 };
    });

    return startList.concat(currentMonth).concat(endList);
  }

  const handleDay = (day) => {
    if (day) {
      setActiveDate(day.localDate)
    }
  };

  const thead: string[] = ['日', '一', '二', '三', '四', '五', '六'];
  const cells = getDaysList();
  return (
    <div className="bg-white p-4px">
      <div className="flex justify-around items-center my-6px">
        {thead.map((ele) => (
          <span className="text-text">{ele}</span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((ele) => (
          <div
            className={`relative flex flex-col justify-center items-center h-60px ${
              !ele && 'bg-gray-50'
            }  ${activeDate.endsWith(ele?.localDate) ? 'bg-primary text-white' : ''}`}
            onClick={() => handleDay(ele)}
          >
            {ele?.num}
            {typeof ele?.duration === 'number' && (
              <span className={`absolute bottom-2px w-full text-center ${activeDate.endsWith(ele?.localDate) ? 'text-white' : 'text-primary'}`}>
                {ele?.duration}h
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
