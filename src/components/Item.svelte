<script lang="ts">
import { l10n } from '../store/l10n';
import { ownedItems } from '../store/owned';
import { activeIndex } from '../store/activeIndex';
import { get } from 'svelte/store';

let item: string;

export { item };

function onChangeOwned(event, item) {
  ownedItems.updateData(get(activeIndex), item, event.target.checked);
}
</script>

<li class="Item">
  <label class="Item-label">
    <input
      type="checkbox"
      name="{item}"
      checked="{$ownedItems[$activeIndex][item]}"
      class="Item-checkbox"
      on:change={(event)=>{onChangeOwned(event, item)}}
    >
    {#if $ownedItems[$activeIndex][item]}
      <svg class="Item-icon _checked">
        <use href="#checkbox-checked"/>
      </svg>
    {:else}
      <svg class="Item-icon _blank">
        <use href="#checkbox-blank"/>
      </svg>
    {/if}
    <span class="Item-text">{$l10n[item]}</span>
  </label>
</li>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.Item {
  @include text(0);
}

.Item-label {
  display: inline-flex;
  align-items: start;
  column-gap: get-lines(0.25);
  position: relative;
  padding-block: get-lines(0.25);
  max-width: 100%;

  &:hover {
    box-shadow: inset 0 0 0 1px var(--color-outline);
  }
}

.Item-checkbox {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}

.Item-icon {
  flex-grow: 0;
  flex-shrink: 0;
  width: get-lines(1);
  height: get-lines(1);
  border-radius: 2px;
  fill: currentcolor;

  .Item-checkbox:checked ~ & {
    opacity: 0.2;
  }

  .Item-checkbox:focus-visible ~ & {
    outline: 3px solid var(--color-outline);
  }
}

.Item-text {
  .Item-checkbox:checked ~ & {
    text-decoration: line-through;
    opacity: 0.3;
  }
}
</style>
