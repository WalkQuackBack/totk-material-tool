<script lang="ts">
    // Import the VirtualScroller component from the library
    import VirtualScroller from 'svelte-virtual-scroll-list';
    // Import the custom ListItem component
    import ListItem from './ListItem.svelte';
    // Import the TypeScript interface for list item data
    import type { RootData } from '../types';

    let promise = fetch('/Materials.json');
    
    async function handleResponse(response: Response) {
        const json = await response.json()
        let index = 0
        const output = Object.entries(json).map(([key, value]) => {
            index++;
            return {
                id: index,
                name: key,
                data: value
            };
        })
        return output
    }
</script>

<div class="primary-list h-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-2xl">
    <!-- <VirtualScroller data={items} let:data>
        <ListItem item={data} />
    </VirtualScroller> -->
    {#await promise then response}
        {#await handleResponse(response)}
            <span aria-live="polite" class="p-8 text-4xl">
                Loading data...
            </span>
        {:then items}
            <VirtualScroller data={items} let:data>
                <ListItem item={data} />
            </VirtualScroller>
        {/await}
    {:catch error}
        <p>Failed to load: {error.message}</p>
    {/await}
</div>