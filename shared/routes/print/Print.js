import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import StateContainer from 'containers/state';

import Layout, { Group } from 'components/layout';
import Statistics from 'components/statistics';
import TopCitiesTable from 'components/top-cities-table';

import PrintPreview from './components/print-preview';

export default class Print extends PureComponent {

  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
  };

  render() {
    const { match, location } = this.props;
    const { type } = match.params;

    const str = 'state=';
    const index = location.search.indexOf(str);
    const state = location.search.substr(index + str.length, 2);

    return (
      <Layout>
        <Helmet title="Print" />
        <Group type="gray">
          <div>
            <StateContainer abbreviation={state} type={type}>
              {({ name, abbreviation, text, stateData, statistics, sources }) => (
                <PrintPreview
                  stateName={name}
                  abbreviation={abbreviation}
                  text={text}
                  data={stateData}
                  sources={sources}
                  type={type}
                >
                  {type === '4g' ? (
                    <Statistics data={statistics} />
                  ) : (
                    <TopCitiesTable data={statistics} />
                  )}
                </PrintPreview>
              )}
            </StateContainer>
          </div>
        </Group>
      </Layout>
    );
  }
}
