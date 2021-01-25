import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import s from './Footer.scss';

export default class Footer extends PureComponent {

  static propTypes = {
    logo: PropTypes.object,
    slogan: PropTypes.string,
    address: PropTypes.string,
    copyright: PropTypes.string,
    phone: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object),
    contact: PropTypes.object,
    subscribe: PropTypes.object,
  }

  static defaultProps = {
    links: [],
  }

  render() {
    const { logo, slogan, address, phone, copyright, subscribe, links, contact } = this.props;

    return (
      <div className={s.footer}>
        <div className={s.footer__container}>
          <div className={s.footer__row}>
            <div className={s.footer__content}>
              <div className={s.footer__logo}>
                <span className={s.footer__logoSvg}>{logo}</span>
                <span className={s.footer__logoText}>{slogan}</span>
              </div>
            </div>

            <div className={s.footer__side}>
              {subscribe}
            </div>
          </div>

          <div className={s.footer__row}>
            <div className={s(s.footer__content, s.footer__contentSecondary)}>
              <div className={s.footer__copy}>
                <span className={s.footer__address}>{address}</span><span>{phone}</span>
              </div>
              <span className={s.footer__copyright}>{copyright}</span>
              <ul className={s.footer__list}>
                {links.map(({ text, link }, i) => (
                  <li
                    className={s.footer__item}
                    key={`footer_link_${i}`}
                  >
                    <Link to={link} className={s.footer__link}>{text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s(s.footer__side, s.footer__sidePrimary)}>
              {contact}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
