// components/calendar/index.js
const { initDate, addZero, formatMonth } = require('../../utils/calendar.js')

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    // 属性值
    defaultYear: {
      type: Number,
      value: 0
    },
    defaultMonth: {
      type: Number,
      value: 0
    }
  },
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    isToday: 0,
    isTodayWeek: false,
    selectedDate: -1,
    swiperIndex: 1,
    calendar: {
      first: [],
      second: [],
      third: [],
      fourth: [],
    },
    year: 0,
    month: 0,
    swiperMap: ['first', 'second', 'third', 'fourth'],
  },

  lifetimes: {
    attached() {
      let now = new Date();
      let year = now.getFullYear();
      let month = addZero(now.getMonth() + 1);
      if (this.data.defaultYear && this.data.defaultMonth) {
        this.setData({
          isToday: year + '-' + month + '-' + now.getDate(),
          calendar: this.getCalendarDate({ year: this.data.year, month: Number(this.data.month), all: true })
        })
      } else {
        this.setData({
          year: year,
          month: month,
          isToday: year + '-' + month + '-' + now.getDate(),
          calendar: this.getCalendarDate({ year, month: Number(month), all: true })
        })
      }
    },
  },

  methods: {
    // 首次加载前中后三个月的数据
    getCalendarDate(opt) {
      const { year, month } = opt
      const first = initDate(formatMonth({ ...opt, year: opt.year, month: Number(opt.month) - 1 }))
      const second = initDate(formatMonth({ ...opt }))
      const third = initDate(formatMonth({ ...opt, year: opt.year, month: Number(opt.month) + 1 }))
      return { first, second, third, fourth: [] }
    },

    // swiper滑动
    swiperChange(e) {
      const lastIndex = this.data.swiperIndex
        , currentIndex = e.detail.current
      let flag = false
        , { year, month, calendar, swiperMap } = this.data
        , change = swiperMap[(lastIndex + 2) % 4]
      if (lastIndex > currentIndex) {
        lastIndex === 3 && currentIndex === 0
          ? flag = true
          : null
      } else {
        lastIndex === 0 && currentIndex === 3
          ? null
          : flag = true
      }
      let queryYear = 0, queryMonth = 0;
      if (flag) {
        queryYear = Number(month) + 2 > 12 ? Number(year) + 1 : year
        year = Number(month) + 1 > 12 ? Number(year) + 1 : year
        queryMonth = Number(month) === 11 ? 1 : Number(month) === 12 ? 2 : Number(month) + 2
        month = Number(month) + 1 > 12 ? 1 : Number(month) + 1
      } else {
        queryYear = Number(month) - 2 < 1 ? Number(year) - 1 : year
        year = Number(month) - 1 < 1 ? Number(year) - 1 : year
        queryMonth = Number(month) === 2 ? 12 : Number(month) === 1 ? 11 : Number(month) - 2
        month = Number(month) - 1 < 1 ? 12 : Number(month) - 1
      }
      calendar[change] = initDate({ year: queryYear, month: queryMonth, all: true })
      this.setData({
        calendar,
        swiperIndex: currentIndex,
        year,
        month,
      })
    },

    handleClickSelected(e) {
      // console.log(e)
      const { year, month, day, date, preornextday, type } = e.currentTarget.dataset
      let obj = {}
      if (preornextday === -1 || preornextday === 1) {
        this.setData({
          year: year,
          month: month,
          calendar: this.getCalendarDate({ year, month, all: true })
        })
      }
      this.setData({
        selectedDate: day
      })
      console.log(this.data.selectedDate)
      const _data = {
        year,
        month,
        day,
        date,
      }
      this.triggerEvent('handleSelectedDay', _data)
    }
  }
})