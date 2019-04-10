import React, { Component } from 'react';
import './App.scss';
import 'react-rater/lib/react-rater.css';
import {
  Pagination,
  PaginationPrev,
  PaginationNext,
  getPage,
} from './Pagination';
import initialReviews from './initialReviews';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Reaction from './Reaction';
import maui from './assets/maui-art.png';
import title from './assets/title.png';

class App extends Component {
  state = {
    reviews: initialReviews,
    currentIndex: 0,
    currentPage: 1,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        currentIndex: (this.state.currentIndex + 1) % this.state.reviews.length,
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePaginationClick = page => {
    this.setState({ currentPage: page });
  };

  addReview = (text, rating) => {
    const newReviews = [
      { text, rating, datetime: Date.now() },
      ...this.state.reviews,
    ];
    this.setState({ reviews: newReviews });
  };

  render() {
    const { reviews, currentIndex, currentPage } = this.state;
    const pageSize = 4;
    const paginatedReviews = getPage(reviews, currentPage, pageSize);

    return (
      <div className="App">
        <div className="content content--left">
          <div className="reaction">
            <Reaction review={reviews[currentIndex]} />
          </div>
        </div>
        <div className="content content--right">
          <div className="review-board">
            <div className="review-board__header">
              <img className="reversed" src={maui} alt="Maui" />
              <img
                src={title}
                className="review-board__header__title"
                alt="Maui's Kudos Board"
              />
              <img src={maui} alt="Maui" />
            </div>
            <div className="review-form-container">
              Grateful for all that Maui has done for mankind?
              <br />
              <strong>Leave a review!</strong>
              <ReviewForm addReview={this.addReview} />
            </div>
            <div className="review-container">
              {paginatedReviews.map((review, index) => (
                <Review key={index} index={index} review={review} />
              ))}
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={reviews.length}
                  onChange={this.handlePaginationClick}
                  prevIcon={PaginationPrev}
                  nextIcon={PaginationNext}
                  pageSize={pageSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
