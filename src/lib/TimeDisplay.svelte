<script lang="ts">
  import moment from 'moment-timezone';
  import { COLOR_SCHEMES } from '$lib/colors.js';

  export let name: string;
  export let tz: string;
  export let time: moment.Moment = moment();
  export let onDelete: () => void = () => {};

  $: tzTime = time.tz(tz);
  $: hourColor = COLOR_SCHEMES[tzTime.hour()] || { background: 'bg-black', text: 'text-white' };
</script>

<div class={`${hourColor.background} ${hourColor.text} p-4 px-6 rounded-md group`}>
  <div class={`${hourColor.text}`}>{name}</div>
  <div class={`font-extrabold whitespace-nowrap text-4xl ${hourColor.text}`}>
    {tzTime.format('LTS z')}
  </div>
  <div class={`text-xs whitespace-nowrap flex justify-between ${hourColor.text}`}>
    <span>{tz}</span>
    <button
      class="cursor-pointer invisible group-hover:visible"
      data-tip="Delete record"
      on:click={() => onDelete()}
      tabindex={1}
    >
      remove
    </button>
  </div>
</div>
