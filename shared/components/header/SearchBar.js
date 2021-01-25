/* eslint-disable no-underscore-dangle */

import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import algoliaSearch from 'algoliasearch';
import ReactHtmlParser from 'react-html-parser';

import config from 'utils/config';

import s from './SearchBar.scss';

const DOWNARROW_KEY = 40;
const UPARROW_KEY = 38;
const TAB_KEY = 9;
const SHIFT_KEY = 16;
const ESC_KEY = 27;

export default class SearchBar extends PureComponent {

  static propTypes = {
    wrapperRef: PropTypes.func,
    inputRef: PropTypes.func,
    onSubMouseEnter: PropTypes.func,
    init: PropTypes.func,
    startClose: PropTypes.func,
    isOverlayVisible: PropTypes.bool,
    closeSearch: PropTypes.func,
    openSearch: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    hits: [],
    hitSelected: -1,
  }

  resultsHit = []

  componentDidMount() {
    try {
      const client = algoliaSearch(config('algoliaAppId'), config('algoliaApiKeySearch'));

      this.index = client.initIndex(config('algoliaPrimaryIndex'));
    } catch (e) {
      console.error(e);
    }

    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e) => {
    const { isOverlayVisible } = this.props;
    const { hits, hitSelected } = this.state;
    const key = e.keyCode;

    if (key === ESC_KEY) {
      this.props.closeSearch();
    }

    if ((key === UPARROW_KEY || key === DOWNARROW_KEY) && isOverlayVisible) {
      e.preventDefault();
    }

    if (key === TAB_KEY || key===ESC_KEY) {
      if (hitSelected === hits.length - 1) {
        return;
      }

      return this.setState({ hitSelected: hitSelected + 1 });
    }

    if (key === SHIFT_KEY && key === TAB_KEY) {
      if (hitSelected === 0) {
        return;
      }

      return this.setState({ hitSelected: hitSelected - 1 });
    }

    if (this.resultsHit.length === 0) {
      return;
    }

    if (hits && key === DOWNARROW_KEY) {
      if (hitSelected === hits.length - 1) {
        return;
      }

      const val = hitSelected + 1;

      this.setState({ hitSelected: val });
      this.resultsHit[val].focus();
    }

    if (hits && key === UPARROW_KEY) {
      if (hitSelected === 0) {
        return;
      }

      const val = hitSelected - 1;

      this.setState({ hitSelected: val });
      this.resultsHit[val].focus();
    }
  }

  doSearch = (query) => {
    if (query === '' || !this.index) {
      return this.setState({
        hits: [],
        hitSelected: -1,
      });
    }

    // Capture GA event
    ReactGA.event({
      category: 'Search',
      action: 'Search Query',
      value: query,
    });

    this.index.search({ query, hitsPerPage: 2 }, (err, res) => {
      if (err) {
        console.error(`Algolia search ${query} error: ${err}`);
      }

      this.setState({ hits: res.hits });
    });
  }

  moveCaretAtEnd(e) {
    const tempVal = e.target.value;

    e.target.value = '';
    e.target.value = tempVal;
  }

  onChange = (e) => {
    this.query = e.target.value;
    this.doSearch(e.target.value);
  }

  chooseResult = (query) => {
    this.prepareSubmit(query);
  }

  submitSearch = (e) => {
    this.prepareSubmit(this.query);
    e.preventDefault();
  }

  prepareSubmit = (query) => {
    this.context.router.history.push(`/search/${query}`);
    this.setState({ hitSelected: -1 });

    setTimeout(() => {
      this.props.startClose();
    }, 400);

    this.props.init();
  }

  closeSearchAndSubMenu = (e) => {
    if (this.props.isOverlayVisible) {
      this.props.closeSearch();
      this.props.startClose();
    }
  }

  keepSearchOpen = () => {
    this.props.openSearch();
  }

  render() {
    const {
      wrapperRef,
      inputRef,
      onSubMouseEnter,
      startClose,
      closeSearch,
      openSearch
    } = this.props;
    const { hits } = this.state;

    return (
      <div
        className={s.searchbar}
        ref={wrapperRef}
        onMouseEnter={onSubMouseEnter}
      >
        <div className={s.searchbar__container}>
          <form onSubmit={this.submitSearch} role="search">
            <input
              type="text"
              ref={inputRef}
              className={s.searchbar__input}
              onChange={this.onChange}
              onFocus={this.moveCaretAtEnd, this.keepSearchOpen}
              placeholder="search"
              onBlur={this.closeSearchAndSubMenu}
            />
          </form>

          {hits.map((hit, i) => (
            <button
              ref={(c) => { this.resultsHit[i] = c; }}
              onClick={() => this.chooseResult(hit.post_title)}
              className={s.searchbar__result}
              key={hit.post_id}
            >
              {ReactHtmlParser(hit._highlightResult.post_title.value)}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
