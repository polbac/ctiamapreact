import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from 'containers/header';
import { Map5g, Map4g } from 'containers/maps';
import Layout, { Group } from 'components/layout';

export default class Map extends PureComponent {

  static propTypes = {
    match: PropTypes.object,
  };

  render() {
    const { match } = this.props;
    const { version = '5g' } = match.params;

    return (
      <Layout>
        <Helmet title={`${version.toUpperCase()} Map`} />

        <Group>
          <Header />
        </Group>
        {version === '5g' ? (
          <Group type="green dotted">
            <Map5g />
          </Group>
        ) : (
          <Group type="powder dotted">
            <Map4g />
          </Group>
        )}
      </Layout>
    );
  }
}
