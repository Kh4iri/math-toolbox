<script lang='ts'>
  const env = process.env.NODE_ENV;
  console.log('Environment:', env);
</script>

{#if env !== 'production'}
  <div class='fixed bottom-1 left-1 z-50 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-primary-content font-mono text-xs'>
    <div class='block sm:hidden'>xs</div>
    <div class='hidden sm:block md:hidden'>sm</div>
    <div class='hidden md:block lg:hidden'>md</div>
    <div class='hidden lg:block xl:hidden'>lg</div>
    <div class='hidden xl:block 2xl:hidden'>xl</div>
    <div class='hidden 2xl:block'>2xl</div>
  </div>
{/if}
