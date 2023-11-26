<script lang="ts">
  import katex, { type KatexOptions } from 'katex';

  export let math: string;
  export let displayMode = false;

  const options: KatexOptions = {
    throwOnError: false,
    displayMode
  };

  $: katexString = katex.renderToString(math, options);
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
</svelte:head>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html katexString}