import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import s from './Checkbox.scss';

class Checkbox extends Component {

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    isChecked: PropTypes.bool,
    className: PropTypes.string,
  }

  render() {
    const { label, name, onChange, onFocus, onBlur, isChecked, className } = this.props;
    const id = `field_${name}`;
    const hasLabel = Boolean(label);

    return (
      <div className={s(s.checkbox, className, { hasLabel })}>
        <label className={s.checkbox__label} htmlFor={id} title={name}>
          <input
            className={s.checkbox__input}
            type="checkbox"
            name={name}
            id={id}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            checked={isChecked}
          />

          <span className={s.checkbox__box} />

          {label}
        </label>
      </div>
    );
  }
}

export default observer(Checkbox);
