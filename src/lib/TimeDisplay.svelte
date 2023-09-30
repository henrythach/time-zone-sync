<script lang="ts">
  import type moment from 'moment-timezone';

  export let name: string;
  export let tz: string;
  export let time: moment.Moment;
</script>

<div>
  <h3>{name} ({tz})</h3>
  <h2>{time.tz(tz).format('LTS z')}</h2>
</div>
