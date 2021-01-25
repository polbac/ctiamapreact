import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Speaker from './Speaker';

import s from './Speakers.scss';

function getSpeaker(obj) {
  const {
    name = '',
    job_title: position = '',
    image = {},
    bio = '',
  } = (obj || {});

  return { name, position, image, bio };
}

function getTeamMember(obj) {
  const [{
    title: name = '',
    fields: {
      title: position = '',
      image = {},
    } = {},
  }] = (obj || []);

  return { name, position, image };
}

export default class Speakers extends PureComponent {

  static propTypes = {
    heading: PropTypes.string,
    headingNote: PropTypes.string,
    isCenter: PropTypes.bool,
    isWide: PropTypes.bool,
    speakers: PropTypes.array,
  }

  static defaultProps = {
    heading: 'Speakers',
    // headingNote: 'Click image to see video.',
    speakers: [],
  }

  state = {
    isActive: false,
  }

  handleClick = () => {
    const { isActive } = this.state;

    this.setState({ isActive: !isActive });
  }

  render() {
    const { heading, headingNote, speakers, isCenter, isWide } = this.props;
    const { isActive } = this.state;

    return (
      <div className={s(s.speakers, { isCenter, isWide, isActive })}>
        <div className={s.speakers__container}>
          <div className={s.speakers__row}>
            <div className={s.speakers__col}>
              <div className={s.speakers__heading}>{heading}</div>
              {headingNote && (
                <div className={s.speakers__headingNote}>{headingNote}</div>
              )}
              <div className={s.speakers__items}>
                {speakers.map((item, ii) => {
                  const {
                    link_to_team_member: linkToTeamMember = false,
                    team_member: teamMember = [],
                    speaker = {},
                    link = '',
                    has_video: hasVideo = false,
                    video_gallery: videoGallery = [],
                  } = item;

                  const { image, name, position, bio } = linkToTeamMember ?
                    getTeamMember(teamMember) : getSpeaker(speaker);

                  return (
                    <Speaker
                      key={ii}
                      image={image}
                      name={name}
                      position={position}
                      link={link}
                      bio={bio}
                      hasVideo={hasVideo}
                      videoGallery={videoGallery}
                      isWide={isWide}
                      handleClick={this.handleClick}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
