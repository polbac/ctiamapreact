import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Item.scss';

export default class Item extends PureComponent {

  static propTypes = {
    image: PropTypes.string,
    url: PropTypes.string,
  };

  state = {};

  render() {
    const { image, url } = this.props;

    return (
      <div className={s.item}>
        {url && url.length > 0 ? (
          <a className={s.item__link} href={url} target="_blank">
            <div
              className={s.item__image}
              style={{ backgroundImage: `url(${image})` }}
            />
          </a>
        ) : (
          <div className={s.item__wrapper}>
            <div
              className={s.item__image}
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        )}
      </div>
    );
  }
}
