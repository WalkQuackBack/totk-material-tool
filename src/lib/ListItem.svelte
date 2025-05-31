<script lang="ts">
    import { expandedState } from '../listStateStore';
    import { onDestroy } from 'svelte';
    import type { ListItem } from '../types';

    export let item: ListItem;

    let isExpanded: boolean = false;
    const unsubscribe = expandedState.subscribe(currentMap => {
        isExpanded = currentMap.get(item.id) || false;
    });

    onDestroy(() => {
        unsubscribe();
    });

    function toggleExpand() {
        isExpanded = !isExpanded;
        expandedState.update(currentMap => {
            const newMap = new Map(currentMap);
            newMap.set(item.id, isExpanded);
            return newMap;
        });
    }

    const objects = Object.entries(item.data).map(([key, value]) => {
        return {
            name: key,
            data: value
        };
    })
</script>

<div class="list-item w-full">
    <button
        class="p-4 gap-2 w-full flex items-center text-start border-b border-b-neutral-200 dark:border-b-neutral-800 hover:bg-neutral-500/10 active:bg-neutral-500/20 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neutral-500"
        onclick={toggleExpand}
        aria-expanded={isExpanded}
        aria-controls="item-content-{item.id}"
    >
        <h3 class="text-md font-semibold grow truncate">{item.name}</h3>
        <div class="chevron transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
    </button>
    {#if isExpanded}
        <div id="item-content-{item.id}" class="p-4 px-5 bg-neutral-200 dark:bg-neutral-950 border-b border-b-neutral-100 dark:border-b-neutral-800 list">
            <ul class="styled-list">
                <h2 class="text-xl font-bold mb-2">Objects</h2>
                {#each objects as object}
                    {@const materialData = Object.entries(object.data).map(([key, value]) => {
                        return {
                            name: key,
                            data: value
                        };
                    })}
                    <li>
                        <span class="object-name object-name text-blue-800 dark:text-blue-400">
                            {object.name}
                        </span>
                        <ul class="divide-neutral-500 divide-solid">
                            {#each materialData as material}
                                <li>
                                    <span class="material-name text-purple-800 dark:text-purple-400">
                                        {material.name}
                                    </span>
                                    <ul>
                                        <li>
                                            <span class="mat-category">
                                                Skin counts
                                            </span>
                                            <ul>
                                                {#each material.data['Skin Counts'] as skinCount}
                                                    <li>{skinCount}</li>
                                                {/each}
                                            </ul>
                                        </li>
                                        <li>
                                            <span class="mat-category">
                                                Samplers
                                            </span>
                                            <ul>
                                                {#each material.data.Samplers as sampler}
                                                    <li>{sampler}</li>
                                                {/each}
                                            </ul>
                                        </li>
                                        <li>
                                            <span class="mat-category">
                                                Textures
                                            </span>
                                            <ul>
                                                {#each material.data.Textures as texture}
                                                    <li>{texture}</li>
                                                {/each}
                                            </ul>
                                        </li>
                                        <li>
                                            <span class="mat-category">
                                                Render info
                                            </span>
                                            <table class="styled-table">
                                            <tbody>
                                                {#each Object.entries(material.data['Render Info']) as entry}
                                                    <tr>
                                                        <td>{entry[0]}</td>
                                                        <td>{entry[1]}</td>
                                                    </tr>
                                                {/each}
                                            </tbody>
                                        </table>
                                        </li>
                                    </ul>
                                </li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
    </div>

<style lang="postcss">
    @reference "tailwindcss";
    [aria-expanded="true"] .chevron {
        scale: 1 -1;
    }

    /* fallback */
    .list ul {
        @apply list-inside list-image-[url(/right.svg)];
    }

    .list ul ul {
        @apply ml-6;
    }

    li::marker {
        @apply mr-1;
    }

    hr {
        @apply border-neutral-300 dark:border-neutral-700 my-3;
    }

    .styled-table td {
        @apply border border-neutral-500 p-1 px-2 font-mono overflow-x-auto;
    }

    .mat-category {
        @apply text-teal-800 dark:text-teal-400;
    }
</style>
