/**
 * Get a page of items from an array
 * @param {Array} items an array of items
 * @param {number} [page=1] page of items you wish to limit return to
 * @param {number} [pageSize=24] number of items on each page
 * @return {Array} a slice of the input array containing only items for the
 *                 page
 */
const getPage = (items, page = 1, pageSize = 24) =>
  items.slice((page - 1) * pageSize, page * pageSize);

export default getPage;
