import { writable } from 'svelte/store';
import defaultLanguage from '../data/defaultLanguage.json';
import type { languageData } from '../interface/languageData';

const l10n = localizationStore(defaultLanguage);

interface localizationStoreReturn {
  subscribe: Function,
  set: Function,
  changeLanguage: Function,
}

function localizationStore(initialValue: languageData): localizationStoreReturn {
  const initialData = Object.assign({}, initialValue, { language_code: '' });
  const { subscribe, set } = writable(initialData);

  return {
    subscribe,
    set,
    async changeLanguage(language: string): Promise<void> {
      try {
        if(language !== 'en') {
          const response = await fetch(`${location.pathname}locale/${language}.json`);
          if (response.ok === false) {
            throw new Error(response.statusText);
          }
          const languageData = await response.json();
          const data = Object.assign({}, defaultLanguage, languageData);
          set(data);
        } else {
          set(defaultLanguage);
        }
      } catch (exception) {
        alert('Failed to load the language file. Content will be displayed in English.');
        set(defaultLanguage);
      }
    },
  };
}

export { l10n };

