import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Header } from 'components/wrappers';

import s from './IQWrapper.scss';

export default class IQWrapper extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const { heading, children } = this.props;

    return (
      <div className={s.IQWrapper}>
        <div className={s.IQWrapper__container}>
          {heading && (
            <Header isCenter>{heading}</Header>
          )}
          <div className={s.IQWrapper__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
