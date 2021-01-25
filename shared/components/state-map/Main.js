/* eslint-disable no-console */
import React from 'react';
import MapSvg from './MapSvg';
import s from './scss/main.scss';
import allStates from './data.json';
import Info from './Info';

class MapMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      viewBy: 'states',
      viewByIsOpen: false,
      isInfoOpen: false,
      selectedItem: false,
    };
  }

  onSelected(item) {
    this.setState({
      isInfoOpen: true,
      selectedItem: item,
    });
  }

  render() {

    return (
      <div className={s.map__container}>
        <div className={s.map_page__columnleft}>
          <div className={s.select_content}>
            <div className={s.select_box}>
              <div className={s.filtersbox}>
                <div className={`${s.selects} ${s.filters}`}>
                  <div
                    className={`${this.state.viewByIsOpen && 'open'} ${s.filter} ${s.drop}`}
                    onClick={() => this.setState({ viewByIsOpen: !this.state.viewByIsOpen })}
                    onKeyDown={() => this.setState({ viewByIsOpen: !this.state.viewByIsOpen })}
                    tabIndex="0"
                    role="button"
                  >
                    <div className={`${s.option} ${s.selected}`}><span className={s.text} data-text="View By">View By</span></div>
                    {this.state.viewByIsOpen &&
                    <div className={s.options}>
                      <div
                        className={s.option}
                        onClick={() => this.setState({ viewBy: 'states' })}
                        onKeyDown={() => this.setState({ viewBy: 'states' })}
                        tabIndex="0"
                        role="button"
                      >
                        State
                      </div>
                      <div
                        className={s.option}
                        onClick={() => this.setState({ viewBy: 'metro_areas' })}
                        onKeyDown={() => this.setState({ viewBy: 'metro_areas' })}
                        tabIndex="0"
                        role="button"
                      >
                        Metro Areas
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
              <div className={s.select_box__title}>{this.state.viewBy === 'metro_areas' ? 'Metro Areas' : 'State'}</div>
            </div>
            {allStates &&
            <div className={s.state__list}>
              {Object.keys(allStates[this.state.viewBy]).sort().map((item, index) => (
                <div key={index} className={s.item}>
                  <div
                    onClick={() => this.onSelected(item)}
                    onKeyDown={() => this.onSelected(item)}
                    tabIndex="0"
                    role="button"
                    className={`${this.state.selectedItem === item && s.active}`}
                  >
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>}
          </div>
        </div>
        <div className={s.map_page__columnright}>
          <div className={s.map__content}>
            <div className={s.map_box}>
              <div className={s.map_picture}>
                <MapSvg />

                <div className={s.map_hover}>
                  <div className={s.icon} />
                  <div className={s.text} />
                </div>
              </div>
            </div>
          </div>
          {this.state.isInfoOpen &&
            <Info
              type={this.state.viewBy}
              data={allStates[this.state.viewBy][this.state.selectedItem]}
            />}
        </div>
      </div>
    );
  }
}

export default MapMain;
