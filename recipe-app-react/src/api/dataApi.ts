const BASE_URL = 'http://localhost:3001';

export interface Recipe {
  id?: number;
  title: string;
  description: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  time: number;
  rating?: number;
  nutrition?: { calories: number; protein: number; fat: number; };
}

//  GET /recipes
export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${BASE_URL}/recipes`);
  if (!res.ok) throw new Error('Fehler beim Laden der Rezepte');
  return res.json();
}

//  POST /recipes
export async function createRecipe(recipe: Recipe): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error('Fehler beim Erstellen des Rezepts');
  return res.json();
}



export const getUsers = async () => {
  const response = await fetch('/db.json');
  if (response.ok) {
    const data = await response.json();
    return data.users;
  }
  throw new Error('Fehler beim Laden der Benutzer');
};


export const getUserById = async (userId: string) => {
  const users = await getUsers();
  return users.find((user: any) => user.id === userId);
};

export const getFavoritesByUserId = async (userId: string) => {
  const user = await getUserById(userId);
  const recipes = await getRecipes();
  return recipes.filter((recipe: any) => user.favorites.includes(recipe.id));
};

export const addRecipe = async (newRecipe: any) => {
  const recipes = await getRecipes();
  recipes.push(newRecipe);
  // Speichern in einer realen Datenbank würde hier passieren.
};

export const addFavorite = async (userId: string, recipeId: string) => {
  const users = await getUsers();
  const user = users.find((u: any) => u.id === userId);
  if (user && !user.favorites.includes(recipeId)) {
    user.favorites.push(recipeId);
    // Die Änderung könnte hier gespeichert werden.
  }
};
