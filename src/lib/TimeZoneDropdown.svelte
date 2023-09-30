<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment-timezone';
	import { people } from './stores';

	let personName = '';
	let selectedTimeZone = moment.tz.guess();
	let timeZones: string[] = [];

	function addPerson() {
		people.addPerson(personName, selectedTimeZone);

        // reset the form
		personName = '';
		selectedTimeZone = moment.tz.guess();
	}

	onMount(() => {
		timeZones = moment.tz.names();
	});
</script>

<input type="text" placeholder="Person Name" bind:value={personName} />

<select bind:value={selectedTimeZone}>
	{#each timeZones as zone}
		<option value={zone}>{zone}</option>
	{/each}
</select>

<button on:click={addPerson}>Add</button>
