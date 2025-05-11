import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../api/dataApi';
import { Recipe } from '../types/Recipe';
import { v4 as uuidv4 } from 'uuid'; // Importiere UUID

export default function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState(''); // comma-separated
  const [instructions, setInstructions] = useState(''); // comma-separated
  const [time, setTime] = useState(0);
  const [image, setImage] = useState(''); // Für das Bild
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generiere eine neue ID für das Rezept
    const id = uuidv4(); 

    const newRecipe: Recipe = {
      id, // Die generierte ID
      title,
      description,
      category,
      ingredients: ingredients.split(',').map(s => s.trim()),
      steps: instructions.split(',').map(s => s.trim()),
      time,
      image, // Das Bild wird hier verwendet
      rating: 0,
      nutrition: { calories: 0, protein: 0, fat: 0 }
    };

    try {
      await createRecipe(newRecipe); // Rezept erstellen
      navigate('/recipes'); // Weiterleitung zur Rezeptübersicht
    } catch (err) {
      console.error(err);
      alert('Fehler beim Erstellen des Rezepts');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <h1 className="text-3xl font-bold mb-6">Rezept erstellen</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titel */}
        <div>
          <label className="block text-sm font-medium">Titel</label>
          <input
            type="text" required
            value={title} onChange={e => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>
        {/* Beschreibung */}
        <div>
          <label className="block text-sm font-medium">Beschreibung</label>
          <textarea
            required value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>
        {/* Kategorie */}
        <div>
          <label className="block text-sm font-medium">Kategorie</label>
          <input
            type="text" required
            value={category} onChange={e => setCategory(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>
        {/* Zutaten */}
        <div>
          <label className="block text-sm font-medium">
            Zutaten (Komma-getrennt)
          </label>
          <input
            type="text" required
            value={ingredients} onChange={e => setIngredients(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>
        {/* Anweisungen */}
        <div>
          <label className="block text-sm font-medium">
            Anweisungen (Komma-getrennt)
          </label>
          <input
            type="text" required
            value={instructions} onChange={e => setInstructions(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>
        {/* Zeit */}
        <div>
          <label className="block text-sm font-medium">Zubereitungszeit (Min.)</label>
          <input
            type="number" required
            value={time} onChange={e => setTime(Number(e.target.value))}
            className="mt-1 block w-32 border rounded-md px-3 py-2"
          />
        </div>
        {/* Bild */}
        <div>
          <label className="block text-sm font-medium">Bild-URL</label>
          <input
            type="text" required
            value={image} onChange={e => setImage(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Erstellen
        </button>
      </form>
    </div>
  );
}
