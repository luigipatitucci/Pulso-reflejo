'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { DEMO_ADMIN } from '@/lib/admin';
import type { SiteContent } from '@/lib/content';
import Logo from '@/components/Logo';
import styles from './page.module.css';

type Tab = 'resumen' | 'inicio' | 'servicios' | 'equipo' | 'training' | 'formacion' | 'pulso' | 'autotest' | 'contacto';

const nav: { id: Tab; label: string; hint: string }[] = [
  { id: 'resumen', label: 'Resumen', hint: 'Estado del sitio' },
  { id: 'inicio', label: 'Inicio', hint: 'Hero y propuesta' },
  { id: 'servicios', label: 'Servicios', hint: 'Cards principales' },
  { id: 'equipo', label: 'Equipo', hint: 'Perfiles' },
  { id: 'training', label: 'Training Lab', hint: 'Recorridos' },
  { id: 'formacion', label: 'Formación', hint: 'Modalidades y temas' },
  { id: 'pulso', label: 'Pulso Reflejo', hint: 'Diagnóstico y etapas' },
  { id: 'autotest', label: 'Autotest', hint: 'Preguntas' },
  { id: 'contacto', label: 'Contacto', hint: 'Datos públicos' },
];

export default function AdminPage() {
  const { content, ready, saveContent, resetContent } = useContent();
  const [logged, setLogged] = useState(false);
  const [tab, setTab] = useState<Tab>('resumen');
  const [draft, setDraft] = useState<SiteContent>(content);
  const [status, setStatus] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLogged(window.sessionStorage.getItem('reflejo-admin-demo') === 'ok');
  }, []);

  useEffect(() => {
    if (ready) setDraft(structuredClone(content));
  }, [ready, content]);

  const changed = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content]);

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('username') === DEMO_ADMIN.username && data.get('password') === DEMO_ADMIN.password) {
      window.sessionStorage.setItem('reflejo-admin-demo', 'ok');
      setLogged(true);
      setStatus('');
    } else {
      setStatus('Usuario o contraseña incorrectos.');
    }
  }

  function logout() {
    window.sessionStorage.removeItem('reflejo-admin-demo');
    setLogged(false);
  }

  function save() {
    saveContent(draft);
    setStatus('Cambios guardados. El sitio público ya usa este contenido en este navegador.');
    window.setTimeout(() => setStatus(''), 3500);
  }

  function restore() {
    if (!window.confirm('¿Restaurar el contenido original del demo?')) return;
    resetContent();
    setStatus('Contenido original restaurado.');
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reflejo-contenido.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJson(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setDraft(JSON.parse(String(reader.result)) as SiteContent);
        setStatus('JSON importado al borrador. Revisá y presioná Guardar cambios.');
      } catch {
        setStatus('No se pudo leer el JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  if (!ready) return <div className={styles.loading}>Cargando panel…</div>;

  if (!logged) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginCard}>
          <div className={styles.loginBrand}><Logo /><span>Administrador · Demo</span></div>
          <div className={styles.loginCopy}>
            <span className="eyebrow">Panel de contenidos</span>
            <h1>Acceso administrador</h1>
            <p>Versión de demostración. La autenticación está resuelta en frontend y debe reemplazarse por una solución segura antes de publicar.</p>
          </div>
          <form onSubmit={login} className={styles.loginForm}>
            <label>Usuario<input name="username" autoComplete="username" required /></label>
            <label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label>
            <button className="button buttonPrimary" type="submit">Ingresar</button>
            {status && <p className={styles.error}>{status}</p>}
          </form>
          <Link href="/" className={styles.backLink}>← Volver al sitio</Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.adminPage}>
      <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarBrand}><Logo /><small>ADMIN</small></div>
        <nav>
          {nav.map(item => (
            <button key={item.id} className={tab === item.id ? styles.active : ''} onClick={() => { setTab(item.id); setMenuOpen(false); }}>
              <span>{item.label}</span><small>{item.hint}</small>
            </button>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" target="_blank">Abrir sitio ↗</Link>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <button className={styles.mobileMenu} onClick={() => setMenuOpen(v => !v)}>☰</button>
          <div>
            <small>REFLEJO / CONTENIDO</small>
            <strong>{nav.find(n => n.id === tab)?.label}</strong>
          </div>
          <div className={styles.topActions}>
            {changed && <span className={styles.unsaved}>Cambios sin guardar</span>}
            <button className={styles.saveButton} disabled={!changed} onClick={save}>Guardar cambios</button>
          </div>
        </header>

        {status && <div className={styles.toast}>{status}</div>}

        <div className={styles.contentArea}>
          {tab === 'resumen' && <Overview draft={draft} exportJson={exportJson} importJson={importJson} restore={restore} />}
          {tab === 'inicio' && <HomeEditor draft={draft} setDraft={setDraft} />}
          {tab === 'servicios' && <ServicesEditor draft={draft} setDraft={setDraft} />}
          {tab === 'equipo' && <TeamEditor draft={draft} setDraft={setDraft} />}
          {tab === 'training' && <TrainingEditor draft={draft} setDraft={setDraft} />}
          {tab === 'formacion' && <FormationEditor draft={draft} setDraft={setDraft} />}
          {tab === 'pulso' && <PulsoEditor draft={draft} setDraft={setDraft} />}
          {tab === 'autotest' && <AutotestEditor draft={draft} setDraft={setDraft} />}
          {tab === 'contacto' && <ContactEditor draft={draft} setDraft={setDraft} />}
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, textarea = false, hint }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; hint?: string }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {hint && <small>{hint}</small>}
      {textarea
        ? <textarea value={value} rows={4} onChange={e => onChange(e.target.value)} />
        : <input value={value} onChange={e => onChange(e.target.value)} />}
    </label>
  );
}

function EditorHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className={styles.editorHeader}><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p></div>;
}

function Overview({ draft, exportJson, importJson, restore }: { draft: SiteContent; exportJson: () => void; importJson: (e: ChangeEvent<HTMLInputElement>) => void; restore: () => void }) {
  const counts = [
    ['Servicios', draft.services.length],
    ['Integrantes', draft.team.length],
    ['Preguntas autotest', draft.autotest.questions.length],
    ['Etapas Pulso', draft.pulso.steps.length],
  ];
  return (
    <>
      <EditorHeader eyebrow="Dashboard" title="Contenido del sitio" text="Este panel demuestra qué partes pueden quedar administrables sin depender de un CMS externo. En esta versión los datos viven en localStorage." />
      <div className={styles.statGrid}>{counts.map(([label, value]) => <div key={String(label)}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <div className={styles.overviewGrid}>
        <section className={styles.panel}>
          <div className={styles.panelTitle}><div><small>DEMO TÉCNICA</small><h2>Qué está resuelto</h2></div><span className={styles.badge}>Frontend</span></div>
          <ul className={styles.checkList}>
            <li>Edición de textos y contenidos principales</li>
            <li>Persistencia local inmediata</li>
            <li>Autotest administrable</li>
            <li>Exportación e importación del contenido</li>
            <li>Vista pública conectada al panel</li>
          </ul>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelTitle}><div><small>PRODUCCIÓN</small><h2>Siguiente etapa</h2></div><span className={`${styles.badge} ${styles.badgeOrange}`}>Backend</span></div>
          <ul className={styles.checkList}>
            <li>Autenticación segura y sesiones</li>
            <li>Base de datos o CMS headless</li>
            <li>Roles y permisos si fueran necesarios</li>
            <li>Historial / backups de cambios</li>
            <li>Conexión de formularios y métricas</li>
          </ul>
        </section>
      </div>
      <section className={styles.panel}>
        <div className={styles.panelTitle}><div><small>HERRAMIENTAS</small><h2>Backup del contenido</h2></div></div>
        <p className={styles.panelText}>Podés exportar el contenido actual como JSON, importarlo después o restaurar el contenido inicial de la demo.</p>
        <div className={styles.toolButtons}>
          <button onClick={exportJson}>Exportar JSON</button>
          <label>Importar JSON<input type="file" accept="application/json" onChange={importJson} /></label>
          <button className={styles.dangerGhost} onClick={restore}>Restaurar demo</button>
        </div>
      </section>
    </>
  );
}

function HomeEditor({ draft, setDraft }: EditorProps) {
  const setHero = (key: keyof SiteContent['hero'], value: string) => setDraft(p => ({ ...p, hero: { ...p.hero, [key]: value } }));
  return (
    <>
      <EditorHeader eyebrow="Página" title="Inicio" text="Editá la propuesta principal que ve una persona al entrar al sitio." />
      <section className={styles.panel}>
        <div className={styles.formGrid}>
          <Field label="Eyebrow" value={draft.hero.eyebrow} onChange={v => setHero('eyebrow', v)} />
          <Field label="Título" value={draft.hero.title} onChange={v => setHero('title', v)} />
          <Field label="Texto destacado" value={draft.hero.highlight} onChange={v => setHero('highlight', v)} />
          <Field label="CTA principal" value={draft.hero.primaryCta} onChange={v => setHero('primaryCta', v)} />
          <div className={styles.full}><Field label="Descripción" value={draft.hero.description} textarea onChange={v => setHero('description', v)} /></div>
          <Field label="CTA secundario" value={draft.hero.secondaryCta} onChange={v => setHero('secondaryCta', v)} />
        </div>
      </section>
      <section className={styles.panel}>
        <div className={styles.panelTitle}><div><small>BENEFICIOS</small><h2>Franja de atributos</h2></div></div>
        <div className={styles.formGrid}>{draft.valueProps.map((item, i) => <Field key={i} label={`Atributo ${i + 1}`} value={item} onChange={v => setDraft(p => ({ ...p, valueProps: p.valueProps.map((x, j) => j === i ? v : x) }))} />)}</div>
      </section>
    </>
  );
}

function ServicesEditor({ draft, setDraft }: EditorProps) {
  return (
    <>
      <EditorHeader eyebrow="Página de inicio" title="Servicios" text="Estas cards son uno de los principales puntos de entrada a la propuesta comercial." />
      <div className={styles.editorStack}>
        {draft.services.map((service, i) => (
          <section className={styles.panel} key={service.id}>
            <div className={styles.panelTitle}><div><small>SERVICIO 0{i + 1}</small><h2>{service.title}</h2></div><span className={styles.badge}>{service.kicker}</span></div>
            <div className={styles.formGrid}>
              {(['kicker','title','href'] as const).map(key => <Field key={key} label={key === 'href' ? 'Ruta' : key === 'kicker' ? 'Categoría' : 'Título'} value={service[key]} onChange={v => setDraft(p => ({ ...p, services: p.services.map((s,j) => j === i ? { ...s, [key]: v } : s) }))} />)}
              <div className={styles.full}><Field label="Descripción" value={service.description} textarea onChange={v => setDraft(p => ({ ...p, services: p.services.map((s,j) => j === i ? { ...s, description: v } : s) }))} /></div>
              <div className={styles.full}><Field label="Ideal para" value={service.forWhom} textarea onChange={v => setDraft(p => ({ ...p, services: p.services.map((s,j) => j === i ? { ...s, forWhom: v } : s) }))} /></div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function TeamEditor({ draft, setDraft }: EditorProps) {
  return (
    <>
      <EditorHeader eyebrow="Quiénes somos" title="Equipo" text="Perfiles visibles en la página institucional." />
      <div className={styles.editorStack}>{draft.team.map((member, i) => (
        <section className={styles.panel} key={member.id}>
          <div className={styles.panelTitle}><div><small>PERFIL 0{i+1}</small><h2>{member.name}</h2></div></div>
          <div className={styles.formGrid}>
            <Field label="Nombre" value={member.name} onChange={v=>setDraft(p=>({...p,team:p.team.map((m,j)=>j===i?{...m,name:v}:m)}))}/>
            <Field label="Iniciales" value={member.initials} onChange={v=>setDraft(p=>({...p,team:p.team.map((m,j)=>j===i?{...m,initials:v}:m)}))}/>
            <div className={styles.full}><Field label="Especialidad / rol" value={member.role} onChange={v=>setDraft(p=>({...p,team:p.team.map((m,j)=>j===i?{...m,role:v}:m)}))}/></div>
            <div className={styles.full}><Field label="Biografía" value={member.bio} textarea onChange={v=>setDraft(p=>({...p,team:p.team.map((m,j)=>j===i?{...m,bio:v}:m)}))}/></div>
          </div>
        </section>
      ))}</div>
    </>
  );
}

function TrainingEditor({ draft, setDraft }: EditorProps) {
  const t = draft.training;
  const update = (key: keyof Omit<SiteContent['training'], 'standardFeatures' | 'advancedFeatures'>, value: string) => setDraft(p=>({...p,training:{...p.training,[key]:value}}));
  return (
    <>
      <EditorHeader eyebrow="Servicio" title="Training Lab" text="Título, descripción y contenidos de los dos recorridos." />
      <section className={styles.panel}><div className={styles.formGrid}>
        <Field label="Eyebrow" value={t.eyebrow} onChange={v=>update('eyebrow',v)}/><Field label="Título" value={t.title} onChange={v=>update('title',v)}/>
        <div className={styles.full}><Field label="Introducción" value={t.lead} textarea onChange={v=>update('lead',v)}/></div>
      </div></section>
      <ArrayBlock title={t.standardTitle} items={t.standardFeatures} onTitle={v=>update('standardTitle',v)} description={t.standardDescription} onDescription={v=>update('standardDescription',v)} onItem={(i,v)=>setDraft(p=>({...p,training:{...p.training,standardFeatures:p.training.standardFeatures.map((x,j)=>j===i?v:x)}}))}/>
      <ArrayBlock title={t.advancedTitle} items={t.advancedFeatures} onTitle={v=>update('advancedTitle',v)} description={t.advancedDescription} onDescription={v=>update('advancedDescription',v)} onItem={(i,v)=>setDraft(p=>({...p,training:{...p.training,advancedFeatures:p.training.advancedFeatures.map((x,j)=>j===i?v:x)}}))}/>
    </>
  );
}

function FormationEditor({ draft, setDraft }: EditorProps) {
  const f = draft.formation;
  return (
    <>
      <EditorHeader eyebrow="Servicio" title="Formación" text="Administrá la presentación, modalidades y temáticas." />
      <section className={styles.panel}><div className={styles.formGrid}>
        <Field label="Eyebrow" value={f.eyebrow} onChange={v=>setDraft(p=>({...p,formation:{...p.formation,eyebrow:v}}))}/>
        <Field label="Título" value={f.title} onChange={v=>setDraft(p=>({...p,formation:{...p.formation,title:v}}))}/>
        <div className={styles.full}><Field label="Introducción" value={f.lead} textarea onChange={v=>setDraft(p=>({...p,formation:{...p.formation,lead:v}}))}/></div>
      </div></section>
      <SimpleArrayPanel label="Modalidades" items={f.modalities} onChange={(i,v)=>setDraft(p=>({...p,formation:{...p.formation,modalities:p.formation.modalities.map((x,j)=>j===i?v:x)}}))}/>
      <SimpleArrayPanel label="Temáticas" items={f.topics} onChange={(i,v)=>setDraft(p=>({...p,formation:{...p.formation,topics:p.formation.topics.map((x,j)=>j===i?v:x)}}))}/>
    </>
  );
}

function PulsoEditor({ draft, setDraft }: EditorProps) {
  const p = draft.pulso;
  return (
    <>
      <EditorHeader eyebrow="Servicio" title="Pulso Reflejo" text="Contenido comercial del diagnóstico y las etapas del proceso." />
      <section className={styles.panel}><div className={styles.formGrid}>
        <Field label="Eyebrow" value={p.eyebrow} onChange={v=>setDraft(x=>({...x,pulso:{...x.pulso,eyebrow:v}}))}/>
        <Field label="Título" value={p.title} onChange={v=>setDraft(x=>({...x,pulso:{...x.pulso,title:v}}))}/>
        <div className={styles.full}><Field label="Subtítulo" value={p.subtitle} onChange={v=>setDraft(x=>({...x,pulso:{...x.pulso,subtitle:v}}))}/></div>
        <div className={styles.full}><Field label="Introducción" value={p.lead} textarea onChange={v=>setDraft(x=>({...x,pulso:{...x.pulso,lead:v}}))}/></div>
      </div></section>
      <SimpleArrayPanel label="Beneficios" items={p.benefits} onChange={(i,v)=>setDraft(x=>({...x,pulso:{...x.pulso,benefits:x.pulso.benefits.map((a,j)=>j===i?v:a)}}))}/>
      <SimpleArrayPanel label="Etapas" items={p.steps} textarea onChange={(i,v)=>setDraft(x=>({...x,pulso:{...x.pulso,steps:x.pulso.steps.map((a,j)=>j===i?v:a)}}))}/>
      <SimpleArrayPanel label="Públicos" items={p.audiences} onChange={(i,v)=>setDraft(x=>({...x,pulso:{...x.pulso,audiences:x.pulso.audiences.map((a,j)=>j===i?v:a)}}))}/>
    </>
  );
}

function AutotestEditor({ draft, setDraft }: EditorProps) {
  const a = draft.autotest;
  return (
    <>
      <EditorHeader eyebrow="Herramienta" title="Autotest" text="Las preguntas pueden administrarse desde acá. En una versión productiva, cada cambio quedaría persistido en base de datos." />
      <section className={styles.panel}><div className={styles.formGrid}>
        <Field label="Eyebrow" value={a.eyebrow} onChange={v=>setDraft(p=>({...p,autotest:{...p.autotest,eyebrow:v}}))}/>
        <Field label="Título" value={a.title} onChange={v=>setDraft(p=>({...p,autotest:{...p.autotest,title:v}}))}/>
        <div className={styles.full}><Field label="Introducción" value={a.intro} textarea onChange={v=>setDraft(p=>({...p,autotest:{...p.autotest,intro:v}}))}/></div>
      </div></section>
      <div className={styles.editorStack}>{a.questions.map((q,i)=><section className={styles.panel} key={q.id}>
        <div className={styles.panelTitle}><div><small>PREGUNTA {String(i+1).padStart(2,'0')}</small><h2>{q.category}</h2></div></div>
        <div className={styles.formGrid}>
          <Field label="Categoría" value={q.category} onChange={v=>setDraft(p=>({...p,autotest:{...p.autotest,questions:p.autotest.questions.map((x,j)=>j===i?{...x,category:v}:x)}}))}/>
          <div className={styles.full}><Field label="Pregunta" value={q.text} textarea onChange={v=>setDraft(p=>({...p,autotest:{...p.autotest,questions:p.autotest.questions.map((x,j)=>j===i?{...x,text:v}:x)}}))}/></div>
        </div>
      </section>)}</div>
    </>
  );
}

function ContactEditor({ draft, setDraft }: EditorProps) {
  const c = draft.contact;
  const update = (key: keyof SiteContent['contact'], value:string)=>setDraft(p=>({...p,contact:{...p.contact,[key]:value}}));
  return (
    <>
      <EditorHeader eyebrow="Datos globales" title="Contacto" text="Estos datos aparecen en la página de contacto y en el footer." />
      <section className={styles.panel}><div className={styles.formGrid}>
        <Field label="Email" value={c.email} onChange={v=>update('email',v)}/>
        <Field label="Teléfono visible" value={c.phone} onChange={v=>update('phone',v)}/>
        <Field label="WhatsApp (sólo números)" value={c.whatsapp} onChange={v=>update('whatsapp',v)} hint="Ejemplo: 5491132380995"/>
        <Field label="Ubicación" value={c.location} onChange={v=>update('location',v)}/>
        <div className={styles.full}><Field label="Disponibilidad" value={c.availability} onChange={v=>update('availability',v)}/></div>
      </div></section>
    </>
  );
}

type EditorProps = { draft: SiteContent; setDraft: React.Dispatch<React.SetStateAction<SiteContent>> };

function ArrayBlock({ title, items, description, onTitle, onDescription, onItem }: { title:string; items:string[]; description:string; onTitle:(v:string)=>void; onDescription:(v:string)=>void; onItem:(i:number,v:string)=>void }) {
  return <section className={styles.panel}><div className={styles.formGrid}><Field label="Nombre del recorrido" value={title} onChange={onTitle}/><div className={styles.full}><Field label="Descripción" value={description} textarea onChange={onDescription}/></div>{items.map((item,i)=><Field key={i} label={`Punto ${i+1}`} value={item} onChange={v=>onItem(i,v)}/>)}</div></section>;
}

function SimpleArrayPanel({ label, items, onChange, textarea=false }: { label:string; items:string[]; onChange:(i:number,v:string)=>void; textarea?:boolean }) {
  return <section className={styles.panel}><div className={styles.panelTitle}><div><small>LISTADO</small><h2>{label}</h2></div><span className={styles.badge}>{items.length} ítems</span></div><div className={styles.formGrid}>{items.map((item,i)=><Field key={i} label={`${label} ${i+1}`} value={item} textarea={textarea} onChange={v=>onChange(i,v)}/>)}</div></section>;
}
