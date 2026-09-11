import Link from 'next/link';
import ArrowIcon from './ArrowIcon';
import styles from './PageHero.module.css';

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  cta?: string;
  href?: string;
  aside?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, lead, cta = 'Hablemos', href = '/contacto', aside }: Props) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
          <Link className="button buttonPrimary" href={href}>{cta}<ArrowIcon /></Link>
        </div>
        <div className={styles.aside}>{aside ?? <MirrorGraphic />}</div>
      </div>
    </section>
  );
}

function MirrorGraphic() {
  return (
    <div className={styles.graphic} aria-hidden="true">
      <div className={styles.orbit} />
      <div className={styles.orange} />
      <div className={styles.green} />
      <div className={styles.label}>observar <b>→</b> comprender <b>→</b> mejorar</div>
    </div>
  );
}
