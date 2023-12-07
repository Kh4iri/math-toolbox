<script lang='ts'>
  import { base } from '$app/paths';
  import { name, github, tools } from '$src/configuration';
</script>

<svelte:head>
  <title>{name}</title>
</svelte:head>

<h1 class="mb-3 text-5xl text-accent font-medium">{name}</h1>
<p class="mb-3">
  Hey! So, I was in school learning math, and it hit me: I could totally make life easier with
  a little coding magic. As luck would have it, I'm also a web developer, so I whipped up this sweet website on
  <a href={github} target="_blank" class="link link-accent">Github</a>.
  It's my way of making stats and number crunching a piece of cake. Dive in, check it out!
</p>

<div class="divider my-7">Tools</div>

{#each tools as tool}
  <a href='{base}{tool.href}'>
    <div class="mb-4 p-4 rounded-md bg-base-300 hover:bg-base-200 border
      border-transparent hover:border-accent transition-all active:scale-95"
    >
      <h2 class="text-2xl text-accent font-semibold">{tool.name}</h2>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <p>{@html tool.description}</p>
    </div>
  </a>
{/each}