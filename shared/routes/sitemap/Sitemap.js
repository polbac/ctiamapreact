import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { Link } from 'react-router-dom';

import resolver from 'utils/urlResolver';

import LoadingPage from 'containers/loading-page';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Layout, { Group } from 'components/layout';
// import Text from 'components/slices/components/text';
// import Portrait from 'components/portrait';
// import PageLinks, { PageLink } from 'components/page-links';
// import HeadingButton from 'components/heading-button';

import Sitemap from './components/sitemap';

class SitemapPage extends Component {

  static propTypes = {
    jobResult: PropTypes.array,
  };

  static defaultProps = {
    jobResult: [],
  }

  render() {
    const {
      jobResult: [[page = {}] = [], menus],
    } = this.props;

    const {
      title = '',
      fields: {
        header = {},
      } = {},
      seo = {},
    } = page;

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />
        <WordPressHeader data={header} title={title} />

        <Group type="gray">
          <Sitemap>
            <ul>
              {menus.map((top, i) => (
                <li key={i}>
                  <h2>{top.name}</h2>
                  <ul>
                    {top.items.map((item, ii) => (
                      <li key={ii}>
                        <Link to={resolver({ type: item.type, slug: item.slug, url: item.url })}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Sitemap>
        </Group>
      </Layout>
    );
  }
}

const pageWithJob = withJob({
  work: ({ wordpress }) => Promise.all([
    wordpress.getPage({ slug: 'sitemap' }),
    wordpress.menus(),
  ]),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering our mission', error);
    return (
      <div />
    );
  },
})(SitemapPage);

export default inject('wordpress')(pageWithJob);
