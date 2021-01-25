import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HeroSlider from './ExternalLinksHeroSlider';
import Slider from './ExternalLinksSlider';
import LinksFeed from './ExternalLinksFeed';
import Pagination from './Pagination';
import s from './ExternalLinks.scss';
import Button from '../../../button';
// eslint-disable-next-line react/require-render-return
export default class ExternalLinks extends Component {

  static propTypes = {
    externalLinks: PropTypes.array,
    appearsIn: PropTypes.string,
    isWide: PropTypes.bool,
  }

  state = {
    currentPage: 0,
    numSlidesPerPage: 5,
    startIndex: 0,
    endIndex: 5,
    mq: true,
  };

  componentDidMount() {
    this.setMQobject();
  }

  setMQobject = () => {
    const mq = window.matchMedia('(min-width: 720px)');

    this.setState({ mq: mq.matches });
    mq.onchange = () => this.setState({
      mq: mq.matches,
      startIndex: 0,
      endIndex: 5,
      currentPage: 0,
    });
  }

  changeIndexByOne = (direction) => {
    const { externalLinks } = this.props;
    const { currentPage, startIndex, endIndex, numSlidesPerPage } = this.state;

    // Checking if:
    // We don't have enough slides to display the limit AND
    // are we hitting the Next button
    if ((externalLinks.slice(endIndex).length < numSlidesPerPage) && direction === 'right') {
      this.setState({
        currentPage: currentPage + 1,
        startIndex: startIndex + externalLinks.slice(endIndex).length,
        endIndex: endIndex + externalLinks.slice(endIndex).length,
      });
      return;
    }

    // Checking if there are fewer slides to display the limit AND
    // Are we hitting the Prev button
    if (startIndex < numSlidesPerPage && direction !== 'right') {
      this.setState({
        startIndex: 0,
        endIndex: numSlidesPerPage,
        currentPage: 0,
      });
      return;
    }

    // Checking if we're hitting Next or Previous
    // eslint-disable-next-line no-unused-expressions
    direction === 'right' ?
      this.setState(({
        currentPage: currentPage + 1,
        startIndex: startIndex + numSlidesPerPage,
        endIndex: endIndex + numSlidesPerPage,
      })) :
      this.setState(({
        currentPage: currentPage - 1,
        startIndex: startIndex - numSlidesPerPage,
        endIndex: endIndex - numSlidesPerPage,
      }));
  };

  changeIndexToPageNumber = (pageNum) => {
    const { numSlidesPerPage } = this.state;

    this.setState({
      startIndex: pageNum * numSlidesPerPage,
      endIndex: (pageNum * numSlidesPerPage) + numSlidesPerPage,
      currentPage: pageNum,
    });
  };

  render() {
    const { appearsIn, externalLinks, isWide } = this.props;
    const { currentPage, startIndex, endIndex, numSlidesPerPage } = this.state;

    return (
      <Fragment>
        { appearsIn === 'Hero Carousel' && (
          <HeroSlider
            slides={externalLinks}
          />
        )}
        { appearsIn === 'Slider Carousel' && (
          <Slider
            slides={externalLinks}
            isWide={isWide}
          />
        )}
        { appearsIn === 'External Links Feed' && (
          <LinksFeed
            slides={externalLinks}
            currentPage={currentPage}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
        { (appearsIn === 'External Links Feed') && this.state.mq &&
          <Pagination
            elemCount={externalLinks.length}
            nextPage={() => this.changeIndexByOne('right')}
            currentPage={currentPage}
            previousPage={this.changeIndexByOne}
            numSlidesPerPage={numSlidesPerPage}
            changeToPage={this.changeIndexToPageNumber}
            isWide={isWide}
          />
        }

        { (appearsIn === 'External Links Feed') && (!this.state.mq) &&
        <Button
          onClick={() => this.setState({ endIndex: endIndex + 5 })}
          className={s.showMoreButton}
          blue
        >Show More</Button>}
      </Fragment>
    );
  }
}
