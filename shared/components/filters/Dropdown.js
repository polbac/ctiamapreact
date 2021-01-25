import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Dropdown.scss';

export default class Dropdown extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    children: undefined,
    label: 'Topic',
    options: [
      { value: '1', text: 'All' },
      { value: '2', text: 'Some' },
      { value: '3', text: 'Just that one' },
    ],
    defaultValue: undefined,
    onChange: () => {},
  }

  render() {
    const {
      children,
      label,
      options,
      defaultValue,
      onChange,
    } = this.props;

    const id = Math.trunc(Math.random() * 100);

    return (
      <div className={s.dropdown} >
        <div className={s.dropdown__container}>
          <div className={s.dropdown__field}>
            <label // eslint-disable-line
              className={s.dropdown__label}
              htmlFor={`temp-${id}`}
            >
              {label}
            </label>

            <select
              name={`temp-${id}`}
              id={`temp-${id}`}
              className={s.dropdown__select}
              defaultValue={defaultValue}
              onChange={onChange}
            >
              {options.map(({ key, value, text }) => (
                <option key={key || value} value={value}>{text}</option>
              ))}
            </select>
          </div>
          {children}
        </div>
      </div>
    );
  }
}
