import React, { useState, useEffect, useCallback } from 'react';
import PokemonGrid from '../components/Pokemon/PokemonGrid';
import PokemonCard from '../components/Pokemon/PokemonCard';
import SkeletonCard from '../components/Pokemon/SkeletonCard';
import type { Pokemon } from '../types';
import { fetchPokemonList } from '../services/pokemonApi';
import { extractIdFromUrl } from '../components/utils/helpers';
import InfiniteScroll from '../components/ui/InfiniteScroll';

interface InfiniteScrollViewProps {
  onSelectPokemon: (id: number) => void;
}

const InfiniteScrollView: React.FC<InfiniteScrollViewProps> = ({
  onSelectPokemon,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerLoad = 20;

  const fetchData = useCallback(
    async (currentOffset: number, append = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonList(itemsPerLoad, currentOffset);
        const pokemonWithIds = data.results.map((p) => ({
          ...p,
          id: extractIdFromUrl(p.url),
        }));

        if (append) {
          setPokemon((prev) => [...prev, ...pokemonWithIds]);
        } else {
          setPokemon(pokemonWithIds);
        }

        setHasMore(currentOffset + itemsPerLoad < data.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchData(0);
  }, []);

  const handleLoadMore = () => {
    const newOffset = offset + itemsPerLoad;
    setOffset(newOffset);
    fetchData(newOffset, true);
  };

  if (error && pokemon.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>
        <button onClick={() => fetchData(0)}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <PokemonGrid>
        {pokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onClick={() => onSelectPokemon(p.id)}
          />
        ))}
        {loading &&
          Array.from({ length: itemsPerLoad }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </PokemonGrid>

      <InfiniteScroll
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoading={loading}
      />
    </div>
  );
};

export default InfiniteScrollView;