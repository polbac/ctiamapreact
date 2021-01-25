import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';
import { scaleLinear } from 'd3-scale';

import { FONT_FAMILY } from 'store/Graph';

import s from './HillGraph.scss';

const [w, h] = [1000, 500];
const collisionOffset = 1.5;

export default class HillGraph extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    meta: PropTypes.array,
  }

  render() {
    const { data: [data], meta: [meta] } = this.props;

    const height = 500;
    const topHeight = 100;

    const l = data.length;
    const values = data.map(x => x.value);
    const max = Math.max(...values);

    const y = scaleLinear().domain([0, max]).range([height - topHeight, 0]);

    const width = (w / l);
    // Hill width needs to be a little wider to make up for the collision
    const hillWidth = width * (collisionOffset);
    // Chart needs to be a little wider also (just add the difference between widths)
    const chartWidth = w + (hillWidth - width) || 0;
    // Hill center
    const c = hillWidth / 2;

    // Used for calculating the control points
    // The values in the range functions can be tweaked to change the
    // mapping of the control point values.
    const cp1s = scaleLinear().domain([0, max]).range([10, c * 0.7]);
    const cp2s = scaleLinear().domain([0, max]).range([7, c]);

    const paths = data.map((item, i) => {
      const d = item.value;
      const path = d3Path();

      // This controls the positioning of the control points
      // This may need some refinements, some scenarios look weird
      const cp1 = cp1s(d);
      const cp2 = cp2s(d);

      path.moveTo(0, y(0));
      path.bezierCurveTo(cp1, y(0), c - cp2, y(d), c, y(d));
      path.bezierCurveTo(c + cp2, y(d), hillWidth - cp1, y(0), hillWidth, y(0));

      // Use the original width for the positioning
      // That way the next hill will overlap the previous one
      path.posX = width * i;

      path.x = hillWidth / 2;
      path.y = y(d) - 20;

      path.color = item.color;
      path.label = item.label;
      path.value = item.value;

      path.key = `${d}-${path.posX}`;

      return path;
    });

    return (
      <svg
        ref={(el) => { this.element = el; }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${chartWidth} ${h}`}
        className={s.hills}
        width={chartWidth}
        height={h}
      >
        {paths.map((d, i) => (
          <g
            key={i}
            transform={`translate(${d.posX}, ${topHeight})`}
          >
            <path
              key={d.key}
              className={s.column}
              fill={d.color}
              d={d.toString()}
            />

            <g transform={`translate(${d.x}, ${d.y - 10})`}>
              <text
                textAnchor="middle"
                transform="translate(0, -45)"
                style={{ fontSize: 25, fill: '#999', fontFamily: FONT_FAMILY }}
              >{d.label}</text>
              <text
                textAnchor="middle"
                style={{ fontSize: 40, fontWeight: 700, fontFamily: FONT_FAMILY }}
              >{`${meta.prefix || ''}${d.value}${meta.postfix || ''}`}</text>
            </g>
          </g>
        ))}
      </svg>
    );
  }
}
