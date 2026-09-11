'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { useContent } from '@/context/ContentContext';
import ArrowIcon from '@/components/ArrowIcon';
import styles from './page.module.css';

type Choice = 0 | 1 | 2;

export default function AutotestPage() {
  const { content } = useContent();
  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const [showResult, setShowResult] = useState(false);
  const questions = content.autotest.questions;
  const answered = Object.keys(answers).length;
  const max = questions.length * 2;
  const score = useMemo(() => Object.values(answers).reduce<number>((acc, n) => acc + n, 0), [answers]);
  const percent = max ? Math.round((score / max) * 100) : 0;

  const result = percent >= 75
    ? { label: 'Base sólida', text: 'Hay prácticas instaladas y una buena base para trabajar sobre brechas específicas, consolidar indicadores y sostener la mejora en el tiempo.' }
    : percent >= 45
      ? { label: 'Oportunidades claras', text: 'La organización ya cuenta con algunas prácticas, pero todavía hay oportunidades relevantes para ordenar procesos, comunicación y seguimiento.' }
      : { label: 'Buen momento para diagnosticar', text: 'El resultado sugiere que conviene construir primero una lectura integral de la situación para priorizar mejoras y reducir esfuerzos dispersos.' };

  function choose(id: string, value: Choice) {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setShowResult(false);
  }

  function reset() {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main id="main">
      <PageHero eyebrow={content.autotest.eyebrow} title={content.autotest.title} lead={content.autotest.intro} cta="Empezar ahora" href="#test" />

      <section className="section" id="test">
        <div className={`container ${styles.testLayout}`}>
          <aside className={styles.progressCard}>
            <span className="eyebrow">Tu progreso</span>
            <div className={styles.progressNumber}><strong>{answered}</strong><span>/ {questions.length}</span></div>
            <div className={styles.track}><i style={{ width: `${questions.length ? (answered / questions.length) * 100 : 0}%` }} /></div>
            <p>Las respuestas quedan únicamente en este navegador durante la demo.</p>
            <div className={styles.legend}><span><i className={styles.yes}/>Sí</span><span><i className={styles.partial}/>En parte</span><span><i className={styles.no}/>No</span></div>
          </aside>

          <div className={styles.questions}>
            {questions.map((q, index) => (
              <article key={q.id} className={styles.question}>
                <div className={styles.questionMeta}><span>{String(index + 1).padStart(2, '0')}</span><small>{q.category}</small></div>
                <h2>{q.text}</h2>
                <div className={styles.options} role="radiogroup" aria-label={`Respuesta a pregunta ${index + 1}`}>
                  {([['Sí', 2], ['En parte', 1], ['No', 0]] as [string, Choice][]).map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={answers[q.id] === value}
                      className={answers[q.id] === value ? styles.selected : ''}
                      onClick={() => choose(q.id, value)}
                    >
                      <i />{label}
                    </button>
                  ))}
                </div>
              </article>
            ))}

            <div className={styles.finish}>
              <div><strong>{answered === questions.length ? 'Listo para ver tu resultado' : `Faltan ${questions.length - answered} respuestas`}</strong><span>El resultado es orientativo y no reemplaza un diagnóstico profesional.</span></div>
              <button className="button buttonPrimary" type="button" disabled={answered !== questions.length} onClick={() => setShowResult(true)}>Ver resultado <ArrowIcon /></button>
            </div>

            {showResult && (
              <section className={styles.result} aria-live="polite">
                <div className={styles.resultScore}><strong>{percent}</strong><span>/ 100</span></div>
                <div>
                  <span className="eyebrow">Lectura orientativa</span>
                  <h2>{result.label}</h2>
                  <p>{result.text}</p>
                  <div className={styles.resultActions}>
                    <Link className="button buttonPrimary" href="/pulso-reflejo">Conocer Pulso Reflejo <ArrowIcon /></Link>
                    <button className="button buttonSecondary" type="button" onClick={reset}>Volver a empezar</button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
