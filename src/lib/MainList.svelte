<script lang="ts">
    // Import the VirtualScroller component from the library
    import VirtualScroller from 'svelte-virtual-scroll-list';
    // Import the custom ListItem component
    import ListItem from './ListItem.svelte';

    const abortController = new AbortController();
    const signal = abortController.signal;

    let loadProgress = $state(0);
    let receivedLength = $state(0);
    let contentLength = $state(0);
    let response;
    let json;

    function formatBytes(bytes: number, decimals: number = 2) {
        if (!+bytes) return '0 B'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
    
    async function loadData() {
        response = await fetch('./Materials.json', {signal});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Ensure response.body exists and is a ReadableStream
        if (!response.body) {
            throw new Error('Response body is not a ReadableStream.');
        }

        const reader = response.body.getReader();
        contentLength = parseInt(response.headers.get('Content-Length') || '0', 10);

        // Use TextDecoder to convert Uint8Array chunks to strings
        const decoder = new TextDecoder('utf-8');
        let rawTextChunks: string = ''; // Accumulate raw text chunks

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            if (value) {
                receivedLength += value.length;
                rawTextChunks += decoder.decode(value, { stream: true });
            }

            if (contentLength > 0) {
                loadProgress = (receivedLength / contentLength);
            }
        }
        rawTextChunks += decoder.decode();

        try {
            json = JSON.parse(rawTextChunks);
            console.log('JSON data parsed:', json);
        } catch (parseError: any) {
            throw new Error(`Failed to parse JSON: ${parseError.message}`);
        }

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
    {#await loadData()}
    <div aria-live="polite" class="initial-loader p-6 gap-4 mx-auto w-full h-full text-center inline-flex flex-col justify-center items-center">
        <span class="text-4xl font-semibold">
            Loading data...
        </span>
        <span class="text-xl font-mono">
            <span>{formatBytes(receivedLength)}</span>
            of
            <span>{formatBytes(contentLength)}</span>
        </span>
        <progress class="w-full max-w-2xl rounded-full" value={loadProgress}></progress>
    </div>
    {:then items}
        <VirtualScroller data={items} let:data>
            <ListItem item={data} />
        </VirtualScroller>
        {:catch error}
            <p>Failed to load: {error.message}</p>
    {/await}
</div>

<style lang="postcss">
    @reference 'tailwindcss';
    progress[value]::-webkit-progress-bar {
        @apply bg-neutral-300 dark:bg-neutral-700 rounded-full overflow-hidden;
    }
    progress[value]::-webkit-progress-value {
        @apply bg-gradient-to-r from-neutral-500 dark:from-neutral-500
            to-neutral-950 dark:to-neutral-50;
    }
</style>