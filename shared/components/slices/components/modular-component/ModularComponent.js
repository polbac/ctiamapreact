import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './ModularComponent.scss';

export default class ModularComponent extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    html: PropTypes.string,
    height: PropTypes.string,
    customHeight: PropTypes.string,
    scripts: PropTypes.array,
    iframeTitle: PropTypes.string,
    isCenter: PropTypes.bool,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    html: '',
  }

  componentDidMount() {
    this.updateIframe();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  updateIframe() {
    const { title, html, scripts, height, customHeight } = this.props;

    const iframe = this.iframeRef;
    const { document } = iframe.contentWindow;
    let iframeHeight = height || customHeight;
    let jsScript = '';
    let cssScript = '';

    if (iframeHeight) {
      iframeHeight = `height: ${iframeHeight};`;
    }

    scripts.forEach((file) => {

      switch (file.scripts.subtype) {
        case 'javascript':
          jsScript += `<script src="${file.scripts.url}"></script>`;
          break;

        case 'css':
          cssScript += `<link rel="stylesheet" href="${file.scripts.url}">`;
          break;

        default:
      }
    });

    document.open();
    document.write(`<!doctype html><html><head><title>${title}</title>`);
    document.write(cssScript);
    document.write(`</head><body style="${iframeHeight}">`);
    document.write(html);
    document.write('</body>');
    document.write(jsScript);
    document.write('</html>');
    // document.write(cssScript + iframeHtml + jsScript);
    document.close();

    // let doc = (iframe.contentDocument || iframe.contentWindow);

    // if (doc.document)doc = doc.document;

    // const head = doc.getElementsByTagName('head')[0];

    // const jsScript = doc.createElement('script');
    // const cssScript = doc.createElement('link');

    // jsScript.type = 'text/javascript';
    // cssScript.type = 'text/css';
    // cssScript.rel = 'stylesheet';

    // doc.body.innerHTML = componentBlock;

    // console.log(iframe);

    // scripts.forEach((script) => {
    //   console.log(script);

    //   switch (script.file.subtype) {
    //     case 'javascript':
    //       jsScript.src = script.file.url;
    //       head.appendChild(jsScript);
    //       break;

    //     case 'css':
    //       cssScript.href = script.file.url;
    //       head.appendChild(cssScript);
    //       break;

    //     default:
    //   }
    // });

    this.onResize();
  }

  onResize = () => {
    const iframe = this.iframeRef;

    iframe.style.height = `${iframe.contentWindow.document.body.offsetHeight}px`;

    // iframe.load(function () {
    //   this.style.height = `${this.contentWindow.document.body.offsetHeight}px`;
    // });
  }

  render() {
    const { iframeTitle, isWide, isCenter } = this.props;

    return (
      <div className={s(s.modularComponent, { isWide, isCenter })}>
        <div className={s.modularComponent__container}>
          <div className={s.modularComponent__row}>
            <div className={s.modularComponent__col}>
              <iframe
                className={s.modularComponent__iframe}
                title={iframeTitle}
                ref={(el) => { this.iframeRef = el; }}
                scrolling="no"
                onLoad={this.onResize}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
