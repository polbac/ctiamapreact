import { autorun, extendObservable, action, observable } from 'mobx';

import Graph from './Graph';

export default class {

  constructor({ graphs = {} }) {
    extendObservable(this, graphs);

    try {
      if (typeof window !== 'undefined') {
        const str = localStorage.getItem('graphs');
        const arr = JSON.parse(str);

        this.graphs = arr.map(x => new Graph(this.nextId++, x.type, x.data, x.meta)); // eslint-disable-line
      }
    } catch (e) {} // eslint-disable-line

    autorun(() => {
      const data = this.graphs.map(graph => graph.output);

      if (typeof window !== 'undefined') {
        localStorage.setItem('graphs', JSON.stringify(data));
      }
    });
  }

  nextId = 0

  types = [
    { id: 'hills', label: 'Hills' },
    { id: 'bubbles', label: 'Bubbles' },
    { id: 'bars', label: 'Bars' },
    { id: 'donut', label: 'Circle' },
    { id: 'fixed-donut', label: 'Bullseye' },
    { id: 'number', label: 'Number' },
    { id: 'lines', label: 'Lines' },
  ]

  @observable
  graphs = [];

  @action
  createGraph(type, data, meta) {
    const id = this.nextId++; // eslint-disable-line
    const graph = new Graph(id, type, data, meta);

    this.graphs = [graph, ...this.graphs];

    return graph;
  }

  @action
  removeGraph(graph) {
    const index = this.graphs.indexOf(graph);

    this.graphs.splice(index, 1);
  }

  @action
  createGraphByString(str) {
    try {
      const { type, data, meta } = JSON.parse(str);

      if (!type) {
        throw new Error('Missing type');
      }

      this.createGraph(type, data, meta);
    } catch (err) {
      console.warn('Failed', err);
    }
  }
}
