import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { pack as d3Pack, hierarchy as d3Hierarchy, packEnclose } from 'd3-hierarchy';

import { FONT_FAMILY } from 'store/Graph';

import s from './BubbleGraph.scss';

const WIDTH = 1000;
const HEIGHT = 1200;

export default class BubbleGraph extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    meta: PropTypes.array,
  }

  render() {
    const { meta: [meta] } = this.props;
    let { data: [data] } = this.props;

    // fix so all graphs have same input
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return null;
      }

      data = { children: data };
    }

    const BULLET_RADIUS = 15;
    const ITEM_SPACING = 60;
    const total = (ITEM_SPACING * data.children.length) + 30;

    const root = d3Hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value)
      .each((d) => {
        // Only target leaves
        if (!d.children) {
          d.color = d.data.color;
        }
      });

    const pack = d3Pack()
      .padding(-20)
      .size([WIDTH, HEIGHT - total])(root);

    const circleData = pack.leaves();
    const enclosingCircle = packEnclose(circleData);
    const scale = pack.r / enclosingCircle.r;
    const offset = enclosingCircle.r - pack.r - 2;

    return (
      <svg
        ref={(el) => { this.element = el; }}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className={s.bubbleGraph}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={WIDTH}
        height={HEIGHT}
      >
        <g transform={`translate(${offset}, ${offset}) scale(${scale})`}>
          {circleData.map(({ x, y, r, color, value }) => (
            <g key={x + y + r} transform={`translate(${x},${y})`}>
              <circle
                r={r}
                style={{ fill: color, mixBlendMode: 'multiply' }}
              />
              <text
                transform="translate(0, 20)"
                textAnchor="middle"
                style={{ fill: '#fff', fontSize: 50, fontFamily: FONT_FAMILY }}
              >{meta.prefix + value + meta.postfix}</text>
            </g>
          ))}
        </g>

        <g transform={`translate(0, ${HEIGHT})`}>
          {circleData.map(({ color, data: { label } }, i) => (
            <g
              key={i}
              transform={`translate(0,${i * -ITEM_SPACING})`}
            >
              <circle
                transform={`translate(${BULLET_RADIUS}, ${-BULLET_RADIUS})`}
                r={BULLET_RADIUS}
                style={{ fill: color }}
              />
              <g
                transform={`translate(${(BULLET_RADIUS * 2) + 20}, ${-BULLET_RADIUS + 15})`}
              >
                <text
                  style={{ fontSize: 40, fontFamily: FONT_FAMILY }}
                >
                  {label}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    );
  }
}
