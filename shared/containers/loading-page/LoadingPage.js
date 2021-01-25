import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from 'containers/header';
import Layout, { Group } from 'components/layout';
import Hero, { Label as HeroLabel, Heading as HeroHeading, Copy as HeroCopy } from 'components/hero';

export default class LoadingPage extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
    center: PropTypes.bool,
  }

  static defaultProps = {
    type: 'gray',
    center: true,
  }

  render() {
    const { type, center } = this.props;

    const realType = `${type}${type !== 'white' ? ' shadow' : ''}`;

    return (
      <Layout>
        <Group>
          <Header transparent />

          <Hero center={center} isLoading>
            <HeroLabel>.</HeroLabel>
            <HeroHeading>.</HeroHeading>
            <HeroCopy>.</HeroCopy>
          </Hero>
        </Group>

        <Group type={realType} isLoading />
      </Layout>
    );
  }
}
