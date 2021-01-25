import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/modal';

import s from './ButtonDropdown.scss';

export default class ButtonDropdown extends PureComponent {

  static propTypes = {
    icon: PropTypes.node,
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
    const { children, items, icon } = this.props;
    const { isOpen } = this.state;
    const empty = React.Children.toArray(children).length === 0;

    return (
      <div className={s.buttonDropdown}>
        <button
          className={s(s.buttonDropdown__button, { icon, empty })}
          onClick={this.onClick}
          aria-label="opens dropdown"
        >
          {icon}
          {children}
        </button>

        {items && items.length > 0 && isOpen && (
          <Modal className={s.dropdown}>
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
          </Modal>
        )}
      </div>
    );
  }
}
