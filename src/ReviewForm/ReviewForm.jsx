import React, { useState } from 'react';
import Rater from 'react-rater';

function ReviewForm({ addReview }) {
  let [text, setText] = useState('');
  let [rating, setRating] = useState(5);

  const resetForm = () => {
    setText('');
    setRating(5);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;
    addReview(text, rating);
    resetForm();
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form__rater">
        <Rater total={5} rating={rating} onRate={e => setRating(e.rating)} />
        <div className="review-form__rater__message">
          (We preselected 5 for you.)
        </div>
      </div>
      <div className="review-form__submission-container">
        <input
          className="input"
          name="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div onClick={handleSubmit} className="review-form__submit-button">
          submit
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
