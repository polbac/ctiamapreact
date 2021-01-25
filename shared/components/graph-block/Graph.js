import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { saveSvgAsPng } from 'save-svg-as-png';

import Graph from 'store/Graph';

import BubbleGraph from 'components/graph-bubble';
import HillGraph from 'components/graph-hill';
import DonutGraph from 'components/graph-donut';
import DonutGraphFixed from 'components/graph-donut-fixed';
import BarGraph from 'components/graph-bar';
import NumberGraph from 'components/graph-number';
import LinesGraph from 'components/graph-lines';

import s from './Graph.scss';

export default class GraphComponent extends PureComponent {

  static propTypes = {
    definition: PropTypes.string.isRequired,
  }

  state = {
    invalid: false,
    data: [],
  };

  componentDidMount() {
    const { definition } = this.props;

    this.parse(definition);
  }

  componentWillReceiveProps(props) {
    this.parse(props.definition);
  }

  parse(definition) {
    let parsed = null;

    try {
      parsed = Graph.parseDefinition(definition);
    } catch (error) {
      this.setState({ invalid: true });

      console.warn('Unable to parse graph definition');
    }

    if (!parsed || !parsed.type || !parsed.data) {
      this.setState({ invalid: true });

      console.warn('Missing graph definintion');

      return;
    }

    this.setState({
      type: parsed.type,
      data: parsed.data,
      meta: parsed.meta || {},
    });
  }

  graphType(type) {
    if (!type) return null;

    switch (type.toLowerCase()) {
      case 'hill':
      case 'hills':
        return HillGraph;

      case 'bubble':
      case 'bubbles':
      case 'dot':
      case 'dots':
        return BubbleGraph;

      case 'donut':
      case 'circle':
        return DonutGraph;

      case 'fixed-donut':
      case 'circle with data':
        return DonutGraphFixed;

      case 'bar':
      case 'bars':
        return BarGraph;

      case 'number':
        return NumberGraph;

      case 'lines':
        return LinesGraph;

      default:
        return null;
    }
  }

  saveAsSvg() {
    const svgElement = this.graph.element;
    const data = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>${svgElement.outerHTML}`;
    const blob = new Blob([data], { type: 'image/svg+xml' });
    const anchor = document.createElement('a');
    const url = window.URL.createObjectURL(blob);

    anchor.href = url;
    anchor.download = 'graph.svg';
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  saveAsPng() {
    const svgNode = findDOMNode(this.graph); // eslint-disable-line react/no-find-dom-node

    saveSvgAsPng(svgNode, 'graph.png', { });
  }

  render() {
    const { invalid, data, meta, type } = this.state;
    const GraphType = this.graphType(type);

    if (!GraphType) {
      return <div>{type} is unknown</div>;
    }

    if (invalid) {
      return <div>Graph is invalid</div>;
    }

    return (
      <div className={s.graph}>
        <GraphType data={data} meta={meta} ref={(r) => { this.graph = r; }} />
      </div>
    );
  }
}
