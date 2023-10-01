<script lang="ts">
  import { onMount } from 'svelte';
  import moment from 'moment-timezone';

  export let onAdd: (name: string, tz: string) => void;

  let personName = '';
  let selectedTimeZone = moment.tz.guess();
  let timeZones: string[] = [];

  function addPerson() {
    onAdd(personName, selectedTimeZone);

    // reset the form
    personName = '';
    selectedTimeZone = moment.tz.guess();
  }

  onMount(() => {
    timeZones = moment.tz.names();
  });
</script>

<div class="w-full text-center">
  <form on:submit|preventDefault={addPerson}>
    <input
      type="text"
      placeholder="Name"
      bind:value={personName}
      class="input input-bordered w-full max-w-xs mb-2"
    />

    <select bind:value={selectedTimeZone} class="select select-bordered w-full max-w-xs mb-2">
      {#each timeZones as zone}
        <option value={zone}>{zone}</option>
      {/each}
    </select>

    <div class="block lg:inline">
      <button
        disabled={!personName}
        on:submit={addPerson}
        class="btn btn-primary max-w-xs md:max-w-none w-full md:w-fit mb-2"
      >
        Add
      </button>
    </div>
  </form>
</div>
