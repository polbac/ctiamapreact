import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import validateEmail from 'utils/validate-email';

import LockSvg from 'assets/images/icons/workinggroupsicon-cybersecurity.svg';

import Button from 'components/button';

import s from './MembersOnlyPrompt.scss';

const membersEndpoint = '/api/forms/members';

class MembersOnlyPrompt extends Component {

  static propTypes = {
    history: PropTypes.object,
    to: PropTypes.string,
    onClose: PropTypes.func,
  }

  state = {
    emailError: false,
  }

  redirect = () => {
    const { to, onClose } = this.props;

    if (to) {
      if (onClose) {
        onClose();
      }

      setTimeout(() => {
        this.props.history.push({
          pathname: to,
          state: { isUnlock: true },
        });
      }, 500);

      return;
    }

    if (onClose) {
      onClose();
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { onClose } = this.props;
    const { email } = this.state;

    const data = new FormData(e.target);
    const { method, action: url } = e.target;
    const headers = { 'X-Requested-With': 'XMLHttpRequest' };

    if (!validateEmail(email)) {
      return this.setState({ emailError: true });
    }

    axios({ url, method, data, headers })
      .then(this.redirect)
      .catch((err) => {
        const { data: errorData } = err.response;

        onClose();

        console.error('-error', errorData);
      });
  }

  onChange = (e) => {
    const { emailError } = this.state;

    if (emailError) {
      this.setState({ emailError: false });
    }

    this.setState({ email: e.target.value });
  }

  render() {
    const { emailError } = this.state;

    return (
      <div className={s.prompt}>
        <div className={s.prompt__badge}>
          <LockSvg />
        </div>

        <div className={s.prompt__left}>
          <h1 className={s.prompt__headline}>Restricted Access</h1>

          <p className={s.prompt__copy}>This report is accessible for members only.
          Please enter your email to unlock it.</p>

          <small className={s.prompt__footer}>Any trouble to access this document,
          please <Link to="/about-ctia/contact-us">contact us</Link>.</small>
        </div>

        <div className={s.prompt__right}>
          <form
            ref={(c) => { this.form = c; }}
            method="post"
            action={membersEndpoint}
            encType="application/x-www-form-urlencoded"
            onSubmit={this.onSubmit}
          >
            <div className={s.prompt__form}>
              <label // eslint-disable-line
                className={s.prompt__label}
                htmlFor="email"
              >
                Enter your email
              </label>

              <input
                className={s(s.prompt__input, { emailError })}
                type="email"
                name="email"
                id="email"
                onChange={this.onChange}
                required
              />

              <Button type="submit">Unlock</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MembersOnlyPrompt);
