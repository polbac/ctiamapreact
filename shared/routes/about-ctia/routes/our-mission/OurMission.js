import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { assets } from 'utils/themes';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';
import Slices, { Text } from 'components/slices';
import Portrait from 'components/portrait';
import PageLinks, { PageLink } from 'components/page-links';
import HeadingButton from 'components/heading-button';

import MissionLayout from './components/layout';
import Pages from './components/pages';

class OurMission extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
  };

  static defaultProps = {
    jobResult: [],
  }

  render() {
    const {
      jobResult: [page = {}] = [],
    } = this.props;

    const {
      title = '',
      fields: {
        header = {},
        team_member: teamMember = [],
        components = [],
        cta_boxes: ctaBoxes = {},
        text = '',
      } = {},
      seo = {},
    } = page;

    const hasComponents = components && components.length > 0;

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <WordPressHeader data={header} title={title} />

        <Group type="gray">
          <MissionLayout>
            {teamMember.length > 0 && teamMember.map((member) => {
              const {
                title: name = '',
                slug = '',
                fields: {
                  title: jobTitle = '',
                  link = false,
                  short_bio: bio = '',
                  portrait_image: portraitImage = null,
                } = {},
              } = member;

              const to = link && slug ? `/about-ctia/the-ctia-team/${slug}` : null;

              return (
                <Portrait
                  key={name}
                  name={name}
                  title={jobTitle}
                  description={bio}
                  image={portraitImage}
                  to={to}
                  isReverse
                />
              );
            })}

            {text && (
              <Text text={text} />
            )}

            {hasComponents && (
            <Slices
              data={components}
              theme={assets(header.pattern)}
              isCenter
            />
          )}
          </MissionLayout>

          {ctaBoxes && ctaBoxes.items && (
            <Pages>
              <PageLinks>
                {ctaBoxes.items.map((item, i) => (
                  <PageLink key={i}>
                    <HeadingButton
                      heading={item.title}
                      copy={item.text}
                      button={item.button_label}
                      to={item.button_url === '' ? '/' : item.button_url}
                    />
                  </PageLink>
                ))}
              </PageLinks>
            </Pages>
          )}
        </Group>
      </Layout>
    );
  }
}

const ourMissionWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'our-mission', querystring: location.search }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering our mission', error);
    return (
      <div />
    );
  },
})(OurMission);

export default inject('wordpress')(ourMissionWithJob);
