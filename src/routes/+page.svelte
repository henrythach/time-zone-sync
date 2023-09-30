<script lang="ts">
	import TimeZoneDropdown from '$lib/TimeZoneDropdown.svelte';
	import TimeDisplay from '$lib/TimeDisplay.svelte';
	import { people } from '$lib/stores';
</script>

<TimeZoneDropdown />
{#each $people as person}
	<TimeDisplay {...person} />
{/each}
