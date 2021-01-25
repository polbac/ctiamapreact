import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Graph } from 'components/graph-block';

import s from './Infographic.scss';

export default class Infographic extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    isWide: PropTypes.bool,
    definition: PropTypes.string,
  }

  static defaultProps = {
    definition: '{"type":"hills","data":[{"id":1,"label":"Item #0","value":19,"color":"#593c81"},{"id":2,"label":"Item #1","value":"30","color":"#d1e42d"},{"id":3,"label":"Item #2","value":14,"color":"#971f3f"}],"meta":{"prefix":"","postfix":""}}',
  }

  render() {
    const { title, isLoading, isWide, definition } = this.props;

    return (
      <figure className={s(s.infographic, { isLoading, isWide })}>
        <div className={s.infographic__container}>
          <div className={s.infographic__row}>
            <div className={s.infographic__col}>
              <h2 className={s.infographic__title}>{title}</h2>
            </div>
          </div>
          <div className={s.infographic__content}>
            <div className={s.infographic__graph}>
              <Graph definition={definition} />
            </div>
          </div>
        </div>
      </figure>
    );
  }
}
