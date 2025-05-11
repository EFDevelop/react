import { Link } from 'react-router-dom';
import { Recipe } from '../types/Recipe';
import { useAuth } from '../context/AuthContext';
import { toggleFavorite } from '../api/dataApi';
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onFavoriteToggle }) => {
  const { currentUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    currentUser?.favorites?.includes(recipe.id) || false
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Verhindert Navigation beim Klick auf das Herz
    
    if (!currentUser || isUpdating) return;
    
    setIsUpdating(true);
    try {
      await toggleFavorite(currentUser.id, recipe.id);
      setIsFavorite(!isFavorite);
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (error) {
      console.error('Fehler beim Ändern der Favoriten:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img
          src={recipe.image || 'https://via.placeholder.com/400x250?text=Kein+Bild'}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        {currentUser && (
          <button
            onClick={handleFavoriteClick}
            disabled={isUpdating}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100"
          >
            <Heart
              size={20}
              className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
            />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-semibold">{recipe.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">{recipe.time} Min.</span>
          <Link
            to={`/recipe/${recipe.id}`}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Mehr erfahren
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;