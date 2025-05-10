import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Recipe } from '../types/Recipe';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Beispiel-Daten (später durch API ersetzen)
    setRecipes([
      {
        id: '1',
        title: 'Spaghetti Bolognese',
        description: 'Ein klassisches italienisches Rezept.',
        ingredients: ['Spaghetti', 'Hackfleisch', 'Tomatensauce'],
        steps: ['Kochen', 'Braten', 'Servieren'],
        image: 'https://via.placeholder.com/400x300'
      }
    ]);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Home;
