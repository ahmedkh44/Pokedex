import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.icon}>⚡</span> Pokédex
        </h1>
        <p className={styles.subtitle}>
          Discover and explore Pokémon with ease control.
        </p>
      </div>
    </header>
  );
};

export default Header;