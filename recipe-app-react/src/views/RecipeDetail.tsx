import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '../types/Recipe'; // Stelle sicher, dass deine `Recipe`-Typdefinition korrekt ist

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Für Ladeanzeige

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Ersetze diesen Code später mit einem echten API-Aufruf
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Rezept nicht gefunden');
        }

        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Fehler beim Laden des Rezepts:', error);
        setRecipe(null); // Rezept auf null setzen bei Fehler
      } finally {
        setLoading(false); // Ladezustand zurücksetzen
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Lade Rezept...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Rezept nicht gefunden.</p>
        <Link to="/" className="text-blue-500 mt-4 inline-block">Zurück zur Startseite</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-500 text-sm mb-4 inline-block">&larr; Zurück</Link>

      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">{recipe.description}</p>

      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Zutaten</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Zubereitung</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-800">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
