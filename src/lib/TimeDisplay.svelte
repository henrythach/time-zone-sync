<script lang="ts">
  import type moment from 'moment-timezone';

  export let name: string;
  export let tz: string;
  export let time: moment.Moment;
  export let onDelete: () => void;

  function getColorsByHour(hour: number) {
    let background, text;

    if (hour >= 6 && hour < 10) {
      // Morning (6am to 10am)
      background = 'bg-gradient-to-b from-indigo-200 via-red-200 to-yellow-100';
      text = 'text-gray-800';
    }
    else if (hour >= 10 && hour < 18) {
      // Afternoon (10am to 6pm)
      background = 'bg-gradient-to-b from-sky-400 to-sky-200';
      text = 'text-gray-800';
    }
    else if (hour >= 18 && hour < 22) {
      // Evening (6pm to 10pm)
      background = 'bg-gradient-to-t from-indigo-500 via-blue-800 to-gray-900';
      text = 'text-white';
    }
    else {
      // Night
      background = 'bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r';
      text = 'text-white';
    }

    // Fallback, should never reach here if hour is valid (0-23)
    return {
      background: background || "bg-gray-400",
      text: text || "text-gray-800"
    };
  }

  $: tzTime = time.tz(tz);
  $: hourColor = getColorsByHour(tzTime.hour())
</script>

<div class={`p-4 px-6 rounded-md ${hourColor.background} ${hourColor.text}`}>
  <div class={`stat-title ${hourColor.text}`}>
    {#if name}{name}{:else}&nbsp;{/if}
  </div>
  <div class="stat-value">{tzTime.format('LTS z')}</div>
  <div class={`flex justify-between ${hourColor.text}`}>
    <span>{tz}</span>
    <span
      class="cursor-pointer"
      data-tip="Delete record"
      on:click={() => onDelete()}
      on:keydown={() => onDelete()}
      tabindex={1}
      role="button"
    >
      🗑
    </span>
  </div>
</div>
