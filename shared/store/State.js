import { extendObservable, action } from 'mobx';

import states from '../../states.json';

export default class State {

  constructor(abbreviation, fetch) {
    this.fetch = fetch;
    this.abbreviation = abbreviation;

    this.init();
  }

  abbreviation = '';

  image = null;

  @action
  init() {
    const found = states.find(state => state.abbreviation === this.abbreviation);

    extendObservable(this, found);
  }

}
