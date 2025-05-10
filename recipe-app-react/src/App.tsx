import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Recipes from './views/Recipes';
import RecipeDetail from './views/RecipeDetail';
import Home from './views/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
    </Routes>
  );
}


export default App
