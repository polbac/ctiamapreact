import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import QuoteLeftSvg from 'assets/images/icons/quote-left.svg';
import QuoteRightSvg from 'assets/images/icons/quote-right.svg';

import s from './Quote.scss';

export default class Quote extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    source: PropTypes.string,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    source: '',
  }

  render() {
    const { text, name, source, isWide } = this.props;

    return (
      <div className={s(s.quote, { isWide })}>
        <div className={s.quote__container}>
          <div className={s.quote__row}>
            <div className={s.quote__col}>
              <figure className={s.quote__figure}>
                <blockquote className={s.quote__blockquote}>
                  <QuoteLeftSvg className={s.quote__left} />
                  {text}
                  <QuoteRightSvg className={s.quote__right} />
                </blockquote>
                <figcaption className={s.quote__cite}>
                  <span className={s.quote__name}>{name}</span>
                  {source && (
                    <span className={s.quote__source}>{source}</span>
                  )}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
