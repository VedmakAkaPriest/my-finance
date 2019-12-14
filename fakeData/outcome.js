import moment from "moment";
import {random, round} from "lodash";

export function daysInMonth(date) {
  const fromDate = moment(date).date(1);
  const toDate = moment(fromDate).add(1, 'month');
  const days = [];
  for (let targetDate = moment(fromDate); targetDate.isBefore(toDate); targetDate.add(1, 'days')) {
    days.push(moment(targetDate));
  }
  return days;
}

export function generateMonthOutcome(fromDate) {
  const days = daysInMonth(fromDate);
  return Array(10).fill().map((categoryItems, rowNum) =>
    [
      `Category ${rowNum + 1}`,
      ...Array.from(days).map(() => round(random(999, true), 2))
    ]);
}

export function categoriesFromOutcome(rawData) {
  return rawData.map(row => row[0]);
}

export default generateMonthOutcome(new Date());
