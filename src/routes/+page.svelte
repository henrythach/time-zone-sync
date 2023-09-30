<script lang="ts">
  import TimeZoneDropdown from '$lib/TimeZoneDropdown.svelte';
  import TimeDisplay from '$lib/TimeDisplay.svelte';
  import { people } from '$lib/stores';
  import { onMount } from 'svelte';
  import moment from 'moment-timezone';

  let currentTime = moment();

  function updateTime() {
    currentTime = moment();
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<TimeZoneDropdown />

{#each $people as person}
  <TimeDisplay {...person} time={currentTime} />
{/each}
