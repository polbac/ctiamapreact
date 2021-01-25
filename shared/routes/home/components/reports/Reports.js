import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Link from 'components/link';

import s from './Reports.scss';

export default class Reports extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
  }

  render() {
    const { heading, children } = this.props;
    const childs = Children.toArray(children);

    return (
      <div className={s.reports}>
        <div className={s.reports__heading}>
          {heading}
        </div>

        <div className={s.reports__row}>
          {childs.map(c => cloneElement(c, { className: s.reports__item }))}
        </div>

        <Link to="/news/reports">See All Reports</Link>
      </div>
    );
  }
}
