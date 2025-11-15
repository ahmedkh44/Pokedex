import React from 'react';
import styles from './PokemonGrid.module.css';

interface PokemonGridProps {
  children: React.ReactNode;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default PokemonGrid;