<script lang="ts">
import { l10n } from '../store/l10n';
import { items } from '../store/items';
import DataManager from './DataManager.svelte';
import SkillBook from './SkillBook.svelte';
import RecipeMagazine from './RecipeMagazine.svelte';
import VHS from './VHS.svelte';

</script>

<main class="Main">
  <DataManager/>
  <div class="Main-body">
    <section class="Main-section">
      <h2 class="Main-heading">{$l10n.skill_books}</h2>
      <SkillBook list="{$items.skill_books}"/>
    </section>
    <section class="Main-section">
      <h2 class="Main-heading">{$l10n.recipe_magazines}</h2>
      <RecipeMagazine list="{$items.recipe_magazines}"/>
    </section>
    <section class="Main-section">
      <h2 class="Main-heading">{$l10n.vhs}</h2>
      <VHS retailVHS="{$items.retail_vhs}" homeVHS="{$items.home_vhs}"/>
    </section>
  </div>
</main>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.Main {
}

.Main-body {
  display: grid;
  grid-template-rows: repeat(3, auto);
}

.Main-section {
  display: grid;
  grid-template-rows: repeat(2, auto);
  row-gap: get-lines(1);
  border-block-start-width: 1px;
  border-block-start-color: var(--color-border-thin);
  padding-block: get-lines(1.5);

  &:first-child {
    border-block-start-style: solid;
  }

  &:nth-child(n+2) {
    border-block-start-style: dashed;
  }
}

.Main-heading {
  @include text(1);
  margin-block: 0;
}
</style>
