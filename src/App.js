import React, { useState, useEffect } from 'react';
import './App.scss';
import 'react-rater/lib/react-rater.css';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Reaction from './Reaction';
import maui from './assets/maui-art.png';
import title from './assets/title.png';

const initialReviews = [
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
];

const LeftContent = ({ reviews, currentIndex }) => (
  <div className="content content--left">
    <Reaction review={reviews[currentIndex]} />
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

function App() {
  let [currentIndex, setCurrentIndex] = useState(0);
  let [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % reviews.length);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex, reviews]);

  const addReview = (text, rating) => {
    const newReviews = [...reviews, { text, rating, datetime: Date.now() }];
    setReviews(newReviews);
  };

  const removeReview = index => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  return (
    <div className="App">
      <LeftContent reviews={reviews} currentIndex={currentIndex} />
      <RightContent
        reviews={reviews}
        removeReview={removeReview}
        addReview={addReview}
      />
    </div>
  );
}

export default App;
