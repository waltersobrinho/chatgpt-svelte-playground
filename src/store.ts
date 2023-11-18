import { writable, type Writable } from 'svelte/store';

export interface Message {
	text: string;
	type: 'user' | 'api';
}

const initialMessage: Message = {
	text: 'Hi, what would you like to learn about this text?',
	type: 'api',
};

export const history: Writable<Message[]> = writable([initialMessage]);

export const loading: Writable<boolean> = writable(false);
