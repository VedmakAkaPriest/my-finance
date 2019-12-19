import moment from 'moment';
import uuid from 'uuid/v4';

export function daysInMonth(date) {
  const fromDate = moment(date).startOf('month');
  const toDate = moment(fromDate).add(1, 'month');
  const days = [];
  for (let targetDate = moment(fromDate); targetDate.isBefore(toDate); targetDate.add(1, 'days')) {
    days.push(moment(targetDate));
  }
  return days;
}

export const UUID = uuid;

export function promisify(fn) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      fn(...args, reject, resolve);
    });
  };
}
