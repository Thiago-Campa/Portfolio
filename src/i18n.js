export const translations = {
  es: {
    nav: {
      about: 'Sobre mí',
      experience: 'Experiencia',
      skills: 'Skills',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      titlePre: 'Resuelvo problemas de ',
      titleHighlight: 'infraestructura',
      titlePost: ' y construyo software para resolverlos mejor.',
      lead: 'Técnico informático y desarrollador web en Rosario, Argentina. Del soporte técnico en piso a escribir el código que evita el próximo ticket.',
      ctaProjects: 'Ver proyectos',
      ctaContact: 'Contactarme',
      terminal: [
        { prompt: '$', text: 'whoami' },
        { value: 'thiago_campagnaro' },
        { prompt: '$', text: 'cat rol.txt' },
        { value: 'Desarrollador Web / Técnico Informático' },
        { prompt: '$', text: 'status' },
        { value: 'disponible para nuevos desafíos', cursor: true },
      ],
    },
    about: {
      heading: 'Sobre mí',
      p1: 'Estudiante de la Tecnicatura Universitaria en Programación y técnico informático, apasionado por la tecnología, el desarrollo de software y la resolución de problemas.',
      p2: 'Curioso, responsable y con ganas de seguir aprendiendo y creciendo profesionalmente en el mundo IT. Mi día a día combina soporte técnico, redes y bases de datos con proyectos de desarrollo propios.',
      badges: ['Rosario, Santa Fe, Argentina', 'Tecnicatura en Programación', 'Bombero voluntario'],
    },
    experience: {
      heading: 'Experiencia',
      currentTag: 'actual',
      jobs: [
        {
          role: 'Técnico informático',
          tasks: [
            'Brindo soporte técnico a usuarios en aulas y oficinas.',
            'Mantenimiento preventivo y correctivo de PC y notebooks.',
            'Instalación y configuración de hardware y software.',
            'Gestión de conexiones de red física y WiFi.',
            'Diagnóstico y resolución de incidencias técnicas.',
            'Colaboro en proyectos de mejora tecnológica e infraestructura.',
          ],
        },
        {
          role: 'Técnico de soporte TI — RMA',
          tasks: [
            'Asistencia técnica resolviendo incidencias de hardware, software y dispositivos móviles.',
            'Mantenimiento y administración de la red interna de la empresa.',
            'Encargado del área RMA / Garantías: reclamos, diagnósticos y seguimiento de productos fallidos.',
            'Revisión y verificación de productos defectuosos, asegurando trazabilidad en postventa.',
          ],
        },
        {
          role: 'Técnico de soporte TI',
          tasks: [
            'Mantenimiento y reparación de equipos de computación.',
            'Manejo del servidor y la red de la empresa.',
            'Responsable del proceso de modernización tecnológica de la empresa.',
            'Colaboración en el manejo de la base de datos de la empresa.',
            'Asistencia técnica a usuarios.',
          ],
        },
      ],
    },
    skills: {
      heading: 'Skills',
      groups: {
        Lenguajes: ['JavaScript', 'Python', 'C', 'SQL', 'HTML', 'CSS'],
        'Frameworks / Librerías': ['React', 'Node.js', 'Express.js', 'Sequelize', 'bcryptjs', 'JWT', 'Vite'],
        'Bases de datos': ['MySQL', 'SQLite'],
        Herramientas: ['Git', 'GitHub', 'npm', 'Visual Studio Code'],
      },
    },
    projects: {
      heading: 'Proyectos',
      items: [
        {
          title: 'CIC-DB — Centro de Integración Comunitaria',
          status: 'En producción',
          description:
            'Sistema de registro de familias para el Centro de Integración Comunitaria de Pavón Arriba: un formulario de declaración familiar conectado a una base de datos, pensado para simplificar el relevamiento social del barrio y facilitar el trabajo del equipo del CIC.',
          tags: ['Firebase Hosting', 'Base de datos', 'Formularios', 'Trabajo en equipo'],
          linkLabel: 'Ver proyecto en vivo',
        },
        {
          title: 'Sistema de gestión para cuartel de bomberos',
          status: 'En desarrollo',
          description:
            'Como bombero voluntario, estoy diseñando un sistema propio para implementar en mi cuartel: una herramienta pensada para el uso real que le va a dar el cuerpo activo, no un ejercicio de práctica.',
          tags: ['Próximamente'],
          linkLabel: null,
        },
      ],
    },
    contact: {
      heading: 'Contacto',
      p: '¿Tenés un proyecto, una oportunidad laboral o simplemente querés charlar de tecnología? Escribime, respondo por mail.',
      socialLabels: { github: 'GitHub', linkedin: 'LinkedIn', instagram: 'Instagram' },
    },
    footer: {
      text: '© 2026 Thiago Campagnaro — Rosario, Argentina',
    },
    themeToggle: { toLight: 'Modo claro', toDark: 'Modo oscuro' },
    langToggle: { label: 'EN' },
  },

  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      titlePre: 'I solve ',
      titleHighlight: 'infrastructure',
      titlePost: ' problems and build software to keep them solved.',
      lead: 'IT technician and web developer based in Rosario, Argentina. From on-the-floor tech support to writing the code that prevents the next ticket.',
      ctaProjects: 'View projects',
      ctaContact: 'Get in touch',
      terminal: [
        { prompt: '$', text: 'whoami' },
        { value: 'thiago_campagnaro' },
        { prompt: '$', text: 'cat role.txt' },
        { value: 'Web Developer / IT Technician' },
        { prompt: '$', text: 'status' },
        { value: 'open to new challenges', cursor: true },
      ],
    },
    about: {
      heading: 'About me',
      p1: "Studying for a University Degree in Programming and working as an IT technician, passionate about technology, software development, and problem solving.",
      p2: 'Curious, reliable, and eager to keep learning and growing professionally in IT. My day-to-day blends tech support, networking, and databases with my own development projects.',
      badges: ['Rosario, Santa Fe, Argentina', 'Programming Degree (in progress)', 'Volunteer firefighter'],
    },
    experience: {
      heading: 'Experience',
      currentTag: 'current',
      jobs: [
        {
          role: 'IT Technician',
          tasks: [
            'Provide technical support to users in classrooms and offices.',
            'Preventive and corrective maintenance of PCs and laptops.',
            'Hardware and software installation and configuration.',
            'Management of wired and WiFi network connections.',
            'Diagnose and resolve technical incidents.',
            'Collaborate on technology and infrastructure improvement projects.',
          ],
        },
        {
          role: 'IT Support Technician — RMA',
          tasks: [
            'Technical support resolving hardware, software, and mobile device issues.',
            'Maintenance and administration of the company\u2019s internal network.',
            'In charge of the RMA / Warranty area: claims, diagnostics, and tracking of failed products.',
            'Inspection and verification of defective products, ensuring after-sales traceability.',
          ],
        },
        {
          role: 'IT Support Technician',
          tasks: [
            'Maintenance and repair of computer equipment.',
            'Managed the company\u2019s server and network.',
            'Led the company\u2019s technology modernization process.',
            'Collaborated on managing the company\u2019s database.',
            'Provided technical assistance to users.',
          ],
        },
      ],
    },
    skills: {
      heading: 'Skills',
      groups: {
        Languages: ['JavaScript', 'Python', 'C', 'SQL', 'HTML', 'CSS'],
        'Frameworks / Libraries': ['React', 'Node.js', 'Express.js', 'Sequelize', 'bcryptjs', 'JWT', 'Vite'],
        Databases: ['MySQL', 'SQLite'],
        Tools: ['Git', 'GitHub', 'npm', 'Visual Studio Code'],
      },
    },
    projects: {
      heading: 'Projects',
      items: [
        {
          title: 'CIC-DB — Community Center Registry',
          status: 'Live',
          description:
            "A family registration system for the Pavón Arriba Community Integration Center: a household declaration form connected to a database, built to simplify the neighborhood's social outreach and support the center's team.",
          tags: ['Firebase Hosting', 'Database', 'Forms', 'Team project'],
          linkLabel: 'View live project',
        },
        {
          title: 'Fire Station Management System',
          status: 'In progress',
          description:
            "As a volunteer firefighter, I'm designing a system to implement at my own fire station: a tool built for real use by the active crew, not a practice exercise.",
          tags: ['Coming soon'],
          linkLabel: null,
        },
      ],
    },
    contact: {
      heading: 'Contact',
      p: "Have a project, a job opportunity, or just want to talk tech? Write to me, I reply by email.",
      socialLabels: { github: 'GitHub', linkedin: 'LinkedIn', instagram: 'Instagram' },
    },
    footer: {
      text: '© 2026 Thiago Campagnaro — Rosario, Argentina',
    },
    themeToggle: { toLight: 'Light mode', toDark: 'Dark mode' },
    langToggle: { label: 'ES' },
  },
}
