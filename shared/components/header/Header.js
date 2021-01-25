import React, { Component, Children, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { TweenLite } from 'gsap';
import { observable, reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import throttle from 'lodash/throttle';

import MobileNav from './MobileNav';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import SubNavigation from './SubNavigation';
import s from './Header.scss';

const ANIMATION_TIME = 0.15;
const DELAY_TIME = 0.3;

class Header extends Component {

  static propTypes = {
    ui: PropTypes.object,
    children: PropTypes.node,
    transparent: PropTypes.bool,
    noSpacing: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
    getFuncFromChild: PropTypes.func,
  }

  state = {
    init: false,
    isMobile: undefined,
    // overwrites the active state of parent link component and sets as active when user clicks
    currentActiveComponent: null,
  }

  @observable
  isOverlayVisible

  @observable
  showMobileNav = false

  subEls = new Map()

  componentDidMount() {
    const { children, ui, isLoading, getFuncFromChild } = this.props;

    if (!isLoading) {
      setTimeout(() => this.onResize(), 100);

      window.addEventListener('scroll', this.onScroll);
      window.addEventListener('resize', this.onResize);
    }

    this.overlayHandler = reaction(
      () => ui.shouldOpenOverlay,
      (shouldOpenOverlay) => {
        if (shouldOpenOverlay) {
          this.openSearch();
        }
      },
    );

    // // this.props.getFuncFromChild && this.props.getFuncFromChild(this.startClose);
    if (this.props.getFuncFromChild) {
      this.props.getFuncFromChild(this.startClose);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.exitTimeout);

    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  get subHeight() {
    let height = 0;

    if (!this.subEls) {
      return;
    }

    this.subEls.forEach((e) => {
      if (!e) {
        return;
      }

      const h = e.offsetHeight;

      if (h > height) {
        height = h;
      }
    });

    return height;
  }

  init = () => {
    this.setState({ init: true });

    if (this.subEl) {
      TweenLite.to(this.subEl, 0.25, { height: this.subHeight });
    }
  }

  clearAllSubs = () => {
    if (this.searchBar) {
      TweenLite.to(this.searchBar, 0.1, { zIndex: 1, autoAlpha: 0 });
    }

    if (!this.subEls) {
      return;
    }

    this.subEls.forEach((e) => {
      if (!e) {
        return;
      }

      TweenLite.to(e, 0.1, { zIndex: 1, autoAlpha: 0 });
    });
  }

  toggleOverlay = (show = true) => {
    if (this.isOverlayVisible === show) {
      return;
    }

    this.isOverlayVisible = show;
    const toggle = show ? 1 : 0;

    const pointerEvents = {
      'pointer-events': show ? 'all' : 'none',
      delay: show ? 0 : DELAY_TIME,
    };

    if (this.subEl) {
      TweenLite.set(this.subEl, pointerEvents);
    }

    if (this.overlayEl) {
      TweenLite.set(this.overlayEl, pointerEvents);
    }

    if (this.subEl) {
      TweenLite.to(
        this.subEl,
        ANIMATION_TIME,
        {
          autoAlpha: toggle,
          y: 0,
        },
      );
    }

    if (this.overlayEl) {
      TweenLite.to(
        this.overlayEl,
        ANIMATION_TIME + 0.1,
        { autoAlpha: toggle },
      );
    }

    if (this.innerEl) {
      TweenLite.to(
        this.innerEl,
        ANIMATION_TIME,
        { background: `rgba(255, 255, 255, ${toggle})` },
      );
    }

    this.setState({ isOpen: show });
  }

  cancelClose = () => {
    this.isExiting = false;
    clearTimeout(this.exitTimeout);
  }

  startClose = () => {
    if (this.isExiting) {
      return;
    }

    this.isExiting = true;
    this.props.ui.shouldOpenOverlay = false;

    this.exitTimeout = setTimeout(() => {
      if (this.input) {
        this.input.blur();
      }

      this.clearAllSubs();
      this.toggleOverlay(false);
      this.props.ui.isOverlayVisible = false;
      this.setState({ currentActiveComponent: null });
    }, 300);
  }

  openMenu = (component) => {
    const el = this.subEls.get(component.props.to);

    this.setState({ currentActiveComponent: component.key });
    if (!el) {
      this.startClose();
      return;
    }

    this.cancelClose();
    this.clearAllSubs();

    TweenLite.set(el, { zIndex: 2 });

    if (this.isSearchOpen) {
      this.isSearchOpen = false;

      TweenLite.to(
        this.subEl,
        0.25,
        { height: this.subHeight },
      );
    }

    TweenLite.to(
      el,
      ANIMATION_TIME,
      { autoAlpha: 1, ease: 'Power4.easeOut' },
    );

    this.toggleOverlay();
  }

  onResize = () => {
    // this.setState({ isMobile: window.matchMedia('(max-width: 840px)').matches });
    this.setState({ isMobile: true });
    this.init();
  }

  onScroll = throttle(() => {
    const { isOpen } = this.state;
    const { isScrollDisabled } = this.props.ui;

    const scrollY = window.pageYOffset;

    if (isOpen && scrollY > 150) {
      return this.startClose();
    }

    const isDetached = scrollY > 115 || isScrollDisabled; // header height
    const isScrollingUp = scrollY < this.previousScrollY;

    this.previousScrollY = scrollY;

    if (isScrollingUp && this.scrollUpFrom === undefined) {
      this.scrollUpFrom = scrollY;
    } else if (!isScrollingUp) {
      this.scrollUpFrom = undefined;
    }

    // Only reveal the header if the user scrolls atleast 100px upwards
    const isScrollingUpThresholdReached = this.scrollUpFrom && (this.scrollUpFrom - scrollY) > 100;

    this.setState({
      isDetached,
      isScrollingUp: isScrollingUpThresholdReached,
    }, () => {
      requestAnimationFrame(() => {
        TweenLite.set(this.headerEl, {
          transition: isDetached ? 'all 300ms' : '',
        });
      });
    });
  }, 100)

  onMouseEnter = (component) => {
    this.openMenu(component);
  }

  onLinkEnter = (e, component) => {
    e.preventDefault();
    this.openMenu(component);
  }

  onOverlayEnter = () => this.startClose()

  onOverlayClick = () => this.startClose()

  onSubMouseEnter = () => this.cancelClose()

  handleNavBarKey = (e, c) => {
    // Tab on main menu items should open sub menu container.
    // Continuing to tab should move through sub menu items.
    if (c && e.key === 'Tab') {
      this.openMenu(c);
    }
  }

  toggleSearch = () => {
    const { shouldOpenOverlay } = this.props.ui;

    if (this.isOverlayVisible || !shouldOpenOverlay) {
      this.props.ui.shouldOpenOverlay = true;
      this.openSearch();
    } else {
      this.props.ui.shouldOpenOverlay = false;
      this.closeSearch();
    }
  }

  closeSearch = () => {
    this.isSearchOpen = false;
    this.startClose();
    this.init();
  }

  openSearch = () => {
    const el = this.searchBar;

    if (!el) {
      this.startClose();
      return;
    }

    this.showMobileNav = false;
    this.isSearchOpen = true;
    this.cancelClose();
    this.clearAllSubs();

    TweenLite.to(this.subEl, 0.25, { height: 390 });
    TweenLite.set(el, { zIndex: 2 });

    TweenLite.to(
      el,
      ANIMATION_TIME,
      { autoAlpha: 1, ease: 'Power4.easeOut' },
    );

    if (!this.isOverlayVisible) {
      this.toggleOverlay();
    }

    setTimeout(() => {
      this.input.focus();
    }, 200);
  }

  onToggleMobile = () => {
    this.closeSearch();
    this.showMobileNav = !this.showMobileNav;

    window.scrollTo(0, 0);

    this.setState({
      isDetached: false,
    });
  }

  dummy = () => {
    const { isScrollingUp } = this.state;

    return (
      <div className={s(s.header__dummy, { isScrollingUp })} />
    );
  }

  render() {
    const {
      children,
      transparent,
      noSpacing,
      isLoading,
      type,
      ui: { isNavOpen },
      getFuncFromChild,
    } = this.props;
    const { init, isDetached, isAnimating, isScrollingUp, isMobile, isOpen } = this.state;
    const isTransparent = isNavOpen ? false : transparent;

    let currI = 3;
    const menuValues = {};
    let searchTabIndex = 3; // 1 (skip nav) + 1 (logo) + 1 (total number of menu items plus one)

    if (children !== undefined) {

      // Count total number of main menu, sub menu, and side item tabIndexes.
      // Set tabIndex for the search bar based on this number.
      this.props.children.forEach((c) => {
        searchTabIndex += 1;
        const numSubNavs = c.props.children.length;
        let sideItem = 0;

        // Does this menu item have a side item?
        if (c.props.content.side_item.title) {
          sideItem += 1;
        }
        searchTabIndex += numSubNavs + sideItem;
      });

      // Set tabIndex for side items
      this.props.children.forEach((c) => {
        menuValues[c.key] = {
          index: currI,
        };
        // Does the menu item have a side item? If so, increment tabIndex to account for extra link.
        // Add boolean value to menuValues to pass as a prop to SubNavigation.
        if (c.props.content.side_item.title) {
          currI += c.props.children.length + 2;
          menuValues[c.key].menuItemHasSideItem = true;
        } else {
          currI += c.props.children.length + 1;
          menuValues[c.key].menuItemHasSideItem = false;
        }
      });
    }

    if (isLoading) {
      return this.dummy();
    }

    const header = (
      <Fragment>
        <header
          className={
            s(s.header, {
              transparent: isTransparent,
              noSpacing,
              isDetached,
              isAnimating,
              isScrollingUp: isScrollingUp === true || this.showMobileNav,
            })}
          ref={(el) => { this.headerEl = el; }}
        >
          <NavBar
            internalRef={(el) => { this.innerEl = el; }}
            onLinkEnter={this.onLinkEnter}
            onMouseEnter={this.onMouseEnter}
            onToggleSearch={this.toggleSearch}
            onToggleMobile={this.onToggleMobile}
            transparent={isTransparent}
            isDetached={isDetached}
            isOpen={isOpen}
            type={type}
            currentActiveComponent={this.state.currentActiveComponent}
            onNavTab={this.handleNavBarKey}
            menuValues={menuValues}
            searchTabIndex={searchTabIndex}
            closeSearch={this.closeSearch}
          >
            {children}
          </NavBar>

          <div
            className={s.header__sub}
            ref={(el) => { this.subEl = el; }}
          >
            {Children.map(children, (component, i) => {
              const { children: subChildren, ...rest } = component.props;

              if (!subChildren) {
                return null;
              }

              return (
                <div
                  role="navigation"
                  key={i}
                  className={s.header__subItem}
                  ref={el => this.subEls.set(component.props.to, el)}
                  onMouseEnter={this.onSubMouseEnter}
                >
                  <SubNavigation
                    {...rest}
                    mainMenuIndex={menuValues[component.key].index}
                    menuItemHasSideItem={menuValues[component.key].menuItemHasSideItem}
                    handleNavBarKey={this.handleNavBarKey}
                  >
                    {subChildren}
                  </SubNavigation>
                </div>
              );
            })}

            <SearchBar
              wrapperRef={(el) => { this.searchBar = el; }}
              inputRef={(el) => { this.input = el; }}
              onSubMouseEnter={this.onSubMouseEnter}
              init={this.init}
              startClose={this.startClose}
              isOverlayVisible={this.isOverlayVisible}
              openSearch={this.openSearch}
              closeSearch={this.closeSearch}
            />
          </div>
        </header>

        <div // eslint-disable-line
          ref={(el) => { this.overlayEl = el; }}
          className={s.header__overlay}
          onMouseEnter={this.onOverlayEnter}
          onClick={this.onOverlayClick}
        />

        {isMobile && <MobileNav showNav={this.showMobileNav}>{children}</MobileNav>}
      </Fragment>
    );

    return (
      <Fragment>
        {this.dummy()}
        {init ? ReactDOM.createPortal(header, document.getElementById('header-placeholder')) : header}
      </Fragment>
    );
  }
}

const withInject = inject('ui')(observer(Header));

export default withRouter(withInject);
