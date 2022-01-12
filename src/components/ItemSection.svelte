<script lang="ts">
import { l10n } from '../store/l10n';
import ItemList from './ItemList.svelte';

let heading: string;
let list: [];

export { heading, list };
</script>

<section class="ItemSection">
  <h3 class="ItemSection-heading">{$l10n[heading]}</h3>
  <div class="ItemSection-body">
    <ItemList list="{list}"/>
  </div>
</section>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.ItemSection {
  display: flex;
  flex-direction: column;
  row-gap: get-lines(0.25);
}

.ItemSection-heading {
  @include text(0);
  margin: 0;
}

.ItemSection-body {
}
</style>
