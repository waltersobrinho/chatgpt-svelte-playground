import { writable, type Writable } from 'svelte/store';

export const history: Writable<string[]> = writable([]);

export const loading: Writable<boolean> = writable(false);
