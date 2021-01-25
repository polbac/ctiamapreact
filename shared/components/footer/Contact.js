import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import s from './Contact.scss';

export default class Contact extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.object,
    social: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    social: [],
  }

  render() {
    const { title, link, text, icon, social } = this.props;

    return (
      <div className={s.contact}>
        <h2 className={s.contact__heading}>{title}</h2>
        <div className={s.contact__content}>
          <ul className={s.contact__list}>
            {social.length > 0 && social.map(({ icon, text, link }, i) => ( // eslint-disable-line
              <li
                key={`social-${i}`}
                className={s.contact__item}
              >
                <a href={link} rel="noopener noreferrer" title={text} target="_blank">
                  <span className={s.contact__icon}>{icon}</span>
                </a>
              </li>
            ))}
          </ul>
          {link && (
            <Link to={link} className={s.contact__link} title={text}>
              {icon && <span className={s.contact__linkIcon}>{icon}</span>}
              {text && <span className={s.contact__linkText}>{text}</span>}
            </Link>
          )}
        </div>
      </div>
    );
  }
}
