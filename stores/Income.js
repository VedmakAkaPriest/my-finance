import { types, flow, applySnapshot, onSnapshot, applyPatch } from 'mobx-state-tree';
import moment from 'moment';
import persist from './persist/persist';
import { fakeFetchMonthIncome } from '../fakeData/income';

export const IncomeEntry = types
  .model('IncomeEntry', {
    date: types.Date,
    description: '',
    amount: types.number,
  })
  .actions(self => ({
    setAmount(num) {
      self.amount = +num;
    },
  }));

const IncomeMonthly = types.model('IncomeMonthly', {
  id: types.identifierNumber,
  month: types.Date,
  entries: types.array(IncomeEntry),
});

function parseMonthData(date, incomes) {
  return {
    id: date.unix(),
    month: date.toDate(),
    entries: incomes.map(row => ({
      date: date.toDate(),
      description: row[0],
      amount: row[1],
    })),
  };
}

const IncomeStore = types
  .model('IncomeStore', {
    isLoading: true,
    entries: types.map(IncomeMonthly),
  })
  .actions(self => {
    let removePersist;
    return {
      // features
      load: flow(function* loadIncome(date) {
        date = moment(date).startOf('month');
        const incomes = yield fakeFetchMonthIncome(date);
        // const incomes = unzip(raw);
        if (incomes && incomes.length) {
          const json = parseMonthData(date, incomes);
          self.entries.put(json);
        }
        self.isLoading = false;
      }),
    };
  })
  .views(self => ({
    /**
     * By category
     * @param monthDate
     * @returns IncomeMonthly
     */
    monthIncome(monthDate): IncomeMonthly {
      const targetDate = moment(monthDate).startOf('month');
      return self.entries.get(targetDate.unix());
    },
  }));

const incomeStoreInstance = IncomeStore.create();
persist('incomeStore', incomeStoreInstance);
incomeStoreInstance.load();

export default incomeStoreInstance;
