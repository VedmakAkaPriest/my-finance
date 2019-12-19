import React from 'react';
import OutcomeStore from './Outcome';

export const storesContext = React.createContext({
  outcomeStore: OutcomeStore,
});

export const useStores = () => React.useContext(storesContext);
