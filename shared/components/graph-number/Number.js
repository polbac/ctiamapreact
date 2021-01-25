import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FONT_FAMILY } from 'store/Graph';

import Number0 from 'assets/images/numbers/number-0.svg';
import Number1 from 'assets/images/numbers/number-1.svg';
import Number2 from 'assets/images/numbers/number-2.svg';
import Number3 from 'assets/images/numbers/number-3.svg';
import Number4 from 'assets/images/numbers/number-4.svg';
import Number5 from 'assets/images/numbers/number-5.svg';
import Number6 from 'assets/images/numbers/number-6.svg';
import Number7 from 'assets/images/numbers/number-7.svg';
import Number8 from 'assets/images/numbers/number-8.svg';
import Number9 from 'assets/images/numbers/number-9.svg';

import Dollar from 'assets/images/characters/dollar-graph.svg';
import M from 'assets/images/characters/m.svg';
import I from 'assets/images/characters/i.svg';
import L from 'assets/images/characters/l.svg';
import O from 'assets/images/characters/o.svg';
import N from 'assets/images/characters/n.svg';
import B from 'assets/images/characters/b.svg';
import K from 'assets/images/characters/k.svg';
import T from 'assets/images/characters/t.svg';
import Plus from 'assets/images/characters/plus.svg';
import Minus from 'assets/images/characters/minus.svg';
import Percentage from 'assets/images/characters/percentage.svg';
import Ghz from 'assets/images/characters/ghz.svg';
import Mhz from 'assets/images/characters/mhz.svg';
import X from 'assets/images/characters/x.svg';
import Slash from 'assets/images/characters/slash.svg';

import s from './Number.scss';

export default class extends PureComponent {

  static propTypes = {
    meta: PropTypes.array,
  }

  render() {
    const { meta: [meta] } = this.props;

    const orginalWidth = 1000;
    let width = 1000;
    let height = width * 1.2;

    const valueArray = meta.value.toString().split('');
    const numberArray = valueArray.map((value) => {
      switch (value.toLowerCase()) {
        case '0':
          return { id: 0, width: 50, Component: Number0 };

        case '1':
          return { id: 1, width: 32, Component: Number1 };

        case '2':
          return { id: 2, width: 39, Component: Number2 };

        case '3':
          return { id: 3, width: 41, Component: Number3 };

        case '4':
          return { id: 4, width: 47, Component: Number4 };

        case '5':
          return { id: 5, width: 38, Component: Number5 };

        case '6':
          return { id: 6, width: 42, Component: Number6 };

        case '7':
          return { id: 7, width: 36, Component: Number7 };

        case '8':
          return { id: 8, width: 38, Component: Number8 };

        case '9':
          return { id: 9, width: 44, Component: Number9 };

        case 'b':
          return { id: 't', width: 44, Component: B };

        case 'i':
          return { id: 'i', width: 23, Component: I };

        case 'l':
          return { id: 'l', width: 38, Component: L };

        case 'm':
          return { id: 'm', width: 60, Component: M };

        case 'n':
          return { id: 'n', width: 50, Component: N };

        case 'k':
          return { id: 'k', width: 50, Component: K };

        case 't':
          return { id: 't', width: 50, Component: T };

        case 'o':
          return { id: 'o', width: 64, Component: O };

        case ' ':
          return { id: 'space', width: 20, Component: () => null };

        case '$':
          return { id: '$', width: 32, Component: Dollar };

        case '-':
          return { id: '-', width: 45, Component: Minus };

        case '+':
          return { id: '+', width: 45, Component: Plus };

        case '%':
          return { id: '%', width: 25, Component: Percentage };

        case '/':
          return { id: '/', width: 45, Component: Slash };

        case 'g':
          return { id: 'ghz', width: 100, Component: Ghz };   
        
        case 'z':
          return { id: 'mhz', width: 100, Component: Mhz };  
        
        case 'x':
          return { id: 'x', width: 45, Component: X };  

        case '.':
        case ',':
          return {
            id: '.',
            width: 20,
            Component: ({ ...rest }) => (
              <svg viewBox="0 0 20 60" {...rest}>
                <circle
                  className="color-primary"
                  r="4"
                  fill="#000"
                  transform="translate(10,56)"
                />
              </svg>
            ),
          };

        default:
          return { id: -1, width: 0, Component: () => null };
      }
    });

    const ratio = 6;
    const numberHeight = ratio * 61;
    const totalWidth = numberArray.reduce((curr, prev) => prev.width + curr, 0) * ratio;
    let num = 0;

    if (totalWidth > width) {
      width = totalWidth;
      height = totalWidth * 1.2;
    }

    const ratioChange = width / orginalWidth;

    // needs a better way of scoping css between svgs then a random id
    const graphId = `Graph-${Math.floor(Math.random() * 1000)}`;

    const numberAbsoluteHeight = numberHeight * ratioChange;
    const numberY = (height / 2) - (numberAbsoluteHeight * 0.75); // (numberHeight / 2);
    const textY = numberY + numberHeight + (100 * ratioChange);
    const textSize = 70 * ratioChange;
    const textOffsetY = textSize + (10 * ratioChange);

    return (
      <svg
        id={graphId}
        ref={(el) => { this.element = el; }}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className={s.number}
        width={width}
        height={height}
      >
        <style scoped>
          {`
            #${graphId} .color-primary { fill: ${meta.color1}; }
            #${graphId} .color-secondary { fill: ${meta.color2}; }
          `}
        </style>

        <g transform={`translate(${(width / 2) - (totalWidth / 2)}, ${numberY})`}>
          {numberArray.map((item, i) => {
            const currentX = num;

            num += item.width * ratio;

            return (
              <g key={i} transform={`translate(${currentX}, 0)`}>
                <item.Component
                  width={item.width * ratio}
                  height={numberHeight}
                />
              </g>
            );
          })}
        </g>

        <g>
          {meta.label.split('\n').map((text, i) => (
            <text
              key={i}
              textAnchor="middle"
              transform={`translate(${width / 2}, ${textY + (textOffsetY * i)})`}
              style={{ fontSize: textSize, fontFamily: FONT_FAMILY }}
            >
              {text}
            </text>
          ))}
        </g>
      </svg>
    );
  }
}
