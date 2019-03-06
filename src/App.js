import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import 'react-rater/lib/react-rater.css';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Reaction from './Reaction';
import useToggle from './useToggle';
import initialReviews from './initialReviews';
import maui from './assets/maui-art.png';
import title from './assets/title.png';

const KudosBoard = ({ reviews, addReview, removeReview }) => (
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
  let [feedVisible, toggleFeedVisible] = useToggle(true);

  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'PROGRESS':
        case 'NEXT':
          return {
            ...state,
            feedIsPlaying: action.type === 'PROGRESS',
            currentIndex: (state.currentIndex + 1) % reviews.length,
          };
        case 'PREV':
          return {
            ...state,
            feedIsPlaying: true,
            currentIndex:
              (state.currentIndex - 1 + reviews.length) % reviews.length,
          };
        case 'TOGGLE_PLAY':
          return {
            ...state,
            feedIsPlaying: !state.feedIsPlaying,
          };
        default:
          return state;
      }
    },
    {
      currentIndex: 0,
      feedIsPlaying: true,
    }
  );

  const addReview = (text, rating) => {
    const newReviews = [...reviews, { text, rating, datetime: Date.now() }];
    setReviews(newReviews);
  };

  const removeReview = index => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  useEffect(() => {
    if (state.feedIsPlaying) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'PROGRESS' });
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state.currentIndex, reviews, state.feedIsPlaying]);

  return (
    <div className="App">
      <div className="feed-toggler" onClick={toggleFeedVisible}>
        {feedVisible ? 'Hide Feed' : 'Display Feed'}
      </div>
      {feedVisible && (
        <div className="content content--left">
          <Reaction
            dispatch={dispatch}
            review={reviews[state.currentIndex]}
            feedIsPlaying={state.feedIsPlaying}
          />
        </div>
      )}
      <KudosBoard
        reviews={reviews}
        removeReview={removeReview}
        addReview={addReview}
      />
    </div>
  );
}

export default App;
