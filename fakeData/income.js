import { random, memoize } from 'lodash';

/**
 * @returns Array<Array<String, Integer>>
 */
export const generateMonthIncome = memoize(fromDate => {
  return Array(3)
    .fill()
    .map((categoryItems, rowNum) => [`Title ${rowNum + 1}`, random(999, 99999, false)]);
});

export function titleFromIncome(rawData) {
  return rawData.map(row => row[0]);
}

export function fakeFetchMonthIncome(date) {
  return new Promise(res => setTimeout(() => res(generateMonthIncome(date)), 2000));
}

export default generateMonthIncome(new Date());
