import { types, flow, applySnapshot, onSnapshot, applyPatch } from 'mobx-state-tree';
import { sumBy, map, unzip, zip, get } from 'lodash';
import moment from 'moment';
import { fakeFetchMonthOutcome, generateMonthOutcome } from '../fakeData/outcome';
import { daysInMonth, UUID } from './utils';
import persist from './persist/persist';
import categories, { Category } from './OutcomeCategory';

const OutcomeEntry = types.model('OutcomeEntry', {
  date: types.Date,
  description: '',
  price: types.number,
});

const OutcomeGroupEntry = types
  .model('OutcomeGroupEntry', {
    category: types.reference(Category, {
      get(identifier, parent) {
        return categories.items.get(identifier);
      },
      set(value, parent): string | number {
        return value.id;
      },
    }),
    date: types.Date,
    icon: '',
    items: types.array(OutcomeEntry),
  })
  .views(self => ({
    get title() {
      return self.category?.title;
    },
    get price() {
      return self.items ? sumBy(self.items, 'price') : 0;
    },
  }));

const OutcomeDaily = types
  .model('OutcomeDaily', {
    id: types.identifierNumber,
    day: types.Date,
    entries: types.array(OutcomeGroupEntry),
  })
  .views(self => ({
    get price() {
      return self.items ? sumBy(self.items, 'price') : 0;
    },
  }));

const OutcomeMonthly = types
  .model('OutcomeMonthly', {
    id: types.identifierNumber,
    month: types.Date,
    entries: types.map(OutcomeDaily),
  })
  .views(self => ({
    get price() {
      return sumBy(self.entries, 'price');
    },
    groupNames() {
      return map(self.entries, 'name');
    },

    get perDay() {
      return unzip(map(self.entries, item => item.entries));
    },
  }));

function parseMonthData(date, outcomeColumns) {
  const monthGroups = outcomeColumns.shift().map(groupName => categories.findOrCreate(groupName));
  const days = daysInMonth(date);

  return {
    id: date.unix(),
    month: date.toDate(),
    entries: daysInMonth(date).reduce((accum, day, dayIdx) => {
      // array of OutcomeDaily
      accum[day.unix()] = {
        id: day.unix(),
        day: day.toDate(),
        entries: monthGroups.map((group, groupIdx) =>
          // array of OutcomeGroupEntry
          ({
            category: group,
            date: day.toDate(),
            // array of OutcomeEntry
            items: [
              {
                date: day.toDate(),
                price: get(outcomeColumns, `${dayIdx}.${groupIdx}`, -1),
              },
            ],
          })
        ),
      };
      return accum;
    }, {}),
  };
}

const OutcomeStore = types
  .model('OutcomeStore', {
    isLoading: true,
    entries: types.map(OutcomeMonthly),
  })
  .actions(self => {
    let removePersist;
    return {
      // features
      load: flow(function* loadOutcome(date) {
        date = moment(date).startOf('month');
        const raw = yield fakeFetchMonthOutcome(date);
        const outcomeColumns = unzip(raw);
        if (outcomeColumns && outcomeColumns.length) {
          const json = parseMonthData(date, outcomeColumns);
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
     * @returns OutcomeMonthly
     */
    monthOutcome(monthDate) {
      const targetDate = moment(monthDate).startOf('month');
      return self.entries.get(targetDate.unix());
    },
  }));

const outcomeStoreInstance = OutcomeStore.create();
persist('outcomeStore', outcomeStoreInstance);
outcomeStoreInstance.load();

export default outcomeStoreInstance;
