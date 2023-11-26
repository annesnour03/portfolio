export const openLink = (link: string) => {
  window.open(link);
};

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Returns a random element from the given array.
 *
 * @template T
 * @param {T[]} src - The array from which to select a random element.
 * @returns {T} - A randomly selected element from the input array.
 *
 * @example
 * const myArray = [1, 2, 3, 4, 5];
 * const randomElement = randomItem(myArray);
 * console.log(randomElement); // Output: Random element from the array
 */
export const randomItem = <T>(src: T[]): T => {
  return src[Math.floor(Math.random() * src.length)];
};
