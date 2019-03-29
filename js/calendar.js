var addZero = function(val) {
	if (typeof val === 'number' || typeof val === 'string') {
		return Number(val) < 10 ? '0' + val : val.toString();
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
		if (weekday > 0) {// 第一行不是从周日开始
			for(var i = 0; i < weekday; i++) {
				dateArr.unshift({
					date: year + '-' + preMonth + '-' + (preDayNums - i),
					day: preDayNums - i,
					preOrNextDay: true
				})
			}
		}
		for(var j = weekday; j < (dayNums + weekday); j++) {
			day = addZero(j - weekday + 1);
			dateArr.push({
				date: year + '-' + month + '-' + day,
				day,
				preOrNextDay: false
			})
		}
		var nextDiffDay = 42 - (dayNums + weekday);
		for(var k = 0; k < nextDiffDay; k++) {
			dateArr.push({
				date: year + '-' + nextMonth + '-' + addZero(k + 1),
				day: addZero(k + 1),
				preOrNextDay: true
			})
		}
	} else {
		dateLen = weekday + dayNums;
		for(var i = 0; i < dateLen; i++) {
			if (i >= weekday) {
				day = Number(i - weekday + 1) > 9 ? '' + (i - weekday + 1) : '0' + (i - weekday + 1);
				dateArr.push({
					date: year + '-' + month + '-' + day,
					day,
					preOrNextDay: false
				})
			} else {
				dateArr.push({})
			}
		}
	}
	return dateArr
}