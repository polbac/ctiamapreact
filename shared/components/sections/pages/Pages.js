import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Ctas, { Cta } from 'components/ctas';
import HeadingButton from 'components/heading-button';

function getWidth({ current = 0, total = 0 }) {

  if (total > 1 && current === 0) {
    return 9;
  }

  if (total > 1 && current === 1) {
    return 3;
  }

  return 12;
}

export default class Pages extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    pages: PropTypes.array,
  };

  static defaultProps = {
    pages: [],
  }

  render() {
    const { pages, heading } = this.props;

    return (
      <section>
        <h3>{heading}</h3>
        <Ctas>
          {pages.map((page, i) => {
            const {
              kicker = '',
              heading: pageHeading = '',
              text: copy = '',
              graphic = null,
              link = '',
              button_text: button = '',
            } = page;

            const width = getWidth({ current: i, total: pages.length });

            return (
              <Cta key={i} width={width} image={graphic}>
                <HeadingButton
                  kicker={kicker}
                  heading={pageHeading}
                  copy={copy}
                  button={button}
                  to={link}
                />
              </Cta>
            );
          })}
        </Ctas>
      </section>
    );
  }
}

