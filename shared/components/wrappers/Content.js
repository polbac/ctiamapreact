import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import s from './Content.scss';

export default class Content extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
    viewMore: PropTypes.string,
  }

  render() {
    const { children, heading, viewMore } = this.props;

    return (
      <div className={s.content}>
        <div className={s.content__container}>
          <Header viewMore={viewMore}>{heading}</Header>

          <div className={s.content__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
