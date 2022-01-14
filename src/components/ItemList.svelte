<script lang="ts">
import Item from './Item.svelte';

let list: string[];

export { list };
</script>

<ul class="ItemList">
  {#each list as item}
    <Item item="{item}"/>
  {/each}
</ul>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.ItemList {
  grid-area: list;
  margin-block: 0;
  padding-inline-start: get-lines(0.5);
  list-style-type: none;
}
</style>
