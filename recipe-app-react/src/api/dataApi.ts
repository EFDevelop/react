export const getUsers = async () => {
  const response = await fetch('/data.json');
  if (response.ok) {
    const data = await response.json();
    return data.users;
  }
  throw new Error('Fehler beim Laden der Benutzer');
};

export const getRecipes = async () => {
  const response = await fetch('/data.json');
  if (response.ok) {
    const data = await response.json();
    return data.recipes;
  }
  throw new Error('Fehler beim Laden der Rezepte');
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
