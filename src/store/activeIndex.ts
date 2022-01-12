import { writable } from 'svelte/store';
import { config } from '../config';

const initialState = loadLocalStorage();

const activeIndex = activeIndexStore(initialState);

function activeIndexStore(initialIndex: number) {
  const { subscribe, set } = writable(initialIndex);
  return {
    subscribe,
    set,
    changeIndex(targetIndex: number): void {
      set(targetIndex);
      saveLocalStorage(targetIndex);
    },
  };
}

function loadLocalStorage(): number {
  const data = localStorage.getItem(config.INDEX_STORAGE_KEY);
  if (data === null) {
    saveLocalStorage('0');
    return 0;
  }
  return parseInt(data);
}

function saveLocalStorage(value): void {
  localStorage.setItem(config.INDEX_STORAGE_KEY, value);
}

export { activeIndex };
