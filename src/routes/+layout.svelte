<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import TailwindIndicator from './TailwindIndicator.svelte';
</script>

<!-- Container -->
<div class="container mx-auto max-w-xl px-4 py-6 lg:max-w-3xl lg:pt-10">
  {#if $page.url.pathname !== '/'}
    <a href="/" class="mb-3 btn btn-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
      Home
    </a>
  {/if}

  <slot />

  <TailwindIndicator />
</div>