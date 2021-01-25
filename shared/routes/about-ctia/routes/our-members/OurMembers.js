import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';

import Members, { Item, Group as MembersGroup } from './components/members';
import TierBar, { Wrapper } from './components/tier-bar';

class OurMembers extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
    tiers: PropTypes.object,
  };

  static defaultProps = {
    jobResult: [],
    // 'tiers' must match the 'Membership Tiers' checkbox field in WP
    // under 'Members' in the 'Page - Members' ACF field group
    tiers: {
      board: 'Board of Directors',
      cim: 'Carrier & Industry Members',
      gm: 'General Members',
    },

  }

  render() {
    const {
      jobResult: [page = {}] = [],
      tiers,
    } = this.props;

    const {
      title = '',
      fields: {
        header = {},
        members = [],
      } = {},
      seo = {},
    } = page;

    const groups = [];

    members.forEach((member) => {
      const currentTiers = [...member.membership_tiers];

      currentTiers.forEach((tier) => {
        let group = groups.find(i => i.tier === tier);

        if (!group) {
          group = {
            tier,
            items: [],
          };
          groups.push(group);
        }
        group.items.push(member);

      });
    });

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />
        <WordPressHeader data={header} title={title} />

        <Wrapper>
          <TierBar title="Our Members" tiers={tiers} />

          <Group type="shadow">
            <Members>
              {groups
                .sort((a, b) => a.tier.localeCompare(b.tier))
                .map((group) => {
                  const key = `group-${group.tier}`;

                  return (
                    <MembersGroup key={key} symbol={this.props.tiers[group.tier]} groupId={key}>
                      {group.items.map((item, i) => {
                        const itemKey = `item-${item.member}-${i}`;

                        return (
                          <Item key={itemKey} link={item.link}>{item.member}</Item>
                        );
                      })}
                    </MembersGroup>
                  );
                })
              }
            </Members>
          </Group>
        </Wrapper>
      </Layout>
    );
  }
}

const ourMembersWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'our-members', querystring: location.search }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering members', error);
    return (
      <div />
    );
  },
})(OurMembers);

export default inject('wordpress')(ourMembersWithJob);
