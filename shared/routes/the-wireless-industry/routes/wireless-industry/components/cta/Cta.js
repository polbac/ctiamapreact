import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './Cta.scss';

export default class Cta extends PureComponent {

  static propTypes = {
    button: PropTypes.string,
    link: PropTypes.string,
  }

  render() {
    const { button, link } = this.props;

    return (
      <div className={s.cta}>
        <div className={s.cta__wrapper}>
          <svg viewBox="0 0 313.2 176.5" className={s.cta__streakHeadingLeft}>
            <path ref={(c) => { this.streakHeadingLeft1 = c; }} fill="#C6D3E0" d="M196,160.4c4.3,0,7.7,3.5,7.7,7.7s-3.5,7.7-7.7,7.7c-4.3,0-7.7-3.5-7.7-7.7C188.3,163.9,191.7,160.4,196,160.4z" />
            <path ref={(c) => { this.streakHeadingLeft2 = c; }} fill="#FA7A47" d="M300.4,93.5c7.1,0,12.8,5.8,12.8,12.9c0,7.1-5.8,12.8-12.9,12.8c-7.1,0-12.8-5.8-12.8-12.9 C287.5,99.2,293.3,93.5,300.4,93.5z" />
            <path ref={(c) => { this.streakHeadingLeft3 = c; }} fill="none" stroke="#C6D3E0" strokeWidth="20" strokeLinecap="round" strokeMiterlimit="10" d="M59.5,42.2c0,0,17.5-5.5,66-17.8s68.8-15,68.8-15" />
            <path ref={(c) => { this.streakHeadingLeft4 = c; }} fill="none" stroke="#FFFFFF" strokeWidth="30" strokeLinecap="round" strokeMiterlimit="10" d="M15.5,109.4c0,0,60.3-23.9,139.3-42.1S294,43.6,294,43.6" />
            <path ref={(c) => { this.streakHeadingLeft5 = c; }} fill="#593C81" d="M15.5,93.9c8.6,0,15.5,6.9,15.5,15.5s-6.9,15.5-15.5,15.5S0,117.9,0,109.4S6.9,93.9,15.5,93.9L15.5,93.9z" />
          </svg>

          <img
            src={require('!file-loader!assets/images/5g/hero/heading.svg')}
            className={s.cta__heading}
            ref={(c) => { this.heading = c; }}
            alt=""
          />

          <svg viewBox="0 0 319.5 154.6" className={s.cta__streakHeadingRight}>
            <path ref={(c) => { this.streakHeadingRight1 = c; }} fill="none" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" strokeMiterlimit="10" d="M96.2,125.7c0,0,61.2-7.7,130.8-31.3" />
            <path ref={(c) => { this.streakHeadingRight2 = c; }} fill="none" stroke="#FFFFFF" strokeWidth="30" strokeLinecap="round" strokeMiterlimit="10" d="M15,89.2c0,0,148.2-14.7,289.5-73.8" />
            <path ref={(c) => { this.streakHeadingRight3 = c; }} fill="#FA7A47" d="M75.7,1c3.7-2.1,8.4-0.8,10.5,2.9c2.1,3.7,0.8,8.4-2.9,10.5c-3.7,2.1-8.4,0.9-10.5-2.8C70.7,7.9,72,3.2,75.7,1z" />
            <path ref={(c) => { this.streakHeadingRight4 = c; }} fill="#D1E141" d="M182.6,140.2c3.7-2.1,8.4-0.9,10.5,2.8c2.1,3.7,0.9,8.4-2.8,10.5c-3.7,2.1-8.4,0.9-10.5-2.8C177.6,147.1,178.9,142.4,182.6,140.2z" />
            <path ref={(c) => { this.streakHeadingRight5 = c; }} fill="#78CDD1" d="M7.7,76.7c6.9-4,15.8-1.6,19.8,5.3c4,6.9,1.6,15.8-5.3,19.8c-6.9,4-15.8,1.6-19.8-5.3c0,0,0,0,0,0C-1.6,89.6,0.8,80.7,7.7,76.7z" />
            <path ref={(c) => { this.streakHeadingRight6 = c; }} fill="#78CDD1" d="M221.9,85.7c4.8-2.8,10.9-1.1,13.7,3.7s1.1,10.9-3.7,13.7s-10.9,1.1-13.7-3.7c0,0,0,0,0,0C215.5,94.5,217.1,88.4,221.9,85.7z" />
          </svg>

          <img
            src={require('!file-loader!assets/images/wireless-industry/cta/city-left.svg')}
            className={s.cta__left}
            alt=""
          />

          <img
            src={require('!file-loader!assets/images/wireless-industry/cta/city-right.svg')}
            className={s.cta__right}
            alt=""
          />
        </div>

        <Button className={s.cta__button} to={link}>{button}</Button>
      </div>
    );
  }
}
