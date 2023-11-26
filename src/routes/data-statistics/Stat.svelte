<script lang="ts">
  import { formatNumberToString } from '$lib';

  export let name: string;
  export let formula: string = '';
  export let result: string | number;

  $: if (typeof result === 'number') {
    result = formatNumberToString(result);
  }
</script>

<span class="text-info">{name}:</span>

<!-- TODO: Don't use @hmtl -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html formula}

<span class="text-success">{result}</span>