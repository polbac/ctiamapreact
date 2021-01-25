import React from 'react';
import PropTypes from 'prop-types';

import ModalContent from './ModalContent';

export default class Modal extends React.Component {

  state = {
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
  }

  static propTypes = {
    children: PropTypes.node,
    component: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    component: 'div',
  }

  componentDidMount() {
    if (this.el) {
      const { top, left } = this.el.getBoundingClientRect();
      const scrollY = (window.scrollY !== undefined) ? window.scrollY : window.pageYOffset;
      const scrollX = (window.scrollX !== undefined) ? window.scrollX : window.pageXOffset;

      this.setState({ top: top + scrollY, left: left + scrollX }); // eslint-disable-line
    }
  }

  render() {
    const { component, className, children } = this.props;
    const { top, right, bottom, left } = this.state;

    const styles = {
      top,
      right,
      bottom,
      left,
    };

    return (
      <div ref={(el) => { this.el = el; }}>
        {top && (
          <ModalContent
            component={component}
            className={className}
            style={styles}
          >
            {children}
          </ModalContent>
        )}
      </div>
    );
  }
}
