import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from 'containers/header';
import Layout from 'components/layout';

import Error404 from './components/error';

export default class NotFound extends PureComponent {

  static propTypes = {
    staticContext: PropTypes.shape({
      status: PropTypes.number,
    }),
  }

  componentWillMount() {
    const { staticContext } = this.props;

    if (staticContext) {
      staticContext.status = 404;
    }
  }

  render() {
    return (
      <Layout>
        <Helmet title="404 Not Found" />

        <Header />

        <Error404
          number="404"
          heading="Page was not found"
          copy="or maybe you just need more spectrum"
          button="Back to the homepage"
          to="/"
        />
      </Layout>
    );
  }
}
