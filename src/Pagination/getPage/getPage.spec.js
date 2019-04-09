import getPage from './getPage';

describe('shared/utils/pagination', () => {
  describe('#getPage', () => {
    const items = new Array(15);
    items.fill('a', 0, 5);
    items.fill('b', 5, 10);
    items.fill('c', 10, 15);
    it('should return first page of all "a"s', () => {
      expect(getPage(items, 1, 5)).toEqual(['a', 'a', 'a', 'a', 'a']);
    });

    it('should return second page of all "b"s', () => {
      expect(getPage(items, 2, 5)).toEqual(['b', 'b', 'b', 'b', 'b']);
    });

    it('should return third page of all "c"s', () => {
      expect(getPage(items, 3, 5)).toEqual(['c', 'c', 'c', 'c', 'c']);
    });

    it('should return an empty array if out of bounds', () => {
      expect(getPage(items, 5, 5)).toEqual([]);
    });
  });
});
