import vest from 'vest';

import {
  VERSION,
  create,
  enforce,
  group,
  only,
  optional,
  skip,
  test,
  warn,
} from 'vest';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';

const updatedOnly = (changedField) => {
  if (!changedField) {
    only(changedField);
    return;
  }

  let fields = Array.isArray(changedField) ? changedField : [changedField];

  fields.forEach((field) => {
    only(field);
  });
};

class LocaleSupport extends EmberObject.extend(Evented) {
  @tracked locale;

  @action
  setLocale(locale) {
    this.locale = locale;
  }

  @action
  updateLocale(locale) {
    if (this.locale === locale) {
      return;
    }

    this.locale = locale;
    this.trigger('localeUpdated', locale);
  }
}

export const localeSupport = LocaleSupport.create();

export function Validator(name, fn) {
  const validate = create(name, fn);

  return function (target) {
    return class VestValidatorClass extends target {
      @tracked _validator = validate.get();

      constructor() {
        super(...arguments);

        localeSupport.on('localeUpdated', () => {
          if (this._validator.testCount) {
            const errors = Object.keys(this.validator.getErrors());
            this.validate(errors);
          }
        });
      }

      get validator() {
        return this._validator;
      }

      get isInvalid() {
        return !!this.validator.errorCount;
      }

      get errors() {
        return this.validator.getErrors();
      }

      @action
      validate(...args) {
        this._validator = validate(this, ...args);
      }
    };
  };
}

export default vest;

export {
  VERSION,
  create,
  enforce,
  group,
  updatedOnly as only,
  optional,
  skip,
  test,
  warn,
};
