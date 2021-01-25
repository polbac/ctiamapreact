import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Number } from 'components/assets';

import s from './NumberBlock.scss';

export default class NumberBlock extends PureComponent {

  static propTypes = {
    data: PropTypes.string,
    copy: PropTypes.string,
    colors: PropTypes.oneOf(['blue-purple', 'green-blue', 'blue-orange']),
  }

  static defaultProps = {
    colors: 'green-blue',
  }

  render() {
    const { data, copy, colors } = this.props;

    return (
      <div className={s.numberBlock}>
        <div className={s.numberBlock__number}>
          <Number className={s.numberBlock__Svg} colors={colors}>
            {data}
          </Number>
        </div>

        <p className={s.numberBlock__copy}>{copy}</p>
      </div>
    );
  }
}
