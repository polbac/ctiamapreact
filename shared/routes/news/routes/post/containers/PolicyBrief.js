import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mimeTypeToType } from 'utils/wordpress';
import { assets } from 'utils/themes';
import get from 'lodash/get';

import { WordPressHeader, WordPressHelmet } from 'containers/header';
import MembersOnlyPrompt from 'containers/members-only-prompt';
import Slices from 'components/slices';
import FooterSlices from 'components/footer-slices';
import { Group } from 'components/layout';
import Legacy from 'components/legacy';
import PostSidebar from 'components/post-sidebar';
import Downloader from 'components/downloader';

import PostLayout from '../components/layout';

class PolicyBrief extends PureComponent {

  static propTypes = {
    post: PropTypes.object,
  }

  render() {
    const { post } = this.props;

    const {
      title,
      tags = [],
      categories = [],
      content: legacyContent = '',
      fields: {
        components = [],
        author = null,
        header = {},
        footer = [],
        document: {
          size = '',
          link_to: {
            file = {},
            url,
          } = {},
          cover_image: coverImage = {},
        } = {},
      },
      seo = {},
    } = post;

    const meta = {
      type: categories.map(c => c.name).join(', '),
    };

    const hasComponents = components && components.length > 0;
    const hasLegacyContent = legacyContent && legacyContent !== '';
    const hasFooter = footer && footer.length > 0;
    // const isPressRelease = !!categories.find(x => x.slug === 'press-release');
    // const isCenterAligned = !(isPressRelease || author);
    const isCenterAligned = !(file || url);
    const pattern = 'article';
    const membersOnly = header.members_only;
    const isUnlock = Boolean(get(this.props, 'location.state.isUnlock'));
    const type = mimeTypeToType(file.mime_type);

    return (
      <Fragment>
        <WordPressHelmet
          title={title}
          seo={seo}
        />

        <WordPressHeader
          data={{
            ...header,
            pattern,
            alignment: 'left',
          }}
          title={title}
          tags={tags.map(tag => tag.name)}
          meta={meta}
          wide={Boolean(hasLegacyContent)}
        />

        {(membersOnly && !isUnlock) && <MembersOnlyPrompt />}

        <Group type="shadow">
          <PostLayout>
            {(file || url) && (
            <PostSidebar wide>
              <Downloader
                title={title}
                image={coverImage}
                extension={type}
                size={size}
                href={file ? file.url : url}
                inSidebar
              />
            </PostSidebar>
            )}

            {hasComponents && (
              <Slices
                data={components}
                isCenter={false}
                theme={assets(pattern)}
              />
            )}

            {!hasComponents && hasLegacyContent && (
              <Legacy
                content={legacyContent}
                isCenter={isCenterAligned}
              />
            )}
          </PostLayout>
        </Group>

        {hasFooter && (
          <Group graphics="positions">
            <FooterSlices data={footer} />
          </Group>
        )}
      </Fragment>
    );
  }
}

export default withRouter(PolicyBrief);
