import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Select.scss';

export default class Select extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
  }

  render() {
    const { id, name, label, options } = this.props;
    const selId = `temp-${id}`;

    return (
      <div className={s.select}>
        {(label && label !== '') && (
          <label // eslint-disable-line
            className={s.select__label}
            htmlFor={selId}
          >
            {label}
          </label>
        )}

        <div className={s.select__wrap}>
          <select
            id={selId}
            name={name}
            className={s.select__select}
            onChange={this.onChange}
          >
            {options.map(option => (
              <option
                key={`select-${option.split(' ').join('_')}`}
                value={option.split(' ').join('_')}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
