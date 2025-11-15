import React from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import styles from './InfiniteScroll.module.css';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  const loadMoreRef = useInfiniteScroll({ onLoadMore, hasMore, isLoading });

  return (
    <div ref={loadMoreRef} className={styles.trigger}>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading more Pokémon...</p>
        </div>
      )}
      {!hasMore && !isLoading && (
        <p className={styles.end}>
          You've seen all {window.scrollY > 0 ? 'available' : ''} Pokémon!
        </p>
      )}
    </div>
  );
};

export default InfiniteScroll;