import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Validator, test, enforce, only, group } from 'ember-vest';

@Validator('FormExample', function (data, changedField) {
  only(changedField);
  only.group(data.type);

  test('email', "Can't be empty", () => {
    enforce(data.email).isNotEmpty();
  });

  test('password', "Can't be empty", () => {
    enforce(data.password).isNotEmpty();
  });

  group('sign_up', () => {
    if (data.password) {
      test('confirmPassword', 'Passwords do not match', () => {
        enforce(data.password).equals(data.confirmPassword);
      });
    }
  });
})
export default class SimpleExampleComponent extends Component {
  @tracked type = 'sign_in';
  @tracked email;
  @tracked password;
  @tracked confirmPassword;

  @action submit(e) {
    e.preventDefault();
    this.validator.validate();
  }

  @action isEqual(a, b) {
    return a === b;
  }

  @action updateType(type, e) {
    e.preventDefault();
    this.type = type;

    if (this.validator.instance.testCount) {
      this.validator.validate();
    }
  }
}
