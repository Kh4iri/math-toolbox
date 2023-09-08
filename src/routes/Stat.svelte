<script lang="ts">
  export let name: string
  export let formula: string = ''
  export let result: string | number

  $: if (typeof result === 'number') {
    result = formatNumber(result);
  }

  function formatNumber(num: number): string {
    const formattedNumber = num.toFixed(5);
    return formattedNumber.replace(/\.?0*$/, '');
  }
</script>

<span class="text-info">{name}:</span>
{@html formula}
<span class="text-success">{result}</span>