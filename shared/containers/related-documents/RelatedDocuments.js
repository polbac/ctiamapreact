import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isArray from 'lodash/isArray';
import { Documents as DocumentsWrapper } from 'components/wrappers';
import { renderDocuments } from 'utils/renderProps';

export default class RelatedDocuments extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    data: PropTypes.arrayOf(
      // this comes from WP
      PropTypes.shape({
        ID: PropTypes.number,
        title: PropTypes.string,
        date: PropTypes.string,
        slug: PropTypes.string,
        categories: PropTypes.array,
        fields: PropTypes.object,
      }),
    ),
    viewMore: PropTypes.string,
    viewMoreText: PropTypes.string,
    onlyContent: PropTypes.bool,
  }

  static defaultProps = {
    viewMore: '/documents',
    viewMoreText: undefined,
  }

  render() {
    const { heading, data, viewMore, viewMoreText, onlyContent } = this.props;

    if (!_isArray(data) || data.length === 0) {
      return null;
    }

    const content = renderDocuments(data, '/positions/documents');

    if (onlyContent) {
      return content;
    }

    return (
      <DocumentsWrapper heading={heading} viewMore={viewMore} viewMoreText={viewMoreText}>
        {content}
      </DocumentsWrapper>
    );
  }
}
