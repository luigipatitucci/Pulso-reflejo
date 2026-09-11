import Link from 'next/link';
import type { Service } from '@/lib/content';
import ArrowIcon from './ArrowIcon';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={service.href} className={styles.card}>
      <div className={styles.top}>
        <span className={styles.number}>0{index + 1}</span>
        <span className={styles.kicker}>{service.kicker}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className={styles.forWhom}>{service.forWhom}</div>
      <span className={styles.link}>Conocer propuesta <ArrowIcon /></span>
    </Link>
  );
}
