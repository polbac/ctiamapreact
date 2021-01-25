import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Animator from 'components/animator';

import s from './SidebarLink.scss';

export default class Shortcut extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    copy: PropTypes.string,
    to: PropTypes.string,
  }

  render() {
    const { title, copy, to } = this.props;

    return (
      <Animator>
        <div className={s.sidelink}>
          <div className={s.sidelink__container}>
            <div className={s.sidelink__content}>
              <Link to={to} className={s.sidelink__card}>
                <div className={s.sidelink__map}>
                  <img className={s.sidelink__image} src={require('assets/images/map-card.png')} alt="Image of United States with the text: Wireless Drives the Economy" />
                </div>

                <div className={s.sidelink__title}>{title}</div>
                <div className={s.sidelink__copy}>{copy}</div>
              </Link>
            </div>
          </div>
        </div>
      </Animator>
    );
  }
}
