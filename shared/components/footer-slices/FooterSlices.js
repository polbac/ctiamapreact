import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RelatedDocuments from 'containers/related-documents';
import RelatedContent from 'containers/related-content';
import Guidelines from 'containers/guidelines';
import LearnMore from 'components/learn-more';

export default class FooterSlices extends PureComponent {

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

    return data.map((content, i) => {
      const key = `content-${i}`;

      switch (content.acf_fc_layout) {

        case 'learn_more':
          return (
            <LearnMore
              key={key}
              heading={content.heading}
              copy={content.copy}
              button={content.button}
              to={content.link}
            />
          );

        case 'related_documents':
          return (
            <RelatedDocuments
              key={key}
              heading={content.heading}
              viewMore={content.related_link || undefined}
              viewMoreText={content.related_heading || undefined}
              data={Array.isArray(content.related) ? content.related : []}
            />
          );

        case 'related':
          return (
            <RelatedContent
              key={key}
              data={Array.isArray(content.related) ? content.related : []}
            />
          );

        case 'related_guidelines':
          return (
            <Guidelines
              key={key}
              heading={content.heading}
              data={Array.isArray(content.guidelines) ? content.guidelines : []}
              shadow
              segment
            />
          );

        default:
          return null;
      }
    });
  }
}
