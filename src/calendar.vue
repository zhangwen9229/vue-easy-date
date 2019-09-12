<template>
  <table class="easy-date-body">
    <thead>
      <tr>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
        <th>日</th>
      </tr>
    </thead>
    <tbody @click="dayClick($event)">
      <tr v-for="(item,index) in daysArray" :key="index">
        <td v-for="(dayItem, j) in item" :key="j" :class="getDayClasses(dayItem)">
          <div class="day-wrap" :data-oday="JSON.stringify(dayItem)">
            <div class="day">{{dayItem.day.date()}}</div>
            <div class="day-content" v-if="dayItem.isRest">休</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from ('moment');

export default {
  name: 'c-calendar',
  props: {
    initDate: {
      type: Object, // moment
      default: moment()
    },
  },
  data() {
    return {
      currentDate: this.initDate,
      currentMonth: this.currentDate.format("YYYY-MM"),
      startDateOfMonth: null,
      endDateOfMonth: null,
      daysArray: [],
      monthArr: initMonthArray,
      activeDate: currentDate
    }
  },
  created() {
  },
  watch:{
    
  },
  methods: {
    // 初始化当前月份的开始日期和结束日期
    initStartEnd: function() {
      console.log(this.currentMonth);
      // 当月1号
      var currMonth = moment(this.currentMonth, "YYYY-MM"),
        // 当月1号是周几 the ISO day of the week with 1 being Monday and 7 being Sunday.
        firstDay_weekday = currMonth.isoWeekday(),
        startDateOfMonth,
        endDateOfMonth;
      if (!this.dayStartFromSunday) {
        // 开始为周一 则向前减少周几的天数-1即为 开始的日期
        startDateOfMonth = currMonth.subtract(firstDay_weekday - 1, "day");
      } else {
        // 开始为周日 则直接向前周几的天数即可
        startDateOfMonth = currMonth.subtract(firstDay_weekday, "day");
      }

      endDateOfMonth = startDateOfMonth.clone().add(41, "day");

      this.startDateOfMonth = startDateOfMonth;
      this.endDateOfMonth = endDateOfMonth;
    },
    renderDate() {
      this.initStartEnd();

      var weeks = 6,
        days = 7,
        // 先向前减一天，后续递增直接加1
        curDate = this.startDateOfMonth.clone().subtract(1, "day"),
        tr;

      var start = this.startDateOfMonth.format("YYYY-MM-DD"),
        end = this.endDateOfMonth.format("YYYY-MM-DD");

      // 清空 并开始新的渲染
      this.clearDays();

      for (var i = 0; i < weeks; ++i) {
        this.daysArray.push([]);

        for (var j = 0; j < days; ++j) {
          // 渲染一天 并递增
          const cDay = curDate.add(1, "day").clone();
          const oDay = {
            isNotCurrentMonth: cDay.month() !== this.currentDate.month(),
            isCurrentDay: cDay.isSame(this.currentDate, "day"),
            day: cDay,
            isRest: cDay.isBetween("2019-08-18", "2019-08-22")
          };
          this.daysArray[i].push(oDay);
        }
      }
      // console.log(this.daysArray);
    },
    clearDays() {
      this.daysArray = [];
    },
    getDayClasses(dayItem) {
      //  dayItem.isNotCurrentMonth ? 'isNotCurrentMonth': 'c-month'
      const arrClass = [];
      if (dayItem.isNotCurrentMonth) {
        arrClass.push("isNotCurrentMonth");
      } else {
        arrClass.push("c-month");
      }
      if (dayItem.isCurrentDay) {
        arrClass.push("c-day");
      }
      return arrClass;
    },
    dayClick(e) {
      const el = this.findParents(e.target);
      console.log(e.dataset.oDay);
    },
    findParents(el) {
      while (
        el != undefined &&
        el != null &&
        el.tagName.toUpperCase() != "TBODY"
      ) {
        if (el.classList.contains("day-wrap")) {
          return el;
        }
        el = el.parentNode;
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
.easy-date-body-wrap {
  .easy-date-body {
    text-align: center;
    width: 100%;
    thead {
      th {
        border-bottom: 1px solid #eeeeee;
        height: px2rem(60);
        vertical-align: middle;
        font-weight: 200;
        font-size: px2rem(24);
        color: #a3a3a3;
      }
    }
    tbody {
      td {
        vertical-align: middle;
        height: px2rem(80);
        &.isNotCurrentMonth {
          color: #c8c8c8;
        }
        .day-wrap {
          width: px2rem(80);
          height: px2rem(80);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .day-content {
            font-size: px2rem(20);
            font-weight: 200;
          }
        }
        &.c-day {
          .day-wrap {
            .day {
              color: #1894ed;
            }
            border: 1px solid #c8c8c8;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>