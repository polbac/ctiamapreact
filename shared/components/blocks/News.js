import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import ellipsis from 'utils/string';
// import { dateParser } from 'utils/wordpress';
import get from 'lodash/get';

import MembersOnlyPrompt from 'containers/members-only-prompt';
import { WordPressImage } from 'components/image';
import { Icon } from 'components/assets';

import s from './News.scss';

export default class News extends PureComponent {

  static propTypes = {
    type: PropTypes.string,
    date: PropTypes.string,
    heading: PropTypes.string,
    to: PropTypes.string,
    copy: PropTypes.string,
    tags: PropTypes.array,
    image: PropTypes.oneOfType([PropTypes.string, WordPressImage.propTypes.image]),
    className: PropTypes.string,
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    author: PropTypes.object,
    membersOnly: PropTypes.bool,
  }

  state = {
    isPromptVisible: false,
  }

  onClick = (e) => {
    const { membersOnly } = this.props;

    if (membersOnly) {
      this.setState({ isPromptVisible: true });

      return e.preventDefault();
    }
  }

  close = () => {
    this.setState({ isPromptVisible: false });
  }

  render() {
    const {
      type,
      date,
      heading,
      to,
      copy,
      tags,
      image,
      className,
      direction,
      author,
      membersOnly,
    } = this.props;

    const { isPromptVisible } = this.state;
    const hasImage = Boolean(image);

    let imageUrl = image;
    let imageAlt = '';

    if (hasImage && typeof image === 'object') {
      imageUrl = image.url;
      imageAlt = image.alt;
    }

    const firstAuthor = get(author, 'team_member');

    const firstAuthorImage = firstAuthor
      ? get(author, 'team_member.fields.image.sizes.medium')
      : get(author, 'image.sizes.medium');

    const firstAuthorName = firstAuthor
      ? get(author, 'team_member.title')
      : get(author, 'name');

    const hasFirstAuthor = firstAuthorImage && firstAuthorName;
    const hasSecondAuthor = get(author, 'has_second_author');
    const secondAuthor = hasSecondAuthor && get(author, 'second_author');

    const secondAuthorImage = secondAuthor
      ? get(author, 'second_author.fields.image.sizes.medium')
      : get(author, 'second_author_image.sizes.medium');

    const secondAuthorName = secondAuthor
      ? get(author, 'second_author.title')
      : get(author, 'second_author_name');

    const post = (
      <Fragment>
        <h3 className={s.news__heading}>{ReactHtmlParser(heading)}</h3>
        {copy && <div className={s.news__copy}>{ReactHtmlParser(ellipsis(copy, 165))}</div>}
      </Fragment>
    );

    const defaultTop = (
      <div className={s.news__top}>
        <header className={s.news__header}>
          <Icon type={type} />
          <p className={s.news__type} title={type}>{type}</p>
          {/* type !== 'Policy Brief' && (
          <p className={s.news__date}>{dateParser(date)}</p>
          ) */}
        </header>

        {post}
      </div>
    );

    const premiumTop = (
      <div className={s.news__top}>
        <header className={s.news__header}>
          <div
            className={s(s.news__authorImage, { hasSecondAuthor })}
            style={{ backgroundImage: `url(${firstAuthorImage})` }}
          />

          {hasSecondAuthor && (
            <div
              className={s.news__authorImage}
              style={{ backgroundImage: `url(${secondAuthorImage})` }}
            />
          )}

          {/* <div className={s.news__authorNameWrapper}> */}
          <p
            className={s(s.news__type, { author: true })}
            title={`Article by ${firstAuthorName}${hasSecondAuthor && ` & ${secondAuthorName}`}`}
          >
            Article by {firstAuthorName}{hasSecondAuthor && ` & ${secondAuthorName}`}
          </p>

          {/* <p className={s.news__date}>{dateParser(date)}</p> */}
          {/* </div> */}
        </header>

        {post}
      </div>
    );

    const content = hasFirstAuthor && type === 'Blog'
      ? premiumTop
      : defaultTop;

    const hasBottom = tags || membersOnly;

    return (
      <Fragment>
        <Link
          className={s(s.news, className, {
            image,
            horizontal: direction === 'horizontal',
            vertical: direction === 'vertical',
          })}
          onClick={this.onClick}
          to={to}
        >
          {hasImage && (
            <div className={s.news__image}>
              <img
                className={s.news__imageSrc}
                src={imageUrl}
                alt={imageAlt}
              />
            </div>
          )}

          <div className={s.news__inner}>
            {content}

            {hasBottom && (
              <div className={s.news__bottom}>
                {tags && (
                  <ul className={s.news__tags}>
                    {tags.slice(0, 3).map((tag, i) => (
                      <li
                        key={`tag-${i}`}
                        className={s.news__tagsItem}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                {membersOnly && (
                  <span className={s.news__membersOnly}>
                    Members only
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>

        <MembersOnlyPrompt
          onClick={this.close}
          isVisible={isPromptVisible}
          to={to}
        />
      </Fragment>
    );
  }
}
