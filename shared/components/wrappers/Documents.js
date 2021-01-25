import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import Header from './Header';
import s from './Documents.scss';

export default class Documents extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
    viewMore: PropTypes.string,
    viewMoreText: PropTypes.string,
    loadMore: PropTypes.func,
    noWrapper: PropTypes.bool,
  }

  render() {
    const { children, heading, viewMore, viewMoreText, loadMore, noWrapper } = this.props;

    return (
      <div className={s(s.documents, { noWrapper })}>
        <div className={s.documents__container}>
          <Header viewMore={viewMore} viewMoreText={viewMoreText}>{heading}</Header>

          <div className={s.documents__row}>
            <div className={s.documents__col}>
              <div className={s.documents__content}>
                {Children.map(children, c => cloneElement(c, { noWrapper }))}
              </div>
            </div>
          </div>

          {loadMore && (
            <div className={s.documents__button}>
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
