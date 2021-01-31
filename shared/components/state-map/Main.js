/* eslint-disable no-console */
import React from 'react';
import MapSvg, { STATE_TYPE } from './MapSvg';
import s from './assets/scss/main.scss';
import allStates from './data.json';
import Info from './Info';
import ArrowBack from 'assets/images/map/arrow.svg';
import MenuItem from './MenuItem';
import scrollTo from './utils';

class MapMain extends React.Component {

  constructor(props) {
    super(props);

    let viewBy = 'states';
    let selectedItem = false;
    let isInfoOpen = false;

    let { hash } = document.location;

    hash = hash.replace('#', '');

    const positions = hash.split('/');

    if (positions.length) {
      if (positions[0] === 'map') {

        if (positions[1] === 'states' || 'metro_areas') {
          viewBy = positions[1];
        }

        const itemURL = decodeURI(positions[2]);

        if (allStates[viewBy][itemURL]) {
          selectedItem = itemURL;
          isInfoOpen = true;
        }
      }
    }

    this.state = {
      viewBy,
      viewByIsOpen: false,
      isInfoOpen,
      selectedItem,
      hoverText: null,
      hoverX: null,
      hoverY: null,
    };
  }

  onSelected(item) {
    this.setState({
      isInfoOpen: true,
      selectedItem: item,
    }, this.changeRoute.bind(this));
  }

  closeInfo() {
    this.setState({
      ...this.state,
      isInfoOpen: false,
    }, this.changeRoute.bind(this));
  }

  mapItem(item) {
    const group = item.type === STATE_TYPE ?
      allStates.states : allStates.metro_areas;

    let selected,
      ke;

    for (const i in group) {
      if (group[i].id === item.item || group[i].name === item.item) {
        selected = group[i];
        ke = i;
        break;
      }
    }

    return {
      ...selected,
      k: item,
      ke,
    };
  }

  changeRoute() {
    const { viewBy, selectedItem, isInfoOpen } = this.state;

    if (isInfoOpen) {
      const hash = `/the-wireless-industry/the-5g-economy#map/${viewBy}/${selectedItem}`;

      history.pushState({}, '', hash);
      return;
    }

    history.pushState({}, '', '/the-wireless-industry/the-5g-economy');
  }

  onChangeMap({ item }) {
    const selectedItem = this.mapItem(item);

    this.setState({
      ...this.state,
      viewBy: item.type === STATE_TYPE ? 'states' : 'metro_areas',
      selectedItem: selectedItem.ke,
      isInfoOpen: true,
    }, this.changeRoute.bind(this));
  }

  onMouseMove({ x, y, item }) {
    const selectedItem = this.mapItem(item);

    this.setState({
      ...this.state,
      hoverX: x,
      hoverY: y,
      hoverText: selectedItem.name,
    });
  }

  onMouseEnter({ item }) {
    const selectedItem = this.mapItem(item);

    this.setState({
      ...this.state,
      hoverText: selectedItem.name,
    });
  }

  onMouseLeave() {
    this.setState({
      ...this.state,
      hoverText: null,
    });
  }

  onChangeTypeFromDropdown(viewBy) {
    this.setState({
      viewBy,
      isInfoOpen: false,
    }, this.changeRoute.bind(this));
  }

  render() {
    const { hoverText, hoverY, hoverX, selectedItem, viewBy } = this.state;

    return (
      <div className="state-map-container">
        <div className={s.map__container}>
          <div className={s.map_page__columnleft}>
            <div className={s.selectcontent}>
              <div className={s.selectbox}>
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
                          onClick={() => this.onChangeTypeFromDropdown('states')}
                          onKeyDown={() => this.onChangeTypeFromDropdown('states')}
                          tabIndex="0"
                          role="button"
                        >
                        State
                      </div>
                        <div
                          className={s.option}
                          onClick={() => this.onChangeTypeFromDropdown('metro_areas')}
                          onKeyDown={() => this.onChangeTypeFromDropdown('metro_areas')}
                          tabIndex="0"
                          role="button"
                        >
                        Metro Areas
                      </div>
                      </div>}
                    </div>
                  </div>
                </div>
                <div className={s.selectbox__title}>{this.state.viewBy === 'metro_areas' ? 'Metro Areas' : 'State'}</div>
              </div>
              {allStates &&
              <div className={s.state__list}>
                {Object.keys(allStates[this.state.viewBy]).sort().map((item, index) => (
                  <MenuItem active={selectedItem === item} item={item} index={index} onSelected={_item => this.onSelected(_item)} />
              ))}
              </div>}
              {this.state.isInfoOpen && (
              <div>
                <a className={s.map_page__columnleft__map__back} onClick={this.closeInfo.bind(this)}>
                  <ArrowBack />
                Back to Map
          </a>
                <a className={s.map_page__columnleft__map__back__mobile} onClick={this.closeInfo.bind(this)}>
                  <ArrowBack />
              Back to filter
          </a></div>
          )}
            </div>
          </div>
          <div className={s.map_page__columnright}>
            <div className={s.map__content}>
              <div className={s.map_box}>
                <div className={s.map_picture}>
                  <MapSvg
                    onSelect={this.onChangeMap.bind(this)}
                    onMouseEnter={this.onMouseEnter.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}
                    onMouseMove={this.onMouseMove.bind(this)}
                    type={viewBy}
                  />
                  {hoverText && (
                  <div
                    className={s.map_hover}
                    style={{
                    top: hoverY,
                    left: hoverX,
                  }}
                  >
                    <div className={s.icon} />
                    <div className={s.text} >{hoverText}</div>
                  </div>
                )}

                </div>
              </div>
            </div>
            <Info
              type={this.state.viewBy}
              data={allStates[this.state.viewBy][this.state.selectedItem]}
              onExit={this.closeInfo.bind(this)}
              show={this.state.isInfoOpen}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MapMain;
