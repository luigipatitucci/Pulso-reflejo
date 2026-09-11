'use client';

import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useContent } from '@/context/ContentContext';
import styles from './page.module.css';

export default function QuienesSomosPage() {
  const { content } = useContent();
  return (
    <main id="main">
      <PageHero eyebrow={content.about.eyebrow} title={content.about.title} lead={content.about.body} cta="Escribinos" />

      <section className="sectionTight">
        <div className={`container ${styles.statement}`}>
          <span>Una consultora especializada en salud</span>
          <p>{content.about.body2}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.header}>
            <span className="eyebrow">Equipo</span>
            <h2 className="sectionTitle">Dos recorridos que se complementan.</h2>
            <p className="lead">Gestión y comunicación se cruzan en cada decisión organizacional. Reflejo integra ambas miradas para abordar problemas complejos sin perder de vista a las personas.</p>
          </div>
          <div className={styles.teamGrid}>
            {content.team.map((member, index) => (
              <article className={styles.member} key={member.id}>
                <div className={`${styles.portrait} ${index % 2 ? styles.portraitAlt : ''}`}>
                  <span>{member.initials}</span>
                  <small>{index === 0 ? 'GESTIÓN' : 'COMUNICACIÓN'}</small>
                </div>
                <div className={styles.memberBody}>
                  <div className={styles.index}>0{index + 1}</div>
                  <h3>{member.name}</h3>
                  <strong>{member.role}</strong>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <span className="eyebrow">Cómo trabajamos</span>
          <div className={styles.valuesGrid}>
            {[
              ['Experiencia + empatía', 'Conocemos el sector salud y acompañamos desde una mirada técnica, cercana y humana.'],
              ['Evidencia + contexto', 'Usamos marcos de calidad sin perder de vista la realidad específica de cada organización.'],
              ['Claridad + acción', 'Traducimos problemas complejos en decisiones, prioridades y próximos pasos posibles.'],
            ].map(([title, body], i) => (
              <div key={title} className={styles.value}>
                <span>0{i + 1}</span><h3>{title}</h3><p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Las mejores mejoras se construyen con quienes conocen la organización desde adentro." />
    </main>
  );
}
