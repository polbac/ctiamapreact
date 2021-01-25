import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './LearnMore.scss';

export default class LearnMore extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string,
    button: PropTypes.string,
    to: PropTypes.string,
  }

  render() {
    const { heading, copy, button, to } = this.props;

    return (
      <div className={s.more}>
        <div className={s.more__container}>
          <div className={s.more__content}>
            <h2 className={s.more__heading}>{heading}</h2>
            <p className={s.more__copy}>{copy}</p>

            <Button to={to} >{button}</Button>

            <img
              src={require('!file-loader!assets/images/standolone-graphics/learn-more.svg')}
              className={s.more__svg}
              alt="learn-more"
            />
          </div>
        </div>
      </div>
    );
  }
}
