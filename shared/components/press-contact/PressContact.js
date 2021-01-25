import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from 'assets/images/icons/temp.svg';

import s from './PressContact.scss';

export default class PressContact extends PureComponent {

  static propTypes = {
    email: PropTypes.string,
    heading: PropTypes.string,
    to: PropTypes.string,
  }

  static defaultProps = {
    heading: 'Press Contact',
  }

  render() {
    const { email, heading, to } = this.props;

    return (
      <div className={s.pressContact}>
        <div className={s.pressContact__container}>
          <div className={s.pressContact__icon}>
            <Icon />
          </div>
          <h3 className={s.pressContact__heading}>{heading}</h3>
          <a href={`mailto:${email}`} className={s.pressContact__email}>{email}</a>
          <Link to={to} className={s.pressContact__link}>Contact</Link>
        </div>
      </div>
    );
  }
}
