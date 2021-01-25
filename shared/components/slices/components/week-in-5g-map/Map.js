import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import isEmpty from 'lodash/isEmpty';

import StateContainer from 'containers/state';
import Statistics from 'components/statistics';
import ThisWeekIn5G from 'components/twi5g-posts';

import StateModalWrapper from './StateModalWrapper';
import StateMap from './StateMap';
import Header from './Header';
import Select from './Select';
import s from './Map.scss';

class Map extends Component {

  static propTypes = {
    heading: PropTypes.string,
    data: PropTypes.array,
    options: PropTypes.array,
    ui: PropTypes.object,
    type: PropTypes.oneOf(['4g', '5g']),
    map_data: PropTypes.array,
    stateMap: PropTypes.object,
  }

  static defaultProps = {
    options: [],
    type: '4g',
    map_data: [],
  }

  state = {
    selectedState: '',
    isModalOpen: false,
    isMapInteractive: true,
    isIntroVisible: false,
    showError: '',
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.setState({
      isMobile: window.matchMedia('(max-width: 1080px)').matches,
    });
  }

  onChange = (e) => {
    const { target: { value } } = e;

    if (!this.hasDataForState(value)) {
      this.showErrorMessage('No results found.');
      return;
    }

    this.setState({
      selectedState: value,
      isModalOpen: true,
      showError: '',
    });
  }

  onClick = (e) => {
    const { target } = e;
    const abbreviation = target.getAttribute('data-abbreviation');

    if (!this.hasDataForState(abbreviation)) {
      this.showErrorMessage('No results found.');
      return;
    }

    this.setState({
      selectedState: abbreviation,
      isModalOpen: abbreviation && true,
      showError: '',
    });
  }

  onClose = () => {
    this.setState({
      isModalOpen: false,
      selectedState: '',
    });
  }

  hasDataForState = state => this.props.map_data.find(stateData => state === stateData.state)

  showErrorMessage = (message) => {
    this.setState({ showError: message });
    setTimeout(() => this.setState({ showError: '' }), 5000);
  }

  render() {
    const { type, ui } = this.props;
    const { selectedState, isModalOpen, isMapInteractive, isIntroVisible, isMobile } = this.state;

    const is5g = type === '5g';

    return (
      <div
        className={
          s(s.map, {
            isIntroVisible,
            isMapInteractive,
            isMobile,
            is5g,
          })}
      >
        {/* <div className={s.map__topBorder}><hr /></div> */}
        <div className={s.map__container}>
          <div className={s.map__layout}>

            <StateMap
              className={s.map__background}
              onClick={this.onClick}
              isInteractive={!isIntroVisible}
            />

            {!isIntroVisible && (
              <div className={s.map__header}>
                {/* <Header {...this.props}> */}
                <Header>
                  <Select
                    options={this.props.stateMap.getAllStates()}
                    onChange={this.onChange}
                    value={selectedState || ''}
                  />
                  <div className={s.map__error}> {this.state.showError &&
                    this.state.showError}</div>
                </Header>
              </div>
            )}

            <div className={s.map__modal}>
              <StateContainer abbreviation={selectedState} type={type}>
                {(state) => {
                  if (isEmpty(state)) {
                    return null;
                  }

                  const { name, abbreviation, stateData, statistics, sources, text } = state;

                  return (
                    <StateModalWrapper
                      ref={(el) => { this.stateModal = el; }}
                      ui={ui}
                      isOpen={isModalOpen}
                      stateName={name}
                      abbreviation={abbreviation}
                      type={type}
                      text={text}
                      data={stateData}
                      sources={sources}
                      statistics={statistics}
                      onCloseClick={this.onClose}
                    >
                      {type === '4g' ? (
                        <Statistics data={statistics} />
                        ) : (
                          // <TopCitiesTable data={statistics} />
                          <ThisWeekIn5G data={this.props.map_data.find(data =>
                            data.state === this.state.selectedState)}
                          />
                            )
                          }
                    </StateModalWrapper>
                  );
                }}
              </StateContainer>
            </div>
          </div>
        </div>
        {/* <div className={s.map__bottomBorder}><hr /></div> */}
      </div>
    );
  }
}

export default inject('stateMap', 'ui')(observer(Map));
