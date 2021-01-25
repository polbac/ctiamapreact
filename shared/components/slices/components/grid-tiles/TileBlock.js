import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import string from 'string';
import debounce from 'lodash/debounce';

import SafeHtml from 'components/safe-html';
import InfoIcon from 'assets/images/icons/icon-info.svg';

import s from './TileBlock.scss';

export default class TileBlock extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    title: PropTypes.string,
    frontText: PropTypes.string,
    rearText: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string,
    footer: PropTypes.node,
    bottom: PropTypes.node,
    useTwoColumns: PropTypes.bool,
    showFullTileImage: PropTypes.bool,
    wide: PropTypes.bool,
  }

  static defaultProps = {
    children: undefined,
    title: 'Flippable graph card',
    wide: true,
    linkText: '',
  }

  state = {
    type: '',
    flipped: false,
    backfaceHeight: 'auto',
  };

  frontfaceRef = null;
  backfaceRef = null;

  flipCard = () => {
    this.setState({
      flipped: !this.state.flipped,
    });
  }

  setBackfaceHeight = debounce(() => {
    // Remove the inline style to check for overflow
    this.backfaceRef.style.height = null;

    console.log(`back: ${this.backfaceRef.scrollHeight}`);
    console.log(`front: ${this.frontfaceRef.scrollHeight}`);

    if (this.backfaceRef.scrollHeight > this.frontfaceRef.scrollHeight) {
      console.log(`setting height state:  ${parseFloat(this.backfaceRef.scrollHeight) + parseFloat(((Math.random() * (0.1 - 0.001)) + 0.0200).toFixed(4))}`);
      this.setState({
        // eslint-disable-next-line max-len
        backfaceHeight: parseFloat(this.backfaceRef.scrollHeight) + parseFloat(((Math.random() * (0.1 - 0.001)) + 0.0200).toFixed(4)),
      });
    } else {
      this.setState({
        backfaceHeight: 'auto',
      });
    }
  }, 100);

  /* When component is ready, add window listeners to activate mobile view */
  componentDidMount() {
    this.setBackfaceHeight();
    ['resize', 'orientationchange'].forEach((evt) => {
      window.addEventListener(evt, this.setBackfaceHeight);
    });
  }

  /* Clean up when this component is unmounted */
  componentWillUnmount() {
    ['resize', 'orientationchange'].forEach((evt) => {
      window.removeEventListener(evt, this.setBackfaceHeight);
    });
  }

  render() {
    const {
      children,
      content,
      title,
      wide,
      frontText,
      rearText,
      bottom,
      footer,
      link,
      linkText,
      showFullTileImage,
      useTwoColumns,
    } = this.props;
    const { type, flipped, backfaceHeight } = this.state;

    return (
      <figure className={s(s.tileBlock, type, { flipped, useTwoColumns, showFullTileImage, wide })}>
        <div className={s.tileBlock__wrapper}>

          <div ref={(el) => { this.frontfaceRef = el; }} className={s.tileBlock__front}>
            {(rearText || footer) && (
              <button aria-label="flips card" className={s.tileBlock__trigger} onClick={this.flipCard}>
                <InfoIcon className={s.tileBlock__icon} />
              </button>
            )}

            <div className={s.tileBlock__container}>
              {!showFullTileImage && (
                <header className={s.tileBlock__header}>
                  <h2 className={s.tileBlock__title}>
                    {string(title).decodeHTMLEntities().s}
                  </h2>
                </header>
              )}

              <div className={s(s.tileBlock__content, s.graph)}>
                <div className={s.tileBlock__childwrap}>{children}</div>
              </div>
              {frontText && !showFullTileImage && (
                <div className={s.tileBlock__content}>
                  <SafeHtml html={frontText} />
                </div>
              )}

              {(footer || link) && !showFullTileImage && (
                <footer className={s.tileBlock__footer}>
                  {link && (
                    <a href={link} className={s.tileBlock__link}>
                      {linkText}
                    </a>
                  )}
                  <div className={s.tileBlock__footerInner}>
                    {footer}
                  </div>
                </footer>
              )}
            </div>
          </div>

          <div
            ref={(el) => { this.backfaceRef = el; }}
            className={s.tileBlock__back}
            style={{ height: backfaceHeight }}
          >
            <button aria-label="flip card" className={s.tileBlock__trigger} onClick={this.flipCard}>
              <InfoIcon className={s.tileBlock__icon} />
            </button>

            <div className={s.tileBlock__container}>
              <header className={s.tileBlock__header}>
                <h2 className={s.tileBlock__title}>
                  {string(title).decodeHTMLEntities().s}
                </h2>
              </header>

              <div className={s.tileBlock__content}>
                {content || (rearText && <SafeHtml html={rearText} />)}
              </div>

              {bottom && (
                <div className={s.tileBlock__bottom}>
                  {bottom}
                </div>
              )}

              {(footer || link) && (
                <footer className={s.tileBlock__footer}>
                  {link && (
                    <a href={link} className={s.tileBlock__link}>
                      {linkText}
                    </a>
                  )}
                  <div className={s.tileBlock__footerInner}>
                    {footer}
                  </div>
                </footer>
              )}
            </div>
          </div>
        </div>
      </figure>
    );
  }
}
