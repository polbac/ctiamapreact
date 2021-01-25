import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './SignupForm.scss';

export default class SignupForm extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children, title, subtitle } = this.props;

    return (
      <div className={s.signupForm}>
        <div className={s.signupForm__container}>
          <div className={s.signupForm__row}>
            <div className={s.signupForm__col}>
              <div className={s.signupForm__header}>
                <h2 className={s.signupForm__title}>{title}</h2>
                <p className={s.signupForm__subtitle}>{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
