import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

import s from './Graphs.scss';

export default class Graphs extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
    viewMore: PropTypes.string,
    viewMoreText: PropTypes.string,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children, heading, viewMore, viewMoreText } = this.props;

    return (
      <div className={s.graphs}>
        <div className={s.graphs__container}>
          {heading && (
            <Header viewMore={viewMore} viewMoreText={viewMoreText}>{heading}</Header>
          )}
          <div className={s.graphs__grid}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
