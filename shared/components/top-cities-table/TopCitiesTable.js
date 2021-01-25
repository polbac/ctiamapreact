import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table, { Row, Col, Head as TableHead } from 'components/table';

// for 4 digit numbers, append 'B', otherwise 'M'
function suffix(num) {
  try {
    if ((num || '').indexOf('.') >= 0) {

      const cleanNum = Number(num.replace('$', ''));
      const strippedOfInsignificantZeros = Number(cleanNum.toFixed(2)).toString();

      return `$${strippedOfInsignificantZeros}B`;
    }
  } catch (e) {
    // you never know
  }

  return `${num}M`;
}

function fixDelimiter(num) {
  try {
    if (num.toString().indexOf('.') >= 0) {
      const fixedNum = (num * 1000).toFixed(0);

      return fixedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } catch (e) {
    // empty
  }

  return num;
}

export default class TopCitiesTable extends PureComponent {

  static propTypes = {
    data: PropTypes.array,
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props;

    return (
      <Table>
        <TableHead>
          <Col scope="col">City</Col>
          <Col scope="col">Estimated GDP Growth from 5G</Col>
          <Col scope="col">Estimated 5G Jobs Created</Col>
          <Col scope="col">Estimated 5G Network Investment</Col>
        </TableHead>

        {data.map((item, i) => (
          <Row key={i}>
            <Col isHighlighted>{item.city}</Col>
            <Col>{suffix(item.estimatedGDPGrowth)}</Col>
            <Col>{fixDelimiter(item.estimatedJobsCreated)}</Col>
            <Col>{suffix(item.estimatedNetworkInvestment)}</Col>
          </Row>
        ))}
      </Table>
    );
  }
}
