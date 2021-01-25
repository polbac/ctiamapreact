import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import s from './Item.scss';

export default class Item extends PureComponent {

  static propTypes = {
    to: PropTypes.string,
    name: PropTypes.string,
    isActive: PropTypes.func,
    isExplicitlyActive: PropTypes.bool,
  }

  static defaultProps = {
    isActive: () => {},
    isExplicitlyActive: null,
  }

  render() {
    const {
      to,
      name,
      content, // eslint-disable-line
      isActive,
      isExplicitlyActive,
      ...rest
    } = this.props;

    /**
     * If the `isActive` state is passed the item was clicked and should be set
     * explicitly as either active or not. Otherwise we let the NavLink decide
     * based on our current location. So it has three states:
     * undefined, true or false
     */
    let active;

    if (isExplicitlyActive !== null) {
      active = () => isExplicitlyActive;
    }

    return (
      <NavLink
        to={to}
        className={s.item}
        activeClassName={s.itemActive}
        isActive={active || isActive}
        {...rest}
      >
        {name}
      </NavLink>
    );
  }
}
