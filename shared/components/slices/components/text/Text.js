import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import GraphBlock, { Graph } from 'components/graph-block';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';
import { TransitionGroup } from 'react-transition-group';
import get from 'lodash/get';

import convertToRouterLink from 'utils/convertToRouterLink';
import { documentResolver } from 'utils/urlResolver';

import Portal from 'components/portal';
import Glossary from 'components/glossary';
import Document from 'components/document';
import Animator from 'components/animator';

import SidebarVideo from 'components/sidebar-video';
import SidebarImage from 'components/sidebar-image';
import SidebarText from 'components/sidebar-text';

import Share from './Share';
import s from './Text.scss';

export default class Text extends PureComponent {

  static propTypes = {
    text: PropTypes.string,
    showInfographic: PropTypes.bool,
    showGlossary: PropTypes.bool,
    showDocument: PropTypes.bool,
    showVideo: PropTypes.bool,
    showImage: PropTypes.bool,
    showSidebarText: PropTypes.bool,
    infographic: PropTypes.array,
    glossary: PropTypes.array,
    document: PropTypes.array,
    video: PropTypes.object,
    sbImage: PropTypes.object,
    sbText: PropTypes.string,
    isCenter: PropTypes.bool,
    isLoading: PropTypes.bool,
    isWide: PropTypes.bool,
    hasAnimation: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    document: [],
    glossary: [],
    video: {},
    sbImage: {},
    infographic: [],
    hasAnimation: false,
  }

  state = {
    isAnimationComplete: false,
    toggleShare: false,
    isOverlaping: false,
    isMobile: false,
  }

  componentDidMount() {
    setTimeout(this.onResize, 300);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('click', this.onClick);
  }

  onResize = () => {
    this.safeAsidePositioning();

    this.setState({
      isMobile: window.matchMedia('(max-width: 1200px)').matches,
    });
  }

  safeAsidePositioning = () => {
    const author = document.querySelector('#author-block');

    if (!this.aside || !author) {
      return;
    }

    const { top: at, height: ah } = author.getBoundingClientRect();
    const { top: st } = this.aside.getBoundingClientRect();
    const { scrollY } = window;
    const diff = (st + scrollY) - (at + ah + scrollY);

    this.setState({
      isOverlaping: st + scrollY < at + ah + scrollY,
      authorHeight: Math.abs(diff) + 40,
    });
  }

  onClick = ({ target }) => {
    if (target.nodeName !== 'P') {
      this.setState({ toggleShare: false });
    }
  }

  onPositionChange = ({ currentPosition }) => {
    const { hasAnimation } = this.props;
    const { isAnimationComplete } = this.state;

    if (!hasAnimation) {
      return;
    }

    if (currentPosition === 'above' && !isAnimationComplete) {
      this.animate();
      this.setState({ isAnimationComplete: true });
    }
  }

  animate = () => {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    if (!this.text) {
      return;
    }

    t.fromTo(
      this.text,
      0.75,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, ease },
      0.2,
    );
  }

  checkSelection = () => {
    this.setState({ toggleShare: false });
  }

  getSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    const range = selection.getRangeAt(0);
    const pos = range.getBoundingClientRect();

    if (text.length === 0) {
      return;
    }

    this.setState({
      toggleShare: true,
      pos,
      text,
    });
  }

  render() {
    const {
      text,
      showInfographic,
      showGlossary,
      showDocument,
      showVideo,
      showImage,
      showSidebarText,
      isCenter,
      isLoading,
      isWide,
      infographic,
      glossary,
      document,
      video,
      sbImage,
      sbText,
      hasAnimation,
      className,
    } = this.props;

    const [{
      id: key,
      fields: { definition, text: graphText, footer } = {},
      title,
    } = {}] = infographic || [];

    const { toggleShare, pos, text: shareText, isOverlaping, authorHeight, isMobile } = this.state;
    const arr = [...(document || []), ...(glossary || [])];
    const first = arr.filter(x => x.attachmentIndex !== undefined);
    const attachmentIndex = first.map(item => item.attachmentIndex);
    const safePadding = { paddingTop: (isOverlaping && !isMobile) ? `${authorHeight}px` : 0 };

    const aside = (
      <div className={s(s.text__col, s.aside)}>
        {(showDocument && document) || (showGlossary && glossary) || (showVideo && video) || (showImage && sbImage) || (showSidebarText && sbText) ? (
          <aside
            className={s(s.text__aside)}
            style={safePadding}
            ref={(c) => { this.aside = c; }}
          >
            {showGlossary && glossary && glossary.map(item => (
              <Animator key={item.id}>
                <Glossary
                  number={item.attachmentIndex}
                  type="Glossary"
                  title={item.title}
                  text={item.content}
                />
              </Animator>
            ))}

            {showDocument && document && document.map(item => (
              <Animator key={item.id}>
                <Document
                  number={item.attachmentIndex}
                  type="Document"
                  title={item.title}
                  text={item.content}
                  // to={documentResolver(item.slug, item.categories)}
                  to={documentResolver(item.slug, item.type)}
                  src={get(item.fields, 'document.cover_image.url')}
                  alt={get(item.fields, 'document.cover_image.alt')}
                />
              </Animator>
            ))}

            {showVideo && video && (
            <Animator width="100%">
              <SidebarVideo
                caption={video.caption}
                youtubeId={video.youtube_id}
                image={video.image}
              />
            </Animator>
            )}

            {showImage && sbImage && (
            <Animator width="100%">
              <SidebarImage
                caption={sbImage.caption}
                image={sbImage.image}
              />
            </Animator>
            )}

            {showSidebarText && sbText && (
            <Animator width="100%">
              <SidebarText text={sbText} />
            </Animator>
            )}
          </aside>
        ) : null}
      </div>
    );

    return (
      <Fragment>
        <div
          className={s(s.text, className, {
            isCenter,
            isLoading,
            hasAnimation,
            isWide,
          })}
          ref={(c) => { this.text = c; }}
        >
          {hasAnimation && (
            <Waypoint
              topOffset="95%"
              onPositionChange={this.onPositionChange}
            />
          )}

          <div className={s.text__container}>
            <div className={s.text__row}>
              {!isCenter && !isWide ? aside : null}

              <div className={s(s.text__col, s.primary)}>
                <div // eslint-disable-line
                  className={s.text__content}
                  ref={(el) => {
                    if (!el) return;
                    const dEl = el.querySelector('.document');
                    const gEl = el.querySelector('.glossary');

                    if (dEl && attachmentIndex.length > 0) {
                      dEl.setAttribute('index', attachmentIndex[0]);
                    }

                    if (gEl) {
                      const num = attachmentIndex.length > 1
                        ? attachmentIndex[1] : attachmentIndex[0];

                      gEl.setAttribute('index', num);
                    }
                  }}
                  onMouseDown={this.checkSelection}
                  onMouseUp={this.getSelection}
                >
                  {showInfographic && (
                    <div className="wp-caption alignleft">
                      <Animator key={key}>
                        <GraphBlock
                          title={title}
                          text={graphText}
                          footer={footer}
                          definition={definition}
                          wide={false}
                        >
                          <Graph definition={definition} />
                        </GraphBlock>
                      </Animator>
                    </div>
                  )}

                  {ReactHtmlParser(text, { transform: convertToRouterLink })}
                </div>
              </div>

              {isCenter || isWide ? aside : null}
            </div>
          </div>
        </div>

        <Portal>
          <TransitionGroup>
            {toggleShare && (
              <Share
                pos={pos}
                text={shareText}
              />
            )}
          </TransitionGroup>
        </Portal>
      </Fragment>
    );
  }
}
