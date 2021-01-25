import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';
import Button from 'components/button';

import s from './Split.scss';

export default class Split extends PureComponent {

  static propTypes = {
    image: WordPressImage.propTypes.image,
    name: PropTypes.string,
    title: PropTypes.string,
    quote: PropTypes.string,
    to: PropTypes.string,
  }

  static defaultProps = {
    name: 'John Doe',
    title: 'Employee',
  }

  render() {
    const { image, name, title, quote, to } = this.props;

    const firstName = name.split(' ')[0];

    return (
      <div className={s.split}>
        <div className={s.split__background}>
          {image && image.url && (
            <div className={s.split__image} style={{ backgroundImage: `url(${image.url})` }}>
              <img src={image.url} alt={image.alt || name} className={s.split__img} />
            </div>
          )}
        </div>
        <div className={s.split__container}>
          <div className={s.split__row}>
            <div className={s.split__col}>
              <div className={s.split__content}>
                <h2 className={s.split__name}>{name}</h2>
                <p className={s.split__title}>{title}</p>
                {quote && quote !== '' ? (
                  <blockquote className={s.split__quote}>{quote}</blockquote>
                ) : null}
                {to && (
                  <div className={s.split__button}>
                    <Button to={to}>{`See ${firstName}'s Bio`}</Button>
                  </div>
                )}
              </div>
            </div>
            <div className={s.split__col}>
              <div className={s.split__aspect} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
