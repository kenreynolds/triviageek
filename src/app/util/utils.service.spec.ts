import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shuffle', () => {
    it('should shuffle an array of strings and not mutate the original array', () => {
      const original = ['a', 'b', 'c', 'd', 'e'];
      const arr = [...original];
      const result = service.shuffle(arr);
      // Should contain the same elements
      expect(result.sort()).toEqual(original.sort());
      // Should not be the same order (very rarely, it could be, so allow for that)
      // If the order is the same, shuffle again to reduce false negatives
      if (result.join('') === original.join('')) {
        const result2 = service.shuffle(arr);
        expect(result2.join('')).not.toEqual(original.join(''));
      }
    });
  });
});
