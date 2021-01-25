import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import algoliaSearch from 'algoliasearch';

import config from 'utils/config';

import Header from 'containers/header';
import Layout, { Group } from 'components/layout';

import SearchHeading from './components/search-heading';
import SearchContainer, { Filters, Results } from './components/search-container';

function updateHash(filters) {
  const { length } = filters;

  const url = length !== 0
    ? `?filters=${filters.join(',')}`
    : '?';

  window.history.replaceState({}, null, url);
}

export default class Search extends PureComponent {

  state = {
    hits: [],
    filters: [],
  }

  selected = []

  getAllFacets = index => new Promise((resolve, reject) => {
    index.search({
      facetingAfterDistinct: true,
      facets: ['taxonomies.category', 'post_type_label'],
    }, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(this.mergePagesToFacets(res.facets));
    });
  })

  mergePagesToFacets = (allFacets) => {
    const { post_type_label: { Pages = 0 } = {} } = allFacets;

    return {
      ...allFacets['taxonomies.category'],
      Pages,
    };
  }

  joinFacets = (allFacets, facets) => Object.keys(allFacets)
    .reduce((result, key) => [...result, { count: facets[key] || 0, key }], [])
    .sort((a, b) => a.count < b.count);

  async componentDidMount() {
    const client = algoliaSearch(config('algoliaAppId'), config('algoliaApiKeySearch'));

    this.index = client.initIndex(config('algoliaPrimaryIndex'));
    this.allFacets = await this.getAllFacets(this.index);
    this.querySearch(this.props, { didMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.querySearch(nextProps);
  }

  async querySearch(props, { didMount = false } = {}) {
    const { query } = props.match.params;

    if (query) {
      const { search } = props.location;
      const items = search.split('=')[1];
      let filters = [];

      if (items) {
        const tmp = decodeURI(items).split(',');

        this.selected.push(...tmp);
        filters = tmp;
      }

      this.doSearch(query, { filters, didMount });
    }
  }

  doSearch = (query, { page = 0, loadMore = false, filters = [], didMount } = {}) => {
    const { hits } = this.state;

    if (didMount) {
      this.index.search({
        query,
        facetingAfterDistinct: true,
        facets: ['taxonomies.category', 'post_type_label'],
      }, (err, res) => {
        const facets = this.mergePagesToFacets(res.facets);

        this.setState({ filters: this.joinFacets(this.allFacets, facets) });
      });
    }

    const facetFilters = filters.map(f => f === 'Pages' ? `post_type_label:"${f}"` : `taxonomies.category:"${f}"`);

    this.index.search({
      query,
      page,
      facetingAfterDistinct: true,
      facets: ['taxonomies.category', 'post_type_label'],
      filters: facetFilters.join(' OR '),
    }, (err, res) => {
      if (err) {
        console.error(`Algolia search ${query} error: ${err}`);
      }

      const facets = this.mergePagesToFacets(res.facets);

      this.setState({
        query,
        page: res.page,
        hits: loadMore ? [...hits, ...res.hits] : res.hits,
        nbHits: res.nbHits,
        filters: filters.length === 0
          ? this.joinFacets(this.allFacets, facets)
          : this.state.filters,
      });
    });
  }

  onLoadMore = () => {
    const { query, page } = this.state;

    this.doSearch(query, { page: page + 1, loadMore: true });
  }

  onFilterChange = ({ currentTarget }) => {
    const { name, checked } = currentTarget;
    const { query } = this.state;

    if (checked) {
      this.selected.push(name);
      updateHash(this.selected);
    } else {
      const index = this.selected.indexOf(name);

      this.selected.splice(index, 1);
      updateHash(this.selected);
    }

    this.doSearch(query, { filters: this.selected });
  }

  render() {
    const { query, nbHits, hits, filters } = this.state;
    const show = hits.length === nbHits ? false : nbHits > 0 ? true : false; // eslint-disable-line

    const filteredFilters = filters
      .filter(filter => filter.key && filter.key.toLowerCase() !== 'uncategorized');

    return (
      <Layout>
        <Helmet title="Search" />

        <Group type="gray">
          <Header />

          <SearchHeading
            query={query}
            results={nbHits}
          />

          <SearchContainer>
            <Filters
              data={filteredFilters}
              selected={this.selected}
              onChange={this.onFilterChange}
            />

            <Results
              data={hits}
              showLoadMore={show}
              onClick={this.onLoadMore}
            />
          </SearchContainer>
        </Group>
      </Layout>
    );
  }
}
