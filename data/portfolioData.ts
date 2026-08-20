export interface StatItem {
  label: string;
  value: string;
  helper: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: "Fullstack E-Commerce" | "System Design & Backend" | "Automation QA Testing";
  role: string;
  techStack: string[];
  highlights: string[];
  metrics?: { label: string; value: string };
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  imageAlt?: string;
}

export interface SkillsMatrix {
  [key: string]: string[];
}

export const portfolioData = {
  profile: {
    name: "Đặng Hải Phi",
    title: "Fullstack / Backend Developer Intern",
    school: "HUFLIT (Đại học Ngoại ngữ - Tin học TP.HCM)",
    gpa: "3.0 / 4.0",
    club: "CLB Tin học HUFIC",
    email: "phidanghai@gmail.com",
    phone: "0843 704 216",
    location: "Tân Phú, TP. Hồ Chí Minh",
    github: "https://github.com/phidanghai-spec",
    status: "Open for Opportunities",
  },
  statsRibbon: [
    { label: "RESTful API Endpoints", value: "50+", helper: "Scalable Architecture" },
    { label: "GoF Design Patterns", value: "12", helper: "Clean OOP Mastery" },
    { label: "Unit Test Coverage", value: "69 Tests", helper: "Logic & Auth Isolation" },
    { label: "Google Lighthouse", value: "100/100", helper: "SEO & Core Web Vitals" },
  ] as StatItem[],
  projects: [
    {
      id: "techstore",
      title: "TechStore",
      subtitle: "Graduation Project",
      category: "Fullstack E-Commerce",
      role: "Fullstack Intern",
      image: "/images/projects/techstore.png",
      imageAlt: "TechStore - Fullstack E-Commerce admin dashboard and storefront screenshot",
      techStack: ["Next.js", "ASP.NET Core", "Node.js", "Prisma ORM", "TiDB Cloud", "Socket.io"],
      highlights: [
        "Architected 50+ RESTful APIs handling real-time order processing and role-based JWT auth.",
        "Built instant two-way Customer–Admin support via WebSocket / Socket.io engine.",
        "Engineered quad-gateway checkout pipeline (MoMo, VNPay, PayPal, COD).",
        "Perfect 100/100 Google Lighthouse audit through incremental static optimization.",
      ],
      metrics: { label: "API Endpoints", value: "50+" },
      liveUrl: "https://frontend-ruby-phi-14.vercel.app",
    },
    {
      id: "cineverse",
      title: "CineVerse",
      subtitle: "Design Patterns Course",
      category: "System Design & Backend",
      role: "Backend & System Design",
      image: "/images/projects/cineverse.png",
      imageAlt: "CineVerse - Cinema booking system architecture diagram and ticket pricing screenshot",
      techStack: ["C#", "Python", "SQLite", "12 GoF Patterns", "Unit Testing"],
      highlights: [
        "Implemented strict 3-Tier Layered Architecture: Presentation → Business Logic → Data Access.",
        "Applied 12 GoF Patterns (Factory, Strategy, Singleton, Decorator) for runtime ticket calculation.",
        "Engineered 69 Unit Tests verifying pricing matrices, voucher discounts, and role authorization.",
        "Hardened system perimeter against Stored XSS and CSRF token vulnerabilities.",
      ],
      metrics: { label: "Design Patterns", value: "12 GoF" },
      githubUrl: "https://github.com/phidanghai-spec/cineverse",
    },
    {
      id: "datvexe",
      title: "DatVeXe",
      subtitle: "Software Quality Assurance",
      category: "Automation QA Testing",
      role: "Automation QA Tester",
      image: "/images/projects/datvexe.png",
      imageAlt: "DatVeXe - Bus booking automation test execution and test matrix report screenshot",
      techStack: ["C#", "Selenium WebDriver", "Visual Studio", "NUnit"],
      highlights: [
        "Constructed exhaustive End-to-End (E2E) testing matrix for multi-route ticket booking.",
        "Automated regression testing pipelines using Selenium WebDriver & NUnit runners.",
        "Reduced manual QA cycles by 70% with deterministic automated test suites.",
      ],
      metrics: { label: "Test Efficiency", value: "70% Faster" },
      githubUrl: "https://github.com/phidanghai-spec/datvexe-selenium-test",
    },
  ] as (Project & { subtitle?: string })[],
  skillsMatrix: {
    Backend: ["ASP.NET Core", "Node.js", "C#", "Python", "RESTful API", "Socket.io"],
    Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    Databases: ["TiDB Cloud", "SQL Server", "SQLite", "Prisma ORM"],
    "QA & Tooling": ["Selenium WebDriver", "NUnit", "Unit Testing", "Git/GitHub", "Visual Studio"],
  } as SkillsMatrix,

  architectureTiers: [
    {
      id: "presentation",
      label: "Presentation Layer",
      sublabel: "Controller / View",
      color: "indigo",
      description: "Handles HTTP requests, routing, UI rendering and user interaction.",
      items: ["ASP.NET MVC Controllers", "Razor Views", "API Endpoints", "Input Validation"],
    },
    {
      id: "business",
      label: "Business Logic Layer",
      sublabel: "Service",
      color: "violet",
      description: "Orchestrates domain logic, applies design patterns and business rules.",
      items: ["Service Classes", "Factory Pattern", "Strategy Pattern", "Singleton Pattern"],
    },
    {
      id: "data",
      label: "Data Access Layer",
      sublabel: "Repository",
      color: "emerald",
      description: "Abstracts database operations, manages entities and queries.",
      items: ["Repository Pattern", "Prisma ORM", "SQLite Queries", "Unit of Work"],
    },
  ],

  gofPatterns: [
    { name: "Factory Method", category: "Creational", desc: "Creates ticket objects by type" },
    { name: "Abstract Factory", category: "Creational", desc: "Families of related UI components" },
    { name: "Singleton", category: "Creational", desc: "Global config and DB connection" },
    { name: "Builder", category: "Creational", desc: "Complex order construction" },
    { name: "Adapter", category: "Structural", desc: "Payment gateway integration" },
    { name: "Decorator", category: "Structural", desc: "Dynamic voucher price calculation" },
    { name: "Facade", category: "Structural", desc: "Simplified booking API surface" },
    { name: "Composite", category: "Structural", desc: "Seat map tree structure" },
    { name: "Observer", category: "Behavioral", desc: "Real-time order status updates" },
    { name: "Strategy", category: "Behavioral", desc: "Interchangeable pricing algorithms" },
    { name: "Command", category: "Behavioral", desc: "Undo/redo booking operations" },
    { name: "Template Method", category: "Behavioral", desc: "Standardized checkout flow" },
  ],
};

export type Category = "All" | Project["category"];
