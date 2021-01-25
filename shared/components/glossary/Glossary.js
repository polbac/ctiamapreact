import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Glossary.scss';

export default class Glossary extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    number: PropTypes.number,
    type: PropTypes.string,
  }

  render() {
    const { title, text, number, type } = this.props;

    return (
      <figure className={s.glossary}>
        <div className={s.glossary__header}>
          <div className={s.glossary__number}>
            {number}
          </div>
          <div className={s.glossary__type}>
            {type}
          </div>
        </div>
        <div className={s.glossary__content}>
          <div className={s.glossary__title}>{title}</div>
          <div className={s.glossary__text}>
            {text}
          </div>
        </div>
      </figure>
    );
  }
}
