import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PinSvg from 'assets/images/icons/icon-location-pin.svg';

import s from './Select.scss';

export default class Select extends PureComponent {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
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
      options,
      defaultValue,
      onChange,
      value,
    } = this.props;

    const id = Math.floor(Math.random() * 100);

    return (
      <div className={s.select}>
        <div className={s.select__field}>
          <PinSvg />
          <select
            name={`temp-${id}`}
            id={`temp-${id}`}
            className={s.select__select}
            defaultValue={defaultValue}
            onChange={onChange}
            value={value}
          >
            <option value="" disabled>Select a state</option>
            {options.map(({ key, value: v, text }) => (
              <option key={key || v} value={v}>{`${key} | ${text}`}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
