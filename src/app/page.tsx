'use client';

import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import ArrowIcon from '@/components/ArrowIcon';
import styles from './page.module.css';

export default function Home() {
  const { content } = useContent();

  return (
    <main id="main">
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h1>{content.hero.title} <span>{content.hero.highlight}</span></h1>
            <p>{content.hero.description}</p>
            <div className={styles.heroActions}>
              <Link className="button buttonPrimary" href="/contacto">{content.hero.primaryCta}<ArrowIcon /></Link>
              <a className="button buttonSecondary" href="#servicios">{content.hero.secondaryCta}</a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.visualGrid} />
            <div className={styles.mirrorOrange} />
            <div className={styles.mirrorGreen} />
            <div className={styles.insightCard}>
              <small>METODOLOGÍA REFLEJO</small>
              <strong>Diagnosticar antes de transformar.</strong>
              <div><span>01</span> observar</div>
              <div><span>02</span> priorizar</div>
              <div><span>03</span> implementar</div>
            </div>
            <div className={styles.pulseCard}>
              <div className={styles.pulseLine}><i/><i/><i/><i/><i/><i/></div>
              <span>Pulso organizacional</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valueBar}>
        <div className={`container ${styles.valueGrid}`}>
          {content.valueProps.map((item, index) => <div key={item}><span>0{index + 1}</span>{item}</div>)}
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className="eyebrow">Qué hacemos</span>
              <h2 className="sectionTitle">Del diagnóstico a la acción.</h2>
            </div>
            <p>Propuestas complementarias para organizaciones que quieren mejorar y para personas que lideran esos procesos.</p>
          </div>
          <div className={styles.servicesGrid}>
            {content.services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}
          </div>
        </div>
      </section>

      <section className={styles.methodSection}>
        <div className={`container ${styles.methodGrid}`}>
          <div className={styles.methodSticky}>
            <span className="eyebrow">Nuestra mirada</span>
            <h2>Mejorar no es aplicar recetas. Es entender el contexto.</h2>
            <p>La calidad se vuelve concreta cuando las decisiones, los procesos y la comunicación se alinean con el propósito de la organización.</p>
            <Link href="/quienes-somos" className={styles.textLink}>Conocer a Reflejo <ArrowIcon /></Link>
          </div>
          <div className={styles.steps}>
            {[
              ['01', 'Observar', 'Escuchamos, relevamos información y entendemos cómo funciona hoy la organización.'],
              ['02', 'Interpretar', 'Conectamos datos, prácticas y experiencias para detectar fortalezas, riesgos y oportunidades.'],
              ['03', 'Priorizar', 'Transformamos el diagnóstico en un mapa de decisiones posibles, realistas y ordenadas.'],
              ['04', 'Acompañar', 'Trabajamos con los equipos para convertir las decisiones en mejoras sostenibles.'],
            ].map(([n,t,d]) => (
              <article key={n} className={styles.stepCard}>
                <span>{n}</span><h3>{t}</h3><p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.autotestPreview}`}>
          <div>
            <span className="eyebrow">Herramienta abierta</span>
            <h2>¿Cómo está hoy la calidad en tu organización?</h2>
            <p>El Autotest de Reflejo transforma preguntas clave en una primera lectura orientativa. Es breve, confidencial y te ayuda a identificar por dónde empezar.</p>
            <Link href="/autotest" className="button buttonPrimary">Hacer el autotest <ArrowIcon /></Link>
          </div>
          <div className={styles.scoreVisual} aria-hidden="true">
            <div className={styles.scoreCircle}><strong>8</strong><span>preguntas</span></div>
            <div className={styles.scoreBars}><i/><i/><i/><i/><i/></div>
            <small>Resultado orientativo + próximos pasos</small>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
