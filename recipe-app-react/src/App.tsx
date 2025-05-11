// src/App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './views/Login'
import Recipes from './views/Recipes'
import RecipeDetail from './views/RecipeDetail'
import FavoritesPage from './views/FavoritesPage';

import Dashboard from './views/Dashboard';
import CreateRecipe from './views/CreateRecipe';
import { LogIn } from 'lucide-react'
import Login from './views/Login';
function App() {
  return (
    <Routes>
      {/* Alle Routen innerhalb des gleichen Layouts */}
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        {/* z.B. 404-Route */}
        <Route path="*" element={<div>Seite nicht gefunden</div>} />
      </Route>
    </Routes>
  )
}

export default App
