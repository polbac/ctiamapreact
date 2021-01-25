import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import convertToRouterLink from 'utils/convertToRouterLink';
// import { TimelineLite } from 'gsap';
// import Waypoint from 'react-waypoint';

import s from './Card.scss';

export default class Card extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    copy: PropTypes.string,
    image: PropTypes.string,
    internalRef: PropTypes.func,
    className: PropTypes.string,
    hasSeparation: PropTypes.bool,
  }

  render() {
    const { image, heading, copy, className, internalRef, hasSeparation } = this.props;

    return (
      <div className={s(s.card, className, { hasSeparation })} ref={internalRef}>
        <img
          className={s.card__image}
          src={image}
          alt={heading}
        />
        <div className={s.card__wrapper}>
          <p className={s.card__heading}>
            {heading}
          </p>
          <div>
            {ReactHtmlParser(copy, { transform: convertToRouterLink })}
          </div>
        </div>
      </div>
    );
  }
}
