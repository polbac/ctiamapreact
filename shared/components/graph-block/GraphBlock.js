import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import string from 'string';

import SafeHtml from 'components/safe-html';

import InfoIcon from 'assets/images/icons/icon-info.svg';

import s from './GraphBlock.scss';

export default class GraphBlock extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    title: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    linkText: PropTypes.string,
    footer: PropTypes.node,
    bottom: PropTypes.node,
    definition: PropTypes.string,
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
  };

  componentDidMount() {
    const { definition } = this.props;

    let parsed = null;

    try {
      parsed = JSON.parse(definition);
    } catch (error) { } // eslint-disable-line

    if (!parsed || !parsed.type) {
      return;
    }

    this.setState({ // eslint-disable-line
      type: parsed.type,
    });
  }

  flipCard = () => {
    this.setState({
      flipped: !this.state.flipped,
    });
  }

  render() {
    const { children, content, title, wide, text, bottom, footer, link, linkText } = this.props;
    const { type, flipped } = this.state;

    return (
      <figure className={s(s.graphBlock, type, { flipped, wide })}>
        <div className={s.graphBlock__wrapper}>
          <div className={s.graphBlock__front}>
            {(text || footer) && (
              <button aria-label="flips card" className={s.graphBlock__trigger} onClick={this.flipCard}>
                <InfoIcon className={s.graphBlock__icon} />
              </button>
            )}

            <div className={s.graphBlock__container}>
              <header className={s.graphBlock__header}>
                <h2 className={s.graphBlock__title}>
                  {string(title).decodeHTMLEntities().s}
                </h2>
              </header>

              <div className={s(s.graphBlock__content, s.graph)}>
                {children}
              </div>
              {(footer || link) && (
                <footer className={s.graphBlock__footer}>
                  {link && (
                    <a href={link} className={s.graphBlock__link}>
                      {linkText}
                    </a>
                  )}
                  <div className={s.graphBlock__footerInner}>
                    {footer}
                  </div>
                </footer>
              )}
            </div>
          </div>

          <div className={s.graphBlock__back}>
            <button aria-label="flip card" className={s.graphBlock__trigger} onClick={this.flipCard}>
              <InfoIcon className={s.graphBlock__icon} />
            </button>

            <div className={s.graphBlock__container}>
              <header className={s.graphBlock__header}>
                <h2 className={s.graphBlock__title}>
                  {string(title).decodeHTMLEntities().s}
                </h2>
              </header>

              <div className={s.graphBlock__content}>
                {content || (text && <SafeHtml html={text} />)}
              </div>

              {bottom && (
                <div className={s.graphBlock__bottom}>
                  {bottom}
                </div>
              )}

              {(footer || link) && (
                <footer className={s.graphBlock__footer}>
                  {link && (
                    <a href={link} className={s.graphBlock__link}>
                      {linkText}
                    </a>
                  )}
                  <div className={s.graphBlock__footerInner}>
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
