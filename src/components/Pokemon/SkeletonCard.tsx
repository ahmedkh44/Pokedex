import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={`${styles.text} ${styles.title}`}></div>
        <div className={`${styles.text} ${styles.subtitle}`}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;