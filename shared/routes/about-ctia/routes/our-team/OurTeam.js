import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';
import Employee from 'components/employee';

import Team from './components/team';
import Split from './components/split';

class OurTeam extends Component {

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
        first_section: firstSectionMembers = [],
        second_section: secondSectionMembers = [],
        third_section: thirdSectionMembers = [],
      } = {},
      seo = {},
    } = page;

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <WordPressHeader data={header} title={title} />

        <Group type="gray">
          {firstSectionMembers.length > 0 &&
            firstSectionMembers.map((member, i) => {
              const {
                title: name = '',
                slug = '',
                fields: {
                  title: jobTitle = '',
                  link = false,
                  quote = '',
                  image = null,
                } = {},
              } = member;

              const key = `member-${name}-${i}`;
              const to = link && slug ? `/about-ctia/the-ctia-team/${slug}` : null;

              return (
                <Split
                  key={key}
                  image={image}
                  name={name}
                  title={jobTitle}
                  quote={quote}
                  to={to}
                />
              );
            })
          }

          {secondSectionMembers.length > 0 && (
            <Team>
              {secondSectionMembers.map((member, i) => {
                const {
                  title: name = '',
                  slug = '',
                  fields: {
                    title: jobTitle = '',
                    link = false,
                    image = null,
                  } = {},
                } = member;

                const key = `member-${name}-${i}`;
                const to = link && slug ? `/about-ctia/the-ctia-team/${slug}` : null;

                return (
                  <Employee
                    key={key}
                    image={image}
                    name={name}
                    title={jobTitle}
                    to={to}
                  />
                );
              })}
            </Team>
          )}

          {thirdSectionMembers.length > 0 && (
            <Team small>
              {thirdSectionMembers.map((member, i) => {
                const {
                  title: name = '',
                  slug = '',
                  fields: {
                    title: jobTitle = '',
                    link = false,
                    image = null,
                  } = {},
                } = member;

                const key = `member-${name}-${i}`;
                const to = link && slug ? `/about-ctia/the-ctia-team/${slug}` : null;

                return (
                  <Employee
                    key={key}
                    image={image}
                    name={name}
                    title={jobTitle}
                    to={to}
                  />
                );
              })}
            </Team>
          )}
        </Group>
      </Layout>
    );
  }
}

const ourTeamWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'the-ctia-team', querystring: location.search }),
  LoadingComponent: () => <LoadingPage type="white" />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering team', error);
    return (
      <div />
    );
  },
})(OurTeam);

export default inject('wordpress')(ourTeamWithJob);
