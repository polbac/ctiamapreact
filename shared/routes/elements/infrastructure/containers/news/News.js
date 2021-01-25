import React, { PureComponent } from 'react';

import { News as NewsBlock } from 'components/blocks';
import { Content as ContentWrapper } from 'components/wrappers';

export default class NewsContainer extends PureComponent {

  render() {
    const { ...props } = this.props;

    return (
      <ContentWrapper {...props} viewMore="/">
        <NewsBlock
          type="Blog Post"
          date="Jan 8, 2018"
          heading="New 5G Standards Sharpen Need for More Spectrum & Modern Siting Rules"
          copy="We are pleased to see the approval of the first technical standards for next-generation 5G wireless..."
          tags={['Consumer News', '5G']}
          image={require('assets/images/temp/home-image.jpg')}
          direction="vertical"
          to="/"
        />

        <NewsBlock
          type="Blog Post"
          date="Jan 8, 2018"
          heading="New 5G Standards Sharpen Need for More Spectrum & Modern Siting Rules"
          copy="We are pleased to see the approval of the first technical standards for next-generation 5G wireless..."
          tags={['Consumer News', '5G']}
          to="/"
        />

        <NewsBlock
          type="Blog Post"
          date="Jan 8, 2018"
          heading="New 5G Standards Sharpen Need for More Spectrum & Modern Siting Rules"
          copy="We are pleased to see the approval of the first technical standards for next-generation 5G wireless..."
          tags={['Consumer News', '5G']}
          to="/"
        />

        <NewsBlock
          type="Blog Post"
          date="Jan 8, 2018"
          heading="New 5G Standards Sharpen Need for More Spectrum & Modern Siting Rules"
          copy="We are pleased to see the approval of the first technical standards for next-generation 5G wireless..."
          tags={['Consumer News', '5G']}
          to="/"
        />

        <NewsBlock
          type="Blog Post"
          date="Jan 8, 2018"
          heading="New 5G Standards Sharpen Need for More Spectrum & Modern Siting Rules"
          copy="We are pleased to see the approval of the first technical standards for next-generation 5G wireless..."
          tags={['Consumer News', '5G']}
          to="/"
        />
      </ContentWrapper>
    );
  }
}
