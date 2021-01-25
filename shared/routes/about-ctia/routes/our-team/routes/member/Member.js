import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { Route } from 'react-router-dom';

import LoadingPage from 'containers/loading-page';
import Header, { WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';
import Hero, { Label, Heading } from 'components/hero';
import Text from 'components/slices/components/text';
import Portrait from 'components/portrait';
import NotFound from 'routes/not-found';
import isEmpty from 'lodash/isEmpty';

import MemberLayout from './components/layout';

class Member extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
  };

  static defaultProps = {
    jobResult: [],
  }

  render() {
    const {
      jobResult: [member = {}] = [],
    } = this.props;

    if (isEmpty(member)) {
      return <Route component={NotFound} />;
    }

    const {
      title = '',
      fields: {
        link = false,
        bio = '',
        portrait_image: portraitImage = null,
        title: jobTitle = '',
        social_media: {
          twitter = '',
          linkedin = '',
        } = {},
      } = {},
      seo = {},
    } = member;

    if (!link) {
      return <Route component={NotFound} />;
    }

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />

        <Group type="dotted">
          <Header transparent />

          <Hero wide center>
            <Heading>{title}</Heading>
            <Label>{jobTitle}</Label>
          </Hero>
        </Group>

        <Group type="gray shadow">
          <MemberLayout>
            <Portrait
              image={portraitImage}
              twitter={twitter}
              linkedin={linkedin}
            />

            <Text text={bio} />
          </MemberLayout>
        </Group>
      </Layout>
    );
  }
}

const memberWithJob = withJob({
  work: ({ wordpress, match }) => wordpress.getTeamMember({ slug: match.params.member }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering member', error);
    return (
      <div />
    );
  },
})(Member);

export default inject('wordpress')(memberWithJob);
