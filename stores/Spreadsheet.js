import { types, flow, applySnapshot, onSnapshot, applyPatch } from 'mobx-state-tree';
import persist from './persist/persist';

const SPREADSHEET_ID = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)'); // take group 1
const SHEET_ID = new RegExp('[#&]gid=([0-9]+)'); // take group 1

const SheetType = {
  MONTHLY: 'monthly',
  BY_DAY: 'by_day',
};

const Sheet = types
  .model('Sheet', {
    sheetId: types.identifier,
    type: types.enumeration(Object.values(SheetType)),
  })
  .actions(self => ({
    isValidURL: (resourceUrl = '') => SHEET_ID.test(resourceUrl),
  }))
  .views(self => ({
    buildApiUrl() {
      return `https://sheets.googleapis.com/v4/spreadsheets/${self.spreadsheetId}`;
    },
  }));

const SpreadsheetStore = types
  .model('SpreadsheetStore', {
    isLoading: true,
    spreadsheetId: types.string,
    sheets: types.map(),
  })
  .actions(self => ({
    isValidURL: (resourceUrl = '') => SPREADSHEET_ID.test(resourceUrl),
    loadData: flow(function*() {}),
  }))
  .views(self => ({
    buildApiUrl() {
      return `https://sheets.googleapis.com/v4/spreadsheets/${self.spreadsheetId}`;
    },
  }));

const sheetStoreInstance = SpreadsheetStore.create();
persist('spreadsheetStore', sheetStoreInstance);
sheetStoreInstance.load();

export default sheetStoreInstance;
