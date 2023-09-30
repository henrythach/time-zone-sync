<script lang="ts">
  import TimeZoneDropdown from '$lib/TimeZoneAdder.svelte';
  import TimeDisplay from '$lib/TimeDisplay.svelte';
  import { people } from '$lib/stores';
  import { onMount } from 'svelte';
  import moment from 'moment-timezone';

  let currentTime = moment();

  function updateTime() {
    currentTime = moment();
  }

  function deletePerson(index: number) {
    people.deleteIndex(index);
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="container mx-auto px-4">
  <TimeZoneDropdown />

  {#if $people.length}
    <div class="divider mx-4" />
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {#each $people as person, index}
      <TimeDisplay name={person.name} tz={person.tz} time={currentTime} onDelete={() => deletePerson(index)} />
    {/each}
  </div>
</div>
