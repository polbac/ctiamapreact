import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './Document.scss';

export default class Document extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    number: PropTypes.number,
    type: PropTypes.string,
    to: PropTypes.string,
    src: PropTypes.string,
  }

  static defaultProps = {
    src: require('assets/images/cover-generic.jpg'),
  }

  render() {
    const { title, text, number, type, to, src } = this.props;

    return (
      <figure className={s.document}>
        <Link to={to} className={s.document__link}>
          <div className={s.document__background}>
            <div className={s.document__header}>
              <div className={s.document__number}>
                {number}
              </div>
              <div className={s.document__type}>
                {type}
              </div>
            </div>
            <div className={s.document__image}>
              <img src={src} alt="" className={s.document__img} />
            </div>
          </div>
          <div className={s.document__content}>
            <div className={s.document__title}>{title}</div>
            <div className={s.document__text}>
              {text}
            </div>
          </div>
        </Link>
      </figure>
    );
  }
}
