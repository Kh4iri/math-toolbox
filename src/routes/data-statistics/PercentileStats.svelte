<script lang="ts">
  import { clamp, getPercentile } from '$lib';
  import Stat from './Stat.svelte';
  import StatBlock from './StatBlock.svelte';

  export let sortedData: number[];
  let value = 50;

  $: percentile = getPercentile(sortedData, value);
  $: value = clamp(value, 0, 100);
</script>

<div class="flex items-center gap-4 mb-3">
  <input type="number" bind:value min="0" max="100" class="input input-bordered w-20" />
  <input type="range" bind:value min="0" max="100" class="range" />
</div>

<StatBlock>
  <Stat name="Position" result={percentile.position} /><br>
  <Stat name="Remainder" result={percentile.remainder} /><br>
  <Stat name="Result" result={percentile.result} formula={percentile.formula} />
</StatBlock>