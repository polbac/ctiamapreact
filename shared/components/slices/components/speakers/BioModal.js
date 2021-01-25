import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import convertToRouterLink from 'utils/convertToRouterLink';

import Button from 'components/button';

import s from './BioModal.scss';

export default class BioModal extends PureComponent {

  static propTypes = {
    onCloseClick: PropTypes.func,
    name: PropTypes.string,
    position: PropTypes.string,
    content: PropTypes.string,
  };

  render() {
    const { onCloseClick, name, position, content } = this.props;

    return (
      <div className={s.modal}>
        <div className={s.modal__content}>
          <h3 className={s.modal__name}>{name}</h3>
          <p className={s.modal__position}>{position}</p>
          {ReactHtmlParser(content, { transform: convertToRouterLink })}
          <Button blue onClick={onCloseClick}>Close</Button>
        </div>
      </div>
    );
  }
}
