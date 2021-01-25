import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './SectionsLayout.scss';

export default class SectionsLayout extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <div className={s.sectionsLayout}>
        <div className={s.sectionsLayout__container}>
          {children}
        </div>
      </div>
    );
  }
}

