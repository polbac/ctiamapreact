import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Number } from 'components/assets';
import Button from 'components/button';

import s from './Error.scss';

export default class Error404 extends PureComponent {

  static propTypes = {
  /* number: PropTypes.string, */
    heading: PropTypes.string,
    copy: PropTypes.string,
    button: PropTypes.string,
    to: PropTypes.string,
  }

  render() {
    const {/* number, */ heading, copy, button, to } = this.props;

    /* Adding the word 'empty' as Number content because we are not passing any digits.
    Non-digits do not create any svg. */

    return (
      <div className={s.error}>
        <div className={s.error__container}>
          <Number className={s.error__number}>empty</Number>
          <h2 className={s.error__heading}>{heading}</h2>
          <p className={s.error__copy}>{copy}</p>
          <Button to={to}>{button}</Button>
        </div>
      </div>
    );
  }
}
