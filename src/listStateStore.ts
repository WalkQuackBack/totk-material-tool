import { writable } from 'svelte/store';

export const expandedState = writable(new Map<number, boolean>());