<template>
  <div class="easy-date-body-wrap">
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
    <div v-for="(item,index) in daysArray" :key="index">{{item}}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    currentDate: {
      type: Object,
      default() {
        return moment();
      }
    }
  },
  data() {
    return {
      currentMonth: "",
      startDateOfMonth: null,
      endDateOfMonth: null,
      daysArray: [],
      monthArr: [],
      activeDate: null
    };
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