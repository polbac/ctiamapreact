import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './TextArea.scss';

export default class TextArea extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    invalid: PropTypes.bool,
  }

  render() {
    const { placeholder, id, name, label, required, invalid } = this.props;

    return (
      <div className={s.textArea}>
        {(label && label !== '') && (
          <label // eslint-disable-line
            className={s.textArea__label}
            htmlFor={id}
          >
            {label}
          </label>
        )}

        <textarea
          id={id}
          name={name}
          className={s(s.textArea__input, { [s.isInvalid]: invalid })}
          placeholder={placeholder}
          onChange={this.onChange}
          required={required}
        />
      </div>
    );
  }
}
