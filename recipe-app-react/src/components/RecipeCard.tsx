// src/components/RecipeCard.tsx
import { Link } from 'react-router-dom';
import { Recipe } from '../types/Recipe'; // Stelle sicher, dass du den richtigen Typ importierst

interface Props {
  recipe: Recipe; // Setze den richtigen Typ hier ein
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={recipe.image || 'https://via.placeholder.com/400x250?text=Kein+Bild'}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
      <Link to={`/recipes/${recipe.id}`} className="text-blue-500 text-sm mt-2 inline-block">
        Mehr erfahren
      </Link>
    </div>
  );
};

export default RecipeCard;
