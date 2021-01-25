import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';

import 'styles/fonts.css';

import s from './AppLayout.scss';

class AppLayout extends Component {

  static propTypes = {
    ui: PropTypes.object,
    children: PropTypes.node,
  }

  componentDidMount() {
    const { ui } = this.props;

    this.reaction = reaction(
      () => ui.isScrollDisabled,
      (isScrollDisabled) => {
        const html = document.querySelector('html');

        if (isScrollDisabled) {
          ui.lastScrollPosition = window.scrollY;
          this.layout.style.top = `${-ui.lastScrollPosition}px`;
          html.classList.toggle('is-scroll-disabled', true);
        } else {
          html.classList.toggle('is-scroll-disabled', false);
          this.layout.style.top = '';
          window.scrollTo(0, ui.lastScrollPosition);
        }
      },
    );
  }

  componentWillUnmount() {
    if (this.reaction) {
      this.reaction();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.layout} ref={(c) => { this.layout = c; }}>
        {children}
      </div>
    );
  }
}

export default inject('ui')(observer(AppLayout));
