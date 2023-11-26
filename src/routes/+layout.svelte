<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import TailwindIndicator from './TailwindIndicator.svelte';

  console.log('Page URL Pathname:', $page.url.pathname);
  console.log('Route:', $page.route);
</script>

<!-- Container -->
<div class="container mx-auto max-w-xl px-4 py-6 lg:max-w-3xl lg:pt-10">

  <!-- Back Button -->
  {#if $page.url.pathname !== `${base}/`}
    <a href="{base}/" class="mb-3 btn btn-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
      Back
    </a>
  {/if}

  <!-- Content goes here -->
  <slot />

  <!-- Screen size indicator (development only) -->
  <TailwindIndicator />

</div>