import { readable } from 'svelte/store';
import mediaList from '../data/items.json';

const items = readable(mediaList)

export { items };

