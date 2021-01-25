import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Buttons.scss';

export default class Buttons extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    isCenter: PropTypes.bool,
    isWide: PropTypes.bool,
    alignment: PropTypes.string,
  }

  render() {
    const { children, isCenter, isWide, alignment } = this.props;

    return (
      <div
        className={s(s.buttons, {
          isCenter,
          isWide,
          left: alignment === 'Left',
          right: alignment === 'Right',
        })}
      >
        <div className={s.buttons__container}>
          <div className={s.buttons__row}>
            <div className={s.buttons__col}>
              <div className={s.buttons__wrapper}>
                {React.Children.map(children, (button, i) => (
                  <div key={i} className={s.buttons__item}>
                    {button}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
