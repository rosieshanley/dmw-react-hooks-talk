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

const LeftContent = ({ reactions }) => {
  let content = [];
  reactions.forEach((value, key) => content.push({ value, key }));
  return (
    <div className="content content--left">
      {content.map(reaction => (
        <div key={reaction.key} className="reaction">
          {reaction.value}
        </div>
      ))}
    </div>
  );
};

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
        text: 'He stole my boat?',
        rating: 1,
        datetime: 1551641410975,
      },
      {
        text: "Brought us coconuts, but I'm allergic.",
        rating: 3,
        datetime: 1551642517315,
      },
      {
        text: "Stole us fire from down below! That's been really helpful.",
        rating: 5,
        datetime: 1551642810975,
      },
    ],
    reactions: new Map(),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.reviews.length < this.state.reviews.length) {
      const reviews = Array.from(this.state.reviews);
      this.handleReaction(reviews.pop());
    }
  }

  handleReaction = review => {
    const { datetime } = review;
    const { reactions } = this.state;
    const reaction = <Reaction review={review} />;

    reactions.set(datetime, reaction);
    this.setState({
      reactions,
    });
    setTimeout(() => {
      reactions.delete(datetime);
      this.setState({
        reactions,
      });
    }, 6000);
  };

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
    const { reviews, reactions } = this.state;

    return (
      <div className="App">
        <LeftContent reactions={reactions} />
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
