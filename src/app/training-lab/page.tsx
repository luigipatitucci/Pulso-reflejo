'use client';

import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ArrowIcon from '@/components/ArrowIcon';
import { useContent } from '@/context/ContentContext';
import styles from './page.module.css';

export default function TrainingLabPage() {
  const { content } = useContent();
  const t = content.training;
  return (
    <main id="main">
      <PageHero eyebrow={t.eyebrow} title={t.title} lead={t.lead} cta="Quiero conocer Training Lab" />

      <section className="section">
        <div className="container">
          <div className={styles.introRow}>
            <span className="eyebrow">Dos recorridos</span>
            <p>Elegí el punto de entrada según el momento de tu proyecto y tu experiencia en gestión. Ambos combinan práctica, acompañamiento y reflexión aplicada.</p>
          </div>
          <div className={styles.tracks}>
            <article className={styles.track}>
              <div className={styles.trackTop}><span>01</span><small>BASE</small></div>
              <h2>{t.standardTitle}</h2>
              <p>{t.standardDescription}</p>
              <ul>{t.standardFeatures.map(item => <li key={item}><i>✓</i>{item}</li>)}</ul>
              <a className={styles.inlineCta} href="/contacto">Sumarme a Training Lab <ArrowIcon /></a>
            </article>
            <article className={`${styles.track} ${styles.advanced}`}>
              <div className={styles.trackTop}><span>02</span><small>AVANZADO</small></div>
              <h2>{t.advancedTitle}</h2>
              <p>{t.advancedDescription}</p>
              <ul>{t.advancedFeatures.map(item => <li key={item}><i>✓</i>{item}</li>)}</ul>
              <a className={styles.inlineCta} href="/contacto">Potenciar mi proyecto <ArrowIcon /></a>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.labSection}>
        <div className={`container ${styles.labGrid}`}>
          <div>
            <span className="eyebrow">El laboratorio</span>
            <h2>No vamos a hablar sobre transformaciones: vamos a gestarlas.</h2>
          </div>
          <div className={styles.labItems}>
            {[
              ['Mentoría', 'Mirada personalizada sobre decisiones y desafíos concretos.'],
              ['Simulación', 'Ensayo de ideas antes de llevarlas a la práctica.'],
              ['Clínica de proyectos', 'Análisis compartido para enriquecer cada iniciativa.'],
              ['Implementación', 'Seguimiento para que el aprendizaje se transforme en acción.'],
            ].map(([a,b],i) => <div key={a}><span>0{i+1}</span><h3>{a}</h3><p>{b}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.audience}`}>
          <div><span className="eyebrow">¿Para quiénes?</span><h2>Para quienes lideran y necesitan un espacio para pensar mejor antes de actuar.</h2></div>
          <div className={styles.audienceCard}>
            <strong>Profesionales del sector salud</strong>
            <p>Con roles de conducción, coordinación o liderazgo que quieren fortalecer su desempeño y generar mejoras concretas en su organización.</p>
            <div className={styles.tags}><span>Liderazgo</span><span>Gestión</span><span>Proyectos</span><span>Comunicación</span></div>
          </div>
        </div>
      </section>
      <CTASection title="Tu proyecto puede ser el próximo caso de trabajo del laboratorio." />
    </main>
  );
}
