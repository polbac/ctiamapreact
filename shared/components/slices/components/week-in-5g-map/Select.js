import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PinSvg from 'assets/images/icons/icon-location-pin.svg';

import s from './Select.scss';

export default class Select extends PureComponent {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string.isRequired,
    })),
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  // static defaultProps = {
  //   options: [
  //     { abbreviation: '1', name: 'All' },
  //     { value: '2', text: 'Some' },
  //     { value: '3', text: 'Just that one' },
  //   ],
  // }

  render() {
    const {
      options,
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
            onChange={onChange}
            value={value}
          >
            <option value="" disabled>Select a state</option>
            {options.map(({ abbreviation: key, name: text }) => (
              <option key={key} value={key}>{`${key} | ${text}`}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
