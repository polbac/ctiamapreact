import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { arc as d3Arc, pie } from 'd3-shape';

import { FONT_FAMILY } from 'store/Graph';

import s from './DonutGraphFixed.scss';

const WIDTH = 1000;
const HEIGHT = 1200;

export default class DonutGraphFixed extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    meta: PropTypes.array,
  }

  render() {
    const { data: [data], meta: [meta] } = this.props;
    const values = data.map(x => x.value);

    const BULLET_RADIUS = 15;
    const ITEM_SPACING = 60;
    const CHAR_SPACING = 52;
    const total = (ITEM_SPACING * data.length) + 30;

    const minWidth = Math.min(WIDTH, HEIGHT - total);
    const r = minWidth / 2;
    const x = WIDTH / 2;

    const arcs = pie()(values)
      .map(({ startAngle, endAngle }, i) => ({
        a: d3Arc()
          .cornerRadius(minWidth * 0.075)
          .innerRadius(minWidth * 0.35)
          .outerRadius(r)
          .startAngle(startAngle)
          .endAngle(endAngle + (Math.PI * 0.11)),
        color: data[i].color,
        label: data[i].label,
        showLabel: data[i].showLabel,
        value: data[i].value,
      }));

    return (
      <svg
        ref={(el) => { this.element = el; }}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className={s.donutGraphFixed}
        width={WIDTH}
        height={HEIGHT}
      >
        <g transform={`translate(${x}, ${r})`}>
          {arcs.map(({ a, color }, i) => (
            <path
              key={i}
              d={a()}
              style={{ fill: color, mixBlendMode: 'multiply' }}
            />
          ))}
        </g>

        <g transform={`translate(0 , ${(HEIGHT / 2) - 56})`}>
          {arcs.map(({ color, label, value, showLabel }, i) => {
            if (i === 0 && value) {
            return (
              <g transform={`translate(${500 - (CHAR_SPACING * (meta.prefix.length + value.length + meta.postfix.length) )},0)`}>
                <text style={{ fontSize: 196, fontFamily: FONT_FAMILY, fill: data[i].color }}>
                  <tspan style={{ fontWeight: 700 }}>{`${meta.prefix || ''}${value}${meta.postfix || ''}`}</tspan>
                </text>
              </g>
            );
            }

            return null;

          })}
        </g>

        <g transform={`translate(0, ${HEIGHT})`}>
          {arcs.map(({ color, label, value, showLabel }, i) => {
            if (!label) {
              return null;
            }

            return (
              <g
                key={i}
                transform={`translate(0,${i * -ITEM_SPACING})`}
              >
                <circle
                  transform={`translate(${BULLET_RADIUS}, ${-BULLET_RADIUS})`}
                  r={BULLET_RADIUS}
                  style={{ fill: color }}
                />

                <g transform={`translate(${(BULLET_RADIUS * 2) + 20}, ${-BULLET_RADIUS + 15})`}>
                  <text style={{ fontSize: 40, fontFamily: FONT_FAMILY }}>
                    <tspan style={{ fontWeight: 700 }}>{`${meta.prefix || ''}${value}${meta.postfix || ''}`}</tspan>
                    <tspan style={{ fill: '#999 ' }}> | </tspan>
                    <tspan style={{ fill: '#777 ' }}>{label}</tspan>
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    );
  }
}
