import React, { PureComponent } from 'react';

import s from './Divider.scss';

export default class Divider extends PureComponent {

  render() {
    return (
      <div className={s.divider}>
        <div className={s.divider__container}>
          <div className={s.divider__line} />
        </div>
      </div>
    );
  }
}
