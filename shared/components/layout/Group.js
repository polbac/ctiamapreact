import React, { PureComponent, Children, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { dot } from 'utils/themes';

import { Graphic } from 'components/assets';

import s from './Group.scss';

export default class Group extends PureComponent {

  // type: white, gray, blue, green, dotted, shadow
  static propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
    ]),
    children: PropTypes.node,
    graphics: PropTypes.string,
    isContent: PropTypes.bool,
    isLoading: PropTypes.bool,
    enableAnim: PropTypes.bool,
    isRevealing: PropTypes.bool,
    style: PropTypes.object,
    leftAlign: PropTypes.bool,
    showLeftGraphics: PropTypes.bool,
    showRightGraphics: PropTypes.bool,
    overflowVisible: PropTypes.bool,
    noZIndex: PropTypes.bool,
    loZIndex: PropTypes.bool,
    hasPadding: PropTypes.bool,
  }

  static defaultProps = {
    type: 'white',
    enableAnim: true,
    showLeftGraphics: true,
    showRightGraphics: true,
  }

  render() {
    const {
      children,
      type,
      graphics,
      isContent,
      isLoading,
      enableAnim,
      isRevealing,
      style,
      leftAlign,
      showLeftGraphics,
      showRightGraphics,
      overflowVisible,
      noZIndex,
      loZIndex,
      hasPadding,
      ...props
    } = this.props;

    const typeAsArray = !Array.isArray(type) ? type.split(' ') : type;

    return (
      <div
        className={s(
          s.group,
          { isContent, isLoading, isRevealing, overflowVisible, noZIndex, loZIndex, hasPadding },
          ...typeAsArray.map(c => s[c]),
        )}
        style={style}
        {...props}
      >
        <div className={s.group__content}>
          {Children.map(children, (c) => {
            if (c) {
              return cloneElement(c, { color: dot(graphics), type });
            }

            return null;
          })}
        </div>

        {graphics && (
          <Fragment>
            {showLeftGraphics && (
              <Graphic
                set={graphics}
                position="left"
                enableAnim={enableAnim}
                leftAlign={leftAlign}
              />
            )}

            {showRightGraphics && (
              <Graphic
                set={graphics}
                position="right"
                enableAnim={enableAnim}
                leftAlign={leftAlign}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
