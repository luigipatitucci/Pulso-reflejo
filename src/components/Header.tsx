'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';
import styles from './Header.module.css';

const nav = [
  ['Inicio', '/'],
  ['Quiénes somos', '/quienes-somos'],
  ['Training Lab', '/training-lab'],
  ['Formación', '/formacion'],
  ['Pulso Reflejo', '/pulso-reflejo'],
  ['Autotest', '/autotest'],
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" onClick={() => setOpen(false)}><Logo /></Link>
        <button className={styles.menuButton} aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <span /><span />
        </button>
        <nav className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Navegación principal">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? styles.active : ''} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link className={styles.contact} href="/contacto" onClick={() => setOpen(false)}>Hablemos</Link>
        </nav>
      </div>
    </header>
  );
}
