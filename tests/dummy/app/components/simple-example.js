import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Validator, test, enforce, only } from 'ember-vest';

@Validator('SimpleExample', function (data, changedField) {
  only(changedField);

  test(
    'firstName',
    'First Name should be longer or equals 2 and shorter than 10',
    () => {
      enforce(data.firstName).longerThanOrEquals(2).shorterThan(10);
    }
  );

  test(
    'lastName',
    'Last Name should be longer or equals 2 and shorter than 10',
    () => {
      enforce(data.lastName).longerThanOrEquals(2).shorterThan(10);
    }
  );
})
export default class SimpleExampleComponent extends Component {
  @tracked firstName;
  @tracked lastName;

  @action async submit(e) {
    e.preventDefault();
    await this.validator.validate();

    if (this.validator.isValid) {
      alert('success');
    }
  }
}
