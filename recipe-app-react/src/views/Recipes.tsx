// src/pages/Home.tsx (oder die Datei, die die Karten rendert)
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/Recipe'; // Stelle sicher, dass der Typ hier importiert wird
import { getRecipes } from '../api/dataApi';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Verwende den korrekten Typ hier
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data); // Sicherstellen, dass 'data' den Typ 'Recipe[]' hat
      } catch (err) {
        setError('Fehler beim Laden der Rezepte');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />  // `recipe` sollte den richtigen Typ haben
      ))}
    </div>
  );
};

export default Home;
