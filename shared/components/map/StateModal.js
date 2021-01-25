import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';

import { Number } from 'components/assets';

import PrintSvg from 'assets/images/icons/icon-print-optim.svg';

import s from './StateModal.scss';

export default class StateModal extends PureComponent {

  static propTypes = {
    stateName: PropTypes.string,
    abbreviation: PropTypes.string,
    text: PropTypes.string,
    data: PropTypes.array,
    sources: PropTypes.array,
    type: PropTypes.oneOf(['4g', '5g']),
    in: PropTypes.bool,
    children: PropTypes.node,
  }

  componentWillEnter(el, cb) {
    const timeline = new TimelineLite();
    const ease = 'Power4.easeInOut';

    if (!el) {
      return;
    }

    timeline.fromTo(
      el,
      0.5,
      { opacity: 0 },
      { opacity: 1 },
    );

    if (this.left) {
      timeline.fromTo(
        this.left,
        1.6,
        { x: '-250%' },
        { x: '0%', ease },
        '0',
      );
    }

    if (this.right) {
      timeline.fromTo(
        this.right,
        1.6,
        { x: '250%' },
        { x: '0%', ease },
        '0',
      );
    }

    if (this.content.childNodes) {
      timeline.staggerFromTo(
        this.content.childNodes,
        0.3,
        { x: -10, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, ease },
        0.1,
        '0.2',
      );
    }

    if (this.statistics) {
      timeline.fromTo(
        this.statistics,
        0.3,
        { x: 10, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, ease },
        '0.8',
      );
    }

    if (this.resources) {
      timeline.fromTo(
        this.resources,
        0.3,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease },
        '0.8',
      );
    }

    this.timeline = timeline;

    timeline.call(cb);
  }

  componentWillLeave(el, cb) {
    if (!el) {
      return;
    }

    const timeline = new TimelineLite();

    timeline.to(
      el,
      0.5,
      { opacity: 0 },
    );

    timeline.call(cb);
  }

  transitionHandler = (node, cb) => {
    if (this.props.in) {
      this.componentWillEnter(node, cb);
    } else {
      this.componentWillLeave(node, cb);
    }
  }

  render() {
    const {
      stateName,
      abbreviation,
      text,
      data,
      sources,
      type,
      children,
      ui, // eslint-disable-line
      statistics, // eslint-disable-line
      ...props
    } = this.props;

    const is5g = type === '5g';
    const numberColors = 'green-blue';

    return (
      <Transition addEndListener={this.transitionHandler} {...props}>
        <div className={s(s.stateModal, { is5g })}>
          <div className={s.stateModal__wrapper}>
            <img
              src={require('!file-loader!assets/images/5g/state-modal-left.svg')}
              className={s.stateModal__left}
              ref={(c) => { this.left = c; }}
              alt=""
            />
            <img
              src={require('!file-loader!assets/images/5g/state-modal-right.svg')}
              className={s.stateModal__right}
              ref={(c) => { this.right = c; }}
              alt=""
            />
            <div className={s.stateModal__container}>
              <div className={s.stateModal__row}>
                <div className={s.stateModal__colContent} ref={(c) => { this.content = c; }}>
                  <Fragment>
                    <div className={s.stateModal__heading} ref={(c) => { this.heading = c; }}>
                      <h2 className={s.stateModal__stateName}>
                        {stateName}
                        <span className={s.stateModal__abbreviation}>{`(${abbreviation})`}</span>
                      </h2>
                    </div>
                    <p
                      className={s.stateModal__text}
                      ref={(c) => { this.text = c; }}
                    >
                      {text}
                    </p>
                    {type === '4g' && (
                      <a href={`/4g-assets/WirelessImpact_${abbreviation}.pdf`} target="_blank" className={s.stateModal__download}>
                        <img
                          className={s.stateModal__download__icon}
                          src={require('!file-loader!assets/images/icons/actionicon-download.svg')}
                          alt=""
                        />
                        <div className={s.stateModal__download__label}>
                          PDF
                        </div>
                      </a>
                    )}
                    {type === '5g' && (
                      <Link
                        to={`/${type}/print?state=${abbreviation}`}
                        className={s.stateModal__print}
                      >
                        Print
                        <PrintSvg className={s.stateModal__printIcon} />
                      </Link>
                    )}
                    {data.map(({ number, copy }, i) => (
                      <div key={i} className={s.stateModal__numberBlock}>
                        <div className={s.stateModal__number}>
                          <Number
                            className={s.stateModal__numberSvg}
                            colors={numberColors}
                          >
                            {number}
                          </Number>
                        </div>

                        <p className={s.stateModal__copy}>{copy}</p>
                      </div>
                    ))}
                  </Fragment>
                </div>
                <div className={s.stateModal__colStatistics}>
                  <div ref={(c) => { this.statistics = c; }} >
                    {children}
                  </div>
                  {sources && sources.length > 0 && (
                    <div className={s.stateModal__resources} ref={(c) => { this.resources = c; }}>
                      {sources.map(({ link, name }, i) => (
                        <div key={i} className={s.stateModal__resource}>
                          <span className={s.stateModal__resourceNumber}>{i + 1}</span>
                          <a href={link} className={s.stateModal__resourceLink}>
                            {name}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}
