import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import { categories as mainCategories, objectResolver, permalinkResolver } from 'utils/urlResolver';

import Header, { Item } from 'components/header';

class HeaderContainer extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    type: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
    totalNumberTabIndex: PropTypes.func,
  }

  static defaultProps = {
    jobResult: [],
  }

  componentDidMount() {
    const numMainMenuItems = this.findNumMainMenuItems();
    const numSubMenuItems = this.findNumSubMenuItems();
    const numSideItems = this.findNumSideItems();
    const numSkipNavTabIndex = 1;
    const numLogoTabIndex = 1;
    const numSearchTabIndex = 1;
    const totalTabIndexFromHeader =
    numMainMenuItems + numSubMenuItems + numSideItems
    + numSkipNavTabIndex + numLogoTabIndex + numSearchTabIndex;

    if (this.props.totalNumberTabIndex) {
      this.props.totalNumberTabIndex(totalTabIndexFromHeader);
    }
  }

  findNumMainMenuItems = () => {
    // Total number of main menu items
    const numMainMenuItems = this.props.jobResult[0].length - 1; // Last value is Channels array

    return numMainMenuItems;
  }

  findNumSubMenuItems = () => {
    // Array of only main menu items, removing Channels from array
    const onlyMainMenuItems = this.props.jobResult[0].slice(0, -1);

    // Total number of sub menu items
    let numSubMenuItems = 0;

    onlyMainMenuItems.forEach((c, i) => {
      numSubMenuItems += c.items.length;
    });

    return numSubMenuItems;
  }

  findNumSideItems = () => {
    // Total number of side items
    let numSideItems = 0;

    this.props.jobResult[1].menu_content.forEach((c, i) => {
      if (c.side_item.title) {
        numSideItems++;
      }
    });

    return numSideItems;
  }

  render() {
    const {
      jobResult: [
        wpCategories = [],
        {
          menu_content: menuContent = [],
        } = {},
      ] = [],
      type,
      totalNumberTabIndex,
      ...props
    } = this.props;

    return (
      <Header type={type} {...props}>
        {mainCategories.map((mainCategory) => {
          const parentSlug = mainCategory.slug;
          const subCategory = wpCategories.find(i => i.id === parentSlug) || {};
          const { items = [] } = subCategory;
          const [firstChild = {}] = items;
          const parentTo = objectResolver(firstChild, parentSlug);

          return (
            <Item
              key={mainCategory.slug}
              to={parentTo}
              name={mainCategory.label}
              isActive={(match, location) => location.pathname.indexOf(`/${parentSlug}`) !== -1}
              content={menuContent.find(i => i.menu_id === parentSlug)}
            >
              {items.map((item) => {
                const { type: itemType, url } = item;
                const to = permalinkResolver(url, itemType);

                return (
                  <NavLink exact key={item.id} to={to}>{item.title}</NavLink>
                );
              })}
            </Item>
          );
        })}
      </Header>
    );
  }
}

const headerContainerWithJob = withJob({
  work: ({ wordpress }) => Promise.all([
    wordpress.menus(),
    wordpress.global(),
    // make sure homepage is in cache
    wordpress.getHomepage(),
  ]),
  LoadingComponent: () => (
    <Header isLoading />
  ),
  // on error render the empty Header
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering Header', error);
    return (
      <HeaderContainer />
    );
  },
})(HeaderContainer);

export default inject('wordpress')(headerContainerWithJob);
