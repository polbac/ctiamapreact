import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { assets } from 'utils/themes';

import { Number } from 'components/assets';
import Button from 'components/button';

import s from './List.scss';

export default class Sections extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.object,
    number: PropTypes.number,
    children: PropTypes.node,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    shadow: PropTypes.bool,
    pattern: PropTypes.string,
  }

  static defaultProps = {
    buttonText: 'Read',
  }

  render() {
    const { number, title, image, children, buttonLink, buttonText, shadow, pattern } = this.props;

    return (
      <div className={s(s.item, { shadow })}>
        <div className={s.item__content}>
          {number && (
            <Number
              className={s.item__number}
              colors={assets(pattern)}
            >{number}</Number>
          )}

          <h1 className={s.item__title}>{title}</h1>

          <div className={s.item__copy}>
            <div className={s.item__copyWrap}>
              {children}
            </div>
          </div>

          <div className={s.item__button}>
            <Button to={buttonLink}>{buttonText}</Button>
          </div>

          {image && (
            <Link to={buttonLink} className={s.item__image}>
              <img src={image.url} alt={image.caption || children} />
            </Link>
          )}
        </div>
      </div>
    );
  }
}
