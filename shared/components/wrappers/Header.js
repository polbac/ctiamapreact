import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from 'components/link';

import s from './Header.scss';

export default class Header extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    viewMore: PropTypes.string,
    viewMoreText: PropTypes.string,
    isCenter: PropTypes.bool,
  }

  static defaultProps = {
    viewMoreText: 'See All',
  }

  render() {
    const { children, viewMore, viewMoreText, isCenter } = this.props;

    return (
      <header className={s(s.header, { isCenter })}>
        <h2 className={s.header__heading}>{children}</h2>
        {viewMore && <Link to={viewMore}>{viewMoreText}</Link>}
      </header>
    );
  }
}
