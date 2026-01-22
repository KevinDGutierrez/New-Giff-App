
import { useState, useCallback } from 'react';

const API_KEY = 'ryCT6STULMGR8J2WlJ4gV6eeX3KGNhae';

export const useGiphy = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchGifs = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=15`
      );
      if (!response.ok) throw new Error('Error al buscar GIFs');
      const { data } = await response.json();
      setGifs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const getRandomGif = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Pedimos varios aleatorios o usamos trending para llenar el diseño bento/grid inicial
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`
      );
      if (!response.ok) throw new Error('Error al obtener GIFs');
      const { data } = await response.json();
      setGifs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    gifs,
    loading,
    error,
    searchGifs,
    getRandomGif
  };
};
