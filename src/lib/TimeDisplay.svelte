<script lang="ts">
	import { onMount } from 'svelte';
	import moment from 'moment-timezone';

	export let name: string;
	export let tz: string;

	let currentTime: string = '';

	function updateTime() {
        // Format the time like "8:30:25 PM EDT"
        // See: https://momentjs.com/docs/#/displaying/format/
		currentTime = moment.tz(tz).format('LTS z');
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<h1>{name} ({tz}) - {currentTime}</h1>
