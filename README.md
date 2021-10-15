ember-vest
==============================================================================

Decorator for https://vestjs.dev


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-vest
```


Usage
------------------------------------------------------------------------------

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Validator, test, enforce, only } from 'ember-vest';

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
  @tracked firstName;
  @tracked lastName;

  @action
  submit(e) {
    e.preventDefault();
    this.validator.validate();
  }
}
```

```hbs
<div class="">
  <form class="form-example" {{on "submit" this.submit}}>
    <h1>Form Example...</h1>
    <label for="">
      <input
        type="text"
        name=""
        value={{this.firstName}}
        {{on "input" (pick "target.value" (fn (mut this.firstName)))}}
        {{on "input" (fn this.validator.validate "firstName")}}
        {{on "blur" (fn this.validator.validate "firstName")}}
      >
      {{#each this.validator.errors.firstName as |error|}}
        <span class="error">{{t error.message}}</span>
      {{/each}}
    </label>

    <label for="">
      <input
        type="text"
        name=""
        value={{this.lastName}}
        {{on "input" (pick "target.value" (fn (mut this.lastName)))}}
        {{on "input" (fn this.validator.validate "lastName")}}
        {{on "blur" (fn this.validator.validate "lastName")}}
      >
      {{#each this.validator.errors.lastName as |error|}}
        <span class="error">{{t error.message}}</span>
      {{/each}}
    </label>

    <button type="submit" name="button">Save</button>
  </form>
</div>

```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
