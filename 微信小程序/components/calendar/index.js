// components/calendar/index.js
const {
  initDate,
  addZero,
  formatMonth
} = require('../../utils/calendar.js')

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
    // 左右滑动的class样式
    slideOne: "",
    slideTwo: "",
    // 左右滑动定义的状态变量
    slideFlag: false,
    isToday: 0,
    isTodayWeek: false,
    selectedDate: '1970-01-01',
    swiperIndex: 1,
    calendar: [],
    year: 0,
    month: 0,
  },

  lifetimes: {
    attached() {
      let now = new Date();
      let year = now.getFullYear();
      let month = addZero(now.getMonth() + 1);
      if (this.data.defaultYear && this.data.defaultMonth) {
        this.setData({
          isToday: year + '-' + month + '-' + now.getDate(),
          calendar: initDate(formatMonth({
            year: this.data.defaultYear,
            month: Number(this.data.defaultMonth),
            all: 'all'
          }))
        })
      } else {
        this.setData({
          year: year,
          month: month,
          isToday: year + '-' + month + '-' + now.getDate(),
          selectedDate: year + '-' + month + '-' + now.getDate(),
          calendar: initDate(formatMonth({
            year,
            month: Number(month),
            all: 'all'
          }))
        })
      }
    },
  },

  methods: {
    /**
     * 日历滑动的特效处理函数
     */
    touchStart(e) {
      this.setData({
        startX: e.changedTouches[0].pageX
      })
    },
    touchEnd(e) {
      const _this = this
      if (!this.data.slideFlag) {
        this.setData({
          slideFlag: true,
          endX: e.changedTouches[0].pageX
        })
        let disX = e.changedTouches[0].pageX - this.data.startX;
        if (disX < -50) {
          console.log("----------> 左滑")
          this.setData({
            slideOne: "animated fadeOutLeft",
            slideTwo: "animated fadeInRight"
          })
          this.tapNext();
          // setTimeout(() => {
          //   this.tapNext();
          // }, 300);
          setTimeout(() => {
            _this.setData({
              slideFlag: false,
              slideOne: "",
              slideTwo: ""
            })
          }, 500);
        } else if (disX > 50) {
          console.log("-----------> 右滑")
          this.setData({
            slideOne: "animated fadeOutRight",
            slideTwo: "animated fadeInLeft"
          })
          this.tapPrev()
          // setTimeout(() => {
          //   this.tapPrev();
          // }, 300);
          setTimeout(() => {
            _this.setData({
              slideFlag: false,
              slideOne: "",
              slideTwo: ""
            })
          }, 500);
        } else {
          this.setData({
            slideFlag: false
          })
        }
      }
    },
    /**
     * 左右滑动调用的函数
     */
    tapPrev() {
      const {
        year,
        month
      } = formatMonth({
        year: this.data.year,
        month: (Number(this.data.month) - 1)
      })
      const calendar = initDate({
        all: 'all',
        year,
        month
      })
      this.setData({
        calendar,
        year,
        month
      })
      const _data = {
        changeYear: year,
        changeMonth: addZero(month),
      }
    },
    tapNext() {
      const {
        year,
        month
      } = formatMonth({
        year: this.data.year,
        month: (Number(this.data.month) + 1)
      })
      const calendar = initDate({
        all: 'all',
        year,
        month
      })
      this.setData({
        calendar,
        year,
        month
      })
      const _data = {
        changeYear: year,
        changeMonth: addZero(month),
      }
    },

    handleClickSelected(e) {
      const {
        year,
        month,
        day,
        datenum,
        preornextday,
        type
      } = e.currentTarget.dataset
      let obj = {}
      if (preornextday === -1) {
        this.tapPrev()
        // this.triggerEvent('handleChangeMonth', {
        //   changeYear: year, changeMonth: month
        // })
      } else if (preornextday === 1) {
        this.tapNext()
      }
      this.setData({
        selectedDate: datenum
      })
      const _data = {
        year,
        month,
        day: addZero(day),
        datenum,
        changeYear: year,
        changeMonth: addZero(month),
      }
    }
  }
})