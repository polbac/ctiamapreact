import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Portal extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
    this.el = document.createElement('div');

    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    const { isMounted } = this.state;

    if (!isMounted) {
      return children;
    }

    return ReactDOM.createPortal(children, this.el);
  }
}
