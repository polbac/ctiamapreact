import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import LogoSvg from 'assets/images/ctia-logo.svg';
import CoinLogoSvg from 'assets/images/icons/icon-economic-benefits.svg';

import Hero from 'components/hero';

import NumberBlock from './NumberBlock';
import s from './PrintPreview.scss';

export default class PrintPreview extends PureComponent {

  static propTypes = {
    stateName: PropTypes.string,
    abbreviation: PropTypes.string,
    text: PropTypes.string,
    data: PropTypes.array,
    sources: PropTypes.array,
    children: PropTypes.node,
    type: PropTypes.oneOf(['4g', '5g']),
  }

  static defaultProps = {
    data: {},
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const { stateName, abbreviation, text, data, sources, type, children } = this.props;
    const is5g = type === '5g';
    const numberColors = 'green-blue';

    return (
      <div className={s(s.printPreview, { is5g })}>
        <div className={s.printPreview__container}>
          <div className={s.printPreview__top}>
            <button
              className={s(s.printPreview__title, s.printPreview__topLink)}
              onClick={this.context.router.history.goBack}
              aria-label="goes to previous page"
            >
              Go back
            </button>

            <p className={s.printPreview__title}>Print Preview</p>
          </div>

          <div className={s.printPreview__wrapper}>
            <img
              src={require('!file-loader!assets/images/5g/state-modal-left.svg')}
              className={s.printPreview__left}
              ref={(c) => { this.left = c; }}
              alt=""
            />

            <img
              src={require('!file-loader!assets/images/5g/state-modal-right.svg')}
              className={s.printPreview__right}
              ref={(c) => { this.right = c; }}
              alt=""
            />

            <div className={s.printPreview__row}>
              <div className={s.printPreview__col}>
                <div className={s.printPreview__header}>
                  <LogoSvg className={s.printPreview__logoSvg} />
                  {/* <Link to="#" className={s.printPreview__link}>
                    https://ctia.org/Economic-benefits-map
                  </Link> */}
                </div>
              </div>
            </div>

            <Hero center>
              <div className={s.printPreview__coinWrapper}>
                <div className={s.printPreview__coin}>
                  <CoinLogoSvg className={s.printPreview__svg} />
                </div>
              </div>

              <h1 className={s.printPreview__heading}>
                5G Economic Impact
              </h1>
            </Hero>

            <div className={s.printPreview__row}>
              <div className={s.printPreview__col}>
                <div className={s.printPreview__flex}>

                  <div className={s.printPreview__flexState}>
                    <div className={s.printPreview__state}>
                      <h2 className={s.printPreview__stateName}>
                        {stateName}
                        <span className={s.printPreview__abbreviation}>{`(${abbreviation})`}</span>
                      </h2>
                    </div>
                  </div>
                  <div className={s.printPreview__flexData}>
                    <p className={s.printPreview__stateInfo}>{text}</p>
                    <div className={s.printPreview__data}>
                      {data.map(({ number, copy }, i) => (
                        <div key={i} className={s.stateModal__numberBlock}>
                          <NumberBlock
                            data={number}
                            copy={copy}
                            colors={numberColors}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.printPreview__row}>
              <div className={s.printPreview__col}>
                {children}
              </div>
            </div>

            <div className={s.printPreview__border} />
            <div className={s.printPreview__row}>
              <div className={s.printPreview__col}>
                <div className={s.printPreview__resources}>
                  {sources.map(({ link, name }, i) => (
                    <div key={i} className={s.printPreview__resource}>
                      <span className={s.printPreview__resourceNumber}>{i + 1}</span>
                      <a href={link} className={s.printPreview__resourceLink}>
                        {name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
