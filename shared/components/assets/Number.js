import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isIE from 'utils/is-ie';

import Dot from 'assets/images/characters/dot.svg';
import Percentage from 'assets/images/characters/percentage.svg';
import Dollar from 'assets/images/characters/dollar.svg';
import M from 'assets/images/characters/m.svg';
import I from 'assets/images/characters/i.svg';
import L from 'assets/images/characters/l.svg';
import O from 'assets/images/characters/o.svg';
import N from 'assets/images/characters/n.svg';
import B from 'assets/images/characters/b.svg';
import T from 'assets/images/characters/t.svg';
import K from 'assets/images/characters/k.svg';
import GHz from 'assets/images/characters/ghz.svg';
import MHz from 'assets/images/characters/mhz.svg';
import X from 'assets/images/characters/x.svg';

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

import s from './Number.scss';

export default class Number extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    colors: PropTypes.oneOf(['blue-purple', 'green-blue', 'blue-orange']),
    className: PropTypes.string,
  }

  static defaultProps = {
    colors: 'blue-purple',
  }

  array = (n, i) => {
    const key = `Number ${n + i}`;
    let name = n;

    if (n === '.') {
      name = 'dot';
    } else if (n === '$') {
      name = 'dollar';
    } else if (n === '%') {
      name = 'percentage';
    } else if (n === ' ') {
      name = 'space';
    } else if (n === 'G') {
      name = 'ghz';
    } else if (n === 'Z') {
      name = 'mhz';
    } else if (n === 'X') {
      name = 'x';
    }

    const styles = s(s.number__svg, `char-${name}`);

    return [
      { id: '0', src: <Number0 key={key} className={styles} /> },
      { id: '1', src: <Number1 key={key} className={styles} /> },
      { id: '2', src: <Number2 key={key} className={styles} /> },
      { id: '3', src: <Number3 key={key} className={styles} /> },
      { id: '4', src: <Number4 key={key} className={styles} /> },
      { id: '5', src: <Number5 key={key} className={styles} /> },
      { id: '6', src: <Number6 key={key} className={styles} /> },
      { id: '7', src: <Number7 key={key} className={styles} /> },
      { id: '8', src: <Number8 key={key} className={styles} /> },
      { id: '9', src: <Number9 key={key} className={styles} /> },
      { id: ' ', src: <span key={key} className={styles} /> },
      { id: '.', src: <Dot key={key} className={styles} /> },
      { id: '$', src: <Dollar key={key} className={styles} /> },
      { id: '%', src: <Percentage key={key} className={styles} /> },
      { id: 'G', src: <GHz key={key} className={styles} /> },
      { id: 'Z', src: <MHz key={key} className={styles} /> },
      { id: 'X', src: <X key={key} className={styles} /> },
      { id: 'M', src: <M key={key} className={styles} /> },
      { id: 'I', src: <I key={key} className={styles} /> },
      { id: 'L', src: <L key={key} className={styles} /> },
      { id: 'O', src: <O key={key} className={styles} /> },
      { id: 'N', src: <N key={key} className={styles} /> },
      { id: 'B', src: <B key={key} className={styles} /> },
      { id: 'T', src: <T key={key} className={styles} /> },
      { id: 'K', src: <K key={key} className={styles} /> },
    ];
  }

  number = (n, i) => {
    const svg = this.array(n, i).find(a => a.id === n);

    if (!svg) {
      return null;
    }

    return svg.src;
  }

  render() {
    const { children, colors, className } = this.props;
    const childs = children.toString().split('');

    if (!children) {
      return null;
    }

    return (
      <div className={s(s.number, colors, className)}>
        {isIE() > 0 && <div className={s.number__fallback}>{children}</div>}

        {isIE() === 0 && childs.map((c, i) => {
          if (childs.length === 1) {
            return [
              this.number('0', i - 1),
              this.number(c, i),
            ];
          }

          return this.number(c, i);
        })}
      </div>
    );
  }
}
