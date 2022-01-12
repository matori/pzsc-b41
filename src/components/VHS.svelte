<script lang="ts">
import ItemSection from './ItemSection.svelte';

let retailVHS: [], homeVHS: [];
export { retailVHS, homeVHS };


</script>

<div class="VHS">
  <div class="VHS-column">
    {#each retailVHS.slice(0, 2) as vhs}
      <ItemSection heading="{vhs.category}" list="{vhs.items}"/>
    {/each}
  </div>
  <div class="VHS-column">
    {#each retailVHS.slice(2, 4) as vhs}
      <ItemSection heading="{vhs.category}" list="{vhs.items}"/>
    {/each}

  </div>
  <div class="VHS-column">
    <ItemSection heading="{'home_vhs'}" list="{homeVHS.items}"/>
  </div>
</div>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.VHS {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto-fill, auto);
  row-gap: get-lines(1);

  @include mq-medium {
    grid-template:
      "col1 col3" auto
      "col2 col3" auto
    /  1fr  1fr;
    column-gap: get-lines(3);
  }
  @include mq-wide {
    grid-template:
      "col1 col2 col3" auto
    /  1fr  1fr  1fr;
  }
}

.VHS-column {
  display: flex;
  flex-direction: column;
  row-gap: get-lines(1);

  @include mq-medium {
    &:first-child {
      grid-area: col1;
    }

    &:nth-child(2) {
      grid-area: col2;
    }

    &:nth-child(3) {
      grid-area: col3;
    }
  }
}
</style>

