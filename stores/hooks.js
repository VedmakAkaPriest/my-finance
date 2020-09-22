import React from 'react';
import OutcomeStore from './Outcome';
import IncomeStore from './Income';

export const storesContext = React.createContext({
  outcomeStore: OutcomeStore,
  incomeStore: IncomeStore,
});

export const useStores = () => React.useContext(storesContext);
