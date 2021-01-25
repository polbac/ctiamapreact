import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import Hero, { Heading } from 'components/hero';
import Header from 'containers/header';
import Layout, { Group } from 'components/layout';
import Editor from 'components/graph-editor';

import { Graphs as GraphLayout } from 'components/wrappers';
import config from 'utils/config';
import Maker from './components/maker';

class GraphsEditor extends Component {

  static propTypes = {
    graphs: PropTypes.object,
  }

  render() {
    const { graphs } = this.props;
    const baseUrl = config('baseUrl');
    const okaccess = (String(baseUrl).indexOf('.ctia.org') !== -1);

    //    if (String(baseUrl).indexOf('.ctia.org')!== -1)
    //    {
    return (
      <Layout>
        <Group type="gray dotted">
          <Header transparent />
          {okaccess && (
            <Redirect to="/" />
          )}
          <Hero center>
            <Heading>Graph Editor</Heading>
          </Hero>

          <Maker graphs={graphs} />

        </Group>

        <Group type="gray">
          <GraphLayout>
            {Array.from(graphs.graphs).map(graph => (
              <Editor
                key={graph.id}
                type={graphs.types.find(x => x.id === graph.type)}
                graph={graph}
                onRemove={() => graphs.removeGraph(graph)}
              />
            ))}
          </GraphLayout>
        </Group>
      </Layout>
    );
  }
}

const withObserver = observer(GraphsEditor);
const withInject = inject('graphs')(withObserver);

export default withInject;
