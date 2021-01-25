import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';

import { Checkbox } from 'components/input';
import { DEFAULT_COLORS } from 'store/Graph';

import s from './Editor.scss';

export default class extends PureComponent {

  static propTypes = {
    index: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
    color: PropTypes.string,
    showColor: PropTypes.bool,
    disableLabel: PropTypes.bool,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    onColorChange: PropTypes.func,
    isDonut: PropTypes.bool,
    isFixedDonut: PropTypes.bool,
    showLabel: PropTypes.bool,
  }

  state = {
    pickColor: false,
    top: 0,
    left: 0,
  }

  onOpen = (e) => {
    e.preventDefault();

    const { top, left, width } = this.colorEl.getBoundingClientRect();

    this.setState({
      pickColor: !this.state.pickColor,
      top: top + window.pageYOffset,
      left: left + (width / 2),
    });
  }

  onColorChange = (color) => {
    this.props.onColorChange(color);
  }

  render() {
    const { label, value, showLabel, color = '#ccc', showColor = true, disableLabel = false, onChange, onRemove, index, isDonut, isFixedDonut } = this.props;
    const { pickColor, top, left } = this.state;

    return (
      <div className={s(s.row, { isDonut })}>
        <input
          className={s.row__input}
          type="text"
          disabled={disableLabel}
          placeholder="Label"
          defaultValue={label}
          onChange={e => onChange('label', e.target.value)}
        />

        <input
          className={s.row__input}
          type="number"
          placeholder="Value"
          defaultValue={value}
          onChange={e => onChange('value', e.target.value)}
        />

        {showColor && (
          <div className={s.row__color}>
            <button
              ref={(el) => { this.colorEl = el; }}
              className={s.row__colorButton}
              onClick={this.onOpen}
              style={{ backgroundColor: color }}
            >
              Color
            </button>

            {pickColor && ReactDOM.createPortal((
              <div>
                <div className={s.row__colorPicker} style={{ top, left }}>
                  <BlockPicker
                    styles={{ boxShadow: '0 0 10px #000' }}
                    width={205}
                    color={color}
                    colors={DEFAULT_COLORS}
                    onChangeComplete={this.onColorChange}
                  />
                </div>

                <div // eslint-disable-line
                  className={s.row__colorOverlay}
                  onClick={() => this.setState({ pickColor: false })}
                />
              </div>
            ), document.body)}
          </div>
        )}

        {(isDonut) && (
          <Checkbox
            className={s.row__checkbox}
            name={`Show label ${index}`}
            onChange={e => onChange('showLabel', e.target.checked)}
            isChecked={showLabel}
          />
        )}



        <button
          className={s.row__remove}
          onClick={onRemove}
        >
          +
        </button>

      </div>
    );
  }
}
