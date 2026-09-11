# Reflejo — demo de rediseño integral

MVP desarrollado con **Next.js 15 + React 19 + TypeScript + CSS Modules** para presentar una dirección de rediseño de Gestion Reflejo y demostrar una posible administración de contenidos.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir: `http://localhost:3000`

## Panel administrador

Abrir: `http://localhost:3000/admin`

Credenciales de demo:

- Usuario: `admin`
- Contraseña: `reflejo2026`

> Importante: la autenticación es intencionalmente simple y está hardcodeada en frontend (`src/lib/admin.ts`). Es válida solamente para una demo local. **No debe publicarse como mecanismo de seguridad real.**

## Qué incluye

- Home rediseñada con propuesta de valor, servicios, metodología y CTA.
- Quiénes somos.
- Training Lab, con recorrido base y avanzado.
- Formación, con temáticas y formulario demo.
- Pulso Reflejo, con beneficios y proceso en 5 etapas.
- Autotest interactivo con resultado orientativo.
- Contacto.
- Responsive desktop/tablet/mobile.
- Accesibilidad básica (semántica, foco, labels, skip link).
- Metadata global, `robots.ts` y `sitemap.ts`.
- Panel `/admin` para editar los contenidos principales.
- Exportar/importar contenido en JSON.
- Restaurar contenido inicial.

## Cómo funciona el admin de esta demo

El contenido inicial vive en `src/lib/content.ts`.

Cuando el administrador guarda cambios, el panel los persiste en `localStorage` bajo la clave `reflejo-site-content-v1`. Las páginas públicas consumen ese mismo contenido mediante `ContentProvider`, por lo que los cambios se ven inmediatamente en el mismo navegador.

Esto permite demostrar el flujo de administración **sin implementar todavía backend, base de datos ni autenticación compleja**.

### Limitaciones intencionales

- Los cambios sólo existen en el navegador donde se hicieron.
- Borrar datos del navegador elimina los cambios locales.
- No hay usuarios reales ni roles.
- No hay historial de cambios.
- Los formularios muestran confirmación visual pero no envían emails.
- No se guardan resultados del Autotest.

## Evolución recomendada para producción

Para pasar del demo a producción, la misma interfaz puede conectarse a:

1. **Autenticación segura**: Auth.js/NextAuth, Clerk o sesión propia del backend.
2. **Persistencia**: PostgreSQL/Supabase, Sanity, Directus u otro CMS headless.
3. **Formularios**: Resend, servicio de correo, CRM o automatización elegida por Reflejo.
4. **Autotest**: registro de resultados opcional, consentimiento, analítica y generación de leads.
5. **Analytics**: GA4 + eventos para CTA, formularios, WhatsApp y finalización del Autotest.
6. **SEO**: metadata por página, schema, Search Console y estrategia de contenidos.

## Estructura

```text
src/
  app/
    admin/
    autotest/
    contacto/
    formacion/
    pulso-reflejo/
    quienes-somos/
    training-lab/
  components/
  context/
  lib/
```

## Diseño

El demo toma como base el posicionamiento y los contenidos del sitio actual, pero propone una interfaz más editorial y jerarquizada. La paleta utiliza verde, naranja y neutros cálidos para conservar el lenguaje visual asociado a Reflejo sin depender de assets externos.

No se usaron librerías UI ni imágenes externas, por lo que el prototipo es liviano y fácil de modificar.
