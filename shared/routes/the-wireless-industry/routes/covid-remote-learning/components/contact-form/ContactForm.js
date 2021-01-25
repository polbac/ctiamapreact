import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './ContactForm.scss';

export default class ContactForm extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.contactForm}>
        <div className={s.contactForm__container}>
          <div className={s.contactForm__row}>
            <div className={s.contactForm__col}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
