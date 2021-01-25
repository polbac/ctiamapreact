import Network from './Network';
import UIStore from './UIStore';
import Wordpress from './Wordpress';
import StateMap from './StateMap';
import Graphs from './Graphs';

export default class Store {

  constructor(state = {}) {
    this.network = new Network(state);
    this.ui = new UIStore();
    this.wordpress = new Wordpress(state, this.network);
    this.stateMap = new StateMap(this.network);
    this.graphs = new Graphs(state);
  }
}
