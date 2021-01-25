import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Heading.scss';

export default class Heading extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    copy: PropTypes.string,
    isLoading: PropTypes.bool,
  }

  render() {
    const { children, copy, isLoading } = this.props;

    return (
      <div className={s(s.heading, { isLoading })}>
        <h3 className={s.heading__title}>
          <span className={s.heading__wrapper}>
            {children}
          </span>
        </h3>

        {copy && <p className={s.heading__copy}>{copy}</p>}
      </div>
    );
  }
}
