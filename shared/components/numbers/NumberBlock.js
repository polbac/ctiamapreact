import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Number } from 'components/assets';

import s from './NumberBlock.scss';

export default class NumberBlock extends PureComponent {

  static propTypes = {
    data: PropTypes.string,
    copy: PropTypes.string,
    internalRef: PropTypes.func,
    className: PropTypes.string,
    inline: PropTypes.bool,
  }

  render() {
    const { copy, data, internalRef, inline, className } = this.props;

    return (
      <div className={s(s.block, className, { inline })} ref={internalRef}>
        <div className={s.block__wrapper}>
          <div className={s.block__number}>
            <Number className={s.block__svg} colors="green-blue">{data}</Number>
          </div>

          <p className={s.block__copy}>{copy}</p>
        </div>
      </div>
    );
  }
}
