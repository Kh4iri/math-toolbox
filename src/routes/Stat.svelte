<script lang="ts">
  export let name: string
  export let formula: string = ''
  export let result: string | number
</script>

<span class="text-info">{name}:</span>
{@html formula}
<span class="text-success">{result}</span>