import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import ownedList from '../data/owned.json';
import { activeIndex } from './activeIndex';
import { config } from '../config';
import type { ownedData } from '../interface/ownedData';

const initialData = loadLocalStorage();
const ownedItems = ownedItemsStore(initialData);

function ownedItemsStore(initialData) {
  const { subscribe, set, update } = writable(initialData);
  return {
    subscribe,
    set,
    updateData(targetIndex, key, state): void {
      update((currentData: Array<ownedData>): Array<ownedData> => {
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
    addData(name): void {
      update((currentData: Array<ownedData>): Array<ownedData> => {
        const additionalData = Object.assign({}, ownedList, { name });
        const nextData = [...currentData];
        nextData.push(additionalData);
        saveLocalStorage(nextData);
        activeIndex.changeIndex(nextData.length - 1);
        return nextData;
      });
    },
    deleteData(targetIndex): void {
      update((currentData: Array<ownedData>): Array<ownedData> => {
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
    resetData(targetIndex): void {
      update((currentData: Array<ownedData>): Array<ownedData> => {
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

function loadLocalStorage(): Array<ownedData> {
  const data = localStorage.getItem(config.OWNED_STORAGE_KEY);
  if (!data) {
    const newData = [{ ...ownedList }];
    saveLocalStorage(newData);
    return newData;
  }
  return JSON.parse(data);
}

function saveLocalStorage(data: Array<ownedData>): void {
  const saveData = JSON.stringify(data);
  localStorage.setItem(config.OWNED_STORAGE_KEY, saveData);
}

export { ownedItems };

