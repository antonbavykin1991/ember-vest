import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class Substring extends Helper {
  @service intl;
  compute([key]) {
    return this.intl.t(key);
  }
}
