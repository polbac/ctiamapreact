import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from 'components/link';

import s from './NavBlock.scss';

export default class NavBlock extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    iconUrl: PropTypes.string,
    to: PropTypes.string,
    linkText: PropTypes.string,
  }

  static defaultProps = {
    linkText: 'Learn More',
    iconUrl: require('!file-loader!assets/images/icons/icon-link-optim.svg'),
  }

  render() {
    const { title, iconUrl, to, linkText } = this.props;

    if (!title || title === '') {
      return;
    }

    return (
      <div className={s.navBlock}>
        <div className={s.navBlock__icon}>
          {iconUrl && (
            <img className={s.navBlock__img} src={iconUrl} alt="" />
          )}
        </div>
        <div className={s.navBlock__text}>
          <div className={s.navBlock__title}>
            {title}
          </div>
          {to && to !== '' ? (
            <div className={s.navBlock__link}>
              <Link to={to}>{linkText}</Link>
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}
