<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

    type Variant = 'primary' | 'subtle';

    let { children, variant, ...props }:
        { children?: any; variant: Variant; } & HTMLButtonAttributes = $props();
</script>

<button
    class="button"
    data-variant={variant}
    {...props}
>
    {@render children?.()}
</button>

<style lang="postcss">
    @reference 'tailwindcss';

    button {
        @apply p-2.5 rounded-full
            disabled:opacity-50 disabled:cursor-not-allowed
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-neutral-900
            dark:focus-visible:outline-neutral-100;
    }

    button[data-variant="subtle"] {
        @apply not-disabled:hover:bg-neutral-100 not-disabled:dark:hover:bg-neutral-100/10
            not-disabled:hover:shadow-xs not-disabled:active:shadow-none
            not-disabled:active:bg-neutral-800/15 not-disabled:dark:active:bg-neutral-100/15;
    }

    button[data-variant="primary"] {
        @apply
            bg-neutral-900 dark:bg-neutral-100
            text-neutral-100 dark:text-neutral-900
            not-disabled:hover:bg-neutral-800 not-disabled:dark:hover:bg-neutral-200
            not-disabled:active:bg-neutral-600 not-disabled:dark:active:bg-neutral-400;
    }
</style>