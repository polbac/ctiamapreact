import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Item.scss';

export default class Item extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    link: PropTypes.string,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children, link } = this.props;

    return (
      <div className={s.item}>
        { link && link !== '' ? <a href={link} className={s.item__link}>{children}</a> : children }
      </div>
    );
  }
}
