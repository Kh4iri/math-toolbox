<script lang="ts">
  import { getMean, getMedian, getMode } from '$lib';
  import { github } from '$src/configuration';
  import DecileStats from './DecileStats.svelte';
  import PercentileStats from './PercentileStats.svelte';
  import QuartileStats from './QuartileStats.svelte';
  import Stat from './Stat.svelte';
  import StatBlock from './StatBlock.svelte';

  let inputString = '2, 2, 3, 5, 1';
  let dataErrors: string[] = [];
  let data: number[];
  $: seperator = inputString.includes(',') ? /,+/ : /\s+/;

  $: {
    dataErrors = [];
    data = inputString
      .trim()
      .split(seperator)
      .map((str) => {
        const num = parseFloat(str);
        if (str.trim() && isNaN(num))
          dataErrors.push(str);
        return num;
      })
      .filter((num) => !isNaN(num));
  }

  $: sortedData = [...data].sort((a, b) => a - b);
  $: sum = data.length > 0 ? data.reduce((prev, curr) => prev + curr) : 0;
  $: mean = getMean(data);
  $: median = getMedian(sortedData);
</script>

<svelte:head>
  <title>Data Statistics</title>
</svelte:head>

<h1 class="mb-3 text-5xl text-accent font-medium">Data Statistics</h1>
<p class="mb-3">
  Data Statistics tool swiftly computes key metrics like mean, median, mode, percentiles, quartiles,
  and deciles, providing a clear snapshot of your dataset's characteristics. Effortlessly analyze your
  data's central tendencies and distribution to make informed decisions in a snap! Check it out on
  <a href={github} class="link link-accent" target="_blank">Github</a>
</p>

<div class="divider"></div>

<!-- Data Input -->
<div class="mb-3">
  <label for="data-input" class="label">
    <span class="label-text">Data</span>
    <span class="label-text-alt">Seperated by comma or space</span>
  </label>
  <input
    bind:value={inputString}
    type="text"
    id="data-input"
    placeholder="1, 2, 3, 4, ..."
    class="input input-bordered w-full {dataErrors.length > 0 ? 'input-error' : ''}"
  />
  <!-- Error text -->
  {#if dataErrors.length > 0}
    <label for="data-input" class="label">
      <span class="label-text-alt text-error">
        {dataErrors.join(', ')}
        {dataErrors.length == 1 ? 'is' : 'are'} not valid
        {dataErrors.length == 1 ? 'number' : 'numbers'}
      </span>
    </label>
  {/if}
</div>

<!-- Sorted Data -->
<label for="sorted-data" class="label">
  <span class="label-text">Sorted Data (read only)</span>
</label>
<input
  value={sortedData.join(', ')}
  type="text"
  id="sorted-data"
  placeholder="(sorted data)"
  class="input input-bordered w-full mb-3"
  readonly
/>

<StatBlock>
  <Stat name="Freq" result={data.length} /><br>
  <Stat name="Sum" result={sum} /><br>
  <Stat name="Min" result={Math.min(...data)} /><br>
  <Stat name="Max" result={Math.max(...data)} />
</StatBlock>

<div class="divider">Mean, Median, Mode</div>

<StatBlock>
  <Stat name="Mean" result={mean.result} formula={mean.formula} /><br>
  <Stat name="Median" result={median.result} formula={median.formula} /><br>
  <Stat name="Mode" result={getMode(data).join(' & ')} /><br>
</StatBlock>

<div class="divider">Quartiles</div>
<QuartileStats {sortedData} />

<div class="divider">Deciles</div>
<DecileStats {sortedData} />

<div class="divider">Percentiles</div>
<PercentileStats {sortedData} />
