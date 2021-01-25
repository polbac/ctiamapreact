import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { parse, createUrl } from 'utils/qs';

import Header from 'containers/header';
import { Topic, Categories } from 'containers/filters';
import NewsList from 'containers/posts';

import Layout, { Group } from 'components/layout';
import Hero, { Heading, Copy } from 'components/hero';
import Filters, { DateRange } from 'components/filters';
import PressContact from 'components/press-contact';

import { renderPosts } from 'utils/renderProps';

import NewsLayout from '../../components/layout';
import NewsHeading from '../../components/heading';
import ButtonWrapper from '../../components/button';

export default class Home extends PureComponent {

  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
  };

  onTopicChange = ({ target: { value } }) => {
    const { match: { path }, history, location: { search } } = this.props;

    history.push(createUrl({ path, search, query: { topic: value } }));
  }

  onContentTypeChange = ({ target: { value } }) => {
    const { match: { path }, history, location: { search } } = this.props;

    history.push(createUrl({ path, search, query: { contentType: value } }));
  }

  onDateChange = ({ startDate, endDate }) => {
    const { match: { path }, history, location: { search } } = this.props;
    const query = {};
    const format = 'YYYY-MM-DD';

    if (startDate) {
      query.after = `${startDate.format(format)}T00:00:00.000Z`;
    } else {
      query.after = '';
    }

    if (endDate) {
      query.before = `${endDate.format(format)}T00:00:00.000Z`;
    } else {
      query.before = '';
    }

    history.push(createUrl({
      path,
      search,
      query,
    }));
  }

  render() {
    const {
      location: { search },
    } = this.props;
    const query = parse(search);

    return (
      <Layout>
        <Helmet title="News" />

        <Group type="gray" graphics="news" noZIndex>
          <Header transparent />
          <Hero center>
            <Heading>News</Heading>
            <Copy></Copy>
          </Hero>

          <Filters>
            <Topic
              defaultValue={query.topic}
              onChange={this.onTopicChange}
              // include={['consumer-news', 'broadband', 'spectrum', 'innovation', '5g']}
            />
            <Categories
              defaultValue={query.contentType}
              onChange={this.onContentTypeChange}
              include={['report', 'blog', 'press-release', 'event', 'video', 'statement']}
            />
            <DateRange
              onChange={this.onDateChange}
            />
          </Filters>
        </Group>

        <Group type="gray" overflowVisible loZIndex>
          <section aria-live="polite">
            <NewsList
              key={search}
              layout={NewsLayout}
              heading={NewsHeading}
              button={ButtonWrapper}
              featured
              contentType={query.contentType}
              topic={query.topic}
              before={query.before}
              after={query.after}
            >
              {posts => renderPosts(posts)}
            </NewsList>
          </section>

          <PressContact
            email="CTIAMedRel@ctia.org"
            to="/about-ctia/contact-us"
          />
        </Group>
      </Layout>
    );
  }
}
