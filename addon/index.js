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

class ValidatorClass {
  @tracked instance;

  constructor(owner, validate) {
    this.instance = validate.get();

    this.validate = async (...args) => {
      return new Promise((resolve) => {
        const instance = validate(owner, ...args);

        if (instance.done) {
          instance.done((i) => {
            this.instance = i;
            resolve(i);
          });

          return;
        }

        this.instance = instance;
        resolve(instance);
      });
    };

    this.reset = (...args) => {
      validate.reset(...args);
      this.instance = validate.get();
    };
  }

  get errorCount() {
    return !!this.instance.errorCount;
  }

  get isValid() {
    return !this.instance.errorCount;
  }

  get errors() {
    return this.instance.getErrors();
  }

  get warnings() {
    return this.instance.getWarnings();
  }
}

export function Validator(name, fn) {
  const validate = create(name, fn);

  return function (target) {
    return class VestValidatorClass extends target {
      @tracked
      validator = new ValidatorClass(this, validate);

      willDestroy() {
        super.willDestroy(...arguments);
        this.validator.reset();
      }
    };
  };
}

export default vest;

export { VERSION, create, enforce, group, only, optional, skip, test, warn };
