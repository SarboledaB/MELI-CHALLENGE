import { replaceSpaceURL, addSpaceURL } from './urlTransform';

describe('URL Transform Utilities', () => {
  describe('replaceSpaceURL', () => {
    it('should replace spaces with hyphens', () => {
      const input = 'this is a test string';
      const expected = 'this-is-a-test-string';

      expect(replaceSpaceURL(input)).toBe(expected);
    });

    it('should return the same string if there are no spaces', () => {
      const input = 'string-without-spaces';
      const expected = 'string-without-spaces';

      expect(replaceSpaceURL(input)).toBe(expected);
    });

    it('should handle empty strings correctly', () => {
      const input = '';
      const expected = '';

      expect(replaceSpaceURL(input)).toBe(expected);
    });
  });

  describe('addSpaceURL', () => {
    it('should replace hyphens with spaces', () => {
      const input = 'this-is-a-test-string';
      const expected = 'this is a test string';

      expect(addSpaceURL(input)).toBe(expected);
    });

    it('should return the same string if there are no hyphens', () => {
      const input = 'string without hyphens';
      const expected = 'string without hyphens';

      expect(addSpaceURL(input)).toBe(expected);
    });

    it('should handle empty strings correctly', () => {
      const input = '';
      const expected = '';

      expect(addSpaceURL(input)).toBe(expected);
    });
  });
});
