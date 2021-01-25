import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import isEmpty from 'lodash/isEmpty';

import StateContainer from 'containers/state';
import Statistics from 'components/statistics';
import TopCitiesTable from 'components/top-cities-table';

import StateModalWrapper from './StateModalWrapper';
import StateMap from './StateMap';
import Header from './Header';
import Intro from './Intro';
import Select from './Select';
import s from './Map.scss';

class Map extends Component {

  static propTypes = {
    heading: PropTypes.string,
    data: PropTypes.array,
    options: PropTypes.array,
    ui: PropTypes.object,
    type: PropTypes.oneOf(['4g', '5g']),
    isNew5g: PropTypes.bool,
  }

  static defaultProps = {
    options: [],
    type: '4g',
    isNew5g: false,
  }

  state = {
    selectedState: '',
    isModalOpen: false,
    isMapInteractive: false,
    isIntroVisible: true,
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

    this.setState({
      selectedState: value,
      isModalOpen: true,
    });
  }

  onClick = (e) => {
    const { target } = e;
    const abbreviation = target.getAttribute('data-abbreviation');

    if (!abbreviation) {
      this.onClose();
      return;
    }

    this.setState({
      selectedState: abbreviation,
      isModalOpen: true,
    });
  }

  onClose = () => {
    this.setState({ selectedState: '', isModalOpen: false });
  }

  render() {
    const { type, options, ui, isNew5g } = this.props;
    const { selectedState, isModalOpen, isMapInteractive, isIntroVisible, isMobile } = this.state;

    const is5g = type === '5g';
    const numberColors = 'green-blue';

    return (
      <div
        className={
          s(s.map, {
            isIntroVisible,
            isMapInteractive,
            isMobile,
            is5g,
            isNew5g,
          })}
      >
        <div className={s.map__container}>
          <div className={s.map__layout}>
            {isIntroVisible && (
              <div className={s.map__overlay}>
                <Intro
                  {...this.props}
                  numberColors={numberColors}
                  onClick={
                    () => {
                      this.setState({ isIntroVisible: false });

                      // Scroll the screen back to top if viewing on mobile
                      if (isMobile) {
                        window.scrollTo(0, 0);
                      }
                    }
                  }
                />
              </div>
            )}

            <StateMap
              className={s.map__background}
              onClick={this.onClick}
              isInteractive={!isIntroVisible}
              isNew5g={isNew5g}
            />

            {!isIntroVisible && (
              <div className={s.map__header}>
                <Header
                  {...this.props}
                  isModalOpen={isModalOpen}
                  onCloseClick={this.onClose}
                >
                  <Select
                    options={options}
                    onChange={this.onChange}
                    value={selectedState}
                  />
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
                    >
                      {type === '4g' ? (
                        <Statistics data={statistics} />
                      ) : (
                        <TopCitiesTable data={statistics} />
                      )}
                    </StateModalWrapper>
                  );
                }}
              </StateContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('stateMap', 'ui')(observer(Map));
