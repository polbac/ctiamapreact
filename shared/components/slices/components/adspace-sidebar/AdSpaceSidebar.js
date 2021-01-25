import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
import Button from 'components/button';
import Portal, { Modal } from 'components/portal';
import { Link } from 'react-router-dom';
import MobileMinute from 'components/footer/MobileMinute';

import s from './AdSpaceSidebar.scss';

class AdSpaceSidebar extends Component {

  static propTypes = {
    ui: PropTypes.object,
    location: PropTypes.object,
    hasMobileMinuteSubscription: PropTypes.bool,
    adSpaceRepeater: PropTypes.array,
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
    const { hasMobileMinuteSubscription, buttonText, adSpaceRepeater, ui } = this.props;
    const { isSignupVisible } = ui;

    return (
      <div className={s.AdSpaceSidebar}>

        {hasMobileMinuteSubscription && (
          <Fragment>
            <div className={s.MobileMinuteBox}>
              <div className={s.MobileMinuteBox__container}>
                <div className={s.MobileMinuteBox__row}>
                  <div className={s.MobileMinuteBox__col}>
                    <div className={s.MobileMinuteBox__mobileMinute}>
                      <h3 className={s.MobileMinuteBox__title}>Sign up for Mobile Minute!</h3>
                      <p className={s.MobileMinuteBox__content}>
                      Get features on wireless products and services by email.
                      </p>
                      <div className={s.MobileMinuteBox__button}>
                        <Button blue onClick={this.toggle}>{buttonText}</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            {/* adSpaceRepeater will go */}
          </Fragment>
        )}
        {adSpaceRepeater.length && adSpaceRepeater.map((ad) => {
          const isLink = (typeof ad.link !== 'undefined');
          const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(ad.link);
          const anchorContent = (
            <Fragment key={ad.image.id}>
              <img className={s.MobileMinuteBox__adImage} src={ad.image.url} alt="Ads on right sidebar" />
              <div className={s.MobileMinuteBox__adLinkBox}>
                <span className={s.MobileMinuteBox__adLink}>{ad.text}</span>
              </div>
            </Fragment>
          );

          return (<div key={ad.image.id} className={s.MobileMinuteBox} >
            <div className={s.MobileMinuteBox__container}>
              <div className={s.MobileMinuteBox__row}>
                <div className={s(s.MobileMinuteBox__col, { margin: true })} >
                  {isExternal ? <a className={s.MobileMinuteBox__overlay} target="_blank" rel="noopener noreferrer" href={ad.link} >{anchorContent}</a> : <Link to={ad.link}>{anchorContent}</Link>}
                  {/* <div className={s.MobileMinuteBox__overlay} /> */}
                </div>
              </div>
            </div>
          </div>);
        })}
      </div>
    );
  }
}

const withInject = inject('ui')(observer(AdSpaceSidebar));

export default withRouter(withInject);
