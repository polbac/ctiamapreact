import React from 'react';
import Button from 'components/button';
import MapSvg from 'assets/images/map/intro-map.svg';
import s from './assets/scss/main.scss';
import MapMain from './Main';

class StateMap extends React.Component {

  state = {
    isIntroVisible: true,
  }

  render() {

    return (
      <section className={s.map_page}>
        {this.state.isIntroVisible &&
          <div className={`${s.map_content} ${s.map_content__home}`}>
            <div className={s.map_content__intro}>
              <div className={s.map_content__intro__title__mobile}>DATA REPORT</div>
              <h2 className={s.map_content__intro_title}>5G Economic Impact</h2>
              <p>5G has unlocked economic benefits in every state.
                Explore our interactive map to see how 5G will contribute to every state,
                congressional district and more than 100 Metropolitan areas across the country.</p>
              <div className={s.map_content__intro__numbers}>
                <div className={s.box}>
                  <img src={require('!file-loader!assets/images/map/number01.png')} alt="$ 1.5T" />
                  <p>Economic Growth</p>
                </div>
                <div className={s.box}>
                  <img src={require('!file-loader!assets/images/map/number02.png')} alt="4.5M" />
                  <p>New Jobs</p>
                </div>
              </div>
              <Button className={s.button} onClick={() => this.setState({ isIntroVisible: false })}>
                Explore the Data
              </Button>
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
