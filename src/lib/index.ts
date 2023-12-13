// place files you want to import through the `$lib` alias in this folder.

type ResultInfo = { formula: string, result: number };
export type GroupedData = { min: number, max?: number, freq: number }[];

type Quartiles = { Q1: ResultInfo, Q2: ResultInfo, Q3: ResultInfo };
type Decile = ResultInfo & { position: number, remainder: number };
type Percentile = Decile;
type MeanGrouped = ResultInfo & { sum: number, totalFreq: number };

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function formatNumberToString(num: number): string {
  const formattedNumber = num.toFixed(5);
  return formattedNumber.replace(/\.?0*$/, '');
}

export function getMean(numbers: number[]): ResultInfo {
  if (numbers.length == 0)
    return { formula: '', result: 0 };

  const sum = numbers.reduce((prev, curr) => prev + curr, 0);
  const result = sum / numbers.length;
  const formula = `${sum} / ${numbers.length} =`;
  return { formula, result };
}

export function getMedian(sortedNumbers: number[]): ResultInfo {
  const middleIndex = Math.floor(sortedNumbers.length / 2);
  const isOdd = sortedNumbers.length % 2 === 1;

  // If odd, return the middle element.
  if (isOdd) {
    const formula = sortedNumbers
      .map((v, i) => i === middleIndex ? `<span class="text-success">${v}</span>` : `${v}`)
      .join(', ');

    return { formula: `[${formula}] =`, result: sortedNumbers[middleIndex] };
  }

  const formula = sortedNumbers
    .map((v, i) => (i === middleIndex || i === middleIndex-1) ? `<span class="text-warning">${v}</span>` : `${v}`)
    .join(', ');

  // If even, return the average of the two middle elements.
  return {
    formula: `[${formula}] =`,
    result: (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
  };
}

export function getMode(numbers: number[]): number[] {
  if (numbers.length === 0) return [NaN];

  // Create a frequency counter object.
  const frequencyCounter: {
    [key: number]: number;
  } = {};

  // Initialize variables to keep track of the mode and its frequency.
  let mode: number[] = [];
  let maxFrequency = 0;

  // Iterate through the array and count the frequency of each number.
  for (const number of numbers) {
    frequencyCounter[number] = (frequencyCounter[number] || 0) + 1;

    if (frequencyCounter[number] > maxFrequency) {
      maxFrequency = frequencyCounter[number];
      mode = [number]; // New mode found
    } else if (
      frequencyCounter[number] === maxFrequency &&
      !mode.includes(number)
    ) {
      mode.push(number); // Another mode found with the same frequency.
    }
  }

  return mode;
}

export function getQuartiles(sortedNumbers: number[]): Quartiles {
  const middleIndex = Math.floor(sortedNumbers.length / 2);
  const lowerHalf = sortedNumbers.slice(0, middleIndex);
  const upperHalf = sortedNumbers.slice((sortedNumbers.length % 2 === 0) ? middleIndex : middleIndex + 1);

  const Q1 = getMedian(lowerHalf);
  const Q2 = getMedian(sortedNumbers);
  const Q3 = getMedian(upperHalf);

  return { Q1, Q2, Q3 };
}

export function getDecile(sortedNumbers: number[], decileNumber: number): Decile {
  if (decileNumber < 1 || decileNumber > 9)
    throw Error('Decile number should be between 1 and 9.');

  // Calculate the position of the decile.
  const position = (decileNumber * (sortedNumbers.length + 1)) / 10;
  const remainder = position - Math.floor(position);
  const currIndex = Math.floor(position) - 1;
  const nextIndex = currIndex + 1;

  let formula = sortedNumbers
    .map((v, i) => (i === currIndex) ? `<span class="text-success">${v}</span>` : `${v}`)
    .join(', ');
  formula = `[${formula}] =`;

  // Check if the index is within the valid range.
  if (isIndexOutOfRange(sortedNumbers, currIndex) || isIndexOutOfRange(sortedNumbers, nextIndex)) {
    return {
      position,
      remainder,
      result: NaN, // Decile position is out of range.
      formula
    };
  }

  // Calculate the decile value using linear interpolation.
  const result = sortedNumbers[currIndex] + remainder * (sortedNumbers[nextIndex] - sortedNumbers[currIndex]);
  return {
    position,
    remainder,
    result,
    formula
  };
}

export function getPercentile(sortedNumbers: number[], percentileNumber: number): Percentile {
  if (percentileNumber < 0 || percentileNumber > 100)
    throw Error('Percentile must be between 0 and 100.');

  // Calculate the position of the percentile.
  const position = (percentileNumber * (sortedNumbers.length + 1)) / 100;
  const remainder = position - Math.floor(position);
  const currIndex = Math.floor(position) - 1;
  const nextIndex = currIndex + 1;

  let formula = sortedNumbers
    .map((v, i) => (i === currIndex) ? `<span class="text-success">${v}</span>` : `${v}`)
    .join(', ');
  formula = `[${formula}] =`;

  // Check if the index is within the valid range.
  if (isIndexOutOfRange(sortedNumbers, currIndex) || isIndexOutOfRange(sortedNumbers, nextIndex)) {
    return {
      position,
      remainder,
      result: NaN, // Percentile position is out of range.
      formula
    };
  }

  // Calculate the percentile value using linear interpolation.
  const result = sortedNumbers[currIndex] + remainder * (sortedNumbers[nextIndex] - sortedNumbers[currIndex]);
  return {
    position,
    remainder,
    result,
    formula
  };
}

function isIndexOutOfRange<T>(array: T[], index: number): boolean {
  return index < 0 || index >= array.length;
}

export function getMeanGrouped(groupedData: GroupedData): MeanGrouped {
  let sum = 0;
  let totalFreq = 0;

  // Calculate the sum of (midpoint * frequency) and total frequency
  groupedData.forEach(({ min, max, freq }) => {
    const midpoint = max != null ? (min + max) / 2 : min;
    sum += midpoint * freq;
    totalFreq += freq;
  });

  // Calculate the mean
  const result = sum / totalFreq;
  const formula = `Mean = \\frac{\\sum(Mid * Freq)}{Total Freq} = \\frac{${sum}}{${totalFreq}} =`;
  return { result, formula, sum, totalFreq };
}

export function getMedianGrouped(groupedData: GroupedData): number {
  const totalFrequency = groupedData.reduce((a, b) => a + b.freq, 0);
  const medianPosition = totalFrequency / 2;
  let cumulativeFrequency = 0;

  for (const { min, max, freq } of groupedData) {
    const nextCumulativeFreq = cumulativeFrequency + freq;

    if (nextCumulativeFreq > medianPosition) {
      const intervalSize = max != undefined ? max - min + 1 : 0;
      const lowerLimit = min;

      const l = lowerLimit - 0.5;
      const s = intervalSize;
      const F = cumulativeFrequency;
      const f = freq;
      const median = l + s * ((medianPosition - F) / f);

      return median;
    }

    cumulativeFrequency = nextCumulativeFreq;
  }

  return NaN; // If median cannot be determined
}

export function factorialize(num: number): number {
  if (num < 0 || isNaN(num))
    return NaN; // If the number is less than 0, reject it.
  else if (num === 0)
    return 1; // If the number is 0, its factorial is 1.
  else // Otherwise, call the recursive procedure again
    return (num * factorialize(num - 1));
}

export function getPermutation(n: number, r: number): ResultInfo {
  const numerator = factorialize(n);
  const denominator = factorialize(n - r);
  const result = numerator / denominator;

  let formula = `^{${n}}P_{${r}} `;
  formula += `= \\frac{${n}!}{(${n} - ${r})!} `;
  formula += `= \\frac{${n}!}{${n-r}!} =`;

  return { formula, result };
}

export function getCombination(n: number, r: number): ResultInfo {
  const numerator = factorialize(n);
  const denominator = factorialize(n - r) * factorialize(r);
  const result = numerator / denominator;

  let formula = `^{${n}}C_{${r}} `;
  formula += `= \\frac{${n}!}{(${n} - ${r})! \\cdot ${r}!} `;
  formula += `= \\frac{${n}!}{${n-r}! \\cdot ${r}!} =`;

  return { formula, result };
}