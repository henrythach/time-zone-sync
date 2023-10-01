<script lang="ts">
  import TimeZoneDropdown from '$lib/TimeZoneAdder.svelte';
  import TimeDisplay from '$lib/TimeDisplay.svelte';
  import { people } from '$lib/stores';
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import moment from 'moment-timezone';

  let currentTime = moment();

  function updateTime() {
    currentTime = moment();
  }

  function addPerson(name: string, tz: string) {
    people.addPerson(name, tz);
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

<svelte:head>
  <title>TimeZoneSync</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <TimeZoneDropdown onAdd={addPerson} />

  <div class="divider" />

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each $people as person, index (person)}
      <div in:scale={{ duration: 200 }} animate:flip={{ duration: 200 }}>
        <TimeDisplay
          name={person.name}
          tz={person.tz}
          time={currentTime}
          onDelete={() => deletePerson(index)}
        />
      </div>
    {/each}
  </div>
</div>
