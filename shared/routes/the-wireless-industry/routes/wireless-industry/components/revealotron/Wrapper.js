import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import share from 'utils/share';

import ShareLink from 'components/share-link';

import s from './Wrapper.scss';

export default class Wrapper extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    link: PropTypes.string,
    gray: PropTypes.bool,
  }

  render() {
    const { children, link, gray } = this.props;

    return (
      <div className={s(s.wrapper, { gray })}>
        {children}

        <footer className={s.wrapper__footer}>
          <div className={s.wrapper__container}>
            <div className={s.wrapper__row}>
              <div className={s.wrapper__col}>
                <ul className={s.wrapper__list}>
                  {['Facebook', 'Twitter', 'LinkedIn'].map(item => (
                    <button aria-label="shares item" className={s.wrapper__item} key={item} onClick={() => share(item)}>
                      <img
                        src={require(`!file-loader!assets/images/icons/actionicon-${item.toLowerCase()}.svg`)} // eslint-disable-line
                        alt=""
                      />
                    </button>
                  ))}
                </ul>

                {link && <ShareLink link={link} />}
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
