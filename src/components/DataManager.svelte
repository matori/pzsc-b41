<script lang="ts">
import { get } from 'svelte/store';
import { l10n } from '../store/l10n';
import { activeIndex } from '../store/activeIndex';
import { ownedItems } from '../store/owned';
import { config } from '../config';

function onClickResetData(): void {
  const targetIndex = get(activeIndex);
  const currentDataName = get(ownedItems)[targetIndex].name;
  const messageBase = get(l10n).reset_data;
  const message = messageBase.replace('{{data_name}}', currentDataName);
  const confirmation = confirm(message);
  if (confirmation) {
    ownedItems.resetData(targetIndex);
  }
}

function onChangeIndex(event): void {
  const index = parseInt(event.target.selectedIndex);
  activeIndex.changeIndex(index);
}

function onClickEditData(): void {
  const targetIndex = get(activeIndex);
  const message = get(l10n).edit_name;
  const currentName = get(ownedItems)[targetIndex].name;
  const newName: string | null = prompt(message, currentName);
  if (newName.trim()) {
    const targetIndex = get(activeIndex);
    ownedItems.updateData(targetIndex, 'name', newName);
  }
}

function onClickAddData(): void {
  const message = get(l10n).new_data;
  const newName: string | null = prompt(message);
  if (newName.trim()) {
    ownedItems.addData(newName);
  }
}

function onClickDeleteData(): void {
  const targetIndex = get(activeIndex);
  const currentDataName = get(ownedItems)[targetIndex].name;
  const messageBase = get(l10n).delete_data;
  const message = messageBase.replace('{{data_name}}', currentDataName);
  const confirmation = confirm(message);
  if (confirmation) {
    ownedItems.deleteData(targetIndex);
  }
}

function copyUnownedItems(): void {
  const categories = ['skill_book_', 'recipe_magazine_', 'retail_vhs_', 'home_vhs_'];
  const headings = ['skill_books', 'recipe_magazines', 'retail_vhs', 'home_vhs'];

  const currentIndex = get(activeIndex);
  const currentOwned = get(ownedItems)[currentIndex];
  const localization = get(l10n);

  const title = `# ${get(l10n).copy_text_title}`;

  const body = categories.reduce((result, category, index) => {
    // カテゴリー単位のデータ
    const categoryItems = Object.keys(currentOwned).filter(key => key.indexOf(category) === 0);
    const unowned = categoryItems.filter(item => currentOwned[item] === false);
    const heading = `## ${localization[headings[index]]}`;
    const list = unowned.reduce((listItem, key) => `${listItem}\n- ${localization[key]}`, '');
    return `${result}\n${heading}\n${list}\n`;
  }, '');
  const result = `${title}\n${body}`;

  writeToClipBoard(result);
}

async function writeToClipBoard(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert('Copy succeed.');
  } catch (exception) {
    alert('Copy failed. Sorry, something is wrong. Details can be found in the Development Tools Console.');
    throw new Error(`Copy failed: ${exception}`);
  }
}
</script>

<div class="DataManager">
  <div class="DataManager-dataSelector">
    <select
      class="DataManager-select"
      on:change={onChangeIndex}
    >
      {#each $ownedItems as itemsList, index}
        <option value="{itemsList.name}" selected="{$activeIndex === index}">{itemsList.name}</option>
      {/each}
    </select>
  </div>
  <button
    type="button"
    class="DataManager-button -edit"
    on:click={onClickEditData}
  >
    <svg class="DataManager-icon">
      <use href="#icon-edit"/>
    </svg>
    {$l10n.edit_button}
  </button>
  <button
    type="button"
    class="DataManager-button -reset"
    on:click="{onClickResetData}"
  >
    <svg class="DataManager-icon">
      <use href="#icon-reset"/>
    </svg>
    {$l10n.reset_button}
  </button>
  <button
    type="button"
    disabled="{$ownedItems.length > config.DATA_MAX_COUNT - 1}"
    class="DataManager-button -add"
    on:click={onClickAddData}
  >
    <svg class="DataManager-icon">
      <use href="#icon-add"/>
    </svg>
    {$l10n.add_button}
  </button>
  <button
    type="button"
    disabled="{$ownedItems.length - 1 < 1}"
    class="DataManager-button -delete"
    on:click="{onClickDeleteData}"
  >
    <svg class="DataManager-icon">
      <use href="#icon-delete"/>
    </svg>
    {$l10n.delete_button}
  </button>
    <button
      type="button"
      class="DataManager-button -copy"
      on:click={copyUnownedItems}>
      <svg class="DataManager-icon">
        <use href="#icon-copy"/>
      </svg>
      {$l10n.copy_button}
    </button>
</div>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.DataManager {
  @include text(0);
  display: grid;
  grid-template:
    "select        select     " auto
    "edit          reset      " auto
    "add           delete     " auto
    "copy          copy       " auto
  /  min-content   1fr;
  column-gap: get-lines(0.5);
  row-gap: get-lines(0.25);
  justify-items: start;
  border-block-start: 1px solid var(--color-border-thin);
  padding-block: get-lines(0.5);

  @include mq-medium {
    grid-template:
      "select        select        select        select" auto
      "edit          reset         add           delete" auto
      "copy          copy          copy          copy  " auto
    /  min-content   min-content   min-content   1fr;
  }

  @include mq-wide {
    grid-template:
      "select        select        select        select .   " auto
      "edit          reset         add           delete copy" auto
    /  min-content   min-content   min-content   1fr    auto;
  }
}

.DataManager-dataSelector {
  grid-area: select;
  width: 100%;
}

.DataManager-select {
  max-width: 100%;

  @include mq-medium {
    min-width: rem(120px);
    max-width: rem(580px);
  }
}

.DataManager-button {

  &:disabled {
    opacity: 0.3;
  }

  &.-edit {
    grid-area: edit;
  }

  &.-reset {
    grid-area: reset;
  }

  &.-add {
    grid-area: add;
  }

  &.-delete {
    grid-area: delete;
  }

  &.-copy {
    grid-area: copy;
    justify-self: start;

    @include mq-wide {
      justify-self: end;
    }
  }
}

.DataManager-icon {
  width: get-lines(1);
  height: get-lines(1);
  line-height: 1;
  fill: currentcolor;
}
</style>
