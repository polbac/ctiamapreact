import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { join } from 'path';
import List, { Item } from 'components/list';

class Sections extends PureComponent {

  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    match: PropTypes.object,
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const { items, match } = this.props;

    if (typeof items === 'boolean') {
      return null;
    }

    return (
      <Fragment>
        <List>
          {items.map((item, i) => {
            const {
              id,
              title = '',
              slug,
              fields: {
                header: {
                  copy = '',
                } = {},
              } = {},
              image,
            } = item;

            const link = join(match.url, slug);

            return (
              <Item
                key={id}
                number={i + 1}
                title={title}
                image={image}
                buttonText="Read"
                buttonLink={link}
              >
                {copy}
              </Item>
            );
          })}
        </List>
      </Fragment>
    );
  }
}

export default withRouter(Sections);
