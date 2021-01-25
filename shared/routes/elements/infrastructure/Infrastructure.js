import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Header from 'containers/header';

import Layout, { Group } from 'components/layout';
import Hero, { Label, Heading, Copy } from 'components/hero';
import { Page as PageBlock } from 'components/blocks';

import News from './containers/news';
import TopPages from './components/top-pages';

export default class Infrastructure extends PureComponent {

  render() {
    return (
      <Layout>
        <Helmet title="Infrastructure" />

        <Group type="dotted" graphics="positions">
          <Header transparent />

          <Hero center>
            <Label>Popular channel</Label>
            <Heading>Infrastructure</Heading>
            <Copy>All you need to know about Infrastructure in one place.</Copy>
          </Hero>
        </Group>

        <Group type="dotted">
          <TopPages heading="Top Pages">
            <PageBlock
              label="Positions"
              heading="Infrastructure"
              copy="If spectrum is the fuel for wireless networks, infrastructure is the
              foundation. To meet the increasing demand for mobile broadband and to..."
              to="/"
              hasIllustration
            />

            <PageBlock
              label="Consumer Resources"
              heading="How to Deter Smartphone Thefts and Protect Your Data"
              to="/"
            />
          </TopPages>
        </Group>

        <Group>
          <News heading="News" />
        </Group>
      </Layout>
    );
  }
}
