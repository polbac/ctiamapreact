import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './YesNo.scss';

export default class YesNo extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    invalid: PropTypes.bool,
    hasExtra: PropTypes.bool,
    extraId: PropTypes.string,
    extraName: PropTypes.string,
    extraLabel: PropTypes.string,
    extraRequired: PropTypes.bool,
  }

  static defaultProps = {
    required: false,
  }

  state = {
    showExtra: false,
  }

  handleYes = () => {
    this.setState({ showExtra: true });
  }

  handleNo = () => {
    this.setState({ showExtra: false });
  }

  render() {
    const {
      id,
      name,
      label,
      required,
      invalid,
      hasExtra,
      extraId,
      extraName,
      extraLabel,
      extraRequired,
    } = this.props;
    const hasLabel = true;
    const { showExtra } = this.state;

    return (
      <div className={s.yesNo}>
        {(label && label !== '') && (
          <label // eslint-disable-line
            className={s.yesNo__label}
            htmlFor={id}
          >
            {label}
          </label>
        )}

        <div className={s.checkboxGroup}>
          <div className={s(s.checkbox, { hasLabel })}>
            <label className={s.checkbox__label} htmlFor={`${id}-yes`} title={name}>
              <input
                className={s.checkbox__input}
                type="radio"
                name={name}
                id={`${id}-yes`}
                value="Yes"
                onChange={this.handleYes}
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // checked={isChecked}
                autoComplete="off"
                required
              />

              {/* <span className={s.checkbox__box} /> */}
              Yes
            </label>
          </div>

          <div className={s(s.checkbox, { hasLabel })}>
            <label className={s.checkbox__label} htmlFor={`${id}-no`} title={name}>
              <input
                className={s.checkbox__input}
                type="radio"
                name={name}
                id={`${id}-no`}
                value="No"
                onChange={this.handleNo}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // checked={isChecked}
                autoComplete="off"
                required
              />

              {/* <span className={s.checkbox__box} /> */}
              No
            </label>
          </div>

          {(hasExtra && showExtra && (
            <div className={s.yesNo}>
              {(extraLabel && extraLabel !== '') && (
                <label // eslint-disable-line
                  className={s.yesNo__label}
                  htmlFor={extraId}
                >
                  {extraLabel}
                </label>
              )}

              <input
                id={extraId}
                name={extraName}
                className={s.yesNo__input}
                type="text"
                onChange={this.onChange}
                required={extraRequired}
              />
            </div>
          ))}

          {(hasExtra && !showExtra && (
            <input
              id={extraId}
              name={extraName}
              type="hidden"
              value="N/A"
            />
          ))}
        </div>
      </div>
    );
  }
}
