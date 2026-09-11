import styles from './Logo.module.css';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={styles.logo} aria-label="Reflejo Consultora">
      <span className={styles.mark} aria-hidden="true">
        <i className={styles.left} />
        <i className={styles.right} />
      </span>
      {!compact && (
        <span className={styles.wordmark}>
          <strong>reflejo</strong>
          <small>consultora</small>
        </span>
      )}
    </div>
  );
}
