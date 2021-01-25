import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ModalContent extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    component: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    component: 'div',
  }

  componentWillMount() {
    const { component, className, style } = this.props;

    if (typeof document === 'undefined') {
      return;
    }

    this.modalRoot = document.getElementById('modal-root');
    this.el = document.createElement(component);

    if (className) {
      this.el.classList.add(className);
    }

    if (style) {
      const asPx = i => `${Math.round(i)}px`;

      this.el.setAttribute('style', `top: ${asPx(style.top)}; left: ${asPx(style.left)};`);
    }

    if (this.modalRoot && this.el) {
      this.modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (this.modalRoot && this.el) {
      this.modalRoot.removeChild(this.el);
    }
  }

  render() {
    if (this.modalRoot && this.el) {
      return ReactDOM.createPortal(
        this.props.children,
        this.el,
      );
    }

    return this.props.children;
  }
}
