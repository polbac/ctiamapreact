import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import s from './SearchHeading.scss';

class SearchHeading extends Component {

  static propTypes = {
    ui: PropTypes.object,
    query: PropTypes.string,
    results: PropTypes.number,
  }

  openSearch = () => {
    this.props.ui.shouldOpenOverlay = true;
  }

  render() {
    const { query, results } = this.props;
    const copy = results > 1 ? 'results' : 'result';

    return (
      <div className={s.bar}>
        <div className={s.bar__container}>
          <div className={s.bar__inside}>
            <button
              className={s.bar__query}
              onClick={this.openSearch}
              aria-label="opens search"
            >
              {query}
            </button>

            <p className={s.bar__results}>{results} {copy}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('ui')(SearchHeading);
