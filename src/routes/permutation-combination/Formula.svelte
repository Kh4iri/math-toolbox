<script lang="ts">
    import Katex from './Katex.svelte';
    export let formula: string;
</script>

<div class="mb-3 text-4xl sm:text-5xl"><Katex math={formula}/></div>