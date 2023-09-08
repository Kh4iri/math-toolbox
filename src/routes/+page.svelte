<script lang="ts">
  import { getMean, getMedian, getMode } from "$lib";
  import DecileStats from "./DecileStats.svelte";
  import PercentileStats from "./PercentileStats.svelte";
  import QuartileStats from "./QuartileStats.svelte";
  import Stat from "./Stat.svelte";
  import StatBlock from "./StatBlock.svelte";

  let inputString = "2, 2, 3, 5, 1";
  let dataErrors: string[] = [];
  let data: number[];

  $: {
    dataErrors = [];
    data = inputString
      .split(",")
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

<div class="container mx-auto max-w-xl px-4 py-6">
  <h1 class="text-5xl text-center text-accent mb-1">Data Statistics</h1>
  <p class="text-center mb-3">
    This open-source project simplifies statistical calculations for data enthusiasts, students,
    and everyone else. It's a quick tool I created to make working with data easier. Check it out on
    <a href="https://github.com/Kh4iri/data-statistics-calculator" class="link link-accent" target="_blank">Github</a>
  </p>

  <!-- Data Input -->
  <div class="mb-3">
    <label for="data-input" class="label">
      <span class="label-text">Data</span>
      <span class="label-text-alt">Seperated by comma</span>
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
          {dataErrors.join(", ")}
          {dataErrors.length == 1 ? "is" : "are"} not valid
          {dataErrors.length == 1 ? "number" : "numbers"}
        </span>
      </label>
    {/if}
  </div>

  <!-- Sorted Data -->
  <label for="sorted-data" class="label">
    <span class="label-text">Sorted Data (read only)</span>
  </label>
  <input
    value={sortedData.join(", ")}
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
</div>
