
/**
 * 
 * @param {date} time 
 * @param {string} format  // yyyy-MM-dd HH:mm:ss.SSS
 * @returns {string}
 */

export function formatTime(time, format) {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formatObj = {
    'M+': month,
    'd+': day,
    'h+': hours % 12 === 0 ? 12 : hours % 12,
    'H+': hours,
    'm+': minutes,
    's+': seconds,
    'q+': Math.floor((month - 1) / 3) + 1,
    'S': date.getMilliseconds()
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length));
  }

  for (let k in formatObj) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? formatObj[k] : ('00' + formatObj[k]).substr(('' + formatObj[k]).length));
    }
  }

  return format;
}

/**
 * @description 解决iOS时间格式bug，将yyyy-MM-dd转为yyyy/MM/dd
 */
export function formatTimeIOS(time) {
  return time.replace(/-/g, '/');
}
