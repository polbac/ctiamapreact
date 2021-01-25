import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Button.scss';

export default class Button extends PureComponent {

  static propTypes = {
    items: PropTypes.array,
    children: PropTypes.node,
  };

  state = {
    isOpen: false,
  };

  onClick = () => {
    const { items } = this.props;
    const { isOpen } = this.state;

    if (items) {
      this.setState({
        isOpen: !isOpen,
      });
    }
  }

  render() {
    const { children, items } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={s.wrap}>
        <button
          className={s.button}
          onClick={this.onClick}
          aria-label="toggles open status"
        >
          {children}
        </button>

        {items && items.length > 0 && isOpen && (
          <div className={s.dropdown}>
            <ul className={s.dropdown__list}>
              {items.map((item, i) => (
                <li key={i} className={s.dropdown__item}>
                  {React.cloneElement(item, {
                    className: s.dropdown__link,
                    onClick: () => {
                      this.setState({ isOpen: false });

                      if (item.props.onClick) {
                        item.props.onClick();
                      }
                    },
                  })}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
