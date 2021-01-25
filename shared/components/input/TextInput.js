import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './TextInput.scss';

const inputTypes = ['text', 'email', 'search', 'url', 'tel', 'password'];

export default class TextInput extends PureComponent {

  static propTypes = {
    type: PropTypes.oneOf(inputTypes),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    invalid: PropTypes.bool,
  }

  static defaultProps = {
    type: 'text',
    required: false,
  }

  render() {
    const { type, placeholder, id, name, label, required, invalid } = this.props;

    return (
      <div className={s.textInput}>
        {(label && label !== '') && (
          <label // eslint-disable-line
            className={s.textInput__label}
            htmlFor={id}
          >
            {label}
          </label>
        )}

        <input
          id={id}
          name={name}
          className={s(s.textInput__input, { [s.isInvalid]: invalid })}
          type={type}
          placeholder={placeholder}
          onChange={this.onChange}
          required={required}
        />
      </div>
    );
  }
}
