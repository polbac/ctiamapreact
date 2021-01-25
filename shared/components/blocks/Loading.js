import React, { PureComponent } from 'react';

import s from './Loading.scss';

export default class Heading extends PureComponent {

  render() {
    return (
      <div
        className={s.loading}
      >
        <div className={s.loading__inner}>
          <div className={s.loading__top}>
            <header className={s.loading__header}>
              <span
                className={s.loading__date}
              >
                .
              </span>
            </header>
            <h3 className={s.loading__heading}>
              <span
                className={s.loading__title}
              >
                .
              </span>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
