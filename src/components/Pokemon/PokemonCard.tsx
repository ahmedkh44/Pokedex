import React, { useState } from 'react';
import styles from './PokemonCard.module.css';
import type { Pokemon } from '../../types';
import { formatPokemonNumber } from '../utils/helpers';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        {!imageLoaded && <div className={styles.skeleton}></div>}
        <img
          className={styles.image}
          src={spriteUrl}
          alt={pokemon.name}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{pokemon.name}</h3>
        <p className={styles.number}>{formatPokemonNumber(pokemon.id)}</p>
      </div>
    </div>
  );
};

export default PokemonCard;