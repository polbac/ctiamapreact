import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Channels.scss';

export default class extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    closeHeader: PropTypes.func,
  }

  handleOnFocus = () => {
    this.props.closeHeader && this.props.closeHeader();
  }

  render() {
    const { children, closeHeader } = this.props;

    return (
      <div className={s.channels}>
        <div className={s.channels__scroller}>
          <div className={s.channels__container}>
            <div className={s.channels__label}>
              Popular Channels
            </div>

            <ul className={s.channels__list}>
              {React.Children.map(children, (c, i) => (
                <li
                  key={i}
                  className={s.channels__item}
                >
                  {React.cloneElement(c, {
                    className: s.channels__link,
                    onFocus: this.handleOnFocus,
                  })}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
