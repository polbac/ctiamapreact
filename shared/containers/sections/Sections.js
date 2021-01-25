import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resolver from 'utils/urlResolver';

import Graphs from 'containers/graphs';
import RelatedDocuments from 'containers/related-documents';
import NewsList from 'containers/posts';
import { News as NewsBlock } from 'components/blocks';
import PageLinks, { PageLink } from 'components/page-links';
import HeadingButton from 'components/heading-button';

import Layout from 'components/sections/sections-layout';
import NewsGrid from 'components/sections/news-grid';
import GraphGrid from 'components/sections/graph-grid';
import Documents from 'components/sections/documents';
import { Header } from 'components/wrappers';
import { getPrimaryCategory } from '../../utils/wordpress';

export default class Sections extends PureComponent {

  static propTypes = {
    // empty slices from WP are set as "false"
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props;

    if (typeof data === 'boolean') {
      return null;
    }

    return data.map((section, i) => {
      const key = `section-${i}`;

      switch (section.acf_fc_layout) {

        case 'pages':
          return (
            <Layout key={key}>
              <Header>{section.heading}</Header>

              <PageLinks>
                {(Array.isArray(section.pages) ? section.pages : []).map((page, ii) => {
                  const {
                    kicker = '',
                    heading: pageHeading = '',
                    text: copy = '',
                    graphic = null,
                    link = '',
                    button_text: button = '',
                  } = page;

                  return (
                    <PageLink key={ii} image={graphic} noOffset>
                      <HeadingButton
                        kicker={kicker}
                        heading={pageHeading}
                        copy={copy}
                        button={button}
                        to={link}
                      />
                    </PageLink>
                  );
                })}
              </PageLinks>
            </Layout>
          );

        case 'news':
          return (
            <Layout key={key}>
              <Header
                viewMore={section.see_all_link || null}
                viewMoreText={section.see_all_link_text}
              >
                {section.heading}
              </Header>
              <NewsGrid>
                <NewsList
                  contentType={section.category}
                  topic={section.topic}
                  limit={6}
                >
                  {posts => posts.map(({
                    id,
                    categories = [],
                    primaryCategory,
                    date,
                    title,
                    tags = [],
                    slug,
                  }) => {
                    const type = getPrimaryCategory(categories, primaryCategory);

                    return (
                      <NewsBlock
                        key={id}
                        type={type}
                        date={date}
                        heading={title}
                        tags={tags.map(tag => tag.name)}
                        to={resolver({ type, slug })}
                      />
                    );
                  })}
                </NewsList>
              </NewsGrid>
            </Layout>
          );

        case 'facts':
          return (
            <Layout key={key}>
              <Header
                viewMore={section.see_all_link || null}
                viewMoreText={section.see_all_link_text}
              >
                {section.heading}
              </Header>
              <GraphGrid>
                <Graphs
                  graphs={Array.isArray(section.infographics) ? section.infographics : []}
                  onlyContent
                />
              </GraphGrid>
            </Layout>
          );

        case 'documents':
          return (
            <Layout>
              <Header
                viewMore={section.see_all_link || null}
                viewMoreText={section.see_all_link_text}
              >
                {section.heading}
              </Header>
              <Documents>
                <RelatedDocuments
                  data={Array.isArray(section.documents) ? section.documents : []}
                  onlyContent
                />
              </Documents>
            </Layout>
          );

        default:
          return null;
      }
    });
  }
}
