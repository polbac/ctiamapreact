import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import isIE from 'utils/is-ie';

// import Dot from 'assets/images/characters/dot.svg';
// import Percentage from 'assets/images/characters/percentage.svg';
// import Dollar from 'assets/images/characters/dollar.svg';
// import M from 'assets/images/characters/m.svg';
// import I from 'assets/images/characters/i.svg';
// import L from 'assets/images/characters/l.svg';
// import O from 'assets/images/characters/o.svg';
// import N from 'assets/images/characters/n.svg';
// import B from 'assets/images/characters/b.svg';
// import T from 'assets/images/characters/t.svg';
// import K from 'assets/images/characters/k.svg';
// import GHz from 'assets/images/characters/ghz.svg';
// import MHz from 'assets/images/characters/mhz.svg';
// import X from 'assets/images/characters/x.svg';

// import Number0 from 'assets/images/numbers/number-0.svg';
// import Number1 from 'assets/images/numbers/number-1.svg';
// import Number2 from 'assets/images/numbers/number-2.svg';
// import Number3 from 'assets/images/numbers/number-3.svg';
// import Number4 from 'assets/images/numbers/number-4.svg';
// import Number5 from 'assets/images/numbers/number-5.svg';
// import Number6 from 'assets/images/numbers/number-6.svg';
// import Number7 from 'assets/images/numbers/number-7.svg';
// import Number8 from 'assets/images/numbers/number-8.svg';
// import Number9 from 'assets/images/numbers/number-9.svg';

// import N475B from 'assets/images/5g/numbers/$475B.jpg';
// import N4P7M from 'assets/images/5g/numbers/4.7M.jpg';

import s from './NumData.scss';

export default class NumData extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  array = (n) => {
    const key = `NumData ${n}`;

    return [
      { id: '$475B', src: <img key={key} alt="$475B" src={require('assets/images/5g/numbers/$475B.jpg')} /> },
      { id: '4.7M', src: <img key={key} alt="4.7M" src={require('assets/images/5g/numbers/4.7M.jpg')} /> },
      { id: '3M', src: <img key={key} alt="3M" src={require('assets/images/5g/numbers/3M.png')} /> },
      { id: '$275B', src: <img key={key} alt="$275B" src={require('assets/images/5g/numbers/$275B.png')} /> },
      { id: '$500B', src: <img key={key} alt="$500B" src={require('assets/images/5g/numbers/$500B.png')} /> },
    ];
  }

  number = (n) => {
    const svg = this.array(n).find(a => a.id === n);

    if (!svg) {
      return null;
    }

    return svg.src;
  }

  render() {
    const { children, className } = this.props;
    const child = children.toString();

    if (!children) {
      return null;
    }

    return (
      <div className={s(s.numData, className)}>
        { this.number(child) }
      </div>
    );
  }
}
