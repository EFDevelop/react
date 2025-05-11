// src/pages/FavoritesPage.tsx
import React, { useEffect, useState } from 'react';
import { getFavoritesByUserId } from '../api/dataApi';
import Favorites from '../components/Favorites';
import { Recipe } from '../types/Recipe'; // Importiere den Typ für Rezepte

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]); // Typen anpassen
  const [loading, setLoading] = useState<boolean>(true);

  const userId = '2'; // ⛔️ Platzhalter – später dynamisch (z. B. via Auth-Context oder LocalStorage)

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log('Abruf der Favoriten für Benutzer mit ID:', userId); // Log beim Start des Abrufs

      try {
        const data = await getFavoritesByUserId(userId);
        console.log('Erhaltene Favoriten:', data); // Log für die erhaltenen Daten
        setFavorites(data); // Sicherstellen, dass data der richtige Typ ist
      } catch (error) {
        console.error('Fehler beim Abrufen der Favoriten:', error); // Log für Fehler
      } finally {
        console.log('Ladevorgang abgeschlossen.'); // Log wenn der Ladevorgang abgeschlossen ist
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Meine Favoriten</h1>
      {loading ? (
        <p>Lade Favoriten...</p>
      ) : (
        <>
          <p>Favoriten erfolgreich geladen.</p>
          <Favorites recipes={favorites} />
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
