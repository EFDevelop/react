import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '../types/Recipe';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Simuliere API-Aufruf (später durch echten Replace ersetzen)
    const fetchRecipe = async () => {
      const exampleData: Recipe[] = [
        {
          id: '1',
          title: 'Spaghetti Bolognese',
          description: 'Ein klassisches italienisches Rezept mit Tomaten und Hackfleisch.',
          ingredients: ['400g Spaghetti', '250g Rinderhack', '1 Dose Tomaten', '1 Zwiebel', 'Knoblauch', 'Salz', 'Pfeffer'],
          steps: [
            'Zwiebel und Knoblauch fein hacken.',
            'Hackfleisch anbraten, dann Zwiebel/Knoblauch dazugeben.',
            'Tomaten hinzufügen und 15 Minuten köcheln lassen.',
            'Mit Salz und Pfeffer abschmecken.',
            'Spaghetti kochen und mit der Soße servieren.'
          ],
          image: 'https://via.placeholder.com/600x400'
        }
      ];

      const found = exampleData.find(r => r.id === id);
      setRecipe(found ?? null);
    };

    fetchRecipe();
  }, [id]);

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
