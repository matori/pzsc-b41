export interface SkillBook {
  category: string;
  items: string[];
}

export interface RecipeMagazine {
  category: string;
  items: string[];
}

export interface RetailVhs {
  category: string;
  items: string[];
}

export interface HomeVhs {
  items: string[];
}

export interface ItemsData {
  skill_books: SkillBook[];
  recipe_magazines: RecipeMagazine[];
  retail_vhs: RetailVhs[];
  home_vhs: HomeVhs;
}

