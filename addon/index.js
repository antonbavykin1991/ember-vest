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

export function Validator(name, fn) {
  const validate = create(name, fn);

  return function (target) {
    return class VestValidatorClass extends target {
      @tracked _validator = validate.get();

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

export { VERSION, create, enforce, group, only, optional, skip, test, warn };
