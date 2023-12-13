<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { ArrowLeft } from '$src/icons';
  import TailwindIndicator from './TailwindIndicator.svelte';

  console.log('Page URL Pathname:', $page.url.pathname);
  console.log('Route:', $page.route);
</script>

<!-- Container -->
<div class="container mx-auto max-w-xl px-4 py-6 lg:max-w-3xl lg:pt-10">

  <!-- Back Button -->
  {#if $page.route.id !== '/'}
    <a href="{base}/" class="mb-3 btn btn-sm">
      <ArrowLeft size={20} />
      Back
    </a>
  {/if}

  <!-- Content goes here -->
  <slot />

  <!-- Screen size indicator (development only) -->
  <TailwindIndicator />

</div>