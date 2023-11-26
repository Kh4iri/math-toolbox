<script lang='ts'>
  import { base } from '$app/paths';
  import { name, github } from '$src/configuration';
  import Tool from './MathTool.svelte';
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<h1 class="mb-3 text-5xl text-accent font-medium">{name}</h1>
<p class="mb-3">
  Hey! So, I was in school learning math, and it hit me: I could totally make life easier with
  a little coding magic. As luck would have it, I'm also a web developer, so I whipped up this sweet website on
  <a href={github} target="_blank" class="link link-accent">Github</a>.
  It's my way of making stats and number crunching a piece of cake. Dive in, check it out!
</p>

<div class="divider my-7">Tools</div>

<Tool href="{base}/data-statistics">
  <h2 class="text-2xl text-accent font-semibold">Data Statistics</h2>
  <p>Data Statistics tool swiftly computes key metrics like <b>mean</b>, <b>median</b>, <b>mode</b>, <b>percentiles</b>, <b>quartiles</b>, and <b>deciles</b>, providing a clear snapshot of your dataset's characteristics.</p>
</Tool>

<Tool href="{base}/permutation-combination">
  <h2 class="text-2xl text-accent font-semibold">Permutation & Combination</h2>
  <p>Permutation and Combination tool effortlessly calculates the myriad ways elements can be arranged or combined. </p>
</Tool>
