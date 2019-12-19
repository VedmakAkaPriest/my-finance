/**
 * Thanks to https://github.com/agilgur5/mst-persist
 */
import SQLite from 'expo-sqlite';
import { getType, onSnapshot, applySnapshot, IStateTreeNode } from 'mobx-state-tree';
import { isString } from 'lodash';
import { promisify } from '../utils';
import webSQLStorage from './websql';

export interface IArgs {
  (name: string, store: IStateTreeNode, options?: IOptions): Promise<void>;
}
export interface IOptions {
  storage?: any;
  jsonify?: boolean;
  whitelist?: Array<string>;
  blacklist?: Array<string>;
}
type StrToAnyMap = { [key: string]: any };

async function AsyncLocalStorage() {
  const db = SQLite.openDatabase('db.db');
  const transaction = promisify(db.transaction);
  function createTable(name) {
    return transaction(tx => {
      tx.executeSql(
        `create table if not exists app_state (id integer primary key not null, name text, json_value text);`
      );
    });
  }

  return {
    async getItem(key: string) {
      return transaction(tx => tx.executeSql());
    },
    async setItem(key: string, value: any) {},
    async removeItem(key: string) {},
  };
}

export const persist: IArgs = (name, store, options = {}) => {
  let { storage, jsonify = true, whitelist, blacklist } = options;
  let hydrated = false;

  // use AsyncLocalStorage by default (or if localStorage was passed in)
  if (!storage) {
    storage = new webSQLStorage({
      name: 'appDb',
      version: '1.0',
      size: 1,
      storeName: 'app_state',
    });
  }

  const whitelistDict = arrToDict(whitelist);
  const blacklistDict = arrToDict(blacklist);

  onSnapshot(store, (_snapshot: StrToAnyMap) => {
    // if (!hydrated) {
    //   return;
    // }
    // need to shallow clone as otherwise properties are non-configurable (https://github.com/agilgur5/mst-persist/pull/21#discussion_r348105595)
    const snapshot = { ..._snapshot };
    Object.keys(snapshot).forEach(key => {
      if (whitelist && !whitelistDict[key]) {
        delete snapshot[key];
      }
      if (blacklist && blacklistDict[key]) {
        delete snapshot[key];
      }
    });

    const data = !jsonify ? snapshot : JSON.stringify(snapshot);
    storage.setItem(name, data);
  });

  return storage.getItem(name).then((data: object | string) => {
    const snapshot = !isString(data) ? data : JSON.parse(data);
    // don't apply falsy (which will error), leave store in initial state
    if (!snapshot || !getType(store).is(snapshot)) {
      return () => storage.clear();
    }
    applySnapshot(store, snapshot);
    return () => storage.clear();
  });
};

type StrToBoolMap = { [key: string]: boolean };

function arrToDict(arr?: Array<string>): StrToBoolMap {
  if (!arr) {
    return {};
  }
  return arr.reduce((dict: StrToBoolMap, elem) => {
    dict[elem] = true;
    return dict;
  }, {});
}

export default persist;
