import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type PersonType = { name: string; tz: string };
const LOCAL_STORAGE_KEY = 'people';
const DEFAULT_VALUE = [
	{ name: 'Henry', tz: 'America/New_York' },
	{ name: 'Tim Cook', tz: 'US/Pacific' }
];

function createPeopleStore() {
	const storedValue = browser ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
	const initialValue = storedValue === null ? DEFAULT_VALUE : JSON.parse(storedValue);

	const { subscribe, set, update } = writable<PersonType[]>(initialValue);

	if (browser) {
		subscribe(($value) => {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify($value));
		});
	}

	return {
		subscribe,
		addPerson: (name: string, tz: string) => update((people) => [...people, { name, tz }]),
		clearAll: () => set([])
	};
}

export const people = createPeopleStore();
