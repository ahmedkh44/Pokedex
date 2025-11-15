import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokemonApi';
import PokemonGrid from '../components/Pokemon/PokemonGrid';
import PokemonCard from '../components/Pokemon/PokemonCard';
import SkeletonCard from '../components/Pokemon/SkeletonCard';
import type { Pokemon } from '../types';
import { extractIdFromUrl } from '../components/utils/helpers';
import Pagination from '../components/ui/Pagination';

interface PaginationViewProps {
  onSelectPokemon: (id: number) => void;
}

const PaginationView: React.FC<PaginationViewProps> = ({ onSelectPokemon }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 20;

  const fetchData = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const data = await fetchPokemonList(itemsPerPage, offset);
      const pokemonWithIds = data.results.map((p) => ({
        ...p,
        id: extractIdFromUrl(p.url),
      }));
      setPokemon(pokemonWithIds);
      setTotalCount(data.count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>
        <button onClick={() => fetchData(page)}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <PokemonGrid>
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </PokemonGrid>
      ) : (
        <>
          <PokemonGrid>
            {pokemon.map((p) => (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onClick={() => onSelectPokemon(p.id)}
              />
            ))}
          </PokemonGrid>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default PaginationView;