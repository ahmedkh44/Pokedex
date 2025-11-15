import React, { useState, useEffect } from 'react';
import { fetchPokemonDetail } from '../services/pokemonApi';

import styles from './DetailView.module.css';
import type { PokemonDetail } from '../types';
import { getTypeColor } from '../contants/typeColors';
import { formatHeight, formatPokemonNumber, formatStatName, formatWeight } from '../components/utils/helpers';

interface DetailViewProps {
  pokemonId: number;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ pokemonId, onBack }) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonDetail(pokemonId);
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pokemonId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className={styles.error}>
        <p>{error || 'Pokémon not found'}</p>
        <button onClick={onBack} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  const primaryType = pokemon.types[0].type.name;
  const typeColor = getTypeColor(primaryType);

  return (
    <div className={styles.container}>
      <button onClick={onBack} className={styles.backButton}>
        ← Back to List
      </button>

      <div className={styles.card}>
        <div
          className={styles.header}
          style={{
            background: `linear-gradient(135deg, ${typeColor} 0%, ${typeColor}dd 100%)`,
          }}
        >
          <h1 className={styles.name}>
            <span className={styles.icon}>⚡</span> {pokemon.name}
          </h1>
          <p className={styles.number}>{formatPokemonNumber(pokemon.id)}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className={styles.image}
              />
            </div>
            <div className={styles.types}>
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={styles.typeBadge}
                  style={{ backgroundColor: getTypeColor(t.type.name) }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
            <div className={styles.measurements}>
              <div className={styles.measurement}>
                <span className={styles.measurementIcon}>📏</span>
                <div>
                  <div className={styles.measurementLabel}>Height</div>
                  <div className={styles.measurementValue}>
                    {formatHeight(pokemon.height)}
                  </div>
                </div>
              </div>
              <div className={styles.measurement}>
                <span className={styles.measurementIcon}>⚖️</span>
                <div>
                  <div className={styles.measurementLabel}>Weight</div>
                  <div className={styles.measurementValue}>
                    {formatWeight(pokemon.weight)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.statsSection}>
            <h2 className={styles.sectionTitle}>Base Stats</h2>
            <div className={styles.stats}>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className={styles.stat}>
                  <div className={styles.statName}>
                    {formatStatName(stat.stat.name)}
                  </div>
                  <div className={styles.statValue}>{stat.base_stat}</div>
                  <div className={styles.statBar}>
                    <div
                      className={styles.statBarFill}
                      style={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                        backgroundColor: typeColor,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className={styles.sectionTitle}>Abilities</h2>
            <div className={styles.abilities}>
              {pokemon.abilities.map((ability) => (
                <div key={ability.ability.name} className={styles.ability}>
                  <span className={styles.abilityName}>
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                  {ability.is_hidden && (
                    <span className={styles.hiddenBadge}>(Hidden)</span>
                  )}
                </div>
              ))}
            </div>

            <h2 className={styles.sectionTitle}>Base Experience</h2>
            <div className={styles.experience}>
              <span className={styles.experienceValue}>
                {pokemon.base_experience} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;