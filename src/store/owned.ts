import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import ownedList from '../data/owned.json';
import { activeIndex } from './activeIndex';
import { config } from '../config';
import type { OwnedData } from '../interface/OwnedData';
import type { Writable } from 'svelte/store';

const initialData = loadLocalStorage();
const ownedItems = ownedItemsStore(initialData);

interface ownedItemsStoreData<T> extends Writable<T> {
  updateData(targetIndex: number, key: string, state: string | boolean): void;

  addData(name: string): void;

  deleteData(targetIndex: number): void;

  resetData(targetIndex: number): void;
}

function ownedItemsStore(initialData: OwnedData[]): ownedItemsStoreData<OwnedData[]> {
  const { subscribe, set, update } = writable<OwnedData[]>(initialData);
  return {
    subscribe,
    set,
    update,
    updateData(targetIndex: number, key: string, state: string | boolean): void {
      update((currentData: Array<OwnedData>): Array<OwnedData> => {
        const nextData = currentData.map((ownedList, index) => {
          if (index === targetIndex) {
            ownedList[key] = state;
          }
          return ownedList;
        });
        saveLocalStorage(nextData);
        return nextData;
      });
    },
    addData(name: string): void {
      update((currentData: Array<OwnedData>): Array<OwnedData> => {
        const additionalData = Object.assign({}, ownedList, { name });
        const nextData = [...currentData];
        nextData.push(additionalData);
        saveLocalStorage(nextData);
        activeIndex.changeIndex(nextData.length - 1);
        return nextData;
      });
    },
    deleteData(targetIndex: number): void {
      update((currentData: Array<OwnedData>): Array<OwnedData> => {
        const nextData = [...currentData];
        nextData.splice(targetIndex, 1);
        const lastIndex = nextData.length - 1;
        const changeIndex = get(activeIndex) > lastIndex;
        if (changeIndex) {
          activeIndex.changeIndex(lastIndex);
        }
        saveLocalStorage(nextData);
        return nextData;
      });
    },
    resetData(targetIndex: number): void {
      update((currentData: Array<OwnedData>): Array<OwnedData> => {
        const nextData = [...currentData];
        const nextList = { ...ownedList };
        nextList.name = currentData[targetIndex].name;
        nextData.splice(targetIndex, 1, nextList);
        saveLocalStorage(nextData);
        return nextData;
      });
    },
  };
}

function loadLocalStorage(): OwnedData[] {
  const data = localStorage.getItem(config.OWNED_STORAGE_KEY);
  if (!data) {
    const newData = [{ ...ownedList }];
    saveLocalStorage(newData);
    return newData;
  }
  return JSON.parse(data);
}

function saveLocalStorage(data: OwnedData[]): void {
  const saveData = JSON.stringify(data);
  localStorage.setItem(config.OWNED_STORAGE_KEY, saveData);
}

export { ownedItems };

