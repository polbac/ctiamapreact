import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/button';
import { Link } from 'react-router-dom';
import ExternalLinkSVG from 'assets/images/icons/icon-external-link.svg';
import SafeHtml from '../safe-html/';
import s from './ThisWeekIn5gPosts.scss';

export default class ThisWeekIn5gPosts extends Component {

  static propTypes = {
    data: PropTypes.object,
  }

  state = {
    listLimit: 3,
  }

  showMore = () => {
    this.setState({ listLimit: this.state.listLimit += 3 });
  }

  formatArticleLinks = links =>
    links.filter((e, i) => i < 2).map(link =>
      link.link_label && link.link_type === 'External' ?
        <a key={link.link_label} target="_blank" rel="noopener noreferrer" href={link.link_url} className={s.twi5g__link}>
          {link.link_label}
          <ExternalLinkSVG className={s.twi5g__iconImage} />
        </a >
        :

        <Link className={s.twi5g__link} to={`/news/${link}`} key={link}>
          Read More
        </Link>)

  // (article.slug && !/^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(article.slug))

  formatPost = article => ({
    summary: article.fields.summary,
    links: this.formatArticleLinks([article.slug]),
    image: this.formatArticleImage(article.fields.premium_image),
    title: article.title,
  })

  formatExternalArticle = article => ({
    summary: article.fields.summary,
    links: this.formatArticleLinks(article.fields.external_links),
    image: this.formatArticleImage(article.fields.premium_image),
    title: article.title,
  })

  formatArticleImage = image => image && image.url ? image.url : ''

  formatArticle = (article) => {
    switch (article.type) {
      case 'external-articles':
        return this.formatExternalArticle(article);
      default:
        return this.formatPost(article);
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className={s.twi5g}>
        {data.articles
          .filter((e, i) => i < this.state.listLimit)
          .map(
            (article) => {
              const articleData = this.formatArticle(article);

              return (
                <div id={article.id} key={article.id}>
                  <section key={article.id} className={s.twi5g__container}>
                    {articleData.image && <img className={s.twi5g__image} data-object-fit="cover" alt="CTIA post" src={articleData.image} />}
                    <div className={s.twi5g__content}>
                      <h2 className={s.twi5g__header}> {article.title} </h2>
                      <div className={s.twi5g__text}>
                        <SafeHtml html={articleData.summary} />
                      </div>
                    </div>
                  </section>
                  <div className={s.twi5g__links}>
                    {articleData.links}
                  </div>
                </div>
              );
            },
          )}
        {data.articles.length > this.state.listLimit && <Button blue onClick={this.showMore}>Show More</Button>}
      </div>
    );
  }
}
