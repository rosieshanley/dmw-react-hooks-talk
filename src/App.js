import React, { Component } from 'react';
import './App.scss';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import ReviewForm from './ReviewForm';
import Reaction from './Reaction';
import maui from './assets/maui-art.png';
import title from './assets/title.png';
import cancel from './assets/cancel.svg';

const Review = ({ review, index, removeReview }) => {
  const { datetime, text, rating } = review;

  const formatDate = dt => {
    const timestamp = new Date(dt);
    return `${timestamp.getMonth() +
      1}/${timestamp.getDate()}/${timestamp.getUTCFullYear()}`;
  };

  return (
    <div className="review">
      <div className="review__datetime">{formatDate(datetime)}</div>
      <Rater total={5} rating={rating} interactive={false} />
      <div className="review__text">{text}</div>
      <img
        className="review__cancel"
        onClick={() => removeReview(index)}
        src={cancel}
        alt="Remove Review"
      />
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

const RightContent = ({ reviews, addReview, removeReview }) => (
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
        {reviews.map((review, index) => (
          <Review
            key={index}
            index={index}
            review={review}
            removeReview={removeReview}
          />
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
        datetime: 1551641410975,
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
      ...this.state.reviews,
      { text, rating, datetime: Date.now() },
    ];
    this.setState({ reviews: newReviews });
  };

  removeReview = index => {
    const newReviews = [...this.state.reviews];
    newReviews.splice(index, 1);
    this.setState({ reviews: newReviews });
  };

  render() {
    const { reviews, currentIndex } = this.state;

    return (
      <div className="App">
        <LeftContent reviews={reviews} currentIndex={currentIndex} />
        <RightContent
          reviews={reviews}
          removeReview={this.removeReview}
          addReview={this.addReview}
        />
      </div>
    );
  }
}

export default App;
