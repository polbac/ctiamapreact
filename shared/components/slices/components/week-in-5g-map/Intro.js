import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './Intro.scss';

export default class Intro extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    subline: PropTypes.node,
    onClick: PropTypes.func,
  }

  state = {};

  render() {
    const {
      heading,
      subline,
      onClick,
    } = this.props;

    return (
      <div className={s.intro}>
        <div className={s.intro__header}>
          <h1 className={s.intro__heading}>{heading}</h1>
          <p className={s.intro__subline}>{subline}</p>
        </div>

        <div className={s.intro__numbers} />

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
