import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import Animator from 'components/animator';
import Portal, { Video } from 'components/portal';

import s from './SidebarLink.scss';

export default class Shortcut extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    video: PropTypes.string,
  }

  state = {
    openModal: false,
  }

  handleClick = () => {
    this.setState({ openModal: !this.state.openModal });
  }

  render() {
    const { title, video } = this.props;
    const { openModal } = this.state;

    return (
      <Fragment>
        <Animator>
          <div className={s.sidelink}>
            <div className={s.sidelink__container}>
              <div className={s.sidelink__content}>
                <button aria-label="plays" className={s.sidelink__card} onClick={this.handleClick}>
                  <div className={s.sidelink__map}>
                    <div className={s.sidelink__circle}>
                      <img
                        src={require('!file-loader!assets/images/5g/hero/play-btn.svg')}
                        className={s.sidelink__svg}
                        alt="play button"
                      />
                    </div>

                    <img className={s.sidelink__image} src={require('assets/images/5g/hero/cover.jpg')} alt="Woman with laptop, construction worker on smartphone" />
                  </div>

                  <div className={s.sidelink__title}>{title}</div>
                </button>
              </div>
            </div>
          </div>
        </Animator>

        <Portal>
          <TransitionGroup>
            {openModal && (
              <Video
                video={video}
                onClick={this.handleClick}
              />
            )}
          </TransitionGroup>
        </Portal>
      </Fragment>
    );
  }
}
