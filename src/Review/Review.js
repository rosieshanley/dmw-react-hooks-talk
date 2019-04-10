import React from 'react';
import Rater from 'react-rater';

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

export default Review;
