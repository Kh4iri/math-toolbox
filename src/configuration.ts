export const name = 'Khairi\'s Math Toolbox';

// If u change dis, make sure to change in svelte.config.js too.
export const repo = '/math-toolbox';
export const github = `https://github.com/Kh4iri${repo}`;

// Main tools
export const tools = [
  {
    name: 'Data Statistics',
    href: '/data-statistics',
    description: `
      Data Statistics tool swiftly computes key metrics like <b>Mean</b>,
      <b>Median</b>, <b>Mode</b>, <b>Percentiles</b>, <b>Quartiles</b>, and <b>Deciles</b>,
      providing a clear snapshot of your dataset's characteristics.
    `
  },
  {
    name: 'Grouped Data Statistics',
    href: '/grouped-data-statistics',
    description: `
      This handy tool calculates essential metrics like <b>Mean</b>, <b>Median</b>, and
      <b>Mode</b> for grouped data sets, simplifying complex statistical analysis.
    `
  },
  {
    name: 'Permutation & Combination',
    href: '/permutation-combination',
    description: 'Permutation and Combination tool effortlessly calculates the myriad ways elements can be arranged or combined.'
  }
];