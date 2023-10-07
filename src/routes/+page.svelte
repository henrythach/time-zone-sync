<script lang="ts">
  import TimeZoneDropdown from '$lib/TimeZoneAdder.svelte';
  import TimeDisplay from '$lib/TimeDisplay.svelte';
  import { people } from '$lib/stores';
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import moment from 'moment-timezone';

  let timerId: number | null = null;
  let isHovered = false;
  let currentTime = moment();

  function addPerson(name: string, tz: string) {
    people.addPerson(name, tz);
  }

  function deletePerson(index: number) {
    people.deleteIndex(index);
  }

  function handleMouseMove(event: MouseEvent, tz: string) {
    const rect = event.target?.getBoundingClientRect();
    const cardWidth = rect.width;
    const x: number = event.clientX - rect.left;

    // Calculate the percentage of x relative to the card's total width
    const percentage: number = (x / cardWidth) * 100;

    // Convert that percentage to seconds (0 to 86400, where 86400 is the total seconds in 24 hours)
    const totalSecondsInDay: number = 24 * 60 * 60;
    const timeInSeconds: number = Math.floor((percentage / 100) * totalSecondsInDay);

    // Round to the nearest 15-minute increment in seconds
    const quarterHourInSeconds: number = 15 * 60;
    const roundedTimeInSeconds: number =
      Math.round(timeInSeconds / quarterHourInSeconds) * quarterHourInSeconds;

    // Create a Moment object based on the rounded time, using the local time zone
    let hoveredLocalTime = moment.tz(tz);
    hoveredLocalTime.startOf('day').add(roundedTimeInSeconds, 'seconds');

    // Update the current time
    currentTime = hoveredLocalTime.clone();
  }

  function startInterval() {
    if (timerId !== null) return; // Already running
    timerId = setInterval(() => {
      if (!isHovered) {
        updateTime();
      }
    }, 1000);
  }

  function stopInterval() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function handleMouseOver() {
    isHovered = true;
    stopInterval();
  }

  function handleMouseOut() {
    isHovered = false;
    updateTime();
    startInterval();
  }

  function updateTime() {
    currentTime = moment();
  }

  onMount(() => {
    startInterval();
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
      <div
        in:scale={{ duration: 200 }}
        animate:flip={{ duration: 200 }}
        on:mouseover={handleMouseOver}
        on:focus={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:blur={handleMouseOut}
        on:mousemove={(e) => handleMouseMove(e, person.tz)}
        role="button"
        tabindex={0}
      >
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
