import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import moment from 'moment';
import 'moment/locale/ru';
import Dinero from 'dinero.js';

const currentLocale = 'ru' || Localization.locale;

// Locales
const ru = {
  tabs: {
    balance: 'план',
    income: 'доходы',
    outcome: 'расходы',
  },
  forms: {
    addOutcome: {
      category: {
        title: 'Добавить группу?',
        name: 'Название',
        icon: 'Иконка',
      },
    },
  },
  dialogs: {
    ok: 'ОК',
  },
};

// Currency, dates & i18n
moment.locale(currentLocale);
i18n.fallbacks = true;
i18n.translations = { ru };
i18n.locale = currentLocale;
Dinero.defaultCurrency = 'UAH';
Dinero.defaultPrecision = 2;
Dinero.globalLocale = 'ru';
Dinero.globalFormat = '$0,0.00';

export default ru;
