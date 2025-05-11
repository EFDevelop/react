import { Recipe } from "../types/Recipe";
import { User } from "../types/User";

const BASE_URL = 'http://localhost:3001';

// Hilfsfunktion für Fetch-Fehlerbehandlung
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `API-Fehler: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

// GET /recipes
export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/recipes`);
  return handleResponse<Recipe[]>(response);
}

// GET /recipes/:id
export async function getRecipeById(id: string): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes/${id}`);
  return handleResponse<Recipe>(response);
}

// POST /recipes
export async function createRecipe(recipe: Recipe): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  return handleResponse<Recipe>(response);
}

// Benutzerverwaltung
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    return handleResponse<User[]>(response);
  } catch (error) {
    console.error('Fehler beim Laden der Benutzer:', error);
    // Fallback für Entwicklung - in einer Produktionsumgebung entfernen
    const dbResponse = await fetch('/db.json');
    if (dbResponse.ok) {
      const data = await dbResponse.json();
      return data.users;
    }
    throw new Error('Fehler beim Laden der Benutzer');
  }
};

export const getUserById = async (userId: string): Promise<User | undefined> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  return handleResponse<User>(response);
};

// Favoriten
export const getFavoriteRecipes = async (userId: string): Promise<Recipe[]> => {
  try {
    // Optimal würde der Server vorbereitete Favoriten liefern
    const user = await getUserById(userId);
    if (!user || !user.favorites || user.favorites.length === 0) {
      return [];
    }
    
    const recipes = await getRecipes();
    return recipes.filter(recipe => user.favorites.includes(recipe.id));
  } catch (error) {
    console.error('Fehler beim Laden der Favoriten:', error);
    throw new Error('Favoriten konnten nicht geladen werden');
  }
};

export const toggleFavorite = async (userId: string, recipeId: string): Promise<void> => {
  try {
    const user = await getUserById(userId);
    if (!user) throw new Error('Benutzer nicht gefunden');
    
    const isFavorite = user.favorites.includes(recipeId);
    const updatedFavorites = isFavorite
      ? user.favorites.filter(id => id !== recipeId) // Entfernen
      : [...user.favorites, recipeId]; // Hinzufügen
    
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorites: updatedFavorites }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Fehler beim Ändern der Favoriten:', error);
    throw new Error('Favorit konnte nicht geändert werden');
  }
};
