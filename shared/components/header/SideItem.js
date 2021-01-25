import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'components/link';

import s from './SideItem.scss';

export default class SideItem extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    iconUrl: PropTypes.string,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    tabIndex: PropTypes.number,
  }

  render() {
    const { title, text, icon, iconUrl, buttonText, buttonLink, tabIndex } = this.props;

    return (
      <div className={s.sideItem}>
        {title && (
          <h3 className={s.sideItem__title}>
            {icon && iconUrl && (
              <span className={s.sideItem__iconWrap}>
                <img className={s.sideItem__icon} src={iconUrl} alt="" />
              </span>
            )}
            <span className={s.sideItem__text}>
              {title}
            </span>
          </h3>
        )}
        {text && (
          <p className={s.sideItem__paragraph}>{text}</p>
        )}
        {buttonText && (
          <Link to={buttonLink} tabIndex={tabIndex}>{buttonText}</Link>
        )}
      </div>
    );
  }
}
