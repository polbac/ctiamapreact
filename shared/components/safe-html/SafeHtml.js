import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

export default class SafeHtml extends PureComponent {

  static propTypes = {
    html: PropTypes.string,
  }

  render() {
    const { html } = this.props;

    return (
      <Fragment>
        {ReactHtmlParser(html)}
      </Fragment>
    );
  }
}
