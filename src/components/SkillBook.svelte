<script lang="ts">
import ItemSection from './ItemSection.svelte';
import type { SkillBook } from '../interface/ItemsData';

let list: SkillBook[];
export { list };
</script>

<div class="SkillBook">
  {#each list as books}
    <div class="SkillBook-category -{books.category}">
      <ItemSection heading="{books.category}" list="{books.items}"/>
    </div>
  {/each}
</div>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.SkillBook {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto-fill, auto);
  row-gap: get-lines(1);

  @include mq-medium {
    grid-template:
      "carpentary   mechanics" auto
      "cooking      tailoring" auto
      "farming      fishing  " auto
      "first_aid    trapping " auto
      "electrical   foraging " auto
      "metalworking .        " auto
    /  1fr          1fr;
    column-gap: get-lines(3);
  }

  @include mq-wide {
    grid-template:
      "carpentary electrical   fishing " auto
      "cooking    metalworking trapping" auto
      "farming    mechanics    foraging" auto
      "first_aid  tailoring    .       " auto
    /  1fr        1fr          1fr;
  }
}

.SkillBook-category {
  $categories: carpentary, cooking, farming, first_aid, electrical, metalworking, mechanics, tailoring, fishing, trapping, foraging;
  @include mq-medium {
    @each $category in $categories {
      &.-#{$category} {
        grid-area: #{$category};
      }
    }
  }
}
</style>
