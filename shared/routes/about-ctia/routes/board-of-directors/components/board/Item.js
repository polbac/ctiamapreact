import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Item.scss';

export default class Item extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string,
    link: PropTypes.string,
  }

  render() {
    const { position, name, title, company, link } = this.props;

    return (
      <div className={s.item}>
        {position && position !== '' ? <div className={s.item__position}>{position}</div> : null }
        <h3 className={s.item__name}>{name}</h3>
        <div className={s.item__title}>
          {title} of {link && link !== '' ? (
            <a href={link} className={s.item__link}>{company}</a>
          ) :
            company
          }
        </div>
      </div>
    );
  }
}
