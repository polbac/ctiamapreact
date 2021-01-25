import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';

import Header from 'containers/header';
import { Topic } from 'containers/filters';
import NewsList from 'containers/posts';

import Layout, { Group } from 'components/layout';
import Filters, { DateRange } from 'components/filters';
import Hero, { Heading, Label, Copy } from 'components/hero';
import PressContact from 'components/press-contact';
import { parse, createUrl } from 'utils/qs';
import { renderPosts } from 'utils/renderProps';

import NewsLayout from '../../components/layout';
import NewsHeading from '../../components/heading';
import ButtonWrapper from '../../components/button';

class Posts extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    label: PropTypes.string,
    copy: PropTypes.string,
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  onTopicChange = ({ target: { value } }) => {
    const { match: { path }, history, location: { search } } = this.props;

    history.push(createUrl({ path, search, query: { topic: value } }));
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
      title,
      label,
      copy,
      location: { search },
      category,
    } = this.props;
    const query = parse(search);

    return (
      <Layout>
        <Helmet title="News" />

        <Group type="gray" graphics="news">
          <Header transparent />

          <Hero center>
            <Label>{label}</Label>
            <Heading>{title}</Heading>
            <Copy>{copy}</Copy>
          </Hero>

          <Filters>
            <Topic
              defaultValue={query.topic}
              onChange={this.onTopicChange}
              // include={['consumer-news', 'broadband', 'spectrum', 'innovation', '5g']}
            />
            <DateRange
              onChange={this.onDateChange}
            />
          </Filters>
        </Group>

        <Group type="gray" loZIndex>
          <section>
            <NewsList
              key={search}
              layout={NewsLayout}
              heading={NewsHeading}
              button={ButtonWrapper}
              contentType={category}
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

export default withRouter(Posts);
