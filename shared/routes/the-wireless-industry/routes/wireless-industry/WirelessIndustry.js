import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { resolve } from 'url';
import scrollToElement from 'utils/scrollToElement';
import config from 'utils/config';

import Header from 'containers/header';
import RelatedContent from 'containers/related-content';
import Layout, { Group } from 'components/layout';
import Heading, { Subheading } from 'components/heading';
import { Text, Footnote } from 'components/slices';
import Numbers, { NumberBlock } from 'components/numbers';
import StickyBar from 'components/sticky-bar';

import Hero from './components/hero';
import Shortcuts from './components/shortcuts';
import Revealotron, { Wrapper as RevealWrapper } from './components/revealotron';
import Firsts, { Column as FirstsColumn } from './components/firsts';
import Consumer, { Column as ConsumerColumn } from './components/consumer';
import Carousel, { Slide } from './components/carousel';
import Bubbles, { Bubble } from './components/bubbles';
import Economic from './components/economic';
import Growth from './components/growth';
import MobileCarrier from './components/mobile-carrier';
import Innovation, { Column as InnovationColumn } from './components/innovation';
import Competitive, { Column as CompetitiveColumn } from './components/competitive';
import Cta from './components/cta';
import Divider from './components/divider';
import FloatyText from './components/text';
import SidebarMapLink from './components/sidebar-link';

const headings = [
  'A Series of Firsts',
  'A Great Consumer Experience',
  'How Wireless Works',
  'An Economic Driver',
  'A Uniquely Competitive Industry',
  'Fueling American Innovation',
];

const baseUrl = config('baseUrl');

export default class WirelessIndustry extends PureComponent {

  static propTypes = {
    location: PropTypes.object,
  }

  componentWillMount() {
    const { location: { hash } } = this.props;

    if (hash) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1);

      setTimeout(() => {
        scrollToElement(hash, { offset: '60%' });
      }, 300);
    }
  }

  render() {
    const { location: { pathname } } = this.props;

    const twitterTitle = 'America\'s Wireless Industry';
    const twitterDesc = 'From networks & handsets to apps & operating systems, America\'s wireless industry is defined by innovation, ingenuity and enterprise.';
    const fbTitle = 'America\'s Wireless Industry';
    const fbDesc = 'From networks & handsets to apps & operating systems, America\'s wireless industry is defined by innovation, ingenuity and enterprise.';
    const image = resolve(baseUrl, '/wireless-share.jpg');

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
        <Helmet title="Wireless Industry" meta={meta} />

        <Revealotron>
          <Group type="gray dotted">
            <Header transparent />

            <Hero subheading="An American Success Story" />
            <Shortcuts headings={headings} />
          </Group>

          <StickyBar headings={headings} withOffset />

          <Group type="gray" id="section-1">
            <RevealWrapper link={`ctia.org${pathname}#section-1`}>
              <Heading
                text="A Series of Firsts"
                dot="blue"
                isCenter
              />
              <Subheading
                text="From networks and handsets to apps and operating systems, America’s wireless industry
                is defined by innovation, ingenuity and enterprise."
              />

              <Text
                text="<p>America invented the cellphone, the smartphone and the app industry—and
                today's 4G networks were deployed here first. We lead the world in wireless and
                that leadership brings significant benefits.</p>"
                isCenter
                hasAnimation
              />

              <Text
                text="<p>America’s competitive wireless industry drives our economy, powers
                innovation across industries, delivers the world’s very best mobile experience
                and helps creates safer communities. No industry is more central to our
                daily lives.</p>"
                isCenter
                hasAnimation
              />

              <Firsts>
                <FirstsColumn
                  image={require('!file-loader!assets/images/wireless-industry/firsts/cellphone.svg')}
                  year="1983"
                  heading="First Handheld Cellphone"
                  copy="The Motorola DynaTAC 8000x, the first commercial handheld mobile phone,
                  which offered 30 minutes of talk-time, approved by FCC."
                />

                <FirstsColumn
                  image={require('!file-loader!assets/images/wireless-industry/firsts/smartphone.svg')}
                  year="1992"
                  heading="First Smartphone"
                  copy="The first smartphone, named the Simon Personal Communicator, was designed
                  by IBM. It could send and receive emails, faxes, and pages."
                />

                <FirstsColumn
                  image={require('!file-loader!assets/images/wireless-industry/firsts/network.svg')}
                  year="2010"
                  heading="First 4G Network"
                  copy="The first 4G LTE networks were broadly deployed in the U.S."
                />
              </Firsts>
            </RevealWrapper>
          </Group>

          <Group type="gray" id="section-2">
            <RevealWrapper link={`ctia.org${pathname}#section-2`}>
              <Heading
                text="A Great Consumer Experience"
                dot="blue"
                isCenter
              />
              <Subheading
                text="Americans enjoy the best wireless experience in the world."
              />

              <Text
                text="<p>High-speed mobile broadband is available to nearly all consumers in the
                country, and those speeds keep going up. Mobile download speeds have increased 130
                percent since 2015. Faster speeds mean better connections and more advanced apps.</p>"
                isCenter
                hasAnimation
              />

              <Numbers>
                <NumberBlock
                  data="442.5M"
                  copy="mobile devices in America"
                />

                <NumberBlock
                  data="96%"
                  copy="of American adults own a cellphone"
                />

                <NumberBlock
                  data="130%"
                  copy="increase in download speeds since 2015"
                />
              </Numbers>

              <Growth>
                <Text
                  text={`
                    <img class="wp-caption alignright" src=${require('!file-loader!assets/images/wireless-industry/consumer-experience/phone.svg')} alt="Graphic of smartphone with text: x more data since 2010" />
                    <p>And we’re doing more on those networks. Wireless is increasingly the preferred way to access the internet.
                    In 2019, wireless traffic totaled 37.06 trillion megabytes—equivalent to the population of Chicago watching all ten episodes of “The Last Dance” 1660 times each.<sup>1</sup>
                    </p>
                    <p>Wireless data use will continue to grow. By 2025, people will interact with connected devices every 18 seconds.<sup>2</sup>
                    It is indispensable to our everyday lives.</p>
                  `}
                  isCenter
                  hasAnimation
                />
              </Growth>

              <Consumer>
                <ConsumerColumn
                  image={require('!file-loader!assets/images/wireless-industry/consumer-experience/consumer-1.svg')}
                  altText="a school building"
                  percentage="67"
                  copy="view wireless as a must have in their community – more than good schools at 65%."
                />

                <ConsumerColumn
                  image={require('!file-loader!assets/images/wireless-industry/consumer-experience/consumer-2.svg')}
                  altText="a chocolate bar"
                  percentage="72"
                  copy="would rather give up chocolate than give up their cell phone."
                />

                <ConsumerColumn
                  image={require('!file-loader!assets/images/wireless-industry/consumer-experience/consumer-3.svg')}
                  altText="a person using a smartphone"
                  percentage="89"
                  copy="can’t live without their smartphone."
                />
              </Consumer>
            </RevealWrapper>
          </Group>

          <Group type="gray" id="section-3">
            <RevealWrapper link={`ctia.org${pathname}#section-3`} gray>
              <Heading
                text="How Wireless Works"
                dot="blue"
                isCenter
              />
              <Subheading
                text="Companies across different industries work together to create the
                innovative wireless ecosystem."
              />

              <Text
                text="<p>Wireless providers deliver the signal that keeps you connected to family, friends,
                entertainment, jobs and a world of experiences and opportunities that make life better.
                Supporting this are network equipment manufacturers, handset companies, app developers and
                more. Learn more about how wireless works.</p>"
                isCenter
                hasAnimation
              />

              <Carousel>
                <Slide
                  heading="Share your life"
                  copy="Your wireless device can send video, voice, texts and email over thousands
                  of miles in a fraction of a second. How does that process work?"
                />

                <Slide
                  heading="Data travels over spectrum"
                  copy="The data you send travels over spectrum―or radio airwaves―to a nearby
                  cell tower or small cell."
                />

                <Slide
                  heading="Infrastructure connects your data"
                  copy="The network equipment at the cell
                  site receives your data, and sends it on to a switching center that connects
                  to the internet."
                />

                <Slide
                  heading="Networks direct your data"
                  copy="Your data is routed across the network and the internet to the right carrier,
                  location and wireless device."
                  hasExtraSpacing
                />

                <Slide
                  heading="Your data is received"
                  copy="Your data arrives at your friend’s wireless device."
                />
              </Carousel>
            </RevealWrapper>
          </Group>

          <Group type="gray" id="section-4">
            <RevealWrapper link={`ctia.org${pathname}#section-4`}>
              <Heading
                text="An Economic Driver"
                dot="blue"
                isCenter
                hasAnimation
              />
              <Subheading
                text="An impact felt across every state and every sector."
              />

              <Text
                text="<p>Wireless fuels our economy, supporting 4.7
                million jobs and contributing $475 billion each year.<sup>3</sup></p>"
                isCenter
                hasAnimation
              />
              <Text
                text="<p>That accounts for 2.6 percent of America’s GDP, making the U.S. wireless industry
                the 24th largest economy in the world.</p>"
                isCenter
                hasAnimation
              />

              <Text
                text="<p>Every wireless job creates an additional 7.7 jobs
                throughout the broader economy, making the industry’s contribution bigger than
                full-service restaurants and hardware manufacturing.<sup>4</sup> Wireless jobs also pay over fifty
                percent more than the average American job.<sup>5</sup></p>"
                isCenter
                hasAnimation
              />

              <Text
                text="<p>The impact is felt broadly across the country. To see the impact
                on your state, explore our interactive map.</p>"
                isCenter
                hasAnimation
              />

              <SidebarMapLink
                title="Wireless industry's impact"
                copy="The wireless industry contributes $475B a year to the U.S. economy and supports 4.7M jobs. It’s impact can be felt across every state."
                to="/the-wireless-industry/map/4g"
              />

              <Bubbles
                heading="Value Add by Industry"
                copy="The wireless industry contributes more to the economy than other major industries
                like agriculture and publishing."
              >
                <Bubble
                  data="$177B"
                  copy="Agriculture"
                  altText="carrot"
                  image={require('!file-loader!assets/images/wireless-industry/economic-driver/agriculture.svg')}
                />

                <Bubble
                  data="$233B"
                  copy="Publishing"
                  altText="book"
                  image={require('!file-loader!assets/images/wireless-industry/economic-driver/publishing.svg')}
                />

                <Bubble
                  data="$279B"
                  copy="Computer Systems Design"
                  altText="notebook computer"
                  image={require('!file-loader!assets/images/wireless-industry/economic-driver/computer.svg')}
                />

                <Bubble
                  data="$475B"
                  copy="Wireless Industry"
                  altText="mobile phone"
                  image={require('!file-loader!assets/images/wireless-industry/economic-driver/wireless.svg')}
                />
              </Bubbles>

              <Text
                text="<h2>We Invest in America.</h2>"
                isCenter
                hasAnimation
              />

              <FloatyText isCenter hasAnimation>
                <p>Wireless companies make significant, long-term investments in America. In fact,
                wireless providers rank first and second in a list of companies making the
                largest annual domestic investment. Wireless providers have made more than $282B in capital investments since 2010. <sup>6</sup></p>

                <NumberBlock
                  inline
                  data="$282B"
                  copy="in capital investments since 2010"
                />

                <p>In addition to capital expenditures, the industry has also spent billions of
                dollars on spectrum licenses. Since 1993, wireless providers have invested over $120 billion in FCC spectrum auctions to power mobile networks.<sup>7</sup></p>

                <p>And we’re not stopping here. The industry is investing an estimated $275 billion
                to roll out next-generation 5G wireless networks, creating 3
                million jobs and $500 billion in economic growth, according
                to Accenture.<sup>8</sup></p>
              </FloatyText>

              <Economic
                data="4.7 MILLION"
                copy="Wireless Related Jobs"
              />
            </RevealWrapper>
          </Group>

          <Group type="gray" id="section-5">
            <RevealWrapper link={`ctia.org${pathname}#section-5`}>
              <Heading
                text="A Uniquely Competitive Industry"
                dot="blue"
                isCenter
                hasAnimation
              />
              <Subheading
                text="Every day, America's wireless companies are doing everything we can to win
                your business."
              />

              <FloatyText isCenter hasAnimation>
                <p>We work relentlessly to improve our networks with faster speeds and innovative
                services such as unlimited data plans. And we spend billions each year to
                convince people to switch from their current
                provider or stay with the one they’re already using.</p>

                <MobileCarrier
                  data="98%"
                  copy="of Americans have 3 or more choices in mobile providers"
                />

                <p>That’s because consumers enjoy a variety of options. Nearly every American can
                choose between three or more providers and there are nearly 100 mobile providers
                nationwide. Consumers can pick from hundreds of handsets, multiple operating
                systems, millions of apps and services and nearly 700 different
                smartphone plans.</p>

                <p>All this competition adds up to lower prices and greater value. In fact,
                wireless prices declined so significantly in 2017 that it drove the average
                price for core consumer goods down across the economy for the first time
                since 2010.<sup>9</sup></p>
              </FloatyText>
              <Competitive>
                <CompetitiveColumn
                  image={require('!file-loader!assets/images/wireless-industry/competitive-industry/competitive-1.svg')}
                  copy="Cost per MB Declined Since 2007"
                  percentage="99.6"
                  altText="stack of coins"
                />

                <CompetitiveColumn
                  image={require('!file-loader!assets/images/wireless-industry/competitive-industry/competitive-2.svg')}
                  copy="Wireless Price Index Declined Since 2016"
                  percentage="13"
                  altText="overlapping price tags"
                />

                <CompetitiveColumn
                  image={require('!file-loader!assets/images/wireless-industry/competitive-industry/competitive-3.svg')}
                  copy="4G Download Speed Increased Since 2014"
                  percentage="90"
                  altText="download icon"
                />
              </Competitive>
            </RevealWrapper>
          </Group>

          <Group type="gray" id="section-6">
            <RevealWrapper link={`ctia.org${pathname}#section-6`}>
              <Heading
                text="Fueling American Innovation"
                dot="blue"
                isCenter
                hasAnimation
              />
              <Subheading
                text="For nearly forty years the wireless industry has pushed the boundaries of
                what’s possible – helping America become the most innovative and advanced country on
                earth."
              />

              <Text
                text="<p>In the 1980s, the wireless industry made it possible to make phone
                calls on the go. In the 1990s, we created text messaging. At the turn of the
                century, we introduced mobile gaming, as well as streaming audio and video. And
                with 4G, we've put true mobile broadband in
                the palm of your hand.</p>"
                isCenter
                hasAnimation
              />
              <Text
                text="<p>But we aren’t stopping there.</p>"
                isCenter
                hasAnimation
              />

              <Numbers>
                <NumberBlock
                  data="$500B"
                  copy="economic benefits generated by 5G"
                />

                <NumberBlock
                  data="$160B"
                  copy="benefits and savings from 5G-enabled smart city technologies"
                />
              </Numbers>

              <Text
                text="<p>5G networks will be 100 times faster, connect 100 times
                more devices and be five times more responsive.</p>"
                isCenter
                hasAnimation
              />
              <Text
                text="<p>Connecting everyone and everything will unlock innovation across every part of
                our lives – powering breakthroughs in healthcare, energy and manufacturing.</p>"
                isCenter
                hasAnimation
              />
              <Text
                text="<p>Wireless industry innovation will enable truly smart cities and is critical to
                the emerging Internet of Things, connecting watches, clothing, drones, cars and more –
                creating new industries and new jobs, improving safety, reducing waste and enhancing our
                environment.</p>"
                isCenter
                hasAnimation
              />

              <Innovation title="5G Networks will be:">
                <InnovationColumn
                  heading="100x"
                  subheading="Faster"
                  // copy="would choose a neighborhood based on reliable wireless
                  // access before good schools."
                />

                <InnovationColumn
                  heading="100x"
                  subheading="Devices"
                  // copy="Lorem ipsum dolor sit malesu
                  // amet consectetur adipiscing elit
                  // sed facilisis mi lacinia. "
                />

                <InnovationColumn
                  heading="5x"
                  subheading="More responsive"
                  // copy="can’t live without their smartphone and/or have it within arm’s reach."
                />
              </Innovation>
            </RevealWrapper>

            <Cta
              button="Discover the next chapter"
              link="/the-wireless-industry/the-race-to-5g"
            />
          </Group>

          <Group type="gray">
            <Footnote
              text="<ol>
              <li>CTIA Annual Wireless Survey, August 2020</li>
              <!--- <li>Cisco VNI Forecast Highlights Tool, Mobile Highlights, <a href='https://www.cisco.com/c/m/en_us/solutions/service-provider/vni-forecast-highlights.html'>https://www.cisco.com/c/m/en_us/solutions/service-provider/vni-forecast-highlights.html</a></li> --->
              <li>Seagate, <a href='https://www.seagate.com/about-seagate/news/seagate-advises-global-business-leaders-and-entrepreneurs-pr-master/'>https://www.seagate.com/about-seagate/news/seagate-advises-global-business-leaders-and-entrepreneurs-pr-master/</a></li>
              <li>Accenture, How the Wireless Industry Powers the U.S. Economy, 2018</li>
              <li>Accenture, How the Wireless Industry Powers the U.S. Economy, 2018</li>
              <li>BLS Quarterly Census of Employment and Wages (2017 average)</li>
              <li>CTIA Annual Wireless Survey, August 2020</li>
              <li>FCC FY2019 Budget Estimates to Congress, Feb. 2018</li>
              <li>Accenture, How 5G Can Help Municipalities Become Vibrant Smart Cities, Feb. 2017</li>
              <li>Ben Leubsdorf, How Cell-Phone Plans With Unlimited Data Limited Inflation, Wall Street Journal, May 19, 2017, <a href='https://blogs.wsj.com/economics/2017/05/19/how-cell-phone-plans-with-unlimited- data-limited-inflation/'>https://blogs.wsj.com/economics/2017/05/19/how-cell-phone-plans-with-unlimited- data-limited-inflation/</a></li>
              </ol>"
              isWide
              noBorder
            />

            <Divider />

            <RelatedContent
              data={[
                {
                  id: 1,
                  type: 'report',
                  date: 'April 19, 2018',
                  title: 'How America’s 4G Leadership Propelled the U.S. Economy',
                  slug: 'how-americas-4g-leadership-propelled-the-u-s-economy',
                  tags: [{ name: 'Wireless Industry' }, { name: 'Economic Development' }, { name: '5G' }],
                },
                {
                  id: 2,
                  type: 'report',
                  date: 'April 5, 2018',
                  title: 'How the Wireless Industry Powers the U.S. Economy',
                  slug: 'how-the-wireless-industry-powers-the-u-s-economy',
                  tags: [{ name: 'Wireless Industry' }, { name: 'Economic Impact' }, { name: '4G' }],
                },
                {
                  id: 3,
                  type: 'report',
                  date: 'Jan 19, 2017',
                  title: 'Wireless Connectivity Fuels Industry Growth',
                  slug: 'deloitte-wireless-connectivity-fuels-industry-growth-and-innovation',
                  tags: [{ name: 'Spectrum' }, { name: 'Smart Grids' }, { name: 'Public Safety' }],
                },
              ]}
            />
          </Group>
        </Revealotron>
      </Layout>
    );
  }
}

