import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisible = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.info}>
        Page {currentPage} of {totalPages} (Total: {totalPages * 20} Pokémon)
      </div>
      <div className={styles.controls}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.navButton}
        >
          ← Previous
        </button>
        
        {startPage > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className={styles.pageButton}>
              1
            </button>
            {startPage > 2 && <span className={styles.ellipsis}>...</span>}
          </>
        )}

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`${styles.pageButton} ${
              currentPage === num ? styles.active : ''
            }`}
          >
            {num}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className={styles.pageButton}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.navButton}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;