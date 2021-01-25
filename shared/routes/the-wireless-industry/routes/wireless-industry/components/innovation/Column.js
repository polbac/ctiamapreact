import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Column.scss';

export default class Column extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    subheading: PropTypes.string,
    copy: PropTypes.string,
  }

  render() {
    const { heading, subheading, copy } = this.props;

    return (
      <div className={s.column}>
        <h3 className={s.column__heading}>{heading}</h3>
        <h4 className={s.column__subheading}>{subheading}</h4>
        <p className={s.column__copy}>{copy}</p>
      </div>
    );
  }
}
