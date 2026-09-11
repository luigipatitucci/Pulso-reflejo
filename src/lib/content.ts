export type Service = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  forWhom: string;
  href: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export type TestQuestion = {
  id: string;
  category: string;
  text: string;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  valueProps: string[];
  services: Service[];
  about: {
    eyebrow: string;
    title: string;
    body: string;
    body2: string;
  };
  team: TeamMember[];
  training: {
    eyebrow: string;
    title: string;
    lead: string;
    standardTitle: string;
    standardDescription: string;
    standardFeatures: string[];
    advancedTitle: string;
    advancedDescription: string;
    advancedFeatures: string[];
  };
  formation: {
    eyebrow: string;
    title: string;
    lead: string;
    modalities: string[];
    topics: string[];
  };
  pulso: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
    benefits: string[];
    steps: string[];
    audiences: string[];
  };
  autotest: {
    eyebrow: string;
    title: string;
    intro: string;
    questions: TestQuestion[];
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    availability: string;
    whatsapp: string;
  };
};

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: 'Gestión · Comunicación · Calidad en Salud',
    title: 'Crecer en calidad,',
    highlight: 'destacar en salud.',
    description:
      'Acompañamos a organizaciones y profesionales del sector salud a diagnosticar, ordenar y transformar sus prácticas de gestión, comunicación y liderazgo.',
    primaryCta: 'Contanos tu situación',
    secondaryCta: 'Conocer servicios',
  },
  valueProps: [
    'Mirada técnica y cercana',
    'Mejora continua basada en evidencia',
    'Soluciones adaptadas a cada organización',
    'Calidad y seguridad del paciente',
  ],
  services: [
    {
      id: 'pulso',
      kicker: 'Diagnóstico',
      title: 'Pulso Reflejo',
      description:
        'Una lectura integral de la organización para detectar fortalezas, brechas y prioridades de mejora con una mirada externa y especializada.',
      forWhom: 'Para organizaciones que necesitan saber dónde están antes de decidir qué transformar.',
      href: '/pulso-reflejo',
    },
    {
      id: 'formacion',
      kicker: 'Capacitación',
      title: 'Formación a medida',
      description:
        'Espacios de aprendizaje sobre calidad, comunicación, seguridad del paciente y gestión estratégica para equipos de salud.',
      forWhom: 'Para instituciones que buscan fortalecer capacidades internas y alinear equipos.',
      href: '/formacion',
    },
    {
      id: 'training',
      kicker: 'Liderazgo',
      title: 'Training Lab',
      description:
        'Un laboratorio de entrenamiento para convertir ideas de gestión en proyectos concretos, validados y listos para implementar.',
      forWhom: 'Para profesionales de la salud con roles de conducción o liderazgo.',
      href: '/training-lab',
    },
  ],
  about: {
    eyebrow: 'Acerca de Reflejo',
    title: 'Gestionar en salud requiere reflexión y capacidad de acción.',
    body:
      'Reflejo nace para acompañar a quienes lideran proyectos y equipos en salud con herramientas concretas de gestión, comunicación y mejora continua.',
    body2:
      'Combinamos experiencia en organizaciones sanitarias con una metodología cercana: observamos, escuchamos, ordenamos información y construimos propuestas posibles para cada contexto.',
  },
  team: [
    {
      id: 'cecilia',
      name: 'Cecilia Zerbo',
      role: 'Gestión hospitalaria · Calidad · Cambio organizacional',
      initials: 'CZ',
      bio: 'Médica clínica por la UBA, con formación en administración hospitalaria y recursos humanos. Su trayectoria se centra en mejora continua, gestión hospitalaria, cultura organizacional y gestión del cambio en salud.',
    },
    {
      id: 'mariela',
      name: 'Mariela Zanazzi',
      role: 'Comunicación · Planificación · Cultura organizacional',
      initials: 'MZ',
      bio: 'Licenciada en Comunicación Social, con formación en gestión de conflictos y planificación de procesos comunicacionales. Trabaja sobre comunicación institucional, clima laboral y planificación estratégica en salud.',
    },
  ],
  training: {
    eyebrow: 'Entrenamiento para líderes y equipos',
    title: 'Una usina de proyectos para transformar ideas en mejoras reales.',
    lead:
      'Training Lab combina mentoría, análisis, simulación y trabajo entre pares para fortalecer el rol de liderazgo y acelerar proyectos de mejora en salud.',
    standardTitle: 'Training Lab',
    standardDescription:
      'Para quienes quieren identificar un desafío de gestión, diseñar un plan y ganar seguridad antes de implementarlo.',
    standardFeatures: [
      'Sesión individual para identificar desafíos',
      'Asesoramiento individual y grupal',
      'Lecturas y análisis crítico',
      'Simulación y ensayo de ideas',
      'Conversatorios sobre gestión y comunicación',
    ],
    advancedTitle: 'Training Lab avanzado',
    advancedDescription:
      'Para profesionales con experiencia en gestión que ya tienen una iniciativa en marcha y necesitan llevarla a una nueva etapa.',
    advancedFeatures: [
      'Clínica de proyectos',
      'Mentoría personalizada',
      'Conversatorios con especialistas',
      'Mentoría cruzada entre pares',
      'Bitácora de gestión y seguimiento',
    ],
  },
  formation: {
    eyebrow: 'Formación',
    title: 'Calidad, comunicación y seguridad del paciente llevadas a la práctica.',
    lead:
      'Diseñamos propuestas de formación para organizaciones y profesionales de la salud, combinando marcos conceptuales con herramientas aplicables al trabajo cotidiano.',
    modalities: [
      'Encuentros 100% online o adaptados a la organización',
      'Conversatorios con expertos',
      'Orientación para implementar mejoras',
      'Capacitaciones diseñadas según necesidades reales',
    ],
    topics: [
      'Calidad y mejora continua',
      'Comunicación efectiva',
      'Seguridad del paciente',
      'Cultura organizacional',
      'Gestión estratégica',
      'Liderazgo y trabajo en equipo',
    ],
  },
  pulso: {
    eyebrow: 'Pulso Reflejo',
    title: 'El diagnóstico que impulsa la mejora.',
    subtitle: 'Entender cómo late una organización antes de decidir qué cambiar.',
    lead:
      'Observamos procesos, prácticas y cultura organizacional para construir un diagnóstico claro, priorizado y accionable sobre calidad y seguridad en salud.',
    benefits: [
      'Testeo del estado de cumplimiento en calidad y seguridad',
      'Identificación de fortalezas, brechas y riesgos',
      'Recomendaciones específicas y priorizadas',
      'Base para avanzar hacia estándares y certificaciones',
    ],
    steps: [
      'Entrevista inicial para conocer identidad, historia y modalidad de trabajo.',
      'Recorrida y relevamiento con personas clave de la organización.',
      'Revisión de información según estándares nacionales e internacionales.',
      'Documento con hallazgos, fortalezas, brechas y riesgos.',
      'Presentación de propuestas de mejora realistas y adaptadas.',
    ],
    audiences: [
      'Hospitales y clínicas',
      'Centros especializados y de diagnóstico',
      'Instituciones de cuidado de la salud',
      'Organizaciones que buscan una mirada técnica externa',
    ],
  },
  autotest: {
    eyebrow: 'Autotest de calidad',
    title: 'Una primera señal para saber dónde poner el foco.',
    intro:
      'Respondé estas preguntas sobre tu organización. No hay respuestas correctas o incorrectas: el objetivo es detectar oportunidades para conversar y mejorar.',
    questions: [
      { id: 'q1', category: 'Propósito', text: '¿La misión, visión y valores son conocidos por quienes trabajan en la organización?' },
      { id: 'q2', category: 'Procesos', text: '¿Los procesos críticos están definidos, documentados y se revisan periódicamente?' },
      { id: 'q3', category: 'Seguridad', text: '¿Existe una forma clara de registrar, analizar y aprender de incidentes o eventos adversos?' },
      { id: 'q4', category: 'Comunicación', text: '¿Los equipos cuentan con canales y rutinas de comunicación definidos para información relevante?' },
      { id: 'q5', category: 'Indicadores', text: '¿Se utilizan indicadores para tomar decisiones y evaluar si las mejoras funcionan?' },
      { id: 'q6', category: 'Personas', text: '¿Las personas reciben capacitación y feedback vinculados con calidad y seguridad?' },
      { id: 'q7', category: 'Usuarios', text: '¿La experiencia y la voz de pacientes/usuarios se incorporan en las decisiones de mejora?' },
      { id: 'q8', category: 'Mejora continua', text: '¿La organización tiene prioridades de mejora explícitas, responsables y seguimiento?' },
    ],
  },
  contact: {
    email: 'gestionreflejo@gmail.com',
    phone: '+54 9 11 3238-0995',
    location: 'Buenos Aires, Argentina · Online en todo el país',
    availability: 'Coordinamos agenda con cada cliente.',
    whatsapp: '5491132380995',
  },
};

export const CONTENT_STORAGE_KEY = 'reflejo-site-content-v1';
