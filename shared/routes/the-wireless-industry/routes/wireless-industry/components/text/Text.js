import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GraphBlock, { Graph } from 'components/graph-block';
import { TimelineLite } from 'gsap';
import Waypoint from 'react-waypoint';
import get from 'lodash/get';

import { documentResolver } from 'utils/urlResolver';

import Glossary from 'components/glossary';
import Document from 'components/document';
import Animator from 'components/animator';

import s from './Text.scss';

export default class Text extends PureComponent {

  static propTypes = {
    showInfographic: PropTypes.bool,
    showGlossary: PropTypes.bool,
    showDocument: PropTypes.bool,
    infographic: PropTypes.array,
    glossary: PropTypes.array,
    document: PropTypes.array,
    isCenter: PropTypes.bool,
    isLoading: PropTypes.bool,
    hasAnimation: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    document: [],
    glossary: [],
    infographic: [],
    hasAnimation: false,
  }

  state = {
    isAnimationComplete: false,
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

  render() {
    const {
      showInfographic,
      showGlossary,
      showDocument,
      isCenter,
      isLoading,
      infographic,
      glossary,
      document,
      hasAnimation,
      className,
      children,
    } = this.props;

    const [{
      id: key,
      fields: { definition, text: graphText, footer } = {},
      title,
    } = {}] = infographic || [];

    const arr = [...(document || []), ...(glossary || [])];
    const first = arr.filter(x => x.attachmentIndex !== undefined);
    const attachmentIndex = first.map(item => item.attachmentIndex);

    const aside = (
      <div className={s(s.text__col, s.aside)}>
        {(showDocument && document) || (showGlossary && glossary) ? (
          <aside className={s(s.text__aside, { isCenter })}>
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
                />
              </Animator>
            ))}
          </aside>
        ) : null}
      </div>
    );

    return (
      <div
        className={s(s.text, className, {
          isCenter,
          isLoading,
          hasAnimation,
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
            {!isCenter ? aside : null}

            <div className={s(s.text__col, s.primary)}>
              <div
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

                {children}
              </div>
            </div>

            {isCenter ? aside : null}
          </div>
        </div>
      </div>
    );
  }
}
