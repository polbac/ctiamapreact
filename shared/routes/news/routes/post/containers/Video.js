import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { dateParser } from 'utils/wordpress';
import { assets } from 'utils/themes';
import get from 'lodash/get';

import { WordPressHeader, WordPressHelmet } from 'containers/header';
import MembersOnlyPrompt from 'containers/members-only-prompt';
import Slices from 'components/slices';
import FooterSlices from 'components/footer-slices';
import { Group } from 'components/layout';
import Author from 'components/author';
import Legacy from 'components/legacy';
import PostSidebar from 'components/post-sidebar';

import PostLayout from '../components/layout';

class Video extends PureComponent {

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
      },
      date = '',
      seo = {},
    } = post;

    const meta = {
      type: categories.map(c => c.name).join(', '),
      date: dateParser(date),
    };

    const hasComponents = components && components.length > 0;
    const hasLegacyContent = legacyContent && legacyContent !== '';
    const hasFooter = footer && footer.length > 0;
    const isPressRelease = !!categories.find(x => x.slug === 'press-release');
    const isCenterAligned = !(isPressRelease || author);
    const membersOnly = header.members_only;
    const isUnlock = Boolean(get(this.props, 'location.state.isUnlock'));

    return (
      <Fragment>
        <WordPressHelmet
          title={title}
          seo={seo}
        />

        {(membersOnly && !isUnlock) && <MembersOnlyPrompt />}

        <WordPressHeader
          data={{
            ...header,
            pattern: 'article',
            alignment: 'left',
          }}
          title={title}
          tags={tags.map(tag => tag.name)}
          meta={meta}
          wide={Boolean(hasLegacyContent)}
        />

        <Group type="shadow">
          <PostLayout>
            <PostSidebar>
              {author && author.team_member ? (
                <Author
                  print={false}
                  name={author.team_member.post_title || author.team_member.title}
                  title={author.team_member.fields.title}
                  image={author.team_member.fields.image}
                />
              ) : (
                <Author
                  print={false}
                  name={author && author.name}
                  title={author && author.title}
                  image={author && author.image}
                />
              )}
            </PostSidebar>

            {hasComponents && (
              <Slices
                data={components}
                isCenter={false}
                theme={assets('article')}
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

export default withRouter(Video);
