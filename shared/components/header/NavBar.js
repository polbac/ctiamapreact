import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LogoSvg from 'assets/images/ctia-logo.svg';
import SearchSvg from 'assets/images/icons/search.svg';
import BurgerSvg from 'assets/images/icons/burger.svg';

import s from './NavBar.scss';

export default class NavBar extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    transparent: PropTypes.bool,
    isDetached: PropTypes.bool,
    onLinkEnter: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onToggleSearch: PropTypes.func,
    internalRef: PropTypes.func,
    onToggleMobile: PropTypes.func,
    type: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
    isOpen: PropTypes.bool,
    currentActiveComponent: PropTypes.string,
    onNavTab: PropTypes.func,
    menuValues: PropTypes.object,
    searchTabIndex: PropTypes.number,
    closeSearch: PropTypes.func,
  }

  static defaultProps = {
    type: 'white',
  }

  state = {
    numNavbarItems: this.props.children.length,
    touchActivated: false,
  }

  render() {
    const {
      children,
      transparent,
      isDetached,
      onLinkEnter,
      onMouseEnter,
      onToggleSearch,
      internalRef,
      onToggleMobile,
      isOpen,
      type,
      onNavTab,
      currentActiveComponent,
      menuValues,
      searchTabIndex,
      closeSearch,
    } = this.props;

    const typeAsArray = !Array.isArray(type) ? type.split(' ') : type;

    return (
      <div
        className={s(s.navbar, {
          transparent,
          notTransparent: !transparent,
          isDetached,
        })}
        ref={internalRef}
      >
        <div className={s.navbar__container}>
          <div className={s.navbar__content}>

            {/* Home logo   */}
            <Link tabIndex="2" title="Homepage" to="/" className={isOpen ? s.navbar__logo : s(s.navbar__logo, ...typeAsArray.map(c => s[c]))}>
              <LogoSvg className={s.navbar__logoSvg} />
            </Link>

            <nav className={s.navbar__navigation} role="navigation">
              <ul className={s.navbar__list} role="menubar">
                {Children.map(children, (c, i) => (
                  <li
                    className={s.navbar__item}
                    role="menuitem"
                    aria-haspopup="true"

                  >
                    {cloneElement(c, {
                      onClick: (e) => {
                        if (this.state.touchActivated) {
                          e.preventDefault();
                        }
                      },
                      onTouchStart: () => {
                        this.setState({ touchActivated: true });
                        onMouseEnter(c);
                      },
                      onMouseEnter: e => onLinkEnter(e, c),
                      isExplicitlyActive: currentActiveComponent !== null
                        ? currentActiveComponent === c.key
                        : undefined,
                      tabIndex: menuValues[c.key].index,
                      onKeyUp: e => onNavTab(e, c),
                    })}
                  </li>
                ))}
              </ul>
            </nav>

            <div className={s.navbar__side}>
              <button
                className={s.navbar__search}
                onClick={onToggleSearch}
                tabIndex={searchTabIndex}
                onBlur={closeSearch}
                aria-label="toggles search"
              >
                <SearchSvg className={s.navbar__searchIcon} />
                <span className={s.navbar__searchLabel}>Search</span>
              </button>

              <button aria-label="burger svg" className={s.navbar__menu} onClick={onToggleMobile}>
                <BurgerSvg className={s.navbar__burger} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
