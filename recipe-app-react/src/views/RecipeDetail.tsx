import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../api/dataApi';
import { Recipe } from '../types/Recipe';
import { useAuth } from '../context/AuthContext';
import { Heart, Clock, ArrowLeft } from 'lucide-react';
import { toggleFavorite } from '../api/dataApi';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        
        // Überprüfen, ob das Rezept ein Favorit ist
        if (currentUser) {
          setIsFavorite(currentUser.favorites.includes(id));
        }
      } catch (error) {
        console.error('Fehler beim Laden des Rezepts:', error);
        setError('Rezept konnte nicht geladen werden');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, currentUser]);

  const handleFavoriteToggle = async () => {
    if (!currentUser || !recipe) return;

    try {
      await toggleFavorite(currentUser.id, recipe.id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Fehler beim Ändern der Favoriten:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center text-gray-600">Lade Rezept...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-500 mb-4">{error || 'Rezept nicht gefunden'}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="text-green-600 hover:text-green-800"
        >
          Zurück
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-green-600 hover:text-green-800"
        >
          <ArrowLeft size={18} className="mr-1" /> Zurück
        </button>
        
        {currentUser && (
          <button 
            onClick={handleFavoriteToggle}
            className="flex items-center px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Heart 
              size={18} 
              className={`mr-1 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
            />
            {isFavorite ? 'Favorit entfernen' : 'Als Favorit speichern'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img 
          src={recipe.image || 'https://via.placeholder.com/800x400?text=Kein+Bild'} 
          alt={recipe.title} 
          className="w-full h-64 object-cover" 
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
              <p className="text-gray-600 mt-1 mb-4">{recipe.description}</p>
            </div>
            
            <div className="flex items-center text-gray-500">
              <Clock size={18} className="mr-1" />
              <span>{recipe.time} Min.</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Zutaten</h2>
            <ul className="bg-gray-50 rounded-md p-4 space-y-2">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Zubereitung</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, idx) => (
                <li key={idx} className="flex">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center mr-3 font-medium text-sm">
                    {idx + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
          
          {recipe.nutrition && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">Nährwerte</h2>
              <div className="flex space-x-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-700">{recipe.nutrition.calories}</p>
                  <p className="text-sm text-gray-500">Kalorien</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-700">{recipe.nutrition.protein}g</p>
                  <p className="text-sm text-gray-500">Protein</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-700">{recipe.nutrition.fat}g</p>
                  <p className="text-sm text-gray-500">Fett</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;