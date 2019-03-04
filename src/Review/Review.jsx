import React from 'react';
import Rater from 'react-rater';
import cancel from '../assets/cancel.svg';

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

export default Review;
