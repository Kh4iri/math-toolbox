<script lang="ts">
  import config from '../../config';
  import Katex from './Katex.svelte';
  import { clamp, formatNumberToString, getCombination, getPermutation } from '$lib';

  let error = '';
  let inputStringN: string | null = '12';
  let inputStringR: string | null = '2';

  $: inputN = clamp(parseFloat(inputStringN ?? ''), Number.MIN_SAFE_INTEGER, 172);
  $: inputR = clamp(parseFloat(inputStringR ?? ''), Number.MIN_SAFE_INTEGER, 172);

  $: permutation = getPermutation(inputN, inputR);
  $: combination = getCombination(inputN, inputR);

  // Error handling
  $: if (inputN < 0 || inputR < 0)
    error = 'Input cannot be negative.';
  else if (inputN > 171 || inputR > 171)
    error = 'The number <b>170</b> is the highest possible number you can calculate a factorial.';
  else if (inputN < inputR)
    error = '<var>r</var> must be less or equal than <var>n</var>.';
  else
    error = '';
</script>

<svelte:head>
  <title>Permutation & Combination</title>
</svelte:head>

<h1 class="mb-3 text-5xl text-accent font-medium">Permutation & Combination</h1>
<p class="mb-3">
  Permutation and Combination tool effortlessly calculates the myriad ways elements can be arranged or combined.
  Explore permutations for ordered sequences or combinations for unordered sets with ease. Check it out on
  <a href={config.github} target="_blank" class="link link-accent">Github</a>
</p>

<div class="divider" />

<!-- Input: Total number of objects  -->
<label for="N" class="label">
  <span class="label-text">
    <Katex math='n'/>: Total number of objects
  </span>
</label>
<input
  bind:value={inputStringN}
  type="number"
  id="N"
  placeholder="n"
  class="input input-bordered w-full {error ? 'input-error' : ''}"
/>

<!-- Input: Number of objects selected  -->
<label for="R" class="label">
  <span class="label-text">
    <Katex math='r'/>: Number of objects selected
  </span>
</label>
<input
  bind:value={inputStringR}
  type="number"
  id="R"
  placeholder="r"
  class="input input-bordered w-full {error ? 'input-error' : ''}"
/>

{#if error}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <p class="mt-3 text-error">{@html error}</p>
{/if}


<!------------------------ Permutation ------------------------>
<div class="divider">Permutation</div>
<p class="mb-3">
  Permutation refers to the arrangement of a set of items in a specific order,
  considering all possible ways without repetition.
</p>

<div class="mb-3 text-5xl"><Katex math='^nP_r = \frac{'{n!}{(n - r)!}'}'/></div>
{#if inputStringN && inputStringR}
  <div class="{error ? 'text-error' : ''}">
    <Katex math={permutation.formula}/>
    <span class="text-xl {error ? 'text-error' : 'text-success'}"><Katex math={formatNumberToString(permutation.result)}/></span>
  </div>
{/if}

<!------------------------ Combination ------------------------>
<div class="divider">Combination</div>
<p class="mb-3">
  Combination involves selecting a subset of items from a larger
  set without considering the order of selection.
</p>

<div class="mb-3 text-5xl"><Katex math='^nC_r = \frac{'{n!}{(n - r)! \\cdot r!}'}'/></div>
{#if inputStringN && inputStringR}
  <div class="{error ? 'text-error' : ''}">
    <Katex math={combination.formula}/>
    <span class="text-xl {error ? 'text-error' : 'text-success'}"><Katex math={formatNumberToString(combination.result)}/></span>
  </div>
{/if}