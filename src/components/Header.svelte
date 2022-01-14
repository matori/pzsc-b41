<script lang="ts">
import { l10n } from '../store/l10n';
import LanguageSelector from './LanguageSelector.svelte';
</script>

<header class="Header">
  <h1 class="Header-title">{$l10n.title}</h1>
  <p class="Header-description">
    {$l10n.description}
  </p>
  <p class="Header-languageSelector">
    <LanguageSelector/>
  </p>
</header>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.Header {
  display: grid;
  grid-template:
    "title            " auto
    "description      " auto
    "language-selector" auto
  /  1fr;
  row-gap: get-lines(0.5);
  padding-block: get-lines(1);
}

.Header-title {
  @include text(1);
  grid-area: title;
  margin: 0;

  @include mq-medium {
    @include text(2);
  }
}

.Header-description {
  @include text(0);
  grid-area: description;
  margin: 0;
}

.Header-languageSelector {
  grid-area: language-selector;
  justify-self: end;
  margin: 0;
}
</style>
