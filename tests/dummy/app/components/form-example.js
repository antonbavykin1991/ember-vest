import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Validator, test, enforce, only } from 'ember-vest';

@Validator('FormExample', function (data, changedField) {
  only(changedField);

  test('firstName', 'Must be between 2 and 10 chars', () => {
    enforce(data.firstName).longerThanOrEquals(2).shorterThan(10);
  });

  test('lastName', 'Must be between 2 and 10 chars', () => {
    enforce(data.lastName).longerThanOrEquals(2).shorterThan(10);
  });
})
export default class ExampleComponent extends Component {
  @tracked firstName;
  @tracked lastName;

  @action
  submit(e) {
    e.preventDefault();
    this.validate();
  }
}
