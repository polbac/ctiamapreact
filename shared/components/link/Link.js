import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkRRD } from 'react-router-dom';

import s from './Link.scss';

export default class Link extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    to: PropTypes.string,
    tabIndex: PropTypes.number,
  }

  render() {
    const { children, className, to, tabIndex } = this.props;

    return (
      <LinkRRD className={s(s.link, className)} to={to} tabIndex={tabIndex}>
        {children}
      </LinkRRD>
    );
  }
}
