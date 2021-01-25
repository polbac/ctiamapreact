import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Header } from 'components/wrappers';

import s from './List.scss';

export default class Sections extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
    segment: PropTypes.bool,
  }

  render() {
    const { children, heading, segment } = this.props;

    if (typeof items === 'boolean') {
      return null;
    }

    return (
      <div className={s(s.list, { segment })}>
        <div className={s.list__container}>
          {heading && (
            <div className={s.list__headline}>
              <Header>{heading}</Header>
            </div>
          )}

          <ul className={s.list__list}>
            {React.Children.map(children, (c, i) => (
              <li key={i} className={s.list__item}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
