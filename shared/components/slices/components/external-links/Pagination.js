import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import s from './Pagination.scss';

export default class Pagination extends Component {

  static propTypes = {
    nextPage: PropTypes.func,
    currentPage: PropTypes.number,
    previousPage: PropTypes.func,
    elemCount: PropTypes.number,
    numSlidesPerPage: PropTypes.number,
    changeToPage: PropTypes.func,
  };

  state = {
    numPagesToShow: 5,
  };

  whichNumbersToDisplay = (pageArray) => {
    const { numPagesToShow } = this.state;
    const { currentPage } = this.props;
    const pageArrayCopy = [...pageArray];
    let arrayToReturn = [];

    if (currentPage === 0) {
      arrayToReturn = pageArrayCopy.slice(currentPage, numPagesToShow);
    } else if (pageArrayCopy.length <= numPagesToShow) {
      return pageArrayCopy;
    } else if (pageArrayCopy.length > numPagesToShow) {

      while (numPagesToShow > arrayToReturn.length) {
        const currentIndex = currentPage + arrayToReturn.length;

        // This is an array that shows the last few pages we need
        const endOfPagesToShow = pageArrayCopy.slice(-numPagesToShow);
        // This is a boolean to show if our pageArray has reached the last few pages
        const areWeAtTheEndOfOurPages = endOfPagesToShow.includes(currentPage);

        if (!areWeAtTheEndOfOurPages) {
          arrayToReturn.push(pageArrayCopy[currentIndex]);
        } else {
          return endOfPagesToShow;
        }
      }
    }

    return arrayToReturn.sort((a, b) => a > b);
  }

  pageNumsToDisplay = () => {
    const { elemCount, numSlidesPerPage } = this.props;
    const numPages = Math.ceil(elemCount / numSlidesPerPage);
    const displayTheseNumbers = [];

    for (let i = 0; i < numPages; i++) {
      displayTheseNumbers.push(i);
    }
    return this.whichNumbersToDisplay(displayTheseNumbers);
  }

  render() {
    const { nextPage, currentPage, previousPage, changeToPage } = this.props;

    const isLastPage = currentPage === this.pageNumsToDisplay().slice(-1).pop();
    const isFirstPage = currentPage === 0;

    return (
      <Fragment>
        <div className={s.pagination}>
          <div className={s.pagination__container}>
            <div className={s.pagination__row}>
              <div className={s.pagination__col}>
                <button
                  type="button"
                  className={s.pagination__prevButton}
                  style={{ visibility: isFirstPage ? 'hidden' : 'visible' }}
                  onClick={previousPage}
                >
                  <img
                    className={s.pagination__leftArrow}
                    src={require('!file-loader!assets/images/icons/MaterialIcon.svg')}
                    alt="Arrow left"
                  />
                </button>
                <ul className={s.pagination__pageList}>
                  {this.pageNumsToDisplay().map((pagenumber, idx) => (
                    <li key={idx} className={s.pagination__listItem}>
                      <button
                        type="button"
                        style={{
                          color: (pagenumber === currentPage) ? '#c4d438' : '#000',
                        }}
                        className={s.pagination__numberButton}
                        onClick={() => changeToPage(pagenumber)}
                        onKeyPress={() => changeToPage(pagenumber)}
                      >{pagenumber + 1}</button>
                    </li>
                  ))}
                </ul>
                <button className={s.pagination__nextButton} style={{ visibility: isLastPage ? 'hidden' : 'visible' }} onClick={nextPage}>
                  <img
                    className={s.pagination__rightArrow}
                    src={require('!file-loader!assets/images/icons/MaterialIcon.svg')}
                    alt="Arrow right"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
