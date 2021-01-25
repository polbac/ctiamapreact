import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { line as d3Line, curveCatmullRom } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import _flatten from 'lodash/flatten';
import { TweenLite } from 'gsap';

import { FONT_FAMILY } from 'store/Graph';

import s from './GraphLines.scss';

export default class GraphLines extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
    meta: PropTypes.array,
  }

  createLine(scaleX, scaleY, set) {
    const line = d3Line()
      .x((item, index) => scaleX(index))
      .y(item => scaleY(item.value))
      .curve(curveCatmullRom.alpha(0.5));

    return line(set);
  }

  show(target) {
    this.current = target;

    TweenLite.to(
      target,
      0.25,
      { opacity: 1, y: -60 },
    );
  }

  hide(target) {
    TweenLite.to(
      target,
      0.25,
      { opacity: 0, y: -70 },
    );
  }

  onMouseEnter = (e) => {
    this.show(e.currentTarget.querySelector('.tooltip'));
  }

  onMouseLeave = (e) => {
    this.hide(e.currentTarget.querySelector('.tooltip'));
  }

  onClick = (e) => {
    if (this.current) {
      this.hide(this.current);
    }

    this.show(e.currentTarget.querySelector('.tooltip'));
  }

  render() {
    const { data, meta } = this.props;

    const width = 1000;
    const height = 600;
    const padding = 120;
    const footerHeight = 50;
    const headerItemHeight = 40;
    const headerHeight = (meta.length + 1) * headerItemHeight;

    const values = _flatten(data).map(x => x.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const maxDatasetLength = Math.max(...data.map(set => set.length));

    const scaleX = scaleLinear().domain([0, maxDatasetLength - 1])
      .range([0, width - padding]);
    const scaleY = scaleLinear().domain([minValue, maxValue])
      .range([height - padding - footerHeight - headerHeight, 0]);

    const expandedSets = data.map(
      (set, setIndex) =>
        set.map((item, i) => ({
          x: scaleX(i),
          y: scaleY(item.value),
          ...item,
          color: meta[setIndex].color,
          prefix: meta[setIndex].prefix,
          postfix: meta[setIndex].postfix,
        })),
    );
    const firstSet = expandedSets[0];
    const points = _flatten(expandedSets);

    const lines = data.map(set => this.createLine(scaleX, scaleY, set));

    return (
      <svg
        ref={(el) => { this.element = el; }}
        className={s.graph}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <g transform="translate(0, 0)">
          {meta.map((item, i) => (
            <g
              key={i}
              transform={`translate(0, ${i * headerItemHeight})`}
            >
              <rect
                y="10"
                width="50"
                height="8"
                fill={item.color}
              />
              <text
                x="60"
                y="22"
                style={{ fontFamily: FONT_FAMILY, fontSize: 28, fill: '#9a9a9a' }}
              >
                {item.label}
              </text>
            </g>
          ))}
        </g>

        <g transform={`translate(${padding / 2}, ${(padding / 2) + headerHeight})`}>
          {lines.map((line, i) => (
            <path
              key={i}
              stroke={meta[i].color}
              strokeWidth="10"
              fill="transparent"
              d={line}
            />
          ))}

          {points
            // .filter(item => item.value !== '')
            .map((item, i) => (
              <g
                key={i}
                transform={`translate(${item.x}, ${item.y})`}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}
              >
                <circle
                  fill={item.color}
                  r="10"
                />

                <circle
                  fill="#fff"
                  r="4"
                />

                <circle
                  fill="transparent"
                  r="30"
                />

                <g
                  className="tooltip"
                  style={{ opacity: 0 }}
                  transform="translate(0, -60)"
                >
                  <rect
                    transform="translate(-55, 0)"
                    width="110"
                    height="40"
                    style={{ strokeWidth: 3, stroke: item.color, fill: '#fff' }}
                    rx="20"
                    ry="20"
                  />

                  <text
                    textAnchor="middle"
                    transform="translate(0, 26)"
                    style={{ fontSize: 20, fontWeight: 700 }}
                  >
                    {`${item.prefix || ''}${item.value}${item.postfix || ''}`}
                  </text>
                </g>
              </g>
          ))}
        </g>

        <g transform={`translate(${padding / 4}, ${height - footerHeight})`}>
          <line
            stroke="#d0d0d0"
            strokeWidth="2"
            x1="0"
            x2={width - (padding / 2)}
            y1="0"
            y2="0"
          />

          <g transform={`translate(${padding / 4}, 0)`}>
            {firstSet.map((item, i) => (
              <g
                key={i}
                transform={`translate(${item.x}, ${footerHeight / 2})`}
              >
                <text
                  textAnchor="middle"
                  transform="translate(0, 18)"
                  style={{ fontFamily: FONT_FAMILY, fontSize: 23, fontWeight: 700 }}
                >
                  {item.label}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    );
  }
}
