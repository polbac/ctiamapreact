import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Number } from 'components/assets';

import Divider from './Divider';
import s from './Heading.scss';

export default class Heading extends PureComponent {

  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    hasDivider: PropTypes.bool,
    hasNumber: PropTypes.bool,
    number: PropTypes.number,
    isCenter: PropTypes.bool,
    isCentered: PropTypes.bool,
    isLoading: PropTypes.bool,
    isWide: PropTypes.bool,
    theme: PropTypes.string,
  }

  static defaultProps = {
    text: undefined,
  }

  render() {
    const {
      id,
      text,
      hasDivider,
      isCenter,
      isCentered,
      isLoading,
      isWide,
      theme,
      hasNumber,
      number,
    } = this.props;
    const extras = {};

    if (id) {
      extras.id = id;
    }

    return (
      <div className={s(s.heading, { isCenter, isCentered, isLoading, isWide })} {...extras}>
        <div className={s.heading__container}>
          <div className={s.heading__row}>
            <div className={s.heading__col}>
              {hasDivider && (
                <Divider theme={theme} />
              )}

              <h2 className={s.heading__content}>
                {hasNumber && number && (
                  <div className={s.heading__numberWrap}>
                    <Number className={s.heading__number} colors={theme}>
                      {`${number < 10 && 0}${number}.`}
                    </Number>
                  </div>
                )}

                {text}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
