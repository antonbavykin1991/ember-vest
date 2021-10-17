import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Validator, test, only } from 'ember-vest';
import { task, timeout } from 'ember-concurrency';

@Validator('AsyncExample', function (data, changedField) {
  only(changedField);

  test('firstName', () => {
    return data.validateFirstName.perform(data.firstName);
  });

  test('lastName', () => {
    return data.validateLastName.perform(data.lastName);
  });
})
export default class AsyncExampleComponent extends Component {
  @tracked firstName;
  @tracked lastName;

  @task({ restartable: true })
  *validateFirstName(value = '') {
    yield timeout(300);

    if (value.length < 2) {
      return Promise.reject('First Name should be longer or equals 2');
    }
    return Promise.resolve();
  }

  @task({ restartable: true })
  *validateLastName(value = '') {
    yield timeout(300);

    if (value.length < 2) {
      return Promise.reject('Last Name should be longer or equals 2');
    }
    return Promise.resolve();
  }

  @action async submit(e) {
    e.preventDefault();
    await this.validator.validate();

    if (this.validator.isValid) {
      alert('success');
    }
  }
}
