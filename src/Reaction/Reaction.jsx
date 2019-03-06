import React from 'react';
import { number } from 'prop-types';
import Rater from 'react-rater';
import setReactionGIF from '../setReactionGIF';
import play from '../assets/play.png';
import pause from '../assets/pause.png';
import '../App.scss';

const Reaction = ({ review, feedPlaying, toggleFeedPlaying }) => {
  if (!review) return null;
  const src = setReactionGIF(review.rating);

  return (
    <div className="reaction">
      <div className="reaction__review-text">"{review.text}"</div>
      <Rater total={5} rating={review.rating} interactive={false} />
      <img
        className="reaction__img"
        src={src}
        alt={`Maui's Reaction to a rating of ${review.rating}`}
      />
      <img
        className="feed-button"
        onClick={toggleFeedPlaying}
        src={feedPlaying ? pause : play}
        alt={feedPlaying ? 'Pause Feed' : 'Play Feed'}
      />
    </div>
  );
};

Reaction.propTypes = {
  rating: number,
};

export default Reaction;
