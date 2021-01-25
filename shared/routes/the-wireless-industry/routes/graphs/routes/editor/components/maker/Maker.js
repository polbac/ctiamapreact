import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import s from './Maker.scss';

export default class Maker extends PureComponent {

  static propTypes = {
    graphs: PropTypes.object,
  }

  render() {
    const { graphs } = this.props;

    return (
      <div className={s.maker}>
        <div className={s.maker__container}>
          <div className={s.maker__row}>
            <div className={s.maker__col}>
              <div className={s.maker__wrap}>
                <div className={s.dropdown}>
                  <div className={s.dropdown__container}>
                    <div className={s.dropdown__field}>
                      <label // eslint-disable-line
                        className={s.dropdown__label}
                        htmlFor="graph-editor-dropdown"
                      >
                        Graph Type
                      </label>

                      <select
                        name="graph-editor-dropdown"
                        id="graph-editor-dropdown"
                        className={s.dropdown__select}
                        ref={(el) => { this.typeEl = el; }}
                      >
                        {graphs.types.map(({ id: key, label }) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  className={s.button}
                  onClick={() => {
                    graphs.createGraph(this.typeEl.value);
                  }}
                  aria-label="creates graph"
                >
                  <div className={s.button__title}>
                    Create
                  </div>
                </button>

                <button
                  className={s.button}
                  aria-label="creates graph"
                  onClick={() => {
                    const data = window.prompt('Insert code:'); // eslint-disable-line

                    if (data) {
                      graphs.createGraphByString(data);
                    }
                  }}
                >
                  <div className={s.button__title}>
                    Import
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
