import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import s from './Intro.scss';

export default class Intro extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
    isCenter: PropTypes.bool,
    isLoading: PropTypes.bool,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    text: undefined,
  }

  render() {
    const { text, isCenter, isLoading, isWide } = this.props;

    return (
      <div className={s(s.intro, { isCenter, isLoading, isWide })}>
        <div className={s.intro__container}>
          <div className={s.intro__row}>
            <div className={s.intro__col}>
              <div className={s.intro__content}>
                {ReactHtmlParser(text)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
