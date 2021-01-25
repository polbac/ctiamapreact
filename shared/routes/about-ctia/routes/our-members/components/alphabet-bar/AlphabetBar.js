import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'utils/scrollToElement';

import BackToTop from 'assets/images/icons/icon-backtotop.svg';

import s from './AlphabetBar.scss';

export default class AlphabetBar extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: 'Our Members',
  }

  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  onScroll = () => {
    const scrollY = window.pageYOffset;

    if (this.currentY === undefined) {
      this.onResize();
    }

    this.setState({
      isVisible: scrollY > this.currentY,
    });
  }

  onResize = () => {
    this.currentY = this.el.parentNode.getBoundingClientRect().top + window.pageYOffset;
  }

  render() {
    const { title } = this.props;
    const { isVisible } = this.state;

    return (
      <div className={s(s.alphabetBar, { isVisible })} ref={(el) => { this.el = el; }}>
        <div className={s.alphabetBar__inner}>
          <div className={s.alphabetBar__title}>{title}</div>
          <div className={s.alphabetBar__container}>
            <div className={s.alphabetBar__row}>
              <div className={s.alphabetBar__col}>
                <div className={s.alphabetBar__alphabet}>
                  <a className={s.alphabetBar__link} href="#group-#">#</a>
                  <a className={s.alphabetBar__link} href="#group-a">A</a>
                  <a className={s.alphabetBar__link} href="#group-b">B</a>
                  <a className={s.alphabetBar__link} href="#group-c">C</a>
                  <a className={s.alphabetBar__link} href="#group-d">D</a>
                  <a className={s.alphabetBar__link} href="#group-e">E</a>
                  <a className={s.alphabetBar__link} href="#group-f">F</a>
                  <a className={s.alphabetBar__link} href="#group-g">G</a>
                  <a className={s.alphabetBar__link} href="#group-h">H</a>
                  <a className={s.alphabetBar__link} href="#group-i">I</a>
                  <a className={s.alphabetBar__link} href="#group-j">J</a>
                  <a className={s.alphabetBar__link} href="#group-k">K</a>
                  <a className={s.alphabetBar__link} href="#group-l">L</a>
                  <a className={s.alphabetBar__link} href="#group-m">M</a>
                  <a className={s.alphabetBar__link} href="#group-n">N</a>
                  <a className={s.alphabetBar__link} href="#group-o">O</a>
                  <a className={s.alphabetBar__link} href="#group-p">P</a>
                  <a className={s.alphabetBar__link} href="#group-q">Q</a>
                  <a className={s.alphabetBar__link} href="#group-r">R</a>
                  <a className={s.alphabetBar__link} href="#group-s">S</a>
                  <a className={s.alphabetBar__link} href="#group-t">T</a>
                  <a className={s.alphabetBar__link} href="#group-u">U</a>
                  <a className={s.alphabetBar__link} href="#group-v">V</a>
                  <a className={s.alphabetBar__link} href="#group-w">W</a>
                  <a className={s.alphabetBar__link} href="#group-x">X</a>
                  <a className={s.alphabetBar__link} href="#group-y">Y</a>
                  <a className={s.alphabetBar__link} href="#group-z">Z</a>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToElement('#top')}
            aria-label="scrolls to top"
            className={s.alphabetBar__return}
          >
            <BackToTop className={s.alphabetBar__icon} />
          </button>
        </div>
      </div>
    );
  }
}
