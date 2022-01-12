<script lang="ts">
import { l10n } from '../store/l10n';
import languagesList from '../data/languages.json';

function onChangeLanguage(event: Event): void {
  const { value } = event.target;
  l10n.changeLanguage(value);
  document.documentElement.setAttribute('lang', value);
  const urlParam = value === 'en' ? '' : `?lang=${value}`;
  location.href = location.origin + location.pathname + urlParam;
}
</script>

<label class="LanguageSelector">
  <span class="LanguageSelector-labelText">{$l10n.language}</span>
  <select
    class="LanguageSelector-selectBox"
    on:change={onChangeLanguage}
  >
    {#each languagesList as language}
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

.LanguageSelector-labelText {

}

.LanguageSelector-selectBox {
}
</style>
