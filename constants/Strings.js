import moment from "moment";
import 'moment/locale/ru';
moment.locale('ru');

/* TODO:
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
const en = {
  foo: 'Foo',
  bar: 'Bar {{someValue}}',
};
const fr = {
  foo: 'como telle fous',
  bar: 'chatouiller {{someValue}}',
};

i18n.fallbacks = true;
i18n.translations = { fr, en };
i18n.locale = Localization.locale;
*/

export default {
  tabs: {
    balance: 'план',
    income: 'доходы',
    outcome: 'расходы',
  },
};
