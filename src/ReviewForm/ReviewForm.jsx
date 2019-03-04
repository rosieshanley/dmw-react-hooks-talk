import React, { Component } from 'react';
import Rater from 'react-rater';

class ReviewForm extends Component {
  state = { text: '', rating: 5 };

  handleChange = e => {
    const { target } = e;
    const { name } = target;

    this.setState({
      [name]: target.value,
    });
  };

  handleRating = e => {
    this.setState({
      rating: e.rating,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.text) return;
    this.props.addReview(this.state.text, this.state.rating);
    this.setState({ text: '', rating: 5 });
  };

  render() {
    const { text, rating } = this.state;

    return (
      <form className="review-form" onSubmit={this.handleSubmit}>
        <div className="review-form__rater">
          <Rater total={5} rating={rating} onRate={this.handleRating} />
          <div className="review-form__rater__message">
            (We preselected 5 for you.)
          </div>
        </div>
        <div className="review-form__submission-container">
          <input
            className="input"
            name="text"
            value={text}
            onChange={this.handleChange}
          />
          <div
            onClick={this.handleSubmit}
            className="review-form__submit-button"
          >
            submit
          </div>
        </div>
      </form>
    );
  }
}

export default ReviewForm;
