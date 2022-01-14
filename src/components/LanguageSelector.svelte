<script lang="ts">
import { l10n } from '../store/l10n';
import languagesList from '../data/languagesList.json';
import type { LanguagesData } from '../interface/LanguagesData';

const languages: LanguagesData[] = languagesList;

async function onChangeLanguage(event: Event): Promise<void> {
  const { value } = event.target as HTMLSelectElement;
  try {
    await l10n.changeLanguage(value);
    const urlParam = value === 'en' ? '/' : `?lang=${value}`;
    history.pushState(null, '', urlParam);
  } catch (exception) {
    alert('Failed to load the language file. Content will be displayed in English.');
    await l10n.changeLanguage('en');
    history.pushState(null, '', '/');
  }
}
</script>

<label class="LanguageSelector">
  <span class="LanguageSelector-labelText">{$l10n.language}</span>
  <select
    class="LanguageSelector-selectBox"
    on:change={onChangeLanguage}
  >
    {#each languages as language}
      <option
        value="{language.code}"
        selected="{$l10n.language_code === language.code}"
      >
        {language.name}
      </option>
    {/each}
  </select>
</label>

<style lang="scss">
@use "../scss/functions" as *;
@use "../scss/mixins" as *;

.LanguageSelector {
  display: flex;
  align-items: baseline;
  column-gap: get-lines(0.5);
}

//.LanguageSelector-labelText {
//
//}
//
//.LanguageSelector-selectBox {
//}
</style>
