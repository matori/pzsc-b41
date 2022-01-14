interface Settings {
  DATA_MAX_COUNT: number;
  OWNED_STORAGE_KEY: string;
  INDEX_STORAGE_KEY: string;
}

const settings: Settings = {
  DATA_MAX_COUNT: 10,
  OWNED_STORAGE_KEY: 'ownedItems',
  INDEX_STORAGE_KEY: 'activeIndex',
};

const config = Object.freeze<Settings>(settings);

export { config };
