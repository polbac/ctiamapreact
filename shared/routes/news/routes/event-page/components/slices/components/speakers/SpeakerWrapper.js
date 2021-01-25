import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Header } from 'components/wrappers';

import s from './SpeakerWrapper.scss';

export default class SpeakerWrapper extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
  }

  state = {
    isActive: false,
  }

  handleClick = () => {
    const { isActive } = this.state;

    this.setState({ isActive: !isActive });
  }

  render() {
    const { heading, children } = this.props;
    const { isActive } = this.state;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { handleClick: this.handleClick }));

    return (
      <div className={s(s.SpeakerWrapper, { isActive })}>
        <div className={s.SpeakerWrapper__container}>
          {heading && (
            <Header isCenter>{heading}</Header>
          )}
          <div className={s.SpeakerWrapper__row}>
            {childrenWithProps}
          </div>
        </div>
      </div>
    );
  }
}
