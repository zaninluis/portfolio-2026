// ============================================================
//  CONTEÚDO DO PORTFÓLIO — edite tudo por aqui
//  Todo texto tem versão em Português (pt) e Inglês (en).
// ============================================================

export const profile = {
  name: "Luis Zanin",
  fullName: "Luis Eduardo Cervo Zanin",
  role: {
    pt: "Desenvolvedor Front-end & Back-end · Quality Assurance",
    en: "Front-end & Back-end Developer · Quality Assurance",
  },
  bio: {
    pt: "Atuo com sistemas ERP/TMS, hoje como Analista de Suporte N1 em sistema de gestão de frotas — análise inicial de erros, encaminhamento de demandas e testes de novas funcionalidades e correções. Estudante de Ciência da Computação com base sólida em desenvolvimento web (JavaScript, React, Node). Em busca de oportunidades em Front-end, Back-end e Quality Assurance.",
    en: "I work with ERP/TMS systems, currently as an N1 Support Analyst for a fleet management system — initial error analysis, demand routing and testing of new features and fixes. Computer Science student with a solid web development foundation (JavaScript, React, Node). Looking for opportunities in Front-end, Back-end and Quality Assurance.",
  },
  email: "luiseduardocervozanin@gmail.com",
  phone: "+55 54 99663-6057",
  whatsapp: "5554996636057",
  github: "https://github.com/zaninluis",
  linkedin: "https://www.linkedin.com/in/zaninluis/",
  // CV por idioma (arquivos em /public)
  cv: {
    pt: "/Luis_QA_PT.pdf",
    en: "/Luis_QA_EN.pdf",
  },
  location: {
    pt: "Rio Grande do Sul, Brasil · Disponível para remoto",
    en: "Rio Grande do Sul, Brazil · Open to remote",
  },
};

// ----- Áreas / especialidades -----
export const areas = [
  {
    id: "qa",
    icon: "🧪",
    title: { pt: "Quality Assurance", en: "Quality Assurance" },
    description: {
      pt: "Testes funcionais, replicação de cenários e validação de correções com foco em confiabilidade do produto.",
      en: "Functional testing, scenario reproduction and fix validation focused on product reliability.",
    },
    skills: [
      "Testes Funcionais",
      "Testes de Regressão",
      "Testes Exploratórios",
      "Validação de Correções",
      "Documentação de Bugs",
      "Análise de Logs",
      "Causa-raiz",
      "Scrum / Kanban",
    ],
  },
  {
    id: "frontend",
    icon: "🎨",
    title: { pt: "Front-end", en: "Front-end" },
    description: {
      pt: "Interfaces responsivas e consumo de APIs REST, com React, JavaScript e boas práticas de UI.",
      en: "Responsive interfaces and REST API consumption with React, JavaScript and good UI practices.",
    },
    skills: [
      "React",
      "React Native",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Axios / REST",
      "Git & GitHub",
    ],
  },
  {
    id: "backend",
    icon: "⚙️",
    title: { pt: "Back-end", en: "Back-end" },
    description: {
      pt: "APIs e serviços com Node.js e Java, modelagem de dados em SQL e arquitetura MVC.",
      en: "APIs and services with Node.js and Java, SQL data modeling and MVC architecture.",
    },
    skills: [
      "Node.js",
      "Java",
      "Microservices",
      "REST APIs",
      "MySQL",
      "PostgreSQL",
      "Arquitetura MVC",
      "Python (básico)",
    ],
  },
];

// ----- Experiência profissional (trajetória) -----
export const experience = [
  {
    period: "2025 — Atual",
    role: {
      pt: "Analista de Suporte N1",
      en: "N1 Support Analyst",
    },
    company: "Atua Sistemas by Nstech",
    description: {
      pt: "Atendimento de suporte N1 aos usuários do sistema de gestão de frotas, com análise inicial de erros e encaminhamento de demandas complexas para analistas e desenvolvedores. Execução de testes nas novas funcionalidades, correções e implementações, garantindo a qualidade do atendimento e das entregas.",
      en: "N1 support for users of a fleet management system, with initial error analysis and routing of complex demands to analysts and developers. Testing of new features, fixes and implementations, ensuring the quality of both support and deliverables.",
    },
  },
  {
    period: "2025",
    role: { pt: "Analista de Suporte N1", en: "N1 Support Analyst" },
    company: "Elevor Software",
    description: {
      pt: "Registro estruturado de bugs reportados por clientes do sistema ERP, com passos para reprodução e evidências, e escalonamento de problemas críticos ao time técnico.",
      en: "Structured logging of bugs reported by ERP clients, with reproduction steps and evidence, and escalation of critical issues to the technical team.",
    },
  },
  {
    period: "2021 — 2024",
    role: { pt: "Suporte Técnico", en: "Technical Support" },
    company: "Atual Imobiliária",
    description: {
      pt: "Diagnóstico e resolução de problemas técnicos em ambiente corporativo (rede, e-mail, acesso remoto) e instalação/atualização de softwares com validação pós-mudança.",
      en: "Diagnosis and resolution of technical issues in corporate environments (network, email, remote access) and software installation/updates with post-change validation.",
    },
  },
  {
    period: "2020 — 2021",
    role: {
      pt: "Suporte Técnico e Implantação",
      en: "Technical Support & Implementation",
    },
    company: "Z&M Software",
    description: {
      pt: "Implantação de sistema ERP em pequenas e médias empresas, com parametrização conforme o perfil do cliente e validação funcional pós-deploy.",
      en: "ERP implementation for small and medium businesses, with parameterization per client profile and post-deploy functional validation.",
    },
  },
];

// ----- Formação -----
export const education = [
  {
    period: "2024 — 2027",
    title: {
      pt: "Bacharelado em Ciência da Computação",
      en: "B.Sc. in Computer Science",
    },
    place: "ATITUS Educação",
    note: { pt: "Em andamento", en: "In progress" },
  },
  {
    period: "2007 — 2014",
    title: { pt: "Inglês Intermediário", en: "Intermediate English" },
    place: "Wizard · ETC College Bournemouth (UK)",
    note: { pt: "", en: "" },
  },
];

// ----- Projetos (repositórios reais) -----
export const projects = [
  {
    title: "ZN Control — Gestão de Estoque",
    area: ["backend", "frontend"],
    description: {
      pt: "Sistema full-stack de controle de estoque com múltiplos locais. Back-end em Node.js/Express com SQLite, autenticação por sessão, proteção CSRF, rate limit e 4 níveis de permissão (RBAC). Front-end em JavaScript puro.",
      en: "Full-stack inventory management system with multiple locations. Node.js/Express back-end with SQLite, session auth, CSRF protection, rate limiting and 4 permission levels (RBAC). Vanilla JavaScript front-end.",
    },
    tags: ["Node.js", "Express", "SQLite", "Auth/RBAC", "JavaScript"],
    repo: "https://github.com/zaninluis/ZNControl",
    demo: "",
  },
  {
    title: "Midnight Club",
    area: ["frontend"],
    description: {
      pt: "Site institucional de uma crew, com cards de membros e galeria renderizados dinamicamente a partir de dados em JS, além de lightbox. HTML, CSS e JavaScript puro, sem framework.",
      en: "Institutional site for a crew, with member cards and gallery rendered dynamically from JS data, plus a lightbox. Pure HTML, CSS and JavaScript, no framework.",
    },
    tags: ["HTML5", "CSS3", "JavaScript"],
    repo: "https://github.com/zaninluis/midnightclub",
    demo: "",
  },
  {
    title: "Meu Primeiro Portfólio",
    area: ["frontend"],
    description: {
      pt: "Meu primeiro portfólio, feito 100% à mão e sem nenhuma ajuda de IA, com HTML, CSS, JavaScript e Bootstrap. Foi onde aprendi os fundamentos de front-end e layout responsivo.",
      en: "My first portfolio, hand-coded from scratch with no AI assistance, using HTML, CSS, JavaScript and Bootstrap. Where I learned front-end fundamentals and responsive layout.",
    },
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    repo: "https://github.com/zaninluis/portfolio",
    demo: "",
  },
  {
    title: "Dengue Alerta — Front-end",
    area: ["frontend"],
    description: {
      pt: "Interface web para alertas de dengue, consumindo a API do back-end. Construída com JavaScript e React.",
      en: "Web interface for dengue alerts, consuming the back-end API. Built with JavaScript and React.",
    },
    tags: ["React", "JavaScript", "REST"],
    repo: "https://github.com/zaninluis/denguealertaexp",
    demo: "",
  },
  {
    title: "Dengue Alerta — API",
    area: ["backend"],
    description: {
      pt: "Back-end em Java do projeto Dengue Alerta, responsável pela lógica de negócio e exposição dos dados via API.",
      en: "Java back-end for the Dengue Alerta project, handling business logic and exposing data via API.",
    },
    tags: ["Java", "REST API"],
    repo: "https://github.com/zaninluis/dengueAlertaBackend",
    demo: "",
  },
  {
    title: "Star Wars App",
    area: ["frontend"],
    description: {
      pt: "Aplicativo em React Native que consome a API pública de Star Wars para listar e detalhar personagens.",
      en: "React Native app that consumes the public Star Wars API to list and detail characters.",
    },
    tags: ["React Native", "API"],
    repo: "https://github.com/zaninluis/starwars",
    demo: "",
  },
  {
    title: "Consumo de Gasolina",
    area: ["frontend"],
    description: {
      pt: "App mobile em React Native que calcula se vale mais a pena abastecer com álcool ou gasolina.",
      en: "React Native mobile app that calculates whether ethanol or gasoline is the better fuel choice.",
    },
    tags: ["React Native", "JavaScript"],
    repo: "https://github.com/zaninluis/GasConsumo",
    demo: "",
  },
  {
    title: "Microservices em Java",
    area: ["backend"],
    description: {
      pt: "Projeto de microsserviços em Java explorando comunicação entre serviços e arquitetura distribuída.",
      en: "Java microservices project exploring inter-service communication and distributed architecture.",
    },
    tags: ["Java", "Microservices"],
    repo: "https://github.com/zaninluis/microservice-java",
    demo: "",
  },
  {
    title: "Gestão de Biblioteca",
    area: ["backend"],
    description: {
      pt: "Sistema de gestão de biblioteca em Java com views no terminal, praticando lógica e CRUD.",
      en: "Library management system in Java with terminal views, practicing logic and CRUD.",
    },
    tags: ["Java", "CRUD"],
    repo: "https://github.com/zaninluis/biblioteca",
    demo: "",
  },
];

// ----- Traduções de UI -----
export const ui = {
  nav: {
    about: { pt: "Sobre", en: "About" },
    skills: { pt: "Áreas", en: "Areas" },
    experience: { pt: "Experiência", en: "Experience" },
    projects: { pt: "Projetos", en: "Projects" },
    contact: { pt: "Contato", en: "Contact" },
  },
  hero: {
    cta: { pt: "Ver projetos", en: "View projects" },
    contact: { pt: "Entrar em contato", en: "Get in touch" },
    cv: { pt: "Baixar CV", en: "Download CV" },
  },
  sections: {
    skills: { pt: "No que eu trabalho", en: "What I work with" },
    experience: { pt: "Experiência profissional", en: "Professional experience" },
    education: { pt: "Formação", en: "Education" },
    projects: { pt: "Projetos", en: "Projects" },
    contact: { pt: "Vamos conversar", en: "Let's talk" },
  },
  contact: {
    text: {
      pt: "Aberto a oportunidades de QA, Front-end e Back-end — presencial ou remoto. Me chame!",
      en: "Open to QA, Front-end and Back-end opportunities — on-site or remote. Reach out!",
    },
  },
  footer: {
    pt: "Feito com React + Vite e Claude Code",
    en: "Built with React + Vite and Claude Code",
  },
};
