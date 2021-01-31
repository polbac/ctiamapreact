import React from 'react';
import Waypoint from 'react-waypoint';
import { TimelineLite } from 'gsap';
import Button from 'components/button';
import MapSvg from './assets/images/map/intro-map.svg';
import s from './assets/scss/main.scss';
import MapMain from './Main';

class StateMap extends React.Component {

  constructor(props) {
    super(props);
    let isIntroVisible = true;

    let { hash } = document.location;

    hash = hash.replace('#', '');

    const positions = hash.split('/');

    if (positions.length && positions[0] === 'map') {
      isIntroVisible = false;
    }

    this.state = {
      isIntroVisible,
      isAnimationComplete: false,
    };
  }

  onEnter() {
    const { isAnimationComplete } = this.state;

    if (isAnimationComplete) {
      return;
    }
    this.animate();
    this.setState({
      ...this.state,
      isAnimationComplete: true,
    });
  }

  animate() {
    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.addLabel('start');

    if (this.subtitle) {
      t.fromTo(
        this.subtitle,
        0.75,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease },
      );
    }

    if (this.title) {
      t.fromTo(
        this.title,
        0.75,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease },
      );
    }

    if (this.body) {
      t.fromTo(
        this.body,
        0.75,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease },
      );
    }

    if (this.images) {
      t.fromTo(
        this.images,
        0.75,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease },
      );
    }

    if (this.button) {
      t.fromTo(
        this.button,
        0.75,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease },
      );
    }

  }

  render() {

    return (
      <section className={s.map_page}>
        <Waypoint
          onEnter={this.onEnter.bind(this)}
        />
        {this.state.isIntroVisible &&
          <div className={`${s.map_content} ${s.map_content__home}`}>
            <div className={s.map_content__intro}>
              <div className={s.map_content__intro__title__mobile} ref={(c) => { this.subtitle = c; }}>DATA REPORT</div>
              <h2 className={s.map_content__intro__title} ref={(c) => { this.title = c; }}>5G Economic Impact</h2>
              <p ref={(c) => { this.body = c; }}>5G has unlocked economic benefits in every state.
                Explore our interactive map to see how 5G will contribute to every state,
                congressional district and more than 100 Metropolitan areas across the country.</p>
              <div className={s.map_content__intro__numbers} ref={(c) => { this.images = c; }}>
                <div className={s.box}>
                  <img src={require('!file-loader!./assets/images/map/number01.png')} alt="$ 1.5T" />
                  <p>Economic Growth</p>
                </div>
                <div className={s.box}>
                  <img src={require('!file-loader!./assets/images/map/number02.png')} alt="4.5M" />
                  <p>New Jobs</p>
                </div>
              </div>
              <div ref={(c) => { this.button = c; }}>
                <Button className={s.button} onClick={() => this.setState({ isIntroVisible: false })} >
                  Explore the Data
                </Button>
              </div>
            </div>

            <div className={s.map_box}>
              <div className={s.map_picture}>
                <MapSvg />
              </div>
            </div>
          </div>
        }

        {!this.state.isIntroVisible && <MapMain /> }
      </section>
    );
  }
}

export default StateMap;
