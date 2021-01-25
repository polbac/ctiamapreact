import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'utils/scrollToElement';

import Arrow from 'assets/images/icons/arrow-link.svg';

import s from './Shortcut.scss';

export default class Shortcut extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    altText: PropTypes.string,
    internalRef: PropTypes.func,
    id: PropTypes.string,
  }

  static defaultProps = {
    title: 'A Series of Firsts.',
  }

  render() {
    const { title, image, altText, internalRef, id } = this.props;

    return (
      <div className={s(s.shortcut, id)} ref={internalRef}>
        <div className={s.shortcut__header}>
          <h2 className={s.shortcut__title}>{title}</h2>

          <button
            className={s.shortcut__button}
            onClick={() => scrollToElement(`#${id}`, { offset: '60%' })}
            aria-label="Internal Shortcut Link"
          >
            <Arrow className={s.shortcut__arrow} />
          </button>
        </div>

        <div className={s.shortcut__content}>
          <img src={image} alt={altText} className={s.shortcut__image} />
        </div>
      </div>
    );
  }
}
