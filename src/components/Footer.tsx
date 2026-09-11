'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  const { content } = useContent();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo />
          <p>Gestión, comunicación, calidad y seguridad para organizaciones y profesionales de la salud.</p>
        </div>
        <div>
          <h4>Explorar</h4>
          <Link href="/pulso-reflejo">Pulso Reflejo</Link>
          <Link href="/training-lab">Training Lab</Link>
          <Link href="/formacion">Formación</Link>
          <Link href="/autotest">Autotest</Link>
        </div>
        <div>
          <h4>Contacto</h4>
          <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
          <a href={`tel:${content.contact.phone.replace(/\s/g,'')}`}>{content.contact.phone}</a>
          <span>{content.contact.location}</span>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} Reflejo Consultora</span>
        <span>Demo de rediseño integral · Next.js</span>
      </div>
    </footer>
  );
}
