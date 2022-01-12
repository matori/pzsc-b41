<script lang="ts">
import ItemSection from './ItemSection.svelte';

let list: [];
export { list };
</script>

<div class="RecipeMagazine">
  <div class="RecipeMagazine-column">
    {#each list.slice(0, 3) as magazines}
      <ItemSection heading="{magazines.category}" list="{magazines.items}"/>
    {/each}
  </div>
  <div class="RecipeMagazine-column">
    {#each list.slice(3, 5) as magazines}
      <ItemSection heading="{magazines.category}" list="{magazines.items}"/>
    {/each}
  </div>
  <div class="RecipeMagazine-column">
    {#each list.slice(5, 8) as magazines}
      <ItemSection heading="{magazines.category}" list="{magazines.items}"/>
    {/each}
  </div>
</div>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.RecipeMagazine {
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

.RecipeMagazine-column {
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
