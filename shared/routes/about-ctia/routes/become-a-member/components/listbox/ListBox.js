import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import CupSvg from 'assets/images/icons/workinggroupsicon-certification-optim.svg';

import s from './ListBox.scss';

export default class InfoBlock extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    text: PropTypes.string,
  }

  static defaultProps = {
    title: 'Key Benefits',
    icon: <CupSvg />,
  }

  render() {
    const { title, icon, text } = this.props;

    return (
      <div className={s.listBox}>
        <div className={s.listBox__header}>
          {icon && (
            <div className={s.listBox__icon}>{icon}</div>
          )}
          <h3 className={s.listBox__title}>{title}</h3>
        </div>
        <div className={s.listBox__content}>
          {ReactHtmlParser(text)}
        </div>
      </div>
    );
  }
}
