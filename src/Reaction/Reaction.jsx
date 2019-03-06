import React from 'react';
import { number } from 'prop-types';
import Rater from 'react-rater';
import setReactionGIF from '../setReactionGIF';
import play from '../assets/play.png';
import pause from '../assets/pause.png';
import next from '../assets/right.png';
import prev from '../assets/left.png';
import '../App.scss';

const Reaction = ({ review, feedIsPlaying, dispatch }) => {
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
      <div className="controls-container">
        <div>
          <img
            className="feed-button"
            onClick={() => dispatch({ type: 'PREV' })}
            src={prev}
            alt="prev"
          />
          <img
            className="feed-button"
            onClick={() => dispatch({ type: 'NEXT' })}
            src={next}
            alt="next"
          />
        </div>
        <img
          className="feed-button"
          onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
          src={feedIsPlaying ? pause : play}
          alt={feedIsPlaying ? 'Pause Feed' : 'Play Feed'}
        />
      </div>
    </div>
  );
};

Reaction.propTypes = {
  rating: number,
};

export default Reaction;
