import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Item.scss';

export default class Item extends PureComponent {

  static propTypes = {
    icon: PropTypes.object,
    title: PropTypes.string,
    text: PropTypes.node,
  }

  render() {
    const { icon, title, text } = this.props;

    return (
      <div className={s.item}>
        <div className={s.item__icon}>
          {icon}
        </div>
        <h2 className={s.item__heading}>{title}</h2>
        <div className={s.item__copy}>{text}</div>
      </div>
    );
  }
}
