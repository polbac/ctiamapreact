import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './HeadingButton.scss';

export default class HeadingButton extends PureComponent {

  static propTypes = {
    kicker: PropTypes.string,
    heading: PropTypes.string,
    copy: PropTypes.string,
    button: PropTypes.string,
    to: PropTypes.string,
  }

  render() {
    const { kicker, heading, copy, button, to } = this.props;

    return (
      <div className={s.block}>
        {kicker && (
          <p className={s.block__kicker}>{kicker}</p>
        )}
        <h2 className={s.block__heading}>
          {heading}<span className={s.block__headingDot}>.</span>
        </h2>

        <p className={s.block__copy}>{copy}</p>
        <Button to={to}>{button}</Button>
      </div>
    );
  }
}
