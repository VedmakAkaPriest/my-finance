import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import moment from 'moment';
import 'moment/locale/ru';

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

const currentLocale = 'ru' || Localization.locale;
moment.locale(currentLocale);
i18n.fallbacks = true;
i18n.translations = { ru };
i18n.locale = currentLocale;

export default ru;
