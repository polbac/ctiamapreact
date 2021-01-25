import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';
import { Number } from 'components/assets';

import { NumData } from 'routes/the-wireless-industry/routes/five-g/components/num-data';

import s from './Intro.scss';

export default class Intro extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    subline: PropTypes.node,
    data: PropTypes.array,
    numberColors: PropTypes.string,
    onClick: PropTypes.func,
    isNew5g: PropTypes.bool,
  }

  static defaultProps = {
    isNew5g: false,
  }

  state = {};

  render() {
    const {
      heading,
      subline,
      data,
      numberColors,
      onClick,
      isNew5g,
    } = this.props;

    return (
      <div className={s(s.intro, { isNew5g })}>
        <div className={s.intro__header}>
          <h1 className={s.intro__heading}>{heading}</h1>
          <p className={s.intro__subline}>{subline}</p>
        </div>

        <div className={s.intro__numbers}>
          {data.map(({ number, copy }, i) => (
            <div className={s.intro__wrapper} key={i}>
              <div className={s.intro__number}>
                { isNew5g ? (
                  <NumData className={s.intro__numberSvg}>{number}</NumData>
                ) : (
                  <Number className={s.intro__numberSvg} colors={numberColors}>{number}</Number>
                )}
              </div>
              <p className={s.intro__copy}>{copy}</p>
            </div>
          ))}
        </div>

        <Button
          className={s.intro__button}
          onClick={onClick}
        >
          See Data By State
        </Button>
      </div>
    );
  }
}
