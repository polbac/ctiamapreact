import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/button';

import s from './InfoBlock.scss';

export default class InfoBlock extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    text: PropTypes.string,
    to: PropTypes.string,
    buttonText: PropTypes.string,
  }

  static defaultProps = {
    buttonText: 'View Details',
  }

  render() {
    const { children, title, text, to, buttonText } = this.props;

    return (
      <div className={s.infoBlock}>
        <div className={s.infoBlock__row}>
          <div className={s.infoBlock__col}>
            <h2 className={s.infoBlock__title}>{title}</h2>
            <p className={s.infoBlock__paragraph}>{text}</p>
            <Button to={to}>{buttonText}</Button>
          </div>
          <div className={s.infoBlock__col}>
            {children}
          </div>
        </div>

      </div>
    );
  }
}
