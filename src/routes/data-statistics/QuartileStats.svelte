<script lang="ts">
  import { getQuartiles } from '$lib';
  import Stat from './Stat.svelte';
  import StatBlock from './StatBlock.svelte';

  export let sortedData: number[];
  $: quartiles = getQuartiles(sortedData);
</script>

<StatBlock>
  <Stat name="Q1" result={quartiles.Q1.result} formula={quartiles.Q1.formula} /><br>
  <Stat name="Q2" result={quartiles.Q2.result} formula={quartiles.Q2.formula} /><br>
  <Stat name="Q3" result={quartiles.Q3.result} formula={quartiles.Q3.formula} /><br>
</StatBlock>