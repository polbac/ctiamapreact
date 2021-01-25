import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { TweenLite } from 'gsap';

import { FONT_FAMILY } from 'store/Graph';

import s from './BarGraph.scss';

export default class BarGraph extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    meta: PropTypes.array,
  }

  show(i) {
    this.current = i;

    TweenLite.to(
      this.element.querySelector(`.bar-${i}-tooltip`),
      0.5,
      { opacity: 1, y: -5 },
    );

    TweenLite.to(
      this.element.querySelector(`.bar-${i}-bar`),
      0.5,
      { fill: '#d1e42d' },
    );
  }

  hide(i) {
    const { data: [data] } = this.props;

    TweenLite.to(
      this.element.querySelector(`.bar-${i}-tooltip`),
      0.2,
      { opacity: 0, y: 5 },
    );

    TweenLite.to(
      this.element.querySelector(`.bar-${i}-bar`),
      0.5,
      { fill: data[i].color },
    );
  }

  onMouseEnter = (i) => {
    this.show(i);
  }

  onMouseLeave = (i) => {
    this.hide(i);
  }

  onClick = (i) => {
    if (this.current) {
      this.hide(this.current);
    }

    this.show(i);
  }

  render() {
    const { data: [data], meta: [meta] } = this.props;

    const width = 800;
    const height = 1100;

    const barWidth = 50;
    const dotRadius = 5;

    const toolTipWidth = 160;
    const toolTipHeight = 50;

    const padding = 100;
    const paddingTop = (meta.title ? 100 : 0) + toolTipHeight + 10;
    const paddingBottom = (meta.legendStart || meta.legendEnd) ? 100 : 0;

    const maxDatasetLength = data.length;
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const x = scaleLinear().domain([0, maxDatasetLength])
      .range([0, width - padding]);
    const y = scaleLinear().domain([minValue, maxValue])
      .range([100, height - paddingTop - paddingBottom]);

    const columnWidth = x(1);

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={(el) => { this.element = el; }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className={s.barGraph}
        width={width}
        height={height}
      >
        <g transform={`translate(${width - (padding / 2)}, 0)`}>
          <text
            textAnchor="end"
            style={{ fontSize: 60, fontWeight: 700, fontFamily: FONT_FAMILY }}
            transform="translate(0, 45)"
          >{meta.title}</text>
          <text
            textAnchor="end"
            style={{ fontSize: 30, fill: '#8f8f8f', fontFamily: FONT_FAMILY }}
            transform="translate(0, 80)"
          >{meta.subline}</text>
        </g>

        <g transform={`translate(${padding / 2}, 0)`}>
          {data.map((d, i) => (
            <g
              key={i}
              className={`bar-${i}`}
              transform={`translate(${x(i) + ((columnWidth / 2) - (barWidth / 2))}, ${((height - paddingBottom) - y(d.value))})`}
              onMouseEnter={() => this.onMouseEnter(i)}
              onMouseLeave={() => this.onMouseLeave(i)}
              onClick={() => this.onClick(i)}
            >
              <rect
                className={`bar-${i}-bar`}
                x={0}
                y={0}
                width={barWidth}
                height={y(d.value)}
                rx={barWidth / 2}
                ry={barWidth / 2}
                fill={d.color}
              />

              <circle
                cx={(barWidth / 2)}
                cy={y(d.value) + ((paddingBottom / 2) - 15)}
                r={dotRadius}
                style={{ fill: '#888888' }}
              />

              {(i === 0 || i === data.length - 1) && (
                <text
                  textAnchor={i === 0 ? 'start' : 'end'}
                  transform={`translate(${(barWidth / 2) + (i === 0 ? -barWidth / 2 : barWidth / 2)}, ${y(d.value) + (paddingBottom - 10)})`}
                  style={{ fontSize: 35, fontWeight: 700, fontFamily: FONT_FAMILY }}
                >
                  {i === 0 ? meta.legendStart : meta.legendEnd}
                </text>
              )}
            </g>
          ))}

          {data.map((d, i) => (
            <g
              key={i}
              transform={`translate(${x(i) + ((columnWidth / 2) - (barWidth / 2))}, ${(((height - paddingBottom) - y(d.value))) - toolTipHeight - 5})`}
            >
              <g
                transform="translate(0, 5)"
                style={{ opacity: 0 }}
                className={`bar-${i}-tooltip`}
              >
                <rect
                  transform={`translate(${(barWidth / 2) - (toolTipWidth / 2)}, 0)`}
                  width={toolTipWidth}
                  height={toolTipHeight}
                  style={{ strokeWidth: 2, stroke: '#d1e42d', fill: '#fff' }}
                  rx={toolTipHeight / 2}
                  ry={toolTipHeight / 2}
                />

                <text
                  textAnchor="middle"
                  transform={`translate(${barWidth / 2}, ${(toolTipHeight / 2) + 10})`}
                  style={{ fontSize: 30, fontWeight: 700, fontFamily: FONT_FAMILY }}
                >
                  {`${meta.prefix || ''}${d.value}${meta.postfix || ''}`}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    );
  }
}
