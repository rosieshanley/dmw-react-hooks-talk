import React, { useState, useEffect } from 'react';
import './App.scss';
import 'react-rater/lib/react-rater.css';
import {
  Pagination,
  PaginationPrev,
  PaginationNext,
  getPage,
} from './Pagination';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Reaction from './Reaction';
import initialReviews from './initialReviews';
import maui from './assets/maui-art.png';
import title from './assets/title.png';

function App() {
  let [reviews, setReviews] = useState(initialReviews);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4;
  const paginatedReviews = getPage(reviews, currentPage, pageSize);

  const handlePaginationClick = page => {
    setCurrentPage(page);
  };

  const addReview = (text, rating) => {
    const newReviews = [{ text, rating, datetime: Date.now() }, ...reviews];
    setReviews(newReviews);
  };

  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % reviews.length);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentIndex, reviews]);

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
            <ReviewForm addReview={addReview} />
          </div>
          <div className="review-container">
            {paginatedReviews.map((review, index) => (
              <Review key={index} index={index} review={review} />
            ))}
            <div className="pagination-container">
              <Pagination
                current={currentPage}
                total={reviews.length}
                onChange={handlePaginationClick}
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

export default App;
