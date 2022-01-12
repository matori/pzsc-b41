<script lang="ts">
import { l10n } from './store/l10n';
import { getLanguage } from './utils/getLanguage';
import LoadingMessage from './components/LoadingMessage.svelte';
import Content from './components/Content.svelte';
import type { languageData } from './interface/languageData';

const targetLanguage = getLanguage(location.href);

if (targetLanguage === 'en') {
  history.replaceState(null, '', './');
}

l10n.subscribe((languageFile: languageData): void => {
  document.documentElement.setAttribute('lang', languageFile.language_code);
  document.title = languageFile.title;

  const descriptionElement = document.querySelector('meta[name="description"]');
  if (descriptionElement) {
    descriptionElement.setAttribute('content', languageFile.description);
  }
});

l10n.changeLanguage(targetLanguage);
</script>

{#if $l10n.language_code !== targetLanguage}
  <LoadingMessage/>
{:else}
  <Content/>
{/if}

<style lang="scss">
@use "sass:color";
@use "./scss/functions" as *;
@use "./scss/mixins" as *;

// root variables
:global(:root) {
  // variables
  --color-bg-start: white;
  --color-bg-end: whitesmoke; // #f5f5f5
  --color-text-base: #272727; // https://www.colorhexa.com/f5f5f5 whitesmoke shade 3rd color
  --color-text-link: #3b6e98;
  --color-border-thin: #c4c4c4;
  --color-outline: steelblue;

  @media (prefers-color-scheme: dark) {
    --color-bg-start: #272727;
    --color-bg-end: #1d1d1d;
    --color-text-base: #c4c4c4;
    --color-text-link: steelblue;
    --color-border-thin: #585858;
    --color-outline: #4178a6;
  }
}

// root styles
:global(:root) {
  min-height: 100%;
  overflow-y: scroll;
  background-color: var(--color-bg-start);
  background-image: linear-gradient(to bottom, var(--color-bg-start) 33.33333%, var(--color-bg-end) 66.66666%);
  background-attachment: fixed;
  color: var(--color-text-base);
  font-size: 100%;
  font-family: sans-serif;
}

:global(body) {
  margin: 0;
}

:global(select) {
  @include text(0);
  border-width: 1px;
  border-color: var(--color-border-thin);
  border-radius: 2px;
  padding-inline: get-lines(0.25);
  height: get-lines(1.5);
  background-color: var(--color-bg-end);
  background-image: none;
  color: inherit;
  font-size: inherit;
  outline-width: 0;

  &:focus-visible {
    outline: 3px solid var(--color-outline);
    outline-offset: 1px;
  }
}

:global(button) {
  display: flex;
  align-items: center;
  gap: get-lines(0.25);
  border-width: 0;
  border-radius: 2px;
  padding-inline: get-lines(0.5);
  height: get-lines(1.5);
  background-color: transparent;
  background-image: none;
  color: inherit;
  font-size: inherit;
  white-space: nowrap;
  outline-width: 0;

  &:not(:disabled):hover {
    box-shadow: inset 0 0 0 1px var(--color-outline);
  }

  &:focus-visible {
    outline: 3px solid var(--color-outline);
    outline-offset: 1px;
  }
}

:global(a[href]) {
  color: var(--color-text-link);
}
</style>
