import React, { Component } from 'react';
import './App.scss';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
// import {
//   Pagination,
//   PaginationPrev,
//   PaginationNext,
//   withPagination,
//   getPage,
// } from './Pagination';
import ReviewForm from './ReviewForm';
import Reaction from './Reaction';
import maui from './assets/maui-art.png';
import title from './assets/title.png';

const Review = ({ review }) => {
  const { datetime, text, rating } = review;

  const formatDate = dt => {
    const timestamp = new Date(dt);
    return `${timestamp.getMonth() +
      1}/${timestamp.getDate()}/${timestamp.getUTCFullYear()}`;
  };

  return (
    <div className="review">
      <div className="review__header">
        <div className="review__datetime">{formatDate(datetime)}</div>
        <Rater total={5} rating={rating} interactive={false} />
      </div>
      <div className="review__text">{text}</div>
    </div>
  );
};

const LeftContent = ({ reviews, currentIndex }) => (
  <div className="content content--left">
    <div className="reaction">
      <Reaction review={reviews[currentIndex]} />
    </div>
  </div>
);

const RightContent = ({ reviews, addReview }) => (
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
        <ReviewForm addReview={addReview} />
      </div>
      <div className="review-container">
        {/* <Pagination
          current={currentPage}
          total={products.data.length}
          onChange={handlePaginationClick}
          prevIcon={PaginationPrev}
          nextIcon={PaginationNext}
          pageSize={pageSize}
        /> */}
        {reviews.map((review, index) => (
          <Review key={index} index={index} review={review} />
        ))}
      </div>
    </div>
  </div>
);

class App extends Component {
  state = {
    reviews: [
      {
        text: "Stole us fire from down below! That's been really helpful.",
        rating: 5,
        datetime: 1551642810975,
      },
      {
        text: "Brought us coconuts, but I'm allergic.",
        rating: 3,
        datetime: 1551642517315,
      },
      {
        text:
          'He tried to steal my boat and abandon me on an island alone. Not cool.',
        rating: 1,
        datetime: 1550641410975,
      },
      {
        text:
          'He tried to steal my boat and abandon me on an island alone. Not cool.',
        rating: 4,
        datetime: 1541641010475,
      },
    ],
    currentIndex: 0,
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

  addReview = (text, rating) => {
    const newReviews = [
      { text, rating, datetime: Date.now() },
      ...this.state.reviews,
    ];
    this.setState({ reviews: newReviews });
  };

  render() {
    const { reviews, currentIndex } = this.state;

    return (
      <div className="App">
        <LeftContent reviews={reviews} currentIndex={currentIndex} />
        <RightContent reviews={reviews} addReview={this.addReview} />
      </div>
    );
  }
}

export default App;
