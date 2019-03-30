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

var initDate = function (opt) {
  var _this = this;
  var dateArr = new Array();
  var dateLen = 0;
  var day = 0;
  var nowDate = opt && opt.year && opt.month ? new Date(opt.year, opt.month) : new Date();  // 选中的日期或当前日期
  var year = opt && opt.year ? addZero(opt.year) : addZero(nowDate.getFullYear());   // 年
  var month = opt && opt.month ? addZero(opt.month) : (nowDate.getMonth() + 1) === 12 ? '01' : addZero(nowDate.getMonth() + 1);   // 月份
  var weekday = new Date(year + '-' + month + '-01').getDay();  // 目标月1号对应的周几
  var dayNums = new Date(year, month, 0).getDate();  // 目标月有多少天
  if (opt && opt.all) {
    var preMonth = month === '01' ? '12' : addZero((Number(month) - 1)); // 目标上个月
    var nextMonth = month === '12' ? '1' : addZero((Number(month) + 1)); // 目标下个月
    var preDayNums = new Date(year, preMonth, 0).getDate(); // 目标上个月有多少天
    // var nextDayNums = new Date(year, nextMonth, 0); // 目标下个月有多少天
    dateLen = 42;
    if (weekday > 0) {
      for (var i = 0; i < weekday; i++) {
        dateArr.unshift({
          date: year + '-' + preMonth + '-' + (preDayNums - i),
          day: preDayNums - i,
          month: preMonth,
          preOrNextDay: -1
        })
      }
    }
    for (var j = weekday; j < (dayNums + weekday); j++) {
      day = Number(addZero(j - weekday + 1));
      dateArr.push({
        date: year + '-' + month + '-' + day,
        day,
        month: month,
        preOrNextDay: 0
      })
    }
    var nextDiffDay = 42 - (dayNums + weekday);
    for (var k = 0; k < nextDiffDay; k++) {
      dateArr.push({
        date: year + '-' + nextMonth + '-' + addZero(k + 1),
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
        dateArr.push({
          date: year + '-' + month + '-' + day,
          day,
          month,
          preOrNextDay: 0,
        })
      } else {
        dateArr.push({})
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

module.exports = {
  initDate,
  addZero,
  getWeeks,
  formatMonth,
}