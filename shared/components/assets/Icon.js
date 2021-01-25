import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    type: '',
  }

  get array() {
    return [
      { id: 'Blog', src: require('!file-loader!assets/images/icons/icon-blog.svg') },
      { id: 'Policy Brief', src: require('!file-loader!assets/images/icons/icon-report.svg') },
      { id: 'PDF', src: require('!file-loader!assets/images/icons/icon-report.svg') },
      { id: 'Event', src: require('!file-loader!assets/images/icons/icon-event.svg') },
      { id: 'Press Release', src: require('!file-loader!assets/images/icons/icon-pressrelease.svg') },
      { id: 'Report', src: require('!file-loader!assets/images/icons/icon-report.svg') },
      { id: 'Video', src: require('!file-loader!assets/images/icons/icon-video.svg') },
    ];
  }

  get icon() {
    const { type } = this.props;
    const icon = this.array.find(e => e.id.toLowerCase() === type.toLowerCase());

    if (!icon) {
      return require('!file-loader!assets/images/icons/icon-document.svg');
    }

    return icon.src;
  }

  render() {
    const { className, type } = this.props;

    return (
      <img
        className={className}
        src={this.icon}
        alt={type}
        style={{ width: '30px' }}
      />
    );
  }
}
