import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { WordPressImage } from 'components/image';
import TileBlock from './TileBlock';

import s from './GridTiles.scss';

export default class GridTiles extends PureComponent {

  static propTypes = {
    tiles: PropTypes.array,
    isWide: PropTypes.bool,
    isCenter: PropTypes.bool,
  }

  render() {
    const { tiles, isWide, isCenter } = this.props;

    const content = (
      tiles.length > 0 && tiles.map((tile, i) => {
        // const {
        //   title: graphTitle,
        //   slug: key,
        //   fields: {
        //     definition = '',
        //     text = '',
        //     link = '',
        //     link_text: linkText = '',
        //   } = {},
        // } = tile;

        const {
          headline = '',
          image = '',
          front_text: frontText = '',
          rear_text: rearText = '',
          link = '',
          link_text: linkText = '',
          use_two_columns: useTwoColumns = '',
          show_full_tile_image: showFullTileImage = '',
        } = tile;

        return (
          <TileBlock
            key={i}
            title={headline}
            frontText={frontText}
            rearText={rearText}
            link={link}
            linkText={linkText}
            useTwoColumns={useTwoColumns}
            showFullTileImage={showFullTileImage}
            wide={false}
          >
            <WordPressImage image={image} altFillContainer={showFullTileImage} />
          </TileBlock>
        );
      })
    );

    // return content;

    return (
      <div className={s(s.gridTiles, { isWide, isCenter })}>
        <div className={s.gridTiles__container}>
          <div className={s.gridTiles__row}>
            <div className={s.gridTiles__col}>
              <div className={s.gridTiles__grid}>
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}
