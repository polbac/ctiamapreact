import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import Portal, { Modal } from 'components/portal';
import MembersOnlyPrompt from 'components/members-only-prompt';

export default class MembersOnlyPromptContainer extends PureComponent {

  static propTypes = {
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
    to: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      show: !props.to,
    };
  }

  onClick = () => {
    const { to, onClick } = this.props;

    if (!to) {
      return this.setState({ show: false });
    }

    if (onClick) {
      onClick();
    }
  }

  render() {
    const { isVisible, to } = this.props;
    const { show } = this.state;

    return (
      <Portal>
        <TransitionGroup>
          {(isVisible || show) && (
            <Modal onClick={this.onClick} cantClose={show}>
              <MembersOnlyPrompt
                to={to}
                onClose={this.onClick}
              />
            </Modal>
          )}
        </TransitionGroup>
      </Portal>
    );
  }
}
