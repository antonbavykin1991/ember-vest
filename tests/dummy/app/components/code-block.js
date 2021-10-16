import Component from '@glimmer/component';
import hljs from 'highlight.js';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CodeBlockComponent extends Component {
  @tracked activeTab = this.args.tabs[0];

  @action
  highlight(code) {
    return htmlSafe(hljs.highlightAuto(code).value);
  }

  @action
  updateTab(tab) {
    this.activeTab = tab;
  }

  @action
  isEqual(a, b) {
    return a === b;
  }
}
