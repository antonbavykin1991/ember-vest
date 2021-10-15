import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Validator, test, enforce, only } from 'ember-vest';
import { inject as service } from '@ember/service';

@Validator('FormExample', function (data, changedField) {
  only(changedField);

  test('firstName', { message: 'firstName', options: {} }, () => {
    enforce(data.firstName).longerThanOrEquals(2).shorterThan(10);
  });

  test('lastName', { message: 'lastName', options: {} }, () => {
    enforce(data.lastName).longerThanOrEquals(2).shorterThan(10);
  });
})
export default class ExampleComponent extends Component {
  @service intl;

  @tracked firstName;
  @tracked lastName;

  @action
  submit(e) {
    e.preventDefault();
    this.validator.validate();
  }

  @action
  updateLocale(locale) {
    this.intl.setLocale(locale);
  }
}
