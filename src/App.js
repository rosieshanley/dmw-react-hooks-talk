import React, { useState, useEffect } from 'react';
import './App.scss';
import 'react-rater/lib/react-rater.css';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Reaction from './Reaction';
import initialReviews from './initialReviews';
import maui from './assets/maui-art.png';
import title from './assets/title.png';

const LeftContent = ({
  reviews,
  currentIndex,
  feedPlaying,
  setFeedPlaying,
}) => (
  <div className="content content--left">
    <Reaction
      review={reviews[currentIndex]}
      feedPlaying={feedPlaying}
      setFeedPlaying={setFeedPlaying}
    />
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
  let [reviews, setReviews] = useState(initialReviews);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [feedPlaying, setFeedPlaying] = useState(true);
  let [feedVisible, setFeedVisible] = useState(true);

  const toggleFeedVisible = () => setFeedVisible(!feedVisible);
  const toggleFeedPlaying = () => setFeedPlaying(!feedPlaying);

  const addReview = (text, rating) => {
    const newReviews = [...reviews, { text, rating, datetime: Date.now() }];
    setReviews(newReviews);
  };

  const removeReview = index => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (feedPlaying) {
      const timeout = setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % reviews.length);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentIndex, reviews, feedPlaying]);

  return (
    <div className="App">
      <div className="feed-toggler" onClick={toggleFeedVisible}>
        {feedVisible ? 'Hide Feed' : 'Display Feed'}
      </div>
      {feedVisible && (
        <LeftContent
          reviews={reviews}
          currentIndex={currentIndex}
          feedPlaying={feedPlaying}
          toggleFeedPlaying={toggleFeedPlaying}
        />
      )}
      <RightContent
        reviews={reviews}
        removeReview={removeReview}
        addReview={addReview}
      />
    </div>
  );
}

export default App;
