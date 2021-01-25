import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './Form.scss';

export default class Form extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    disableSubmit: PropTypes.bool,
    invalid: PropTypes.bool,
    invalidText: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
  }

  static defaultProps = {
    children: undefined,
    disableSubmit: false,
    invalid: false,
    invalidText: 'The information you\'ve entered is invalid. Please check the fields and try again.',
    error: false,
    errorText: 'Something came up while submitting the form.',
  }

  render() {
    const {
      children,
      disableSubmit,
      invalid,
      invalidText,
      error,
      errorText,
      ...rest
    } = this.props;

    return (
      <div className={s.form} {...rest}>
        {children}
        {invalid && (
          <div className={s.form__warning}>
            <p className={s.form__paragraph}>{invalidText}</p>
          </div>
        )}
        {error && (
          <div className={s.form__warning}>
            <p className={s.form__paragraph}>{errorText}</p>
          </div>
        )}
        <div className={s.form__submit}>
          <Button disabled={disableSubmit}>Submit</Button>
        </div>
      </div>
    );
  }
}
