import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { BlockPicker } from 'react-color';

import { DEFAULT_COLORS } from 'store/Graph';

import s from './Editor.scss';

export default class extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    multiLine: PropTypes.bool,
    onChange: PropTypes.func,
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
    this.props.onChange(color.hex);
  }

  render() {
    const { label, value, multiLine, onChange } = this.props;
    const { pickColor, top, left } = this.state;
    const isColor = label.indexOf('color') === 0;

    return (
      <div className={s.row}>
        <div className={s.row__label}>{label}</div>
        {isColor && (
          <button
            ref={(el) => { this.colorEl = el; }}
            className={s.row__colorButton}
            onClick={this.onOpen}
            style={{ backgroundColor: value }}
          >Color!</button>
        )}

        {!isColor && !multiLine && (
          <input
            className={s.row__input}
            type="text"
            placeholder="Value"
            defaultValue={value}
            onChange={e => onChange(e.target.value)}
          />
        )}

        {!isColor && multiLine && (
          <textarea
            className={s(s.row__input, s.isMultiline)}
            type="text"
            placeholder="Value"
            defaultValue={value}
            onChange={e => onChange(e.target.value)}
          />
        )}

        {pickColor && ReactDOM.createPortal((
          <div>
            <div className={s.row__colorPicker} style={{ top, left }}>
              <BlockPicker
                styles={{ boxShadow: '0 0 10px #000' }}
                width={205}
                color={value}
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
    );
  }
}
