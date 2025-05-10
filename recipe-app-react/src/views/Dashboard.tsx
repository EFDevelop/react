// src/views/Dashboard.tsx
import React from 'react'

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stat card example */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700">Rezepte</h3>
          <p className="text-gray-500">5</p>
        </div>

        {/* Stat card example */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700">Favoriten</h3>
          <p className="text-gray-500">3</p>
        </div>

        {/* Stat card example */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700">Nutzer</h3>
          <p className="text-gray-500">150</p>
        </div>
      </div>

      {/* Weitere Inhalte oder Statistiken können hier hinzugefügt werden */}
    </div>
  )
}
