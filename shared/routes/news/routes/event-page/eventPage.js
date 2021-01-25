import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { resolve } from 'url';
import config from 'utils/config';

import Header from 'containers/header';
import Layout, { Group } from 'components/layout';

import Hero from './components/hero';
import {
  Text,
  PillarWrapper, Pillar,
  IQWrapper, IQ,
  SpeakerWrapper, Speaker,
  LogoWrapper, Logo,
} from './components/slices';

const twitterTitle = '2019 Race to 5G Summit';
const twitterDesc = '5G will bring a wide range of economic & social benefits, including millions of jobs in communities across America.';
const fbTitle = '2019 Race to 5G Summit';
const fbDesc = '5G will bring a wide range of economic & social benefits, including millions of jobs in communities across America.';
const image = resolve(config('baseUrl'), '/race-to-5G-share.jpg');

export default class EventPage extends PureComponent {

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

    const groupStyle = { paddingTop: '3rem', paddingBottom: '3rem' };

    /* eslint-disable react/jsx-curly-brace-presence */
    return (
      <Layout>
        <Helmet title="2019 Race to 5G Summit" meta={meta} />

        <Group type="powder">
          <Header transparent />
          <Hero
            heading="2019 Race to 5G Summit"
            location="Washington, D.C."
            date="April 2019"
            video="https://api.ctia.org/wp-content/uploads/2018/05/047TF_CTIA-2018-5G-Summit-Recap-051018-08-III-1.mp4"
          />
        </Group>

        <Group type="gray" style={groupStyle}>

          <Text
            text={`<p>The race to 5G is on and the benefits of the next-generation of wireless are more tangible than
            ever – so what is America doing to win? Join top leaders and experts at CTIA’s 2019 Race to 5G
            Summit as we explore key policies and innovations that are making 5G a reality and ensuring
            America wins the global race. Millions of new jobs, billions in economic growth, and
            transformative advances across industries are at stake.</p>
            <p>We want to hear from you. <strong><a href="mailto:EDownes@ctia.org">Join us</a></strong> on stage at the
            2019 Race to 5G Summit.</p>`}
          />

          <PillarWrapper>
            <Pillar
              heading="Engage"
              icon={{ url: require('!file-loader!assets/images/icons/icon-engage.svg'), alt: 'Engage Icon' }}
              copy={`with an invite-only audience of 250+ policymakers, industry leaders,
              tech experts, journalists, and key stakeholders in the wireless ecosystem.`}
            />
            <Pillar
              heading="Elevate"
              icon={{ url: require('!file-loader!assets/images/icons/icon-elevate.svg'), alt: 'Elevate Icon' }}
              copy="your company's C-level executives with a keynote speech, fireside chat, or panel discussion."
            />
            <Pillar
              heading="Educate"
              icon={{ url: require('!file-loader!assets/images/icons/icon-educate.svg'), alt: 'Educate Icon' }}
              copy={`attendees on the transformative benefits of 5G through use cases and demos featuring
              your company's latest technology.`}
            />
          </PillarWrapper>

          <IQWrapper heading="2018 Speaker And Exhibitor Highlights">
            <IQ
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/12/CTIA_196-800x1200.jpg', alt: '' }}
            />

            <IQ
              quote={`We know the best path to ensuring 5G leadership for the United States is the
              entire government working...to support the industry’s 5G push.`}
              attribution="NTIA Administrator David Redl"
            />

            <IQ
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/12/CTIA_239-800x1200.jpg', alt: '' }}
            />

            <IQ
              quote={`Winning the global race to 5G will mean more broadband for more Americans &
              unleashing the next wave of American innovation...`}
              attribution="FCC Commissioner Brendan Carr"
            />

            <IQ
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/12/CTIA_371-800x533.jpg', alt: '' }}
            />

            <IQ
              quote={`[The AIRWAVES Act] aims to motivate industry and federal agencies to find better
              ways to utilize spectrum...helping better prepare us to deploy 5G.`}
              attribution=" Senator Maggie Hassan (D-NH)"
            />
          </IQWrapper>

          <SpeakerWrapper>
            <Speaker
              name="Meredith Attwell Baker"
              title="President &amp; CEO"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/CTIA_MeredithBaker-300x300.jpg', alt: 'Portrait of Meredith Attwell Baker' }}
            />

            <Speaker
              name="Rep. Susan Brooks"
              title="R-IN"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Susan_Brooks_square.png', alt: 'Portrait of Rep. Susan Brooks' }}
            />

            <Speaker
              name="Brendan Carr"
              title="Commissioner, FCC"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Brendan_Carr_square.png', alt: 'Portrait of Bendan Carr' }}
            />

            <Speaker
              name="Tim Baxter"
              title="President &amp; CEO, Samsung Electronic North America"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Tim_Baxter_square.png', alt: 'Portrait of Tim Baxter' }}
            />

            <Speaker
              name="Karri Kuoppamaki"
              title="VP, Network Technology Development &amp; Strategy, <span style='white-space: nowrap;'>T-Mobile</span> USA"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Karri_Kuoppamaki_square.png', alt: 'Portrait of Karri Kuoppamaki' }}
            />

            <Speaker
              name="Mike Murphy"
              title="CTO, North America, Nokia"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Mike_Murphy_square.png', alt: 'Portrait of Mike Murphy' }}
            />

            <Speaker
              name="Niklas Heuveldop"
              title="President and CEO, Ericsson North America"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Niklas_Heuveldop_square.png', alt: 'Portrait of Niklas Heuveldop' }}
            />

            <Speaker
              name="Sen. Maggie Hassan"
              title="D-NH"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Maggie_Hassan_square.png', alt: 'Portrait of Sen. Maggie Hassan' }}
            />

            <Speaker
              name="Cristiano Amon"
              title="President, Qualcomm"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Cristiano_Amon_square.png', alt: 'Portrait of Cristiano Amon' }}
            />

            <Speaker
              name="David Redl"
              title="Administrator, NTIA"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/David_Redl_square.png', alt: 'Portrait of David Redl' }}
            />

            <Speaker
              name="Ed Chan"
              title="SVP, Technology Strategy &amp; Planning, Verizon"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Ed_Chan_square.png', alt: 'Portrait of Ed Chan' }}
            />

            <Speaker
              name="Sen. Cory Gardner"
              title="R-CO"
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Cory_Gardner_square.png', alt: 'Portrait of Sen. Cory Gardner' }}
            />
          </SpeakerWrapper>

          <LogoWrapper>
            <Logo
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/CTIA-Member_Ericcson_Logo-300x263.png', alt: 'Ericcson company logo' }}
              link="https://www.ericsson.com/en"
            />
            <Logo
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/CTIA-Member_intel_Logo.png', alt: 'Intel company logo' }}
              link="https://www.intel.com/content/www/us/en/homepage.html"
            />
            <Logo
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/CTIA-Member_Nokia_Logo-300x50.png', alt: 'Nokia company logo' }}
              link="https://networks.nokia.com/"
            />
            <Logo
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/CTIA-Member_Qualcomm_Logo-400x74.png', alt: 'Qualcomm company logo' }}
              link="https://www.qualcomm.com/"
            />
            <Logo
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/blue-samsung-logo-png-4-300x50.png', alt: 'Samsung company logo' }}
              link="http://www.samsung.com/us/"
            />
            <Logo
              image={{ url: 'https://api.ctia.org/wp-content/uploads/2018/04/Sprint-187x300.png', alt: 'Sprint company logo' }}
              link="https://www.sprint.com/"
            />
          </LogoWrapper>
        </Group>

      </Layout>
    );
  }
}
