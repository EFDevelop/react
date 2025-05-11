// src/components/Favorites.tsx
import React from 'react';
import { Recipe } from '../types/Recipe';
import RecipeCard from './RecipeCard';

type FavoritesProps = {
  recipes: Recipe[];
};

const Favorites: React.FC<FavoritesProps> = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <p>Keine Favoriten gefunden.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Favorites;
