import { toJS, action, computed, observable } from 'mobx';
import _isArray from 'lodash/isArray';
import _flatten from 'lodash/flatten';

// export const DEFAULT_COLORS = ['#78cdd1', '#593c81', '#d1e42d', '#971f3f', '#cccccc'];
export const DEFAULT_COLORS = ['#5cb9bb', '#592b8a', '#c5d800', '#a60039', '#cccdcf', '#ff6a42'];
export const FONT_FAMILY = 'Source Sans Pro, Helvetica, Arial, sans-serif';

export default class {

  // Fixes compatibility issues
  static parseDefinition(str) {
    const parsed = JSON.parse(str);

    if (!_isArray(parsed.meta)) {
      parsed.data = [parsed.data];
      parsed.meta = [parsed.meta || {}];
    }

    return parsed;
  }

  constructor(id, type, data, meta = undefined) {
    this.id = id;
    this.type = type;

    if (data) {
      this.data = _isArray(data[0]) ? data : [data];
      this.nextId = Math.max(..._flatten(toJS(this.data)).map(x => x.value));
    } else {
      this.createInitialData();
    }

    if (meta) {
      this.meta = _isArray(meta) ? meta : [meta];
    } else {
      this.meta = [this.createInitialMeta()];
    }
  }

  @observable
  nextId = 0

  @observable
  type = undefined;

  @observable
  data = [[]]

  @observable
  meta = []

  @computed
  get output() {
    return {
      type: this.type.toLowerCase(),
      data: toJS(this.data),
      meta: toJS(this.meta),
    };
  }

  get config() {
    const hasRows = this.type !== 'number';
    const hasRowsColor = this.type !== 'lines';
    const hasMultipleSets = this.type === 'lines';

    return {
      hasRows,
      hasRowsColor,
      hasMultipleSets,
    };
  }

  @computed
  get json() {
    return JSON.stringify(this.output);
  }

  @action
  createInitialData() {
    let count = 3;
    let defaultText = 'Item #';

    if (this.type === 'number') {
      return;
    }

    if (this.type === 'bars') {
      count = 10;
    }

    if (this.type === 'lines') {
      count = 9;
      defaultText = '201';
    }

    if (this.type === 'fixed-donut') {
      count = 2;
      defaultText='Item # ';
    }

    (new Array(count))
      .fill(null)
      .forEach(() => this.addRow(undefined, { defaultText }));
  }

  createInitialMeta() {
    const defaults = {
      prefix: '',
      postfix: '',
    };

    if (this.type === 'bars') {
      return {
        ...defaults,
        title: '+300%',
        subline: 'Over 11 years',
        legendStart: '2006',
        legendEnd: '2017',
      };
    }

    if (this.type === 'number') {
      return {
        value: '25',
        label: 'Some text',
        color1: DEFAULT_COLORS[0],
        color2: DEFAULT_COLORS[1],
      };
    }

    if (this.type === 'lines') {
      return {
        label: 'My Line',
        prefix: '+',
        postfix: '%',
        color: DEFAULT_COLORS[0],
      };
    }
    return defaults;
  }

  @action
  addRow(dataSet = this.data[0], { defaultText = 'Item #' } = {}) {
    const id = this.nextId + 1;
    let color = DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];

    this.nextId = id;

    if (this.type === 'bars') {
      [color] = DEFAULT_COLORS;
    }

    const label = this.type === ('donut' || 'fixed-donut') ? { showLabel: true } : undefined;

    if (this.type === 'fixed-donut') {
      dataSet.push({
        id,
        label: `${defaultText}${dataSet.length}`,
        value: null,
        color,
        ...label,
      });
    } else {
      dataSet.push({
        id,
        label: `${defaultText}${dataSet.length}`,
        value: Math.floor(Math.min(Math.random() * 50), 20) + 1,
        color,
        ...label,
      });
    }
  }

  @action
  updateRow(id, field, value, set = 0) {
    const dataSet = this.data[set];
    const item = dataSet.find(x => x.id === id);

    item[field] = value;
  }

  @action
  removeRow(id, set = 0) {
    const dataSet = this.data[set];
    const item = dataSet.find(x => x.id === id);
    const index = dataSet.indexOf(item);

    dataSet.splice(index, 1);
  }

  @action
  addSet() {
    this.data.push([]);
    this.meta.push(this.createInitialMeta());

    return this.data.length - 1;
  }

  @action
  removeSet(setIndex) {
    this.data.splice(setIndex, 1);
    this.meta.splice(setIndex, 1);
  }

  getDataset(setIndex) {
    return {
      data: this.data[setIndex],
      meta: this.meta[setIndex],
    };
  }
}
