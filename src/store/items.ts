import { readable } from 'svelte/store';
import mediaList from '../data/items.json';
import type { ItemsData } from '../interface/ItemsData';

const items = readable<ItemsData>(mediaList);

export { items };

