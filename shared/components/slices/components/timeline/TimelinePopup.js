/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './TimelinePopup.scss';

export default class TimelinePopup extends PureComponent {

  static propTypes = {
    date: PropTypes.string,
    heading: PropTypes.string,
    copy: PropTypes.string,
    link: PropTypes.string,
  }

  render() {
    const {
      date,
      heading,
      copy,
      link,
      src,
      // eslint-disable-next-line react/prop-types
      close,
    } = this.props;

    const isActive = !!heading && !!date;

    return (
      <div className={s(s.popup, { isActive })}>
        <div className={s.popupInnerWrapper}>
          <button className={s.close} onClick={close}>X</button>
          <div className={s.popupFlexWrapper}>
            {src &&
            <div className={s.popup__imageContainer}>
              <div className={s.popup__imagePadding}>
                <img className={s.popup__icon} src={src} alt={heading} />
              </div>
            </div>}
            <div className={s.heading}>{heading}</div>
            <div className={s.date}>{date}</div>
          </div>
          {copy && <p className={s.copy}>{copy}</p>}
          {link && (
          <div className={s.linkWrapper}>
            <a className={s.link} href={link} rel="noopener noreferrer" title={heading} target="_blank">Read More</a>
          </div>
          )}
        </div>
      </div>
    );
  }
}
