<script lang="ts">
  import { getDecile, getMean, getMedian, getMode, getQuartiles } from "$lib";
  import Stat from "./Stat.svelte";
  import StatBlock from "./StatBlock.svelte";

  let inputString = "2, 2, 3, 5, 1";
  let inputDecile = 5;
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
  $: quartiles = getQuartiles(sortedData);
  $: decile = getDecile(sortedData, inputDecile);
</script>

<svelte:head>
  <title>Data Statistics</title>
</svelte:head>

<div class="container mx-auto max-w-lg px-4 py-6">
  <h1 class="text-5xl text-center text-accent">Data Statistics</h1>
  <p class="text-center mb-3">
    Calculator for Mean, Median, Mode, Quartile, and Decile.
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

  <StatBlock>
    <Stat name="Q1" result={quartiles.Q1.result} formula={quartiles.Q1.formula} /><br>
    <Stat name="Q2" result={quartiles.Q2.result} formula={quartiles.Q2.formula} /><br>
    <Stat name="Q3" result={quartiles.Q3.result} formula={quartiles.Q3.formula} /><br>
  </StatBlock>

  <div class="divider">Deciles</div>

  <input type="range" bind:value={inputDecile} min="1" max="9" class="range">
  <div class="w-full flex justify-between text-xs px-2 mb-3">
    {#each [1,2,3,4,5,6,7,8,9] as n}
      <span>{n}</span>
    {/each}
  </div>
  <StatBlock>
    <Stat name="Position" result={decile.position} /><br>
    <Stat name="Remainder" result={decile.remainder} /><br>
    <Stat name="Result" result={decile.result} formula={decile.formula} />
  </StatBlock>
</div>
