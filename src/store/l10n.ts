import { writable } from 'svelte/store';
import defaultLanguage from '../data/defaultLanguage.json';
import type { TranslationData } from '../interface/TranslationData';
import type { Writable } from 'svelte/store';

const l10n = localizationStore(defaultLanguage);

interface localizationStoreData<T> extends Writable<T> {
  changeLanguage(language: string): Promise<void>;
}

function localizationStore(initialValue: TranslationData): localizationStoreData<TranslationData> {
  const initialData: TranslationData = Object.assign({}, initialValue, { language_code: '' });
  const { subscribe, set, update } = writable<TranslationData>(initialData);

  return {
    subscribe,
    set,
    update,
    async changeLanguage(language: string): Promise<void> {
      if (language !== 'en') {
        const response = await fetch(`${location.pathname}locale/${language}.json`);
        if (response.ok === false) {
          set(defaultLanguage);
          throw Error(response.statusText);
        }
        const languageData = await response.json();
        const data = Object.assign({}, defaultLanguage, languageData);
        set(data);
      } else {
        set(defaultLanguage);
      }
    },
  };
}

export { l10n };

