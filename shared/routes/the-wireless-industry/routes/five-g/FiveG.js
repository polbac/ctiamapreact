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

        <Group type="gray" id="section-1" isContent overflowVisible>
          <Heading
            text="Introduction"
            nbr={1}
            dot="blue"
            isCenter
          />

          <Text
            text="<p>5G, the next generation of wireless, is here, rolling out in
          communities across the country.</p>"
            isCenter
            hasAnimation
          />

          <Text
            text="<p>Today, the wireless industry supports over 4.7 million jobs and contributes
            roughly $475 billion annually to the American economy.<sup>1</sup></p>"
            isCenter
            hasAnimation
          />

          <Text
            text="<p>5G is even more transformative—making our lives better,
            our communities safer, and our nation more prosperous.</p>"
            isCenter
            hasAnimation
          />

          <ShareLink link={`ctia.org${pathname}#section-1`} withWrapper hasAnimation />

          <NumDatas>
            <NumDataBlock
              data="4.7M"
              copy="wireless-related<br /> jobs"
            />

            <NumDataBlock
              data="$475B"
              copy="economic contribution<br /> annually"
            />
          </NumDatas>

        </Group>

        <Group type="gray" id="section-2">
          <Wireless>
            <Heading
              text="Wireless Technology"
              nbr={2}
              dot="green"
              isCenter
            />

            <Text
              text="<p>It’s never been more important to communicate with those around us.
              Wireless technology helps us do that by transmitting and receiving voice,
              data, video, and more across radio airwaves. And this technology is
              evolving so quickly that it is playing an even bigger role
              in our lives every day.</p>"
              isCenter
              hasAnimation
            />

            <Text
              text="<p>As we constantly push the boundaries of wireless technology, our
              lives will be powered by next-generation products and services that will
              provide unmatched levels of scalability, capability, and efficiency.</p>"
              isCenter
              hasAnimation
            />

            <ShareLink link={`ctia.org${pathname}#section-2`} withWrapper hasAnimation />
          </Wireless>

          <Divider />
        </Group>

        <Group type="gray" id="section-3">
          <Heading
            text="The Evolution to 5G"
            nbr={3}
            dot="orange"
            isCenter
          />

          <Text
            text="<p>From having the capability to make phone calls and send short text
            messages, to connecting to hundreds of millions of devices and delivering
            lightning-fast speeds, wireless technology has come a long way since
            its introduction almost four decades ago.</p>"
            isCenter
            hasAnimation
          />

          <ShareLink link={`ctia.org${pathname}#section-3`} withWrapper hasAnimation />

          <Evolution defaultOpenItem="1G">
            <Box
              heading="1G"
              copy="or “first generation” wireless was an analog cellular system
              that launched commercially on October 13, 1983."
              launched="1983"
              speed="~19 kbps"
              image={require('!file-loader!assets/images/5g/evolution/1G.jpg')}
            />

            <Box
              heading="2G"
              copy=" introduced digital technologies that used spectrum more
              efficiently so that it could serve more people and deliver more
              applications, such as text messages, helping us all communicate."
              launched="mid-1990s."
              speed="9.6-14.4 kbps"
              image={require('!file-loader!assets/images/5g/evolution/2G.jpg')}
            />

            <Box
              heading="3G"
              copy="improved communications by supporting even more diverse applications,
              including mobile internet access, mobile gaming, video calls, and
              streaming audio and video."
              launched="early 2000’s"
              speed="~X kbps"
              image={require('!file-loader!assets/images/5g/evolution/3G.jpg')}
            />

            <Box
              heading="4G"
              copy="delivered even faster speeds, improving experiences for customers when
              using data-intensive applications, increasing data upload and download
              speeds, and supporting HD applications. "
              launched="2010"
              speed="100 Mbps"
              image={require('!file-loader!assets/images/5g/evolution/4G.jpg')}
            />

            <Box
              heading="5G"
              copy="supports more diverse applications and more connections; providing
              more capacity, lower latency, and increased speed. 5G will handle the
              exponential growth in demand for capacity, connectivity, and capability
              – delivering a better, faster experience for all. "
              launched="Late 2018"
              speed="Peak of 10 Mbps"
              image={require('!file-loader!assets/images/5g/evolution/5G.jpg')}
            />
          </Evolution>

          <Divider />
        </Group>

        <Group type="gray" id="section-4" overflowVisible>
          <Connecting>
            <Heading
              text="Connecting Everyone and Everything"
              nbr={4}
              dot="green"
              isCenter
            />

            <Text
              text="<p>Huge amounts of money are being invested in installing and maintaining
              backpack- or pizza box-sized small cells to transmit 5G wireless signals and
              form the backbone of next-generation networks.</p>"
              isCenter
              hasAnimation
            />

            <Text
              text="<p>5G brings a wide range of economic and social benefits,
              including millions of jobs in communities across America.</p>"
              isCenter
              hasAnimation
            />

            {/* <SidebarVideo
              title="How 5G is transforming the way we live and work"
              video="https://www.youtube.com/embed/VqfWO2CAC78?enablejsapi=1&autohide=1&showsearch=0&rel=0&quality=hd720&autoplay=1"
            /> */}

            <NumDatas>
              <NumDataBlock
                data="3M"
                copy="new jobs"
              />

              <NumDataBlock
                data="$275B"
                copy="new investment"
              />

              <NumDataBlock
                data="$500B"
                copy="in economic growth"
              />
            </NumDatas>

            <Text
              text="<p>America's wireless companies are investing an estimated $275 billion into
              building 5G networks. This will create three million new jobs
              and add $500 billion to the economy.<sup>2</sup> In fact, it’s estimated that one out of
              every 100 Americans will benefit from a new 5G job.</p>"
              isCenter
              hasAnimation
            />

            <ShareLink link={`ctia.org${pathname}#section-4`} withWrapper hasAnimation />

            {/* <ConnectingColumns>
              <ConnectingColumn
                id="girl"
                image={require('!file-loader!assets/images/5g/connecting/girl.svg')}
                heading="100x Faster"
                copy="With 4G, it can take almost six minutes to download a full movie.
                That same movie can be downloaded in about 15 seconds with 5G."
              />

              <ConnectingColumn
                id="smartwatch"
                image={require('!file-loader!assets/images/5g/connecting/smartwatch.svg')}
                heading="100x More Devices"
                copy="5G will be able to connect up to 100 times more devices, including
                everything from baby monitors to cars, smartwatches, drones,
                VR headsets and more."
              />

              <ConnectingColumn
                id="car"
                image={require('!file-loader!assets/images/5g/connecting/car-circle.svg')}
                heading="5x More Responsive"
                copy="5G’s low latency (or quick reaction time) will make breakthroughs
                such as remote patient monitoring and even remote surgery possible."
              />
            </ConnectingColumns> */}
          </Connecting>
        </Group>

        <Group type="gray">
          <ConnectingCards>
            <Card
              heading="100x Faster"
              copy="With 4G, it can take almost six minutes to download a full movie. That same movie can be downloaded in about 15 seconds with 5G."
              image={require('!file-loader!assets/images/5g/connecting/04-100xFaster_1x.jpg')}
              hasSeparation
            />

            <Card
              heading="100x More Devices"
              copy="5G will be able to connect up to 100 times more devices, including everything from baby monitors to cars, smartwatches, drones, VR headsets and more."
              image={require('!file-loader!assets/images/5g/connecting/04-100xMoreDevices_1x.jpg')}
              hasSeparation
            />

            <Card
              heading="5x More Responsive"
              copy="5G's low latency (or quick reaction time) will make breakthroughs such as remote patient monitoring and even remote surgery possible."
              image={require('!file-loader!assets/images/5g/connecting/04-5xMoreResponsive_1x.jpg')}
              hasSeparation
            />
          </ConnectingCards>
        </Group>

        <Group type="powder dotted" id="section-5">
          <Map5g isNew5g />
        </Group>

        <Group type="gray" id="section-6" isContent>
          <Heading
            text="Industry Benefits"
            nbr={5}
            dot="green"
            isCenter
          />

          <Text
            text="<p>Every industry, including healthcare, energy, transportation, law
            enforcement, e-commerce, logistics, and education will be positively impacted by 5G.</p>"
            isCenter
            hasAnimation
          />

          <Text
            text="<p>That’s the power of 5G. It will touch every facet of our lives,
            enabling us to be safer, think smarter, and react quicker.</p>"
            isCenter
            hasAnimation
          />

          <Text
            text="<p><b>Here are some examples.</b></p>"
            isCenter
            hasAnimation
          />

          <ShareLink link={`ctia.org${pathname}#section-6`} withWrapper hasAnimation />

          <Frame>
            <Healthcare
              title="Healthcare"
              text="<p>5G technology will enable services such as remote patient monitoring and
                even remote surgery through connected healthcare devices. This could generate
                $305 billion in healthcare cost savings every year.<sup>4</sup></p>"
            />

            <Transportation
              title="Transportation"
              text="<p>5G technology will ensure self-driving cars reduce emissions by up to 90
              percent, cut travel time by 40 percent, and save 22,000 lives annually. 5G will
              save $450B annually in transportation costs.<sup>5</sup></p>"
            />

            <SmartCity
              title="Smart Cities"
              text="<p>Wireless-powered smart city solutions will deliver $160 billion in
                benefits and savings through things like lower energy use and less
                congestion.<sup>6</sup> Sensors will monitor the health and safety of critical
                infrastructure like buildings, roads, and bridges, while connected trash cans,
                bus stops, light poles and more will help cities operate more efficiently.</p>"
            />

            {/* <Experience cta={<Button to="https://www.ctia5gin360.org">Go to 360° Experience</Button>}> */}
            <ExperienceCards cta={<Button to="https://www.ctia5gin360.org">Go to 360° Experience</Button>}>
              <Card
                heading="Education"
                copy="5G will give students expanded opportunities to learn through immersive
                applications such as Virtual Reality (VR) and Augmented Reality (AR) thanks
                to the lower latency of 5G wireless networks."
                image={require('!file-loader!assets/images/5g/experience/05-VR.png')}
              />

              <Card
                heading="Drones"
                copy="Drone commerce is expected to add more than $80 billion to the economy
                and create 100,000 new jobs as 5G will unlock this technology’s full commercial
                potential.<sup>7</sup>"
                image={require('!file-loader!assets/images/5g/experience/05-Drone.png')}
              />

              <Card
                heading="Energy"
                copy="5G allows the energy grid to be more accurately monitored, improving
                management, reducing costs, and adding $1.8 trillion in revenue
                to the U.S. economy.<sup>8</sup>"
                image={require('!file-loader!assets/images/5g/experience/05-Energy.png')}
              />
            </ExperienceCards>
            {/* </Experience> */}
          </Frame>
        </Group>

        <Group type="gray" id="section-7">
          <Heading
            text="Bringing the 5G Economy to Life"
            nbr={6}
            dot="orange"
            isCenter
          />

          <Text
            text="<p>With so many industries and communities standing to benefit
            from the 5G economy, it's important that we move
            quickly to foster the right environment for American wireless innovation.</p>"
            isCenter
            hasAnimation
          />

          <Text
            text="<p>A study from Boston Consulting Group found five key success factors to build a dynamic 5G economy in the U.S. over the next decade:</p>"
            isCenter
            hasAnimation
          />

          <Text
            text="<ol>
              <li>Building out the network infrastructure to power these 5G networks to ensure Americans quickly adopt this next-generation of wireless connectivity</li>
              <li>Unleashing a sufficient amount of spectrum, particularly mid-band spectrum, to power 5G</li>
              <li>A powerful innovation ecosystem</li>
              <li>A dynamic business climate that is conducive to technological innovation and</li>
              <li>A workforce equipped with the skills to leverage these technological changes.</li>
            </ol>"
            isCenter
            hasAnimation
          />

          <SidebarReport
            title="Building the 5G Economy"
            link="/news/report-building-the-united-states-5g-economy"
            image={require('!file-loader!assets/images/5g/building-5g-economy.jpg')}
          />

          <ShareLink link={`ctia.org${pathname}#section-7`} withWrapper hasAnimation />

          {/* <Readiness
            title="Winning the 5G Race"
            chart={[
              { position: 1,
                  flag: require('!file-loader!assets/images/5g/readiness/flag-us.svg'),
                  name: 'USA',
                  text: 'U.S. wireless providers are leading the world in 5G investment and deployments. While policymakers have reformed infrastructure rules—and the U.S. scores highly on low- and high-band efforts—concentrated action on mid-band is needed to continue 5G leadership.',
                  highlighted: true },
              { position: 1,
                flag: require('!file-loader!assets/images/5g/readiness/flag-china.svg'),
                name: 'China',
                text: 'The government is committing large amounts of mid- and high-band spectrum for 5G and supporting R&D efforts. All providers have announced extensive trials and have committed to launching 5G in 2020.' },
              { position: 3,
                flag: require('!file-loader!assets/images/5g/readiness/flag-south-korea.svg'),
                name: 'South Korea',
                text: 'The government is committed to leading 5G and made available both mid- and high-band spectrum last year. South Korean wireless providers are among the world’s 5G deployment leaders.',
                framed: true },
              { position: 4,
                flag: require('!file-loader!assets/images/5g/readiness/flag-japan.svg'),
                name: 'Japan',
                framed: true,
                text: 'With the 2020 Olympics galvanizing 5G efforts, Japan is a global leader in mid-band spectrum availability and providers are eyeing 2020 for 5G commercial launches.' },
              { position: 5,
                flag: require('!file-loader!assets/images/5g/readiness/flag-uk.svg'),
                name: 'UK',
                text: 'With strong government backing to ease 5G deployment and with low- and mid-band spectrum now available, most U.K. wireless providers have committed to launching 5G in 2019.' },
              { position: 5,
                  flag: require('!file-loader!assets/images/5g/readiness/flag-italy.svg'),
                  name: 'Italy',
                  text: 'One of the few countries with low-, mid-, and high-band spectrum assigned, Italy has primed its wireless providers for initial 5G launches in late 2019.' },
              { position: 7,
                    flag: require('!file-loader!assets/images/5g/readiness/flag-hongkong.svg'),
                    name: 'Hong Kong',
                    text: 'Plans have been announced to make available a significant amount of mid- and high-band spectrum in the next two years, with providers aiming for 5G launches in 2020.' },
              { position: 7,
                flag: require('!file-loader!assets/images/5g/readiness/flag-german.svg'),
                name: 'Germany',
                text: 'Germany’s emphasis has been on making available more low- and mid-band spectrum and a government-supported 5G strategy—focused on providers’ deploying 5G in 2020. ' },
              { position: 9,
                flag: require('!file-loader!assets/images/5g/readiness/flag-australia.svg'),
                name: 'Australia',
                text: 'Mid-band spectrum has already been brought to market, policymakers are looking to streamline infrastructure siting rules, and some providers are launching 5G in 2019.' },
              { position: 10,
                  flag: require('!file-loader!assets/images/5g/readiness/flag-spain.svg'),
                  name: 'Spain',
                  text: 'The leader in mid-band spectrum, Spain lags behind on high-band and providers’ 5G commercial launches.' },
            ]}
            finishLine={require('!file-loader!assets/images/5g/readiness/finish-line.png')}
          >
            <Heading
              text="5G Readiness Index"
              isCenter
              small
            />

            <Text
              text="<p>Analysys Mason ranked 14 countries across key factors to determine
              which countries were in the best position to win the Race to 5G. Countries
              were evaluated based on their spectrum availability—including low-, mid-,
              and high-band, industry commitment, and government support—and their pro-5G
              infrastructure policies.  For more
              details, <a data-link='local' href='/news/global-race-to-5g-spectrum-and-infrastructure-plans-and-priorities'>download the full report</a>,
              <a data-link='local' href='/news/race-to-5g-report'>or the abstract</a>.</p>"
              isCenter
              hasAnimation
            />

            <Text
              text="<p>Click a bubble to see more about each country.</p>"
              isCenter
              hasAnimation
            />
          </Readiness> */}
        </Group>

        <Group type="gray" isContent>
          <Heading
            text="Policy Solutions"
            isCenter
            small
          />

          <Text
            text="<p><b>Some of the policies that need to be addressed include:</b></p>"
            isCenter
            hasAnimation
          />

          <Policy
            number={1}
            color="blue-purple"
            title="Freeing Up More Spectrum"
            text="Spectrum is the critical input for wireless service, and we need a pipeline
            of low-, mid-, and high-band spectrum auctions to meet Americans’ growing demand
            for more mobile services. Freeing up new airwaves will help providers meet that
              demand for the foreseeable future."
            link="/positions/spectrum"
          >
            <img
              src={require('!file-loader!assets/images/5g/policy/06-Spectrum_opt.png')}
              width="400"
              // height="194.5"
              alt="multicolored lines and dots ordered in rows"
            />
          </Policy>

          <Policy
            number={2}
            colors="green-blue"
            title="Modernizing Rules for Wireless Infrastructure"
            text="Traditional 200-foot cell towers are governed by rules designed specifically for
            such towers. Tomorrow's 5G networks will rely on small cell antennas the size of backpacks or
            pizza boxes, and they shouldn’t be governed by the same rules. While progress has been
            made on the federal level, siting rules across the country should continue to be
            modernized for the deployment of modern wireless infrastructure."
            alignment="bottom"
            link="/positions/infrastructure"
          >
            <img
              src={require('!file-loader!assets/images/5g/policy/06-WirelessInfrastructure_opt.png')}
              width="470"
              // height="528"
              alt="a wireless transmitter installed on top of a street lamp"
            />
          </Policy>

          <Policy
            number={3}
            colors="blue-orange"
            title="Creating Permanent Federal Regulations"
            text="Wireless consumers deserve to be protected. One of the ways to do that is
            by setting permanent, common sense federal regulations for interstate services
            like mobile broadband. Innovation and investment in tomorrow's networks also
            need to be promoted to ensure an open internet and protect consumer privacy."
            link="/positions/net-neutrality"
          >
            <img
              src={require('!file-loader!assets/images/5g/policy/06-Regulations_opt.png')}
              width="200"
              // height="406"
              alt="a building"
            />
          </Policy>

          <Footnote
            text="<ol>
            <li>U.S. Wireless Industry Contributes $475 Billion Annually to America’s Economy and Supports 4.7 Million Jobs, According to New Report, Accenture, April 5, 2018, at <a target='_blank' href='https://newsroom.accenture.com/news/us-wireless-industry-contributes-475-billion-annually-to-americas-economy-and-supports-4-7-million-jobs-according-to-new-report.htm'>https://newsroom.accenture.com/news/us-wireless-industry-contributes-475-billion-annually-to-americas-economy-and-supports-4-7-million-jobs-according-to-new-report.htm</a>.</li>
            <li>How 5G Can Help Municipalities Become Vibrant Smart Cities, Accenture, January 12, 2017, at <a target='_blank' href='https://www.accenture.com/t20170222T202102__w__/us-en/_acnmedia/PDF-43/Accenture-5G-Municipalities-Become-Smart-Cities.pdf'>https://www.accenture.com/t20170222T202102__w__/us-en/_acnmedia/PDF-43/Accenture-5G-Municipalities-Become-Smart-Cities.pdf</a>.</li>
            <li>How 5G Can Help Municipalities Become Vibrant Smart Cities, Accenture, January 12, 2017, at <a target='_blank' href='https://www.accenture.com/t20170222T202102__w__/us-en/_acnmedia/PDF-43/Accenture-5G-Municipalities-Become-Smart-Cities.pdf'>https://www.accenture.com/t20170222T202102__w__/us-en/_acnmedia/PDF-43/Accenture-5G-Municipalities-Become-Smart-Cities.pdf</a>. For more information about the 5G Map methodology <a data-link='local' href='/about-ctia/contact-us/'>contact CTIA</a>.</li>
            <li>Wireless Connectivity Fuels Industry Growth and Innovation in Energy, Health, Public Safety, and Transportation, Deloitte, January 19, 2017, at <a target='_blank' href='https://api.ctia.org/docs/default-source/default-document-library/deloitte_2017011987f8479664c467a6bc70ff0000ed09a9.pdf'>https://api.ctia.org/docs/default-source/default-document-library/deloitte_2017011987f8479664c467a6bc70ff0000ed09a9.pdf</a>.</li>
            <li>Wireless Connectivity Fuels Industry Growth and Innovation in Energy, Health, Public Safety, and Transportation, Deloitte, January 19, 2017, at <a target='_blank' href='https://api.ctia.org/docs/default-source/default-document-library/deloitte_2017011987f8479664c467a6bc70ff0000ed09a9.pdf'>https://api.ctia.org/docs/default-source/default-document-library/deloitte_2017011987f8479664c467a6bc70ff0000ed09a9.pdf</a>.</li>
            <li>How 5G Can Help Municipalities Become Vibrant Smart Cities, Accenture, January 12, 2017, at <a target='_blank' href='https://www.accenture.com/t20170222T202102__w__/us-en/_acnmedia/PDF-43/Accenture-5G-Municipalities-Become-Smart-Cities.pdf'>https://www.accenture.com/t20170222T202102__w__/us-en/_acnmedia/PDF-43/Accenture-5G-Municipalities-Become-Smart-Cities.pdf</a>.</li>
            <li>Commercial Wireless Networks: The Essential Foundation of the Drone Industry, CTIA, November 11, 2017, at <a target='_blank' href='https://api.ctia.org/docs/default-source/default-document-library/drone_whitepaper_final_approved.pdf'>https://api.ctia.org/docs/default-source/default-document-library/drone_whitepaper_final_approved.pdf</a>.</li>
            <li>Wireless Connectivity Fuels Industry Growth and Innovation in Energy, Health, Public Safety, and Transportation, Deloitte, January 19, 2017, at <a target='_blank' href='https://api.ctia.org/docs/default-source/default-document-library/deloitte_2017011987f8479664c467a6bc70ff0000ed09a9.pdf'>https://api.ctia.org/docs/default-source/default-document-library/deloitte_2017011987f8479664c467a6bc70ff0000ed09a9.pdf</a>.</li>
            <li>How America’s 4G Leadership Propelled the U.S. Economy, Recon Analytics, April 16, 2018.</li>
            </ol>"
            isWide
          />
        </Group>

        <Group>
          <RelatedContent
            data={[
              {
                id: 1,
                type: 'blog',
                date: 'Nov 01, 2019',
                title: 'China Plays Catch Up as the U.S. Launches the 5G Economy',
                slug: 'china-plays-catch-up-as-the-u-s-launches-the-5g-economy',
                tags: [{ name: '5G' }],
              },
              {
                id: 2,
                type: 'report',
                date: 'Jul 19, 2018',
                title: 'Accelerating Future Economic Value From the Wireless Industry',
                slug: 'accelerating-future-economic-value-from-the-wireless-industry',
                tags: [{ name: 'Wireless Industry' }, { name: '5G' }, { name: 'Economic Impact' }],
              },
              {
                id: 3,
                type: 'report',
                date: 'Apr 16, 2018',
                title: 'How America’s 4G Leadership Propelled the US Economy',
                slug: 'how-americas-4g-leadership-propelled-the-u-s-economy',
                tags: [{ name: 'Wireless Industry' }, { name: 'Economic Development' }, { name: '5G' }],
              },
            ]}
          />
        </Group>
      </Layout>
    );
  }
}
