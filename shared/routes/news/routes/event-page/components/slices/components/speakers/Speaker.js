import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { WordPressImage } from 'components/image';

import s from './Speaker.scss';

export default class Speaker extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    image: WordPressImage.propTypes.image,
    handleClick: PropTypes.func,
  }

  state = {
    isActive: false,
  }

  onClick = () => {
    const { isActive } = this.state;

    this.setState({ isActive: !isActive });
    this.props.handleClick();
  }

  render() {
    const { name, title, image } = this.props;
    const { isActive } = this.state;

    return (
      <div className={s.Speaker__wrapper}>
        <button aria-label="peforms an action" className={s(s.Speaker__button, { isActive })} onClick={this.onClick}>
          <div className={s(s.Speaker__container, { isActive })}>
            {image && image.url && (
              <img
                ref={(c) => { this.image = c; }}
                className={s.Speaker__image}
                src={image.url}
                alt={image.alt}
                title={image.title}
              />
            )}
            <div className={s(s.Speaker__info, { isActive })}>
              <strong>{name}</strong>
              {ReactHtmlParser(title)}
            </div>
            <div className={s(s.Speaker__close, { isActive })}>
              Click to Close
            </div>
          </div>
        </button>
      </div>
    );
  }
}
