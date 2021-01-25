import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './Page.scss';

export default class Page extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    heading: PropTypes.string,
    copy: PropTypes.string,
    to: PropTypes.string,
    hasIllustration: PropTypes.bool,
  }

  render() {
    const { label, heading, copy, to, hasIllustration } = this.props;

    return (
      <div className={s(s.page, { hasIllustration })}>
        <div className={s.page__wrapper}>
          <p className={s.page__label}>{label}</p>
          <h3 className={s.page__heading}>{heading}</h3>
          {copy && <p className={s.page__copy}>{copy.substring(0, 225)}...</p>}
          <Button className={s.page__button} to={to}>Learn More</Button>
        </div>

        {hasIllustration && (
          <img
            className={s.page__svg}
            src={require('!file-loader!assets/images/standolone-graphics/results-page.svg')}
            alt=""
          />
        )}
      </div>
    );
  }
}
