<script lang="ts">
  export let href: string;
</script>

<a {href}>
  <div class="mb-4 p-4 rounded-md bg-base-300 hover:bg-base-200
    border border-transparent hover:border-accent transition-all active:scale-95"
  >
    <slot />
  </div>
</a>