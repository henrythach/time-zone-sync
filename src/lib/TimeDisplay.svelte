<script lang="ts">
  import moment from 'moment-timezone';

  export let name: string;
  export let tz: string;
  export let time: moment.Moment = moment();
  export let onDelete: () => void;

  function getColorsByHour(hour: number) {
    let background, text;

    if (hour >= 6 && hour < 9) {
      // Morning (6am to 9am)
      background = 'bg-gradient-to-t from-yellow-100 via-amber-200 to-orange-300';
      text = 'text-pink-950';
    } else if (hour >= 9 && hour < 18) {
      // Afternoon (9am to 6pm)
      background = 'bg-gradient-to-t from-sky-50 to-cyan-300';
      text = 'text-cyan-800';
    } else if (hour >= 18 && hour < 21) {
      // Evening (6pm to 9pm)
      background = 'bg-gradient-to-t from-blue-700 via-indigo-800 to-gray-900';
      text = 'text-blue-50';
    } else {
      // Night
      background = 'bg-gradient-to-t from-gray-700 to-gray-900';
      text = 'text-white';
    }

    // Fallback, should never reach here if hour is valid (0-23)
    return {
      background: background || 'bg-gray-400',
      text: text || 'text-gray-800'
    };
  }

  $: tzTime = time.tz(tz);
  $: hourColor = getColorsByHour(tzTime.hour());
</script>

<div class={`${hourColor.background} ${hourColor.text} p-4 px-6 rounded-md hover:drop-shadow-lg`}>
  <div class={`${hourColor.text}`}>{name}</div>
  <div class={`font-extrabold whitespace-nowrap text-4xl ${hourColor.text}`}>
    {tzTime.format('LTS z')}
  </div>
  <div class={`text-xs whitespace-nowrap flex justify-between ${hourColor.text}`}>
    <span>{tz}</span>
    <button
      class="cursor-pointer"
      data-tip="Delete record"
      on:click={() => onDelete()}
      tabindex={1}
    >
      🗑
    </button>
  </div>
</div>
