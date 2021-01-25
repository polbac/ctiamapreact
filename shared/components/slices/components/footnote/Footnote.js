import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import convertToRouterLink from 'utils/convertToRouterLink';

import s from './Footnote.scss';

export default class Footnote extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
    isCenter: PropTypes.bool,
    isWide: PropTypes.bool,
    noBorder: PropTypes.bool,
  }

  render() {
    const { text, isCenter, isWide, noBorder } = this.props;

    return (
      <div className={s(s.footnote, { isCenter, isWide, noBorder })}>
        <div className={s.footnote__container}>
          <div className={s.footnote__row}>
            <div className={s.footnote__col}>
              <div className={s.footnote__content}>
                {ReactHtmlParser(text, { transform: convertToRouterLink })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
