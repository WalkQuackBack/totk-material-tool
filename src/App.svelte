<script>
  import IconButton from "./lib/IconButton.svelte";
  import List from "./lib/MainList.svelte";

</script>

<main class="grow min-h-0">
  <List />
</main>

<aside class="p-2 gap-0 flex items-center rounded-full shadow-md bg-neutral-200 dark:bg-neutral-700">
  <IconButton
    aria-label="List options"
    title="List options"
    variant="subtle"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
  </IconButton>
  <IconButton
    aria-label="Filter"
    title="Filter"
    variant="subtle"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
    </svg>
  </IconButton>
  <div class="search-bar-container grow mx-2">
    <label for="search-bar" class="p-2.5 absolute">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
    </label>
    <input
      type="search"
      aria-label="Search"
      placeholder="Search"
      id="search-bar"
      class="w-full py-2 px-4 ps-11 border-1 border-neutral-400 dark:border-neutral-600 rounded-full"
    />
  </div>
  <IconButton
    aria-label="Apply"
    title="Apply"
    variant="primary"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  </IconButton>

  <span class="notice text-3xl font-black relative -left-[50%] text-yellow-700 dark:text-yellow-400">WIP</span>
</aside>

<style lang="postcss">
  @reference "tailwindcss";

  @apply selection:bg-neutral-500;
  
  aside :global(*:not(.notice)) {
    @apply opacity-50 pointer-events-none select-none;
  }
</style>