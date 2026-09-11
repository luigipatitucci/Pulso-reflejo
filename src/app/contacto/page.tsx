'use client';

import { FormEvent, useState } from 'react';
import { useContent } from '@/context/ContentContext';
import styles from './page.module.css';

export default function ContactoPage() {
  const { content } = useContent();
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) { e.preventDefault(); setSent(true); }

  return (
    <main id="main" className={styles.main}>
      <section className="container">
        <div className={styles.head}>
          <span className="eyebrow">Contacto</span>
          <h1>Conectá con Reflejo.</h1>
          <p>Contanos qué está pasando hoy y qué te gustaría mejorar. Con esa primera información podemos orientar la conversación y pensar el mejor próximo paso.</p>
        </div>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.row}>
              <label>Nombre<input required placeholder="Tu nombre" /></label>
              <label>Apellido<input placeholder="Tu apellido" /></label>
            </div>
            <label>Email<input type="email" required placeholder="nombre@organizacion.com" /></label>
            <fieldset>
              <legend>¿Para quién es el servicio?</legend>
              <label className={styles.radio}><input type="radio" name="audience" value="personal" defaultChecked />Para mí</label>
              <label className={styles.radio}><input type="radio" name="audience" value="organization" />Para mi organización / equipo</label>
            </fieldset>
            <label>¿En qué podemos ayudarte?<textarea rows={6} required placeholder="Podés contarnos el desafío, el tamaño del equipo o la necesidad que detectaron..." /></label>
            <button className="button buttonPrimary" type="submit">Enviar consulta</button>
            {sent && <div className={styles.success}><strong>¡Gracias!</strong> Esta es una demo: el formulario quedó listo para conectar al canal que definan en producción.</div>}
          </form>

          <aside className={styles.aside}>
            <div className={styles.asideVisual} aria-hidden="true"><span>R</span><i/><b/></div>
            <div className={styles.contactData}>
              <div><small>Email</small><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></div>
              <div><small>WhatsApp</small><a href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noreferrer">{content.contact.phone}</a></div>
              <div><small>Ubicación</small><span>{content.contact.location}</span></div>
              <div><small>Agenda</small><span>{content.contact.availability}</span></div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
