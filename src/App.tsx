import React, { useState } from 'react';
import PaginationView from './views/PaginationView';
import InfiniteScrollView from './views/InfiniteScrollView';
import DetailView from './views/DetailView';
import styles from './App.module.css';
import Header from './components/layout/Header';

type View = 'pagination' | 'infinite';

const App: React.FC = () => {
  const [view, setView] = useState<View>('pagination');
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  const handleSelectPokemon = (id: number) => {
    setSelectedPokemonId(id);
  };

  const handleBack = () => {
    setSelectedPokemonId(null);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
    setSelectedPokemonId(null);
  };

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {selectedPokemonId ? (
            <DetailView pokemonId={selectedPokemonId} onBack={handleBack} />
          ) : (
            <>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${
                    view === 'pagination' ? styles.active : ''
                  }`}
                  onClick={() => handleViewChange('pagination')}
                >
                  Pokémon List
                </button>
                <button
                  className={`${styles.tab} ${
                    view === 'infinite' ? styles.active : ''
                  }`}
                  onClick={() => handleViewChange('infinite')}
                >
                  Infinite Scroll
                </button>
              </div>

              {view === 'pagination' ? (
                <PaginationView onSelectPokemon={handleSelectPokemon} />
              ) : (
                <InfiniteScrollView onSelectPokemon={handleSelectPokemon} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;