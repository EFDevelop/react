import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './views/Login';
import Recipes from './views/Recipes';
import RecipeDetail from './views/RecipeDetail';
import FavoritesPage from './views/FavoritesPage';
import Dashboard from './views/Dashboard';
import CreateRecipe from './views/CreateRecipe';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
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
          <Route path="*" element={<div className="p-16 text-center">Seite nicht gefunden</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;