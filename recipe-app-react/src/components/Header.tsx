// src/components/Header.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Rezepte', path: '/recipes' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Rezept erstellen', path: '/create-recipe' },
  ]

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Branding */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-green-600">
              MyRecipes
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              className="p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-inner">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
