// src/App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './views/Home'
import Recipes from './views/Recipes'
import RecipeDetail from './views/RecipeDetail'

function App() {
  return (
    <Routes>
      {/* Alle Routen innerhalb des gleichen Layouts */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        {/* z.B. 404-Route */}
        <Route path="*" element={<div>Seite nicht gefunden</div>} />
      </Route>
    </Routes>
  )
}

export default App
