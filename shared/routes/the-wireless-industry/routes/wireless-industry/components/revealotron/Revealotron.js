import React, { PureComponent, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Revealotron extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        {React.Children.map(children, (c, i) => cloneElement(c, {
          isRevealing: true,
          style: { zIndex: children.length - i },
        }))}
      </Fragment>
    );
  }
}
