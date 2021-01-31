import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { resolve } from 'url';
import config from 'utils/config';

import Header from 'containers/header';
import RelatedContent from 'containers/related-content';
import { Map5g } from 'containers/maps';
import Layout, { Group } from 'components/layout';
import { Text, Footnote } from 'components/slices';
import Button from 'components/button';
import StickyBar from 'components/sticky-bar';
import ShareLink from 'components/share-link';

// import IconHealthcare from 'assets/images/5g/healthcare/icon.svg';
// import IconEducation from 'assets/images/5g/360/icon-school.svg';
// import IconEnergy from 'assets/images/5g/360/icon-light.svg';
// import IconDrones from 'assets/images/5g/360/icon-drone.svg';
// import IconTransport from 'assets/images/5g/transportation/icon.svg';
// import IconSmartCity from 'assets/images/5g/smart/icon.svg';

import Heading from './components/heading';
import Hero from './components/hero';
import NumDatas, { NumDataBlock } from './components/num-data';
import Divider from './components/divider';
import Wireless from './components/wireless';
// import Connecting, { Columns as ConnectingColumns, Column as ConnectingColumn } from './components/connecting';
import Connecting from './components/connecting';
import ConnectingCards, { Card } from './components/connecting-cards';
import Healthcare from './components/healthcare';
import Transportation from './components/transportation';
import SmartCity from './components/smartcity';
// import Experience, { Item as ExperienceItem, ExperienceCards } from './components/experience';
import { ExperienceCards } from './components/experience';
import Evolution, { Box } from './components/evolution';
import Frame from './components/frame';
// import Readiness from './components/readiness';
import Policy from './components/policy';
// import SidebarVideo from './components/sidebar-link';
import { SidebarReport } from './components/sidebar-link';

const twitterTitle = 'The 5G Economy';
const twitterDesc = '5G will bring a wide range of economic & social benefits, including millions of jobs in communities across America.';
const fbTitle = 'The 5G Economy';
const fbDesc = '5G will bring a wide range of economic & social benefits, including millions of jobs in communities across America.';
const image = resolve(config('baseUrl'), '/5G-economy-share.jpg');

const headings = [
  'Introduction',
  'Wireless Technology',
  'The Evolution to 5G',
  'Connecting Everyone and Everything',
  '5G Economic Impact',
  'Industry Benefits',
  'Bringing the 5G Economy to Life',
];

export default class FiveG extends PureComponent {

  static propTypes = {
    location: PropTypes.object,
  }

  render() {
    const { location: { pathname } } = this.props;

    const meta = [
      { name: 'twitter:title', content: twitterTitle },
      { name: 'twitter:description', content: twitterDesc },
      { name: 'twitter:image', content: image },
      { property: 'og:title', content: fbTitle },
      { property: 'og:description', content: fbDesc },
      { property: 'og:image', content: image },
    ];

    return (
      <Layout>
        <Helmet title="The 5G Economy" meta={meta} />

        <Group type="powder">
          <Header transparent />
          <Hero />
        </Group>

        <StickyBar headings={headings} />

        <Group type="powder dotted" id="section-5">
          <Map5g isNew5g />
        </Group>
        
      </Layout>
    );
  }
}
