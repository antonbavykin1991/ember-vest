import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Validator, test, enforce, only } from 'ember-vest';
import { inject as service } from '@ember/service';

@Validator('FormExample', function (data, changedField) {
  only(changedField);

  test('firstName', data.intl.t('firstName'), () => {
    enforce(data.firstName).longerThanOrEquals(2).shorterThan(10);
  });

  test('lastName', data.intl.t('lastName'), () => {
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
    this.validate();
  }

  @action
  updateLocale(locale) {
    this.intl.setLocale(locale);
  }
}
