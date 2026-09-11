'use client';

import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import ArrowIcon from './ArrowIcon';
import styles from './CTASection.module.css';

export default function CTASection({ title = 'Cada mejora empieza por entender qué está pasando hoy.', text = 'Conversemos sobre tu organización, tu equipo o el desafío que querés abordar.' }: { title?: string; text?: string }) {
  const { content } = useContent();
  return (
    <section className={`container ${styles.cta}`}>
      <div>
        <span className="eyebrow">Próximo paso</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className={styles.actions}>
        <Link className="button buttonPrimary" href="/contacto">Escribinos <ArrowIcon /></Link>
        <a className="button buttonSecondary" href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </section>
  );
}
