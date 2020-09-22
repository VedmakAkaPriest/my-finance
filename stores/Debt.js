import { types, flow, applySnapshot, onSnapshot, applyPatch } from 'mobx-state-tree';
import persist from './persist/persist';

const DebtStore = types
  .model('DebtStore', {
    isLoading: true,
    entries: types.map(DebtMonthly),
  })
  .actions(self => {
    let removePersist;
    return {
      // features
      load: flow(function* loadDebts(date) {
        date = moment(date).startOf('month');
        const debts = yield fakeFetchMonthDebts(date);
        // const debts = unzip(raw);
        if (debts && debts.length) {
          const json = parseMonthData(date, debts);
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
     * @returns DebtsMonthly
     */
    monthIncome(monthDate): DebtsMonthly {
      const targetDate = moment(monthDate).startOf('month');
      return self.entries.get(targetDate.unix());
    },
  }));

const debtStoreInstance = DebtStore.create();
persist('debtStore', debtStoreInstance);
debtStoreInstance.load();

export default debtStoreInstance;
