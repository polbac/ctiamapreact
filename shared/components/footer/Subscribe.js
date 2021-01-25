import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';

import IconMobile from 'assets/images/icons/mobile-minute.svg';

import Button from 'components/button';
import Portal, { Modal } from 'components/portal';

import MobileMinute from './MobileMinute';
import s from './Subscribe.scss';

class Subscribe extends Component {

  static propTypes = {
    ui: PropTypes.object,
    location: PropTypes.object,
    title: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    buttonText: PropTypes.string,
  }

  toggle = () => {
    const { ui, location } = this.props;

    ui.isSignupVisible = !ui.isSignupVisible;

    if (location.pathname === '/mobile-minute-signup') {
      window.history.replaceState({}, null, '/');
    }
  }

  render() {
    const { title, text, link, buttonText, ui } = this.props;
    const { isSignupVisible } = ui;

    return (
      <div className={s.subscribe}>
        <h2 className={s.subscribe__heading}>
          <span className={s.subscribe__headingIcon}><IconMobile /></span>
          <span className={s.subscribe__headingText}>{title}</span>
        </h2>

        <div className={s.subscribe__content}>
          <div className={s.subscribe__copy}>
            {text}
          </div>

          {link && (
            <div className={s.subscribe__submit}>
              <Button blue onClick={this.toggle}>{buttonText}</Button>
            </div>
          )}
        </div>

        <Portal>
          <TransitionGroup>
            {isSignupVisible && (
              <Modal
                onClick={this.toggle}
                ref={(el) => { this.modal = el; }}
              >
                <MobileMinute />
              </Modal>
            )}
          </TransitionGroup>
        </Portal>
      </div>
    );
  }
}

const withInject = inject('ui')(observer(Subscribe));

export default withRouter(withInject);
