import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from 'utils/config';
import validateEmail from 'utils/validate-email';

import ClockSvg from 'assets/images/icons/icon-mobileminute.svg';

import Button from 'components/button';

import s from './MobileMinute.scss';

const subscribeEndpoint = '/api/forms/subscribe';

export default class MobileMinute extends PureComponent {

  static propTypes = {
    onCloseClick: PropTypes.func,
  }

  state = {
    state: 'initial',
    emailError: false
  }

  onChange = (e) => {
    if (!e.target) {
      return;
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.form.checkValidity()) {
      const { first_name, last_name, email } = this.state;
      const data = new FormData();

      data.append('first_name', first_name);
      data.append('last_name', last_name);
      data.append('email', email);

      if (!validateEmail(email)) {
        return this.setState({ emailError: true });
      }

      this.setState({ state: 'loading', emailError: false });

      const { method, action: url } = e.target;
      const headers = { 'X-Requested-With': 'XMLHttpRequest' };


      axios({ url, method, data, headers })
        .then((res) => {
          const { success, err, ...rest } = res.data;

          this.setState({
            state: success ? 'success' : 'error',
          });

          if (!success) {
            console.warn(err, ...rest);
          }
        });
    }
  }

  render() {
    const { onCloseClick } = this.props;
    const { state, emailError } = this.state;

    return (
      <div className={s.mobile}>
        <div className={s.mobile__badge}>
          <ClockSvg />
        </div>

        {state === 'success' && (
          <div className={s.mobile__overlay}>
            <h1 className={s.mobile__headline}>Thanks for signing up!</h1>
            <p className={s.mobile__copy}>CTIA Mobile Minute is a free e-newsletter featuring the wireless products and services that empower, inspire and entertain.</p>
            <Button onClick={onCloseClick}>Close</Button>
          </div>
        )}

        {state === 'error' && (
          <div className={s.mobile__overlay}>
            <h1>Error</h1>
            <Button onClick={onCloseClick} to="/about-ctia/contact-us/">Contact us</Button>
          </div>
        )}

        {state === 'loading' && (
          <div className={s.mobile__overlay} />
        )}

        <div className={s.mobile__left}>
          <h1 className={s.mobile__headline}>Mobile Minute Subscription</h1>

          <p className={s.mobile__copy}>CTIA Mobile Minute is a free e-newsletter featuring the wireless products and services that empower, inspire and entertain.</p>

          <small className={s.mobile__footer}>By submitting this form, you are granting: CTIA,
            1400 16th Street, NW Suite 600,
            Washington, District of Columbia, 20036, United States, http://www.ctia.org
            permission to email you. You may unsubscribe via the link found at the bottom of
            every email.</small>
        </div>

        <div className={s.mobile__right}>
          <form
            ref={(c) => { this.form = c; }}
            method="post"
            encType="application/x-www-form-urlencoded"
            action={subscribeEndpoint}
            onSubmit={this.onSubmit}
          >

            <div className={s.mobile__form}>
              <label // eslint-disable-line
                className={s.mobile__label}
                htmlFor="first_name"
              >
                First Name
              </label>

              <input
                className={s.mobile__input}
                id="first_name"
                type="text"
                name="first_name"
                onChange={this.onChange}
                required
                aria-required="true"
              />
            </div>

            <div className={s.mobile__form}>
              <label // eslint-disable-line
                className={s.mobile__label}
                htmlFor="last_name"
              >
                Last Name
              </label>

              <input
                className={s.mobile__input}
                id="last_name"
                type="text"
                name="last_name"
                onChange={this.onChange}
                required
                aria-required="true"
              />
            </div>

            <div className={s.mobile__form}>
              <label // eslint-disable-line
                className={s.mobile__label}
                htmlFor="email"
              >
                Email Address
              </label>

              <input
                className={s(s.mobile__input, { emailError })}
                id="email"
                type="email"
                name="email"
                onChange={this.onChange}
                required
                aria-required="true"
              />
            </div>

            <div className={s.mobile__form}>
              <label // eslint-disable-line
                className={s.mobile__check}
                htmlFor="termsandconditions"
              >By selecting you agree to our <Link to="/terms" target="_blank">Terms and Conditions</Link>
              </label>
              <input
                className={s.mobile__checkbox}
                type="checkbox"
                name="termsandconditions"
                required
              />

              {/* <label // eslint-disable-line
                className={s.mobile__check}
              >
                <input
                  className={s.mobile__checkbox}
                  type="checkbox"
                  required
                />

                By selecting you agree to our <Link to="/terms" target="_blank">Terms and Conditions</Link>
              </label> */}
            </div>

            <div>
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
