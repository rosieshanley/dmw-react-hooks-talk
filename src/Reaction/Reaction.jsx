import React from 'react';
import { number } from 'prop-types';
import Rater from 'react-rater';
import one from '../assets/1.gif';
import two from '../assets/2.gif';
import three from '../assets/3.gif';
import four from '../assets/4.gif';
import five from '../assets/5.gif';
import '../App.scss';

const reactionGIF = rating => {
  switch (rating) {
    case 1:
      return one;
    case 2:
      return two;
    case 3:
      return three;
    case 4:
      return four;
    case 5:
      return five;
    default:
      return five;
  }
};

const Reaction = ({ review }) => {
  if (!review) return null;
  const src = reactionGIF(review.rating);
  return (
    <div className="reaction">
      <div className="reaction__review-text">"{review.text}"</div>
      <Rater total={5} rating={review.rating} interactive={false} />
      <img src={src} alt={`Maui's Reaction to a rating of ${review.rating}`} />
    </div>
  );
};

Reaction.propTypes = {
  rating: number,
};

export default Reaction;
