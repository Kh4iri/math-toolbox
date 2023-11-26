<script lang="ts">
  import { getDecile } from '$lib';
  import Stat from './Stat.svelte';
  import StatBlock from './StatBlock.svelte';

  export let sortedData: number[];
  let value = 5;

  $: decile = getDecile(sortedData, value);
</script>

<input type="range" bind:value min="1" max="9" class="range">
<div class="w-full flex justify-between text-xs px-2 mb-3">
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
      <span>{n}</span>
  {/each}
</div>

<StatBlock>
  <Stat name="Position" result={decile.position} /><br>
  <Stat name="Remainder" result={decile.remainder} /><br>
  <Stat name="Result" result={decile.result} formula={decile.formula} />
</StatBlock>