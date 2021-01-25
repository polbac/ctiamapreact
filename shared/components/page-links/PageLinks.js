import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './PageLinks.scss';

export default class PageLinks extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    const singleChild = React.Children.toArray(children).length === 1;
    const imageCount = [];

    React.Children.toArray(this.props.children).filter((child, i) => (
      child.props.image ? imageCount.push(i + 1) : null
    ));

    const imageSum = imageCount.length > 0 ? imageCount.reduce((sum, x) => sum + x) : 0;

    return (
      <div className={s(s.pageLinks, `images-${imageSum}`, { singleChild })}>
        {children}
      </div>
    );
  }
}

