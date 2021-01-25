import { extendObservable, action } from 'mobx';

import allStates from '../../states.json';

import State from './State';

export default class StateMap {

  constructor(network) {
    this.fetch = network.fetch;

    extendObservable(this);
  }

  states = new Map();

  @action
  getState(abbreviation) {
    if (!abbreviation) {
      return {};
    }

    if (this.states.has(abbreviation)) {
      return this.states.get(abbreviation);
    }

    const state = new State(abbreviation, this.fetch, this.ui);

    this.states.set(abbreviation, state);

    return state;
  }

  getAllStates = () => allStates;
}
