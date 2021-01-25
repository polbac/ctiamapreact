import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import { format } from 'date-fns';

import Button from 'components/button';

import LoadingDocumentList from './LoadingDocumentList';

const getDocuments = ({ wordpress, ...rest }) => wordpress.getDocuments(rest);
const formatDocument = d => ({
  ...d,
  date: format(new Date(d.date), 'MMM D, YYYY'),
});

class DocumentList extends Component {

  static propTypes = {
    children: PropTypes.func,
    jobResult: PropTypes.object,
  }

  page = 1;

  constructor(props) {
    super(props);

    const { jobResult } = props;
    const documents = (jobResult.items || []).map(formatDocument);

    this.state = {
      documents,
      hasMore: jobResult.totalPages > 1,
    };
  }

  onLoadMore = () => {
    this.page = this.page + 1;

    try {
      getDocuments({ ...this.props, page: this.page }).then(({ items, totalPages }) => {
        this.setState({
          documents: [...this.state.documents, ...items.map(formatDocument)],
          hasMore: this.page < totalPages,
        });
      });
    } catch (err) {
      console.warn('Unable to load more articles');
    }
  }

  render() {
    const { children } = this.props;
    const { documents, hasMore } = this.state;

    return (
      <Fragment>
        {children(documents)}

        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={this.onLoadMore}>Load More</Button>
          </div>
        )}
      </Fragment>
    );
  }
}

const documentListWithJob = withJob({
  work: props => getDocuments(props),
  LoadingComponent: () => <LoadingDocumentList />,
})(DocumentList);

export default inject('wordpress')(documentListWithJob);
