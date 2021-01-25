import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import StateModal from './StateModal';

export default class Wrapper extends PureComponent {

  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,
  }

  render() {
    const { isOpen, children, ...props } = this.props;

    return (
      <TransitionGroup>
        {isOpen && (
          <StateModal {...props}>
            {children}
          </StateModal>
        )}
      </TransitionGroup>
    );
  }
}
