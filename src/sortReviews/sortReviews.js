const sortReviews = (reviews, field) =>
  reviews.sort((a, b) => a[field] - b[field]);

export default sortReviews;
