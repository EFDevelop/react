// src/views/Favoriten.tsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Favoriten() {
  // Dummy-Daten für Favoriten (diese könnten aus einer API oder einem globalen State kommen)
  const favorites = [
    { id: 1, title: 'Pasta Carbonara', description: 'Ein klassisches italienisches Rezept' },
    { id: 2, title: 'Tomaten-Basilikum-Suppe', description: 'Frische Tomaten und Basilikum' },
    { id: 3, title: 'Schokoladenkuchen', description: 'Ein saftiger, dunkler Kuchen' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Favoriten</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">{recipe.title}</h3>
            <p className="text-gray-500">{recipe.description}</p>
            <Link
              to={`/recipe/${recipe.id}`}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Rezept ansehen
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
