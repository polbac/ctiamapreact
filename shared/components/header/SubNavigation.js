import React, { PureComponent, Fragment, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import SideItem from './SideItem';

import s from './SubNavigation.scss';

export default class SubNavigation extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    content: PropTypes.object,
    mainMenuIndex: PropTypes.number,
    menuItemHasSideItem: PropTypes.bool,
    handleNavBarKey: PropTypes.func,
  }

  render() {
    const { children, active, content, isActive, isExplicitlyActive, mainMenuIndex, menuItemHasSideItem, handleNavBarKey, ...rest } = this.props; // eslint-disable-line
    const sideItem = get(content, 'side_item');
    const hasSideItem = get(content, 'side_item.title', '') !== '';

    const sideItemIndex = (numSubItems) => {
      if (menuItemHasSideItem) {
        return numSubItems + mainMenuIndex + 1;
      }

    };

    const cmap = (c, i) => {
      return cloneElement(c, {
        className: s(s.sub__link, { isFew: children.length < 5 }),
        activeClassName: s.isActive,
        role: 'menuitem',
        tabIndex: (i + 1) + mainMenuIndex,
        onFocus: handleNavBarKey(c),
      });
    };

    return (
      <div className={s(s.sub, { active })} {...rest}>
        <div className={s.sub__container}>
          <div className={s.sub__row}>
            <div className={s.sub__colContent}>
              {content && (
                <Fragment>
                  <div className={s.sub__title}>{content.title}</div>
                  <p className={s.sub__text}>{content.text}</p>
                </Fragment>
              )}
            </div>

            <div className={s.sub__colNav}>
              <div className={s(s.sub__border, { hasExtras: hasSideItem })}>
                <div className={s.sub__list} role="menu">
                  {Children.map(children, cmap)}

                  {/* Modified original implementation. Moved to cmap function. */}
                  {/* {Children.map(children, (c, i) =>
                    cloneElement(c, {
                      className: s(s.sub__link, { isFew: children.length < 5 }),
                      activeClassName: s.isActive,
                      role: 'menuitem',
                      tabIndex: (i + 1) + mainMenuIndex,
                    }))} */}

                </div>
              </div>
            </div>

            {hasSideItem && (
              <div className={s.sub__colExtra}>
                <SideItem
                  title={sideItem.title}
                  text={sideItem.text}
                  icon={sideItem.icon}
                  iconUrl={sideItem.icon.url}
                  buttonText={sideItem.button_text}
                  buttonLink={sideItem.button_link}
                  tabIndex={sideItemIndex(children.length)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
