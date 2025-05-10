// src/components/Layout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <>
      {/* fixed-Header */}
      <Header />

      {/* Content-Bereich, pt-16 wegen Header-Höhe */}
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  )
}
