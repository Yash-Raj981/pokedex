import React, { useEffect, useRef, useState } from 'react';
import { fetchPokemonBatch } from '../services/pokemonService.js';
import PokemonCard from './PokemonCard.jsx';

const TOTAL = 1025; // or 1025 or 1281 depending on your requirement
const BATCH = 50; // How many Pokémon to fetch per batch

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [cursor, setCursor] = useState(1);

  const isFetchingRef = useRef(false); // prevents race conditions

  // ======================================================
  // 1. Load Initial Batch
  // ======================================================
  useEffect(() => {
    let cancelled = false;

    const loadInitial = async () => {
      try {
        setLoadingInitial(true);

        const batch = await fetchPokemonBatch(1, BATCH);
        if (!cancelled) {
          setPokemons(batch);
          setCursor(BATCH + 1);
        }
      } catch {
        if (!cancelled) setError('Failed to load Pokémon.');
      } finally {
        if (!cancelled) setLoadingInitial(false);
      }
    };

    loadInitial();
    return () => {
      cancelled = true;
    };
  }, []);

  // ======================================================
  // 2. Infinite Scroll Loader with Race Condition Fix
  // ======================================================
  useEffect(() => {
    const handleScroll = () => {
      if (isFetchingRef.current) return; // hard lock during fetch
      if (cursor > TOTAL) return; // nothing left to load

      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (!bottom) return;

      isFetchingRef.current = true;
      setLoadingMore(true);

      setCursor((prevCursor) => {
        const start = prevCursor;
        const end = Math.min(prevCursor + BATCH - 1, TOTAL);

        fetchPokemonBatch(start, end)
          .then((batch) => {
            // DEDUPLICATION
            setPokemons((prev) => {
              const merged = [...prev, ...batch];

              const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values());

              return unique;
            });
          })
          .finally(() => {
            isFetchingRef.current = false;
            setLoadingMore(false);
          });

        return end + 1;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cursor]);

  // ======================================================
  // 3. Loading States
  // ======================================================
  if (loadingInitial) {
    return (
      <div className='d-flex justify-content-center mt-5'>
        <div className='spinner-border' role='status' aria-hidden='true' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-danger text-center mt-4' role='alert'>
        {error}
      </div>
    );
  }

  // ======================================================
  // 4. UI
  // ======================================================
  return (
    <>
      <div className='d-flex flex-wrap justify-content-center gap-3 w-100'>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              flex: '1 0 200px',
              maxWidth: '260px',
            }}>
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      {loadingMore && (
        <div className='d-flex justify-content-center mt-4 mb-5'>
          <div className='spinner-border' role='status'></div>
        </div>
      )}
    </>
  );
}

export default Pokedex;
