import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor() {}

  /**
   * Randomly shuffles the elements of a given array
   * using the Fisher-Yates algorithm.
   * @param {string[]} array - The array to be shuffled.
   * @returns {string[]} the shuffled array.
   */
  shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}
