'use client';

import { FormEvent, useState } from 'react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useContent } from '@/context/ContentContext';
import styles from './page.module.css';

export default function FormacionPage() {
  const { content } = useContent();
  const [sent, setSent] = useState(false);
  const f = content.formation;

  function submit(e: FormEvent) { e.preventDefault(); setSent(true); }

  return (
    <main id="main">
      <PageHero eyebrow={f.eyebrow} title={f.title} lead={f.lead} cta="Consultar próxima formación" />
      <section className="section">
        <div className={`container ${styles.split}`}>
          <div>
            <span className="eyebrow">Modalidad</span>
            <h2>Aprender, conversar, probar y volver al trabajo con herramientas concretas.</h2>
          </div>
          <div className={styles.list}>{f.modalities.map((item,i)=><div key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div>
        </div>
      </section>

      <section className={styles.topicsSection}>
        <div className="container">
          <div className={styles.topicsHead}><span className="eyebrow">Temáticas</span><p>Los contenidos pueden combinarse y adaptarse según la realidad, los equipos y los objetivos de cada organización.</p></div>
          <div className={styles.topicGrid}>{f.topics.map((topic,i)=><div key={topic}><small>0{i+1}</small><h3>{topic}</h3></div>)}</div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.formBlock}`}>
          <div className={styles.formCopy}>
            <span className="eyebrow">Capacitación a medida</span>
            <h2>Diseñemos una formación que responda a un problema real.</h2>
            <p>Contanos qué necesita tu equipo. Esta versión demo deja preparado el flujo para conectar luego con email, CRM o la herramienta que definan.</p>
          </div>
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.row}><label>Nombre<input required placeholder="Tu nombre" /></label><label>Apellido<input placeholder="Tu apellido" /></label></div>
            <label>Email<input type="email" required placeholder="nombre@organizacion.com" /></label>
            <div className={styles.row}><label>Teléfono<input placeholder="+54 ..." /></label><label>Organización<input placeholder="Nombre de la organización" /></label></div>
            <label>¿Qué necesitan trabajar?<textarea required rows={5} placeholder="Contanos brevemente el desafío o la temática..." /></label>
            <button className="button buttonPrimary" type="submit">Enviar consulta</button>
            {sent && <p className={styles.success}>Demo: formulario enviado correctamente. En producción se conectará al canal definido.</p>}
          </form>
        </div>
      </section>
      <CTASection title="También podemos diseñar una capacitación completamente a medida." />
    </main>
  );
}
