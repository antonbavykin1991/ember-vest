import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
const data = {
  en: {
    firstName: 'Must be between 2 and 10 chars',
    lastName: 'Must be between 2 and 10 chars',
  },
  fr: {
    firstName: 'Must be between 2 and 10 chars FR',
    lastName: 'Must be between 2 and 10 chars FR',
  },
};

export default class Intl extends Service {
  @tracked locale = 'en';

  @action
  t(key) {
    return data[this.locale][key];
  }

  @action
  setLocale(locale) {
    this.locale = locale;
  }
}
