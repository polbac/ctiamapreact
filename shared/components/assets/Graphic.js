import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Left as AboutLeft, Right as AboutRight } from './components/about';
import { Left as ArticleLeft, Right as ArticleRight } from './components/article';
import { Left as ChannelLeft, Right as ChannelRight } from './components/channel';
import { Left as ConsumerLeft, Right as ConsumerRight } from './components/consumer';
import { Left as HomeLeft, Right as HomeRight } from './components/home';
import { Left as IndustryLeft, Right as IndustryRight } from './components/industry';
import { Left as JoinUsLeft, Right as JoinUsRight } from './components/join-us';
import { Left as NewsLeft, Right as NewsRight } from './components/news';
import { Left as OurMembersLeft, Right as OurMembersRight } from './components/our-members';
import { Left as OurMissionLeft, Right as OurMissionRight } from './components/our-mission';
import { Left as PositionsLeft, Right as PositionsRight } from './components/positions';
import { Left as ThisWeekIn5GLeft, Right as ThisWeekIn5GRight } from './components/this-week-in-5g';

export default class Graphic extends PureComponent {

  static propTypes = {
    set: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right']),
    enableAnim: PropTypes.bool,
    className: PropTypes.string,
    leftAlign: PropTypes.bool,
  }

  graphics = rest => [
    {
      set: 'about',
      left: <AboutLeft {...rest} />,
      right: <AboutRight {...rest} />,
    },
    {
      set: 'article',
      left: <ArticleLeft {...rest} />,
      right: <ArticleRight {...rest} />,
    },
    {
      set: 'channel',
      left: <ChannelLeft {...rest} />,
      right: <ChannelRight {...rest} />,
    },
    {
      set: 'consumer',
      left: <ConsumerLeft {...rest} />,
      right: <ConsumerRight {...rest} />,
    },
    {
      set: 'home',
      left: <HomeLeft {...rest} />,
      right: <HomeRight {...rest} />,
    },
    {
      set: 'industry',
      left: <IndustryLeft {...rest} />,
      right: <IndustryRight {...rest} />,
    },
    {
      set: 'join-us',
      left: <JoinUsLeft {...rest} />,
      right: <JoinUsRight {...rest} />,
    },
    {
      set: 'news',
      left: <NewsLeft {...rest} />,
      right: <NewsRight {...rest} />,
    },
    {
      set: 'our-members',
      left: <OurMembersLeft {...rest} />,
      right: <OurMembersRight {...rest} />,
    },
    {
      set: 'our-mission',
      left: <OurMissionLeft {...rest} />,
      right: <OurMissionRight {...rest} />,
    },
    {
      set: 'positions',
      left: <PositionsLeft {...rest} />,
      right: <PositionsRight {...rest} />,
    },
    {
      set: 'this-week-in-5g',
      left: <ThisWeekIn5GLeft {...rest} />,
      right: <ThisWeekIn5GRight {...rest} />,
    },
  ]

  render() {
    const { set, position, enableAnim, className, leftAlign } = this.props;
    const rest = { enableAnim, className, leftAlign };

    const graphic = this.graphics(rest).find(g => g.set === set);

    if (!graphic) {
      return null;
    }

    return graphic[position];
  }
}
