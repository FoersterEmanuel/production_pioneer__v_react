/**
 * Generates a normally distributed random number using the Box-Muller transformation.
 * @param mean The mean of the normal distribution (default: 0).
 * @param stdev The standard deviation of the normal distribution (default: 1).
 * @returns A normally distributed random number.
 */
export function boxMullerTransform(mean: number = 0, stdev: number = 1): number {
  // Generate two independent random numbers
  let u = 1 - Math.random();
  let v = Math.random();

  // Apply the Box-Muller transformation to get a normally distributed random number
  let z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);

  // Scale and shift the random number according to the mean and standard deviation
  return z * stdev + mean;
}