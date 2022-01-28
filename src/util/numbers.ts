export const randomFloatBetween = (min: number, max: number) =>
  Math.random() * (max - min + 1) + min

export const randomIntBetween = (min: number, max: number) =>
  Math.floor(randomFloatBetween(min, max))

export const upToNDigits = (number: number, digits: number) =>
  Math.trunc(number * Math.pow(10, digits)) / Math.pow(10, digits)
