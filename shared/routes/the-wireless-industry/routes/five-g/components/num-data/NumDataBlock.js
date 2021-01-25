import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { NumData } from './';

import s from './NumDataBlock.scss';

export default class NumDataBlock extends PureComponent {

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
            <NumData className={s.block__svg}>{data}</NumData>
          </div>

          <p className={s.block__copy}>
            { ReactHtmlParser(copy) }
          </p>
        </div>
      </div>
    );
  }
}
