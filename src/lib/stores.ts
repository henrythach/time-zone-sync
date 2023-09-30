import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const LOCAL_STORAGE_KEY = 'people';
const QUERY_PARAM_KEY = 'people';
const DEFAULT_VALUE: PersonType[] = [];

type PersonType = { name: string; tz: string };

function serializeToURL(array: PersonType[]) {
  return array
    .map((person) => `${encodeURIComponent(person.name)}|${encodeURIComponent(person.tz)}`)
    .join(';');
}

function deserializeFromURL(serializedArray: string): PersonType[] {
  const items = serializedArray.split(';');
  return items.map((item) => {
    const [name, tz] = item.split('|').map(decodeURIComponent);
    return { name, tz };
  });
}

function createPeopleStore() {
  let initialValue = null;

  if (browser) {
    // Try to load from the query param
    const urlParams = new URLSearchParams(window.location.search);
    const peopleQueryString = urlParams.get(QUERY_PARAM_KEY);
    initialValue = peopleQueryString ? deserializeFromURL(peopleQueryString) : null;

    // If it doesn't exist, then try to load from localStorage
    if (!initialValue) {
      const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      initialValue = storedValue ? deserializeFromURL(storedValue) : null;
    }
  }

  // Otherwise just use the default starter value
  if (!initialValue) {
    initialValue = DEFAULT_VALUE;
  }

  const { subscribe, set, update } = writable<PersonType[]>(initialValue);

  if (browser) {
    subscribe(($value) => {
      // Serialize the array
      const serializedValue = serializeToURL($value);

      // Save it to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedValue);

      // Update the URL's 'people' query parameter
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('people', serializedValue);
      window.history.replaceState({}, '', currentUrl);
    });
  }

  return {
    subscribe,
    addPerson: (name: string, tz: string) => update((people) => [...people, { name, tz }]),
    clearAll: () => set([])
  };
}

export const people = createPeopleStore();
