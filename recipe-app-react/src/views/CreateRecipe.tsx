// src/views/CreateRecipe.tsx
import React, { useState } from 'react'

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRecipe({ ...recipe, [name]: value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setRecipe({ ...recipe, image: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Rezept speichern (hier kannst du API-Aufrufe hinzufügen)
    console.log(recipe)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Rezept erstellen</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titel */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Titel
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={recipe.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Zutaten */}
        <div>
          <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700">
            Zutaten
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={4}
            required
            value={recipe.ingredients}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Anweisungen */}
        <div>
          <label htmlFor="instructions" className="block text-lg font-medium text-gray-700">
            Anweisungen
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows={4}
            required
            value={recipe.instructions}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Bild Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">
            Bild hochladen
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Rezept erstellen
          </button>
        </div>
      </form>
    </div>
  )
}
