'use client';

import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useContent } from '@/context/ContentContext';
import styles from './page.module.css';

export default function PulsoPage() {
  const { content } = useContent();
  const p = content.pulso;
  return (
    <main id="main">
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={`${p.subtitle} ${p.lead}`} cta="Solicitar diagnóstico" />

      <section className="sectionTight">
        <div className={`container ${styles.questions}`}>
          <div><span>¿Querés saber cuán cerca estás de cumplir con estándares de calidad?</span></div>
          <div><span>¿Sentís que es momento de dar un salto pero no sabés por dónde empezar?</span></div>
          <div><span>¿Necesitás una mirada externa antes de priorizar inversiones?</span></div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.benefitGrid}`}>
          <div className={styles.benefitIntro}><span className="eyebrow">Qué te llevás</span><h2>Un diagnóstico que termina en decisiones.</h2><p>El objetivo no es señalar responsables ni entregar una receta estándar: es construir una lectura útil para la conducción.</p></div>
          <div className={styles.benefits}>{p.benefits.map((item,i)=><div key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.processHead}><span className="eyebrow">Cómo se realiza</span><h2>Un proceso simple, concreto y acompañado.</h2><p>Desde la primera conversación hasta la devolución final, el equipo de conducción mantiene visibilidad sobre cada etapa.</p></div>
          <div className={styles.process}>{p.steps.map((step,i)=><article key={step}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{['Conversar','Relevar','Analizar','Documentar','Priorizar'][i] ?? 'Etapa'}</h3><p>{step}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.forWhom}`}>
          <div><span className="eyebrow">¿Para quiénes?</span><h2>Organizaciones de salud que necesitan una foto clara de su situación actual.</h2></div>
          <div className={styles.audienceList}>{p.audiences.map(item=><div key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section className={`container ${styles.notAudit}`}>
        <div><span className="eyebrow">Qué no es</span><h2>Pulso Reflejo no es una auditoría sancionatoria.</h2></div>
        <p>No busca señalar responsables individuales ni aplicar soluciones estandarizadas. Parte del respeto por los equipos, reconoce los esfuerzos existentes y propone mejoras posibles según el contexto.</p>
      </section>
      <CTASection title="Conocer la situación actual es el primer paso para mejorar con criterio." />
    </main>
  );
}
