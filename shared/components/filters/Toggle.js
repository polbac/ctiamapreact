import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Toggle.scss';

export default class Toggle extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    active: PropTypes.bool,
    click: PropTypes.func,
  }

  static defaultProps = {
    icon: undefined,
    active: false,
  }

  handleClick = () => {
    this.props.click();
  }

  render() {
    const { icon, title, active } = this.props;

    return (
      <button aria-label="toggles" className={s(s.toggle, { active })} onClick={this.handleClick}>
        <div className={s.toggle__icon}>
          {icon}
        </div>
        <div className={s.toggle__title}>
          {title}
        </div>
      </button>
    );
  }
}
