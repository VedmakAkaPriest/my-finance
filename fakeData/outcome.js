import { random, round } from 'lodash';
import { daysInMonth } from '../stores/utils';

export function generateMonthOutcome(fromDate) {
  const days = daysInMonth(fromDate);
  return Array(10)
    .fill()
    .map((categoryItems, rowNum) => [
      `Category ${rowNum + 1}`,
      ...Array.from(days).map(() => round(random(999, true), 2)),
    ]);
}

export function categoriesFromOutcome(rawData) {
  return rawData.map(row => row[0]);
}

export function fakeFetchMonthOutcome(date) {
  return new Promise(res => setTimeout(() => res(generateMonthOutcome(date)), 2000));
}

export default generateMonthOutcome(new Date());
