import { writable } from 'svelte/store';
import { config } from '../config';
import type { Writable } from 'svelte/store';

const initialState = loadLocalStorage();

const activeIndex = activeIndexStore(initialState);

interface ActiveIndexStore<T> extends Writable<T> {
  changeIndex(targetIndex: number): void;
}

function activeIndexStore(initialIndex: number): ActiveIndexStore<number> {
  const { subscribe, set, update } = writable<number>(initialIndex);
  return {
    subscribe,
    set,
    update,
    changeIndex(targetIndex: number): void {
      set(targetIndex);
      saveLocalStorage(targetIndex);
    },
  };
}

function loadLocalStorage(): number {
  const data: string | null = localStorage.getItem(config.INDEX_STORAGE_KEY);
  if (!data) {
    saveLocalStorage(0);
    return 0;
  }
  return parseInt(data, 10);
}

function saveLocalStorage(value: number): void {
  const saveValue = value.toString();
  localStorage.setItem(config.INDEX_STORAGE_KEY, saveValue);
}

export { activeIndex };
