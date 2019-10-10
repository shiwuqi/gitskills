var addZero = function (val) {
  if (typeof val === 'number' || typeof val === 'string') {
    return Number(val) < 10 ? '0' + val : val.toString()
  }
}

var formatMonth = function (opt) {
  if (opt && opt.year && opt.month) {
    if (Number(opt.month) >= 12) {
      return { ...opt, year: Number(opt.year) + 1, month: 1 }
    } else if (Number(opt.month) <= 1) {
      return { ...opt, year: Number(opt.year) - 1, month: 12 }
    } else {
      return opt
    }
  }
}

/**
 * 获取月份数据
 * @入参
 * year、month 若有则是目标月 无则获取当前月数据
 * all: 1、all得到目标月及目标月上下月数据
 *      2、part得到目标月及目标月上下月空数据
 *      3、clear只得到目标月数据
 * @出参
 * date: 日期
 * day: 目标天
 * month 月份
 * weekDate 目标天是周几
 * preOrNextDay -1 日期是目标月上个月 0 日期是目标月 1 日期是目标月下月
 */
var initDate = function (opt) {
  var _this = this;
  var dateArr = new Array();
  var dateLen = 0;
  var day = 0;
  var nowDate = opt && opt.year && opt.month ? new Date(opt.year, opt.month) : new Date();  // 选中的日期或当前日期
  var year = opt && opt.year ? opt.year : nowDate.getFullYear();   // 年
  var month = opt && opt.month ? addZero(opt.month) : (nowDate.getMonth() + 1) === 12 ? '01' : addZero(nowDate.getMonth() + 1);   // 月份
  var weekday = new Date(year + '-' + month + '-01').getDay();  // 目标月1号对应的周几
  var dayNums = new Date(year, month, 0).getDate();  // 目标月有多少天
  if (opt && opt.all === 'all') {
    var preMonth = month === '01' ? '12' : addZero((Number(month) - 1)); // 目标上个月
    var nextMonth = month === '12' ? '1' : addZero((Number(month) + 1)); // 目标下个月
    var preDayNums = new Date(year, preMonth, 0).getDate(); // 目标上个月有多少天
    // var nextDayNums = new Date(year, nextMonth, 0); // 目标下个月有多少天
    var preYear = preMonth === '12' ? year - 1 : year
    var nextYear = nextMonth === '1' ? year + 1 : year
    dateLen = 42;
    if (weekday > 0) { // 目标月上个月数据
      for (var i = 0; i < weekday; i++) {
        dateArr.unshift({
          date: preYear + '-' + preMonth + '-' + (preDayNums - i),
          year: preYear,
          day: preDayNums - i,
          month: preMonth,
          preOrNextDay: -1
        })
      }
    }
    for (var j = weekday; j < (dayNums + weekday); j++) { // 目标月数据
      dateArr.push({
        date: year + '-' + month + '-' + addZero(j - weekday + 1),
        year,
        day: Number(addZero(j - weekday + 1)),
        month: month,
        preOrNextDay: 0
      })
    }
    var nextDiffDay = 42 - (dayNums + weekday);
    for (var k = 0; k < nextDiffDay; k++) { // 目标月下个月数据
      dateArr.push({
        date: nextYear + '-' + nextMonth + '-' + addZero(k + 1),
        year: nextYear,
        day: Number(addZero(k + 1)),
        month: nextMonth,
        preOrNextDay: 1
      })
    }
  } else {
    dateLen = weekday + dayNums;
    for (var i = 0; i < dateLen; i++) {
      if (i >= weekday) {
        day = Number(i - weekday + 1) > 9 ? '' + (i - weekday + 1) : '0' + (i - weekday + 1);
        const date = year + '-' + month + '-' + day;
        const weekDate = new Date(date).getDay();
        dateArr.push({
          date,
          year,
          day,
          month,
          weekDate,
          preOrNextDay: 0,
        })
      } else {
        if (opt && (opt.all === 'part' || opt.all === 'all')) {
          dateArr.push({})
        }
      }
    }
  }
  return dateArr
}

var getWeeks = function (date) {
  var curMonDayDate;
  var curWeek = date.getDay(); // 获取目标日期是周几，周日为0
  if (curWeek == 0) {
    curWeek = 7;
  }
  var stDay = 0 - curWeek;// 周日和当前差多少天，得出为非正数
  curMonDayDate = addDate(date, stDay);// 获取目标周的周日日期
  var arrDate = [];
  for (var i = 0; i < 7; i++) {
    arrDate.push(addDate(new Date(curMonDayDate), i));
  }
  return arrDate;
}

var addDate = function (date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  var m = d.getMonth() + 1;
  return d.getFullYear() + '-' + m + '-' + d.getDate();
}

/**
 * 把日期转化成年月日时分秒
 */
var formatTime = function (date) {
  date = new Date(date)
  var year = date.getFullYear() // 年份
  var month = date.getMonth() + 1  // 月份
  var day = date.getDate()  // 日
  var hour = date.getHours()  // 小时
  var minute = date.getMinutes()  // 分钟
  var seconds = date.getSeconds() // 秒
  var dayNums = date.getDate()  // 目标天所在月有多少天
  return { year, month, day, hour, minute, seconds, dayNums }
}

/**
 * 滑动月份判断选中的日期
 * preDate：上个目标月选中的某一天
 * nextDate：目标月的某一天
 */
var CheckedMonthDay = function (preDate, nextDate) {
  var preDateTime = formatTime(preDate);
  var nextDateTime = formatTime(nextDate);
  if (preDateTime.day <= 28) {
    return { year: nextDateTime.year, month: nextDateTime.month, day: preDateTime.day };
  } else {
    var nextTotalDay = new Date(nextDateTime.year, nextDateTime.month, 0).getDate(); // 目标月的总天数
    if (nextTotalDay >= preDateTime.day) {
      return { year: nextDateTime.year, month: nextDateTime.month, day: preDateTime.day };
    } else {
      return { year: nextDateTime.year, month: nextDateTime.month, day: nextTotalDay };
    }
  }
}

module.exports = {
  initDate,
  addZero,
  getWeeks,
  formatMonth,
  formatTime,
  CheckedMonthDay,
}