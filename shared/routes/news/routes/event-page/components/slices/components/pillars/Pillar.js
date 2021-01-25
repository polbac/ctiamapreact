import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';

import s from './Pillar.scss';

export default class Pillar extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    icon: WordPressImage.propTypes.image,
    copy: PropTypes.string,
  }

  render() {
    const { heading, icon, copy } = this.props;

    return (
      <div className={s.pillar__col}>
        <div className={s.pillar__container}>
          {icon && icon.url && (

            <img
              ref={(c) => { this.image = c; }}
              className={s.pillar__icon}
              src={icon.url}
              alt={icon.alt}
            />

          )}
          <div className={s.pillar__heading}>{heading}</div>
          <div className={s.pillar__content}><p>{copy}</p></div>
        </div>
      </div>
    );
  }
}
